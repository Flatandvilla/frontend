import React, { useState } from 'react';
import { HiMenuAlt1 } from 'react-icons/hi';
import { MdClose } from 'react-icons/md';
import Profile from './Profile';
import { IoMdList } from "react-icons/io";
import { useDispatch } from 'react-redux';
import { toggle_Bookmark } from '../redux/lib/SidebarSlice';
import { useSelector } from 'react-redux';
import { openModall } from '../redux/lib/modalSlice';

const Navbar = ({ toggle, show   }) => {
  const dispatch = useDispatch();

  
  const isSidebarOpen = useSelector((state) => state.SidebarSlice.isOpen);


  return (
    <div className="h-16 flex items-center
     justify-between px-10 bg-white shadow-md fixed inset-0 p-0">
    {/* Welcome message */}
    <div className="flex items-center ">

      {/* Toggle Sidebar Icon */}
      <div className="md:hidden">
        {show ? (
          <MdClose
            size={30}
            className="text-2xl cursor-pointer relative right-[3.5rem] top-1 p-2"
            onClick={toggle}
          />
        ) : (
          <HiMenuAlt1
            className={`text-2xl cursor-pointer ${show ? 'bg-red-900' : ''}`}
            onClick={toggle}
          />
        )}

      </div>
    </div>

    <div className="flex-1  " />
  
    <div onClick={() => dispatch(toggle_Bookmark())} 
      className='mr-4 text-blue '
      style={{cursor:'pointer'}}>
      {isSidebarOpen ? <IoMdList size={25} /> : <IoMdList size={25} />}
    </div>
<div>
  

</div>

    <div>
      <Profile />
    </div>
  </div>
  );
};

export default Navbar;
