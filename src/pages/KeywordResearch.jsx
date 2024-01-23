

import React, { useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Search } from './Search';
import CompanyTabs from '../components/keywordresearch/components/url/CompanyTabs';
import AltTable from '../components/keywordresearch/components/url/AltTable';
import CaptionTable from '../components/keywordresearch/components/url/CaptionTable';
import { FaPlus } from 'react-icons/fa'; // Importing an icon
import { useLocation, useNavigate } from 'react-router-dom';

const KeywordResearch = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isCachedDataVisible, setIsCachedDataVisible] = useState(false); // Added state for cached data visibility

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleFormSubmit = () => {
    setIsFormSubmitted(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const cancelButtonRef = React.useRef(null);
  const location = useLocation();
  const { urlData, keywordData } = location.state || {};
  const navigate = useNavigate();


  const openPopup = (type) => {
    navigate("/search")
    setIsPopupVisible(true);
  };
  
  
  const closePopup = () => {
    console.log("Hello")
      setIsPopupVisible(false);
     
    
  };

  useEffect(() => {
    if (keywordData) {
      closePopup(); // Close the popup here
    }
  }, [keywordData]);

  useEffect(() => {
    if (urlData) {
      closePopup(); // Close the popup here
    }
  }, [urlData]);

 


  useEffect(() => {
    // Load cached state when the component mounts
    const cachedUrlData = localStorage.getItem('urlData');
    if (cachedUrlData) {
      const urlData = JSON.parse(cachedUrlData);
      setIsCachedDataVisible(true); // Show cached data
    }
  }, []);

  useEffect(() => {
    // Save urlData to cache when it changes
    if (urlData) {
      localStorage.setItem('urlData', JSON.stringify(urlData));
    }
  }, [urlData]);

  const onKeywordAdded = () => {
    closePopup();
  };
  
  return (
<div className={`mx-auto absolute 
z-[-10] bg-white h-screen transition-all
 mt-[4rem] inset-0 duration-300 ease-in-out`}>
      {isPopupVisible && (
        <Search
          closePopup={closePopup}
          onKeywordAdded={onKeywordAdded}
          onFormSubmit={handleFormSubmit}
          showCachedData={false}
          canClose={true}
        />
      )}

      {urlData &&<CompanyTabs />}
      <div className='justify-between p-[100px] pt-0 space-x-[30px] mt-[1rem] flex max-w-screen-2xl mx-auto md:flex-col lg:flex-row'>
        {urlData && <AltTable />}
        {urlData &&  <CaptionTable />}
      </div>
     
      {!isPopupVisible && (
        <div
          className="tooltip-container"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={openPopup}
        >
          <FaPlus
            className="text-2xl bg-blue text-white rounded-full p-2 fixed bottom-[30px] right-[20px] hover:bg-white hover:text-blue hover:border-2 hover:border-blue hover:transition ease-in-out delay-30 mt-[100px] cursor-pointer"
            size={50}
          />
          <span
            className={`tooltip-text text-blue bg-white shadow-md rounded-md p-3 fixed bottom-[40px] right-[76px] ${isHovering ? 'block' : 'hidden'}`}
          >
            Add New keyword or Url
          </span>
        </div>
      )}
    </div>
  );
};

export default KeywordResearch;
