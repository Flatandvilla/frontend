

import React from 'react';
import Routes from '../pages/Routes/index';

const Content = ({ show }) => {
  console.log(show)
  // Conditional class for the left margin to accommodate the sidebar
  const marginLeftClass = show ? 'md:ml-[13%]' : 'md:ml-[56px]';

  return (
    <div className={` 
    absolute z-[-10] 
  bg-white h-screen ${marginLeftClass} transition-all   fixed inset-0 
     duration-300 ease-in-out A `}>
      <Routes  />

    </div>
  );
};

export default Content;
