
import React, { useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { FaFolder, FaChevronDown, FaFolderOpen, FaEdit, FaSave, FaEye } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { Transition } from '@headlessui/react';
import { FaEllipsisV, FaTrash } from 'react-icons/fa';
import { Menu } from '@headlessui/react';

const BookmarkItem = ({ bookmark, onRename, handleBookmarkClick, isExpanded, averageRank, handleDeleteBookmark }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [newName, setNewName] = useState(bookmark.name);
  const handleRename = () => {
    onRename(bookmark.b_id, newName);
    setIsEditMode(false);
  };

  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };
  const { setNodeRef } = useDroppable({
    id: `bookmark-${bookmark.b_id}`,
    data: { ...bookmark },
  });

  const roundedAverageRank = averageRank ? averageRank.toFixed(1) : '0';



  return (
    <div ref={setNodeRef} className="flex justify-between items-center p-2 text-black bg-white 
    hover:bg-blue-100 rounded-md cursor-pointer">
    
    <button 
    onClick={() => handleBookmarkClick(bookmark.b_id)} className="flex items-center flex-grow">
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
      <div className='flex items-center  '>
      

        <p className="text-gray-500 whitespace-nowrap mr-2">
          [ {roundedAverageRank} ]
        </p>



<Menu as="div" className="relative inline-block text-left   ">
          <Menu.Button as="button" className="inline-flex justify-center rounded-md
            text-sm text-black focus:outline-none">
            <FaEllipsisV className="text-xl" />
          </Menu.Button>
          <Transition
            as={React.Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-[25px]  mt-2  origin-top-right bg-white divide-y z-[10000] w-[100px]
             divide-gray-100 rounded-md shadow-lg focus:outline-none">
              <div className="px-1 py-1  ">
                <Menu.Item>
                  {({ active }) => (
                    <Link to={`/BookmarkDetails/${bookmark.b_id}`} 
                    className={`'text-gray-900'}
                     group flex items-center rounded-md px-2 py-2 text-sm`}>
                      <FaEye className={` mr-2`} aria-hidden="true" />
                      View
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button onClick={() => setIsEditMode(true)} 
                    className={`'text-gray-900'} 
                    group flex items-center rounded-md px-2 py-2 text-sm`}>
                      <FaEdit className={` mr-2`} aria-hidden="true" />
                      Edit
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button onClick={() => handleDeleteBookmark(bookmark.b_id)}
                     className={` text-gray-900
                     group flex items-center rounded-md px-2 py-2 text-sm`}>
                      <FaTrash className={` mr-2`} aria-hidden="true" />
                      Delete
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
};

export default BookmarkItem;




