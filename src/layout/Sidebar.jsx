import React, {  useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { sidebarLinks as data } from '../static';
import logo from '../assets/logo/flatandvilla-app-icon.png'
import { GiHamburgerMenu} from 'react-icons/gi';
import useOutsideClick from '../hook/useOutsideClick';
const Sidebar = ({ toggle, show }) => {
  const location = useLocation();
  const sidebarRef = useRef();

  useOutsideClick(sidebarRef, () => {
    if (show) {
      toggle();
    }
  });

 
  return (
 
  <div 
  // ref={sidebarRef}
   className={`h-full z-[100] bg-white border-r-2 border-gray-200 transition-all ease-in-out duration-300 dark:bg-slate
    ${show ? 'md:w-[13%] w-full  fixed top-0 left-0  ' : ' w-full bg-red-900'}`}>

<div>
  <h1 className='uppercase	text-center heading_rank text-blue font-bold  p-4'>Rank Tracker</h1>
  </div>
      {/* <div
        className="absolute top-4 font-bold right-[-45px] bg-blue p-2 
        rounded-full text-white shadow-lg
        cursor-pointer transition-transform duration-300 z-[-100]"
        onClick={toggle}
        style={{
          transform: show ? 'rotate(0deg)' : 'rotate(360deg)', 
        }}
      >
        {show ? (
          <GiHamburgerMenu 
          size={16} />
        ) : (
          <GiHamburgerMenu size={16} />
        )}

      </div> */}
      {/* <div className="logo w-full text-center my-8 text-blue">
        <h1>
          {show ? (
            <div>
              <Link to='/'>
              <img src={logo} alt="flatandvilla" className='w-[6rem] mx-auto text-center ' />
              </Link>

      
            </div>
          ) : (
<div>
  <Link to='/'>
  <img src={logo}  alt="flatandvilla"  className='w-[4rem] mx-auto text-center '/>

  </Link>


</div>
            
          )}
        </h1>
      </div> */}
      {/* Menu Links */}
      <div className="menu flex flex-col gap-1  
      transition-all ease-in-out duration-300 p-2">
  {data.map(({ id, icon, name: title, path }) => (
    <Link
      key={id}
      to={path}
      className={`${
        location.pathname === path
          ? 'border-r-2 border-blue   font-bold '
          : 'text-blue'
      } hover:border-r-2 border-blue hover:shadow-md  hover:text-blue  py-2
       flex items-center`}
    >
      {show && <div className="title ml-2  ">{title}</div>}
    </Link>
  ))}
</div>

    </div>
  );
};

export default Sidebar;

