
import React, { useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { FaFolder, FaChevronDown, FaFolderOpen, FaTrash, FaEdit, FaSave, FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const BookmarkItem = ({ bookmark, onRename, handleBookmarkClick, isExpanded, averageRank, handleDeleteBookmark }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [newName, setNewName] = useState(bookmark.name);
  const handleRename = () => {
    onRename(bookmark.b_id, newName);
    setIsEditMode(false);
  };

  const { setNodeRef } = useDroppable({
    id: `bookmark-${bookmark.b_id}`,
    data: { ...bookmark },
  });

  const roundedAverageRank = averageRank ? averageRank.toFixed(1) : '0';
  return (
    <div ref={setNodeRef} className="flex justify-between items-center p-2 text-black bg-white hover:bg-blue-100 rounded-md cursor-pointer">
      <button onClick={() => handleBookmarkClick(bookmark.b_id)} className="flex items-center flex-grow">
        {isExpanded ? (
          <>
            <FaChevronDown className="mr-2" />
            <FaFolderOpen className="text-yellow-500" />
          </>
        ) : (
          <>
            <div className='flex items-center justify-center'>
              <FaFolder className="text-yellow-500 mr-2" />
              {isEditMode ? (
                <input
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="text-gray-700 font-semibold flex-grow"
                  autoFocus
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleRename();
                    }
                  }}
                />
              ) : (
                <span className="text-gray-700 font-semibold flex-grow ">
                  {bookmark.name}
                </span>
              )}
            </div>
          </>
        )}
      </button>
      <div className='flex items-center '>
        {/* Add the FaEye icon for showing details */}
      

        <p className="text-gray-500 whitespace-nowrap mr-2">
          ( {roundedAverageRank} )
        </p>
        <FaTrash className="text-red-500 cursor-pointer"
         onClick={() => handleDeleteBookmark(bookmark.b_id)} />
        {isEditMode ? (
          <button onClick={handleRename} className="ml-2">
            <FaSave className="text-green-700" />
          </button>
        ) : (
          <FaEdit  className="ml-2 cursor-pointer text-green-700" onClick={() => setIsEditMode(true)} />
        )}
          
          <Link to={`/BookmarkDetails/${bookmark.b_id}`}>
          <FaEye className="text-blue cursor-pointer ml-2" />
        </Link>

      </div>
    </div>
  );
};

export default BookmarkItem;
