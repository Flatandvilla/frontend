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
  ref={sidebarRef}
   className={`min-h-screen z-[100] bg-white shadowsidebar transition-all ease-in-out duration-300 dark:bg-slate
    ${show ? 'w-full md:w-64  fixed top-0 left-0  ' : ' md:block fixed '}`}>


      <div
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

      </div>
      <div className="logo w-full text-center my-8 text-blue">
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
      </div>
      {/* Menu Links */}
      <div className="menu flex flex-col gap-4 transition-all ease-in-out duration-300 p-2">
  {data.map(({ id, icon, name: title, path }) => (
    <Link
      key={id}
      to={path}
      // Removed the onClick attribute
      className={`${
        location.pathname === path
          ? 'bg-blue text-white'
          : 'text-blue'
      } hover:bg-blue hover:shadow-md transition-all
       ease-in-out duration-300 hover:text-white rounded-[10px] py-2
       flex items-center`}
    >
      <div className="w-14 h-8 flex items-center justify-center">{icon}</div>
      {show && <div className="title ml-2">{title}</div>}
    </Link>
  ))}
</div>

    </div>
  );
};

export default Sidebar;

