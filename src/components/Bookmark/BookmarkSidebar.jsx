
import React, { useEffect, useRef, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookmarks } from '../../redux/lib/displayBookmarks';
import BookmarkList from './BookmarkList';
import useOutsideClick from '../../hook/useOutsideClick';
import axios from 'axios';
import FavouriteBookmark from './FavouriteBookmark';

const BookmarkSidebar = ({ isOpen, onClose, folderRanks }) => {
  const userId = useSelector((state) => state?.authSlice?.user?.id);
  const sidebarRef = useRef();
  const [averageRanksByBId, setAverageRanksByBId] = useState({});
  const [selectedFavorites, setSelectedFavorites] = useState(null); // State to store selected favorites

  const isSidebarOpen = useSelector((state) => state.SidebarSlice.isOpen);

  const [searchBookmark, setSearchBookmark] = useState('');
  const dispatch = useDispatch();
  const bookmarks_Display = useSelector((state) => state.displayBookmarkSlice.bookmarks);

  useOutsideClick(sidebarRef, () => {
    if (isOpen) {
      onClose();
    }
  });

  useEffect(() => {
    dispatch(fetchBookmarks());
  }, [dispatch]);

  const handleSearchBookmark = (e) => {
    setSearchBookmark(e.target.value);
  };

  useEffect(() => {
    const newAverageRanks = {};

    Object.keys(folderRanks).forEach((b_id) => {
      const ranks = folderRanks[b_id] || [];
      newAverageRanks[b_id] = ranks.length
        ? ranks.reduce((sum, rank) => sum + rank, 0) / ranks.length
        : 0;
    });

    setAverageRanksByBId(newAverageRanks);
  }, [folderRanks]);
  const fetchFavorites = async (bookmarkId) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/DisplayFavos/${userId}/${bookmarkId}/`);
      setSelectedFavorites(response.data); // Update the state with fetched favorites
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  const handleBookmarkSelection = (bookmarkId) => {

    fetchFavorites(bookmarkId);
  };
  

  return (
    
  <div className={`relative ${isSidebarOpen ? 'w-[30%] lg-plus:w-[20%]' : 'w-[30%]  bg-green-900'} p-4`}>

     <div
    ref={sidebarRef}
    className={`overflow-hidden right-[1px]
      
    
     stickySidebar ${isOpen ? 'open ' : 'closed'}`}

  >
      <div className="mb-4">
    <h3 className="font-semibold mb-2 ">Keyword Groups </h3>
      <p className="m-0"></p>
  
  </div>
      <div className="relative w-full    bg-white sidebar-animation">
        <div className="search-container relative ">
          <input
            type="text"
            placeholder="Search..."
            value={searchBookmark}
            onChange={handleSearchBookmark}
            className="search-input pl-10 pr-4 py-2 border mt-4 font-semibold rounded-full w-full"
          />
          <div className="search-icon absolute left-3 top-[65%] transform -translate-y-1/2">
            <FiSearch className="text-gray-700" size={16} />
          </div>
        </div>
        {selectedFavorites ? (
          <FavouriteBookmark
            favorites={selectedFavorites} 
            onBackClick={() => setSelectedFavorites(null)} // Add method to go back to the list
          />
        ) : (
          <BookmarkList
            bookmarks={bookmarks_Display}
            searchBookmark={searchBookmark}
            onBookmarkClick={handleBookmarkSelection}
            averageRanksByBId={averageRanksByBId}
          />
         )} 
      </div>
    </div>
   </div>
  );
};

export default BookmarkSidebar;
