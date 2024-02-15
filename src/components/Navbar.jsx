import { HiMenuAlt1 } from 'react-icons/hi';
import { MdClose } from 'react-icons/md';
import Profile from './Profile';
import { IoMdList } from "react-icons/io";
import { useDispatch } from 'react-redux';
import { toggle_Bookmark } from '../redux/lib/SidebarSlice';
import { useSelector } from 'react-redux';
import * as XLSX from 'xlsx';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // Updated import
import { IoIosArrowBack } from 'react-icons/io'; // Import an arrow icon for the back button
import {FaCog} from 'react-icons/fa';
import { MdArrowBack } from "react-icons/md";

//  import DarkModeToggle from './DarkMode/DarkModeToggle';
import {FaDownload,FaUpload} from 'react-icons/fa'
import { useState } from 'react';
import axios from 'axios';
import BookmarkSidebar from './Bookmark/BookmarkSidebar';
const Navbar = ({ toggle, show   }) => {
  const navigate = useNavigate(); // Initialize useNavigate hook
 const dispatch=useDispatch()
  const goBack = () => navigate(-1); 
  const tableData = useSelector((state) => state.tableSlice.data);
  const userId = useSelector(state => state?.authSlice?.id);

  const [filteredData, setFilteredData] = useState(tableData);
  const isSidebarOpen = useSelector((state) => state.SidebarSlice.isOpen);

  const [isHover, setIsHover] = useState(false);
  const [is_Hover_, set_Is_Hover] = useState(false);
  const handle_Mouse_Enter = () => set_Is_Hover(true);
  const handle_Mouse_Leave = () => set_Is_Hover(false);

  const handleMouse_Enter = () => setIsHover(true);
  const handleMouse_Leave = () => setIsHover(false);
  const [isHovering, setIsHovering] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create FormData and append the file
      const formData = new FormData();
      formData.append('file', file);
  
      // Upload the Excel file directly
      await uploadFile(formData);
    } else {
      toast.error('Please select an Excel file.');
    }
  };
  const triggerFileInput = () => {
    document.getElementById('excelFileInput').click();
  };
  
  const fetchDataFromApi
   = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/userRankExcel/${userId}/`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
      toast.error(error)
    }
  };

  const exportToExcel = async () => {
    try {
      const data = await fetchDataFromApi(); // Fetch data from API
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
      XLSX.writeFile(workbook, 'ExportedData.xlsx');
    } catch (error) {
      console.error('Error exporting to Excel:', error);
     
    }
  };
  const uploadFile = async (formData) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/upload/${userId}/`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
  
      if (response.status === 200 || response.status === 201) {
        // Assuming the server responds with the newly added data
        const newData = response.data;
        console.log(newData)
  
        // Update state by appending new data
        setFilteredData(currentData => [ ...newData,...currentData]);
  
        toast.success('Data imported successfully!');
      } else {
        toast.error('Failed to import data');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Error uploading file');
    }
  };

  return (
    <div className="h-16 flex items-center
     justify-between px-10 bg-white  
     border-b-2 border-gray fixed inset-0 p-0 dark:bg-slate">
    {/* Welcome message */}
    <div className="flex ml-[12%] ">
  <button 
    onClick={goBack} 
    className="flex items-center justify-center text-center p-2 rounded-full
     text-blue hover:bg-gray-200 hover:text-black transition-colors duration-150 ease-in-out"
    aria-label="Go back">
    <MdArrowBack size={20} />
  </button>



        </div>
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
 
  <div className="flex-1  " />

  <div>
      <div 
       
       className="flex justify-end items-center p-4">
        <button 
       
       className="flex items-center justify-center mr-2 bg-blue-500 
       hover:bg-blue hover:text-white text-blue font-bold py-2 px-4 rounded transition duration-150 ease-in-out"
       onMouseEnter={handleMouse_Enter} onMouseLeave={handleMouse_Leave}
       onClick={exportToExcel}

        >
          <FaDownload

           className="mr-2" /> Export
       
        </button>

        <button 
          
          className="flex items-center justify-center mr-2 bg-blue-500 
          hover:bg-blue hover:text-white text-blue font-bold py-2 px-4 rounded transition duration-150 ease-in-out"
          onMouseEnter={handle_Mouse_Enter}
       onMouseLeave={handle_Mouse_Leave}
       onClick={triggerFileInput}

          >
          <FaUpload 

          className="mr-2" />
          Import
        </button>

        <input
          type="file"
          id="excelFileInput"
          style={{ display: 'none' }}
          onChange={handleFileChange}

          accept=".xlsx, .xls"
        />
      </div>

      {/* The rest of your component's rendering */}
    </div>

    




    <div className='flex space-x-4'>
    {/* <button 
        className="lg-plus:hidden inline-flex p-2 rounded-full hover:bg-gray-200 transition-colors duration-150 ease-in-out"
        aria-label="Settings"
        onClick={toggleSidebar} // Dispatch the toggle action on click
      >
        <FaCog size={24} />
      </button> */}

<div onClick={() => dispatch(toggle_Bookmark())} 
      className='mr-4 text-blue  lg-plus:hidden inline-flex absolute right-[55px] top-[0.7rem]'
      style={{cursor:'pointer'}}>
      {isSidebarOpen ? <IoMdList size={25} /> : <IoMdList size={25} />}

    </div>

  
    {/* <DarkModeToggle/> */}
      <Profile />
  
    </div>
  </div>
  );
};

export default Navbar;
