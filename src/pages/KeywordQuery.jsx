import React, { useState, useEffect, Fragment } from 'react';
import { Search } from './Search';
import { FaPlus } from 'react-icons/fa'; // Importing an icon
import { useLocation, useNavigate } from 'react-router-dom';
import KeywordTabs from '../components/keywordresearch/components/keyword/KeywordTabs';
import { MdCompareArrows } from "react-icons/md";
import ComparePopUp from '../components/keywordresearch/Searchpopup/ComparePopUp';
import CompareTooltip from '../components/keywordresearch/Searchpopup/CompareTooltip';

const KeywordQuery = () => {
  const navigate = useNavigate();
  const [isHovering, setIsHovering] = useState(false);
  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };
 
  const [isPopupVisible, setIsPopupVisible] = useState(true);
  const location = useLocation();
  const { urlData, keywordData } = location.state || {};

  const openPopup = () => {
    setIsPopupVisible(true);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
    if (!keywordData) {
      navigate(-1);
    }
  };

  // Automatically close the popup when URL data is received
  useEffect(() => {
    if ( keywordData) {
      console.log("Data received:", {  keywordData });
      closePopup(); // Close the popup here
    }
  }, [ keywordData]);
  useEffect(() => {
    if (urlData) {
      console.log("Data received:", {  urlData });
      
      closePopup(); // Close the popup here
    }
  }, [ urlData]);

  const onKeywordAdded = () => {
    closePopup();
  };
const handle=()=>{
 navigate("/searching")
}
  return (
    <div className={`mx-auto absolute z-[10] bg-white h-screen 
    transition-all mt-[4rem]  inset-0 duration-300 ease-in-out `}> 

      {isPopupVisible && (
        <>
      
           
         
          
                    <Search closePopup={closePopup} onKeywordAdded={onKeywordAdded} />
                    </>
         
      )}
       {keywordData &&    
        <KeywordTabs 
      
        />

       } 

   <div className=' justify-between p-[100px]  
      pt-0 space-x-[30px] mt-[1rem]
      flex  
      max-w-screen-2xl mx-auto  
      md:flex-col lg:flex-row
      '>
       
      </div>

      {(
        <div
        className="tooltip-container "
        onMouseEnter={handleMouseEnter}
       onMouseLeave={handleMouseLeave}
      onClick={handle} 
      >
        <FaPlus
        onClick={openPopup}
          className="text-2xl bg-blue text-white rounded-full p-2 
          fixed bottom-[30px] right-[20px] hover:bg-white hover:text-blue
           hover:border-2 hover:border-blue hover:transition ease-in-out delay-30 mt-[100px] cursor-pointer z-[100]"
          size={50}
        />
        <span
          className={` text-blue
           bg-white shadow-md rounded-md p-3 fixed bottom-[40px] z-[100] right-[76px] 
           ${isHovering ? 'block' : 'hidden'}`}
        >
          Add New keyword or Url
        </span>
      </div>
      )}
      



      
<CompareTooltip/>
    </div>
  );
};

export default KeywordQuery;
