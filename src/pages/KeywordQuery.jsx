import React, { useState, useEffect, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Search } from '../components/keywordresearch/Searchpopup/Search';
import { FaPlus } from 'react-icons/fa'; // Importing an icon
import { useLocation, useNavigate } from 'react-router-dom';
import KeywordTabs from '../components/keywordresearch/components/keyword/KeywordTabs';
import { MdCompareArrows } from "react-icons/md";
const KeywordQuery = () => {
  // const [isHovering, setIsHovering] = useState(false);
 const [lastSubmittedData, setLastSubmittedData] = useState(null);

  const handleDataSubmit = (data) => {
    // Store the data in local storage
    localStorage.setItem('lastSubmittedData', JSON.stringify(data));
  
  };
  // const handleMouseEnter = () => {
  //   setIsHovering(true);
  // };

  // const handleMouseLeave = () => {
  //   setIsHovering(false);
  // };
  const [selectedTabsData, setSelectedTabsData] = useState([]);

  const handleSelectionChange = (selected) => {
    console.log(selected)
    setSelectedTabsData(selected);
  };

  const handleCompareClick = () => {
    navigate('/Comparequery', { state: { selectedTabsData } });
  };

  const [isHovering, setIsHovering] = useState(false);
  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };
  const [is_Hovering, set_IsHovering] = useState(false);
  const handle_MouseEnter = () => {
    set_IsHovering(true);
  };

  const handle_MouseLeave = () => {
    set_IsHovering(false);
  };
  const [isPopupVisible, setIsPopupVisible] = useState(true);
  const cancelButtonRef = React.useRef(null);
  const location = useLocation();
  const { urlData, keywordData } = location.state || {};
  const navigate = useNavigate();

  const openPopup = () => {
    setIsPopupVisible(true);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
    // if (!keywordData) {
    //   navigate(-1);
    // }
  };

  // Automatically close the popup when URL data is received
  useEffect(() => {
    if ( keywordData) {
      console.log("Data received:", {  keywordData });
      closePopup(); // Close the popup here
      handleDataSubmit(keywordData);

    }
  }, [ keywordData]);


  useEffect(() => {
    if (urlData) {
      console.log("Data received:", {  urlData });
      closePopup(); 
      handleDataSubmit(urlData);

    }
  }, [ urlData]);

  const onKeywordAdded = () => {
    closePopup();
  };
  
  useEffect(() => {
    // Get the last submitted data from local storage when the component mounts
    const lastSubmittedData = localStorage.getItem('lastSubmittedData');
  
    if (lastSubmittedData) {
      // Parse the string back to an object
      const parsedData = JSON.parse(lastSubmittedData);
  
      // Set the last submitted data
      setLastSubmittedData(parsedData);
    }
  }, []);
  return (
    <div className={`mx-auto absolute z-[-10] bg-white h-screen 
    transition-all mt-[4rem]  inset-0 duration-300 ease-in-out `}> 

      {isPopupVisible && (
        <Transition.Root show={true} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10 p-[30px]"
            initialFocus={cancelButtonRef}
            onClose={closePopup}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-100"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-0 transition-opacity" />
            </Transition.Child>
            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center text-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden bg-white rounded-lg text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-xl p-[30px]">
                    <Search closePopup={closePopup} onKeywordAdded={onKeywordAdded} />
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      )}
        {keywordData &&    
        <KeywordTabs 
        // onSelectionChange={handleSelectionChange} 
        />
       } 


   <div className=' justify-between p-[100px]  
      pt-0 space-x-[30px] mt-[1rem]
      flex  
      max-w-screen-2xl mx-auto  
      md:flex-col lg:flex-row
      '>
       
      </div>
      {!keywordData && (
  <div className="flex justify-center items-center h-full">
    <h2>No data available</h2>
  </div>
)}
      {(
        <div
        className="tooltip-container"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={openPopup} // This will open the popup when the tooltip is clicked
      >
        <FaPlus
          onClick={openPopup} // Assuming you want to open the popup on clicking the icon as well
          className="text-2xl bg-blue
           text-white rounded-full p-2 
          fixed bottom-[30px] right-[20px] 
          hover:bg-white hover:text-blue
           hover:border-2 hover:border-blue hover:transition ease-in-out delay-30 mt-[100px] cursor-pointer"
          size={50}
        />
        <span
          className={`tooltip-text text-blue
           bg-white shadow-md rounded-md p-3 fixed bottom-[40px] z-[100] right-[76px] ${isHovering ? 'block' : 'hidden'}`}
        >
          Add New keyword or Url
        </span>
      </div>
      )}

{/* 
<div
          className="tooltip-container"
          onMouseEnter={handle_MouseEnter}
          onMouseLeave={handle_MouseLeave}
          onClick={handleCompareClick} // Click event to handle comparison

       
        >
          <MdCompareArrows 

            className="text-2xl bg-blue text-white rounded-full p-2 
            fixed bottom-[100px] right-[20px] hover:bg-white hover:text-blue 
            hover:border-2 hover:border-blue hover:transition ease-in-out delay-30 
            mt-[100px] cursor-pointer"
            size={50}
          />
          <span
            className={`tooltip-text text-blue bg-white 
            shadow-md rounded-md p-3 fixed bottom-[1000px] right-[76px]
             ${is_Hovering ? 'block' : 'hidden'}`}
          >
            select keyword
          </span>
        </div> */}
    </div>
  );
};

export default KeywordQuery;
