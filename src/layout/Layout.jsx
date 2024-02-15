import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Content from './Content';
import Sidebar from './Sidebar';

const Layout = () => {
  const [show, setShow] = useState(true);

  const toggle = () => {
    setShow(!show);
  };
  const [isModalOpenn, setIsModalOpenn] = useState(false); // State to control the modal
  const toggleModal = () => {
    setIsModalOpenn(!isModalOpenn); // Function to toggle the modal
  };


  return (
    <div className="mx-auto flex inset-0 relative bg-white " >   
       {/* Sidebar */}
      <Sidebar toggle={toggle} show={show} />

      {/* Main Content */}
      <div 
      className={`flex-grow  w-full`}>
        {/* Navbar */}
        <Navbar toggle={toggle} show={show} onIconClick={toggleModal} />

        {/* Content */}
       
        <Content show={show}/>

      </div>
    </div>
  );
};

export default Layout;
