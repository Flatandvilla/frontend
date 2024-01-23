
import React, { useEffect, useRef, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookmarks } from '../../redux/lib/displayBookmarks';
import BookmarkList from './BookmarkList';
import axios from 'axios';
import FavouriteBookmark from './FavouriteBookmark';
import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import useOutsideClick from '../../hook/useOutsideClick';
const BookmarkSidebar = ( {isOpen,onClose,averageRank,folderRanks }) => {
  console.log(averageRank)
  const [showFavorites, setShowFavorites] = useState(false);
  const [selectedFavorites, setSelectedFavorites] = useState([]);
  const userId = useSelector((state) => state?.authSlice?.user?.id);
  const sidebarRef = useRef();
  const [averageRanksByBId, setAverageRanksByBId] = useState({});

  const [searchBookmark, setSearchBookmark] = useState('');
  const dispatch = useDispatch();
  const bookmarks_Display = useSelector((state) => state.displayBookmarkSlice.bookmarks);

  useOutsideClick(sidebarRef, () => {
    if (isOpen) {
      console.log("Outside click detected. Closing sidebar...");
      onClose();
    }
  });
  
  useEffect(() => {
    dispatch(fetchBookmarks());
  }, [dispatch]);

  const handleSearchBookmark = (e) => {
    const bookmark = e.target.value;
    setSearchBookmark(bookmark);
  };

  const fetchFavorites = async (bookmarkId) => {
    const baseUrl = process.env.REACT_APP_BASE_URL;

    try {

      const response = await axios.get(`http://192.168.0.175:8002/api/DisplayFavos/${userId}/${bookmarkId}/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching favorites:', error);
      return [];
    }
  };
  
  
  const handleBookmarkSelection = async (bookmarkId) => {
    const favoritesData = await fetchFavorites(bookmarkId);
    setSelectedFavorites(favoritesData);
    setShowFavorites(true);
  };

  const handleBackToBookmarks = () => {
    setShowFavorites(false);
  };

  // Update the average rank when folderRanks change
  useEffect(() => {
    const newAverageRanks = {};

    Object.keys(folderRanks).forEach((b_id) => {
      const ranks = folderRanks[b_id] || [];
      newAverageRanks[b_id] = ranks.length
        ? ranks.reduce((sum, rank) => sum + rank, 0) / ranks.length
        : 0;
    });
    console.log(newAverageRanks)

    setAverageRanksByBId(newAverageRanks);
  }, [folderRanks]);
  return (
<div  ref={sidebarRef} className={` fixed top-[30px]  bookmark-sidebar right-[1px]  bg-white
 md:w-[35%]  lg:w-[20%]   z-[100]   ${isOpen ? 'open ' : 'closed'}`}  >
      <div className=" relative w-full p-4 bg-white   sidebar-animation">
        <div className="search-container relative mt-3">
          <input
            type="text"
            placeholder="Search Bookmarks"
            value={searchBookmark}
            onChange={handleSearchBookmark}
            className="search-input pl-10 pr-4 py-2
           border mt-4 font-semibold rounded-full w-full"
          />
          <div className="search-icon absolute left-3 
          top-[65%] transform -translate-y-1/2">
            <FiSearch className="text-gray-700 " size={16} />
          </div>
        </div>
        <Disclosure as="div" className="mt-4">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex justify-between w-full px-2 py-1  text-sm font-medium text-left
               text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200 
               focus:outline-none focus-visible:ring 
               focus-visible:ring-gray-500 focus-visible:ring-opacity-75">
                <span>{showFavorites ? 'Favorites' : 'All Bookmarks'}</span>
                <ChevronDownIcon
                  className={`${open ? 'transform rotate-180' : ''} w-5 h-5 text-blue`}
                />

              </Disclosure.Button>
              <Disclosure.Panel className=" text-sm text-gray-500">
              {showFavorites ? (
  <FavouriteBookmark 
    favorites={selectedFavorites}
    onBackClick={handleBackToBookmarks}
  />
) : (
  <BookmarkList
    bookmarks={bookmarks_Display}
    searchBookmark={searchBookmark}
    onBookmarkClick={handleBookmarkSelection}
    averageRanksByBId={averageRanksByBId}

    
  />
)}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
   
    </div>
  );
};

export default BookmarkSidebar;

