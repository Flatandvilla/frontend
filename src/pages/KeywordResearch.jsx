

import React, { useState, useEffect, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Search } from '../components/keywordresearch/Searchpopup/Search';
import CompanyTabs from '../components/keywordresearch/components/url/CompanyTabs';
import AltTable from '../components/keywordresearch/components/url/AltTable';
import CaptionTable from '../components/keywordresearch/components/url/CaptionTable';
import { FaPlus } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import KeywordTabs from '../components/keywordresearch/components/keyword/KeywordTabs';

const KeywordResearch = ({ show }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(true);
  const cancelButtonRef = React.useRef(null);
  const location = useLocation();
  // const { urlData, keywordData } = location.state || {};
  const navigate = useNavigate();
  const [keywordData, setKeywordData] = useState(null);
  const [urlData, setUrlData] = useState(null);
  const [lastSubmittedData, setLastSubmittedData] = useState(null);
  const [keywordDataArray, setKeywordDataArray] = useState([]);
const [urlDataArray, setUrlDataArray] = useState([]);

  const openPopup = () => {
    setIsPopupVisible(true);
  };

  const handleDataSubmit = (data) => {
    // Store the data in local storage
    localStorage.setItem('lastSubmittedData', JSON.stringify(data));
  
  };
  const closePopup_keyword = () => {
    setIsPopupVisible(false);
    if (!keywordData) {
      // Get the previous data from local storage
      const previousKeywordData = localStorage.getItem('keywordData');
      if (previousKeywordData) {
        // Parse the string back to an object
        const parsedKeywordData = JSON.parse(previousKeywordData);
        // Set the previous data
        setKeywordData(parsedKeywordData);
      } else {
      //  navigate(-1); // Navigate back if no data is available
      }
    }
  };

  const closePopup_url = () => {
    setIsPopupVisible(false);
    if (!urlData) {
      // Get the previous data from local storage
      const previousUrlData = localStorage.getItem('urlData');
      if (previousUrlData) {
        // Parse the string back to an object
        const parsedUrlData = JSON.parse(previousUrlData);
        // Set the previous data
        setUrlData(parsedUrlData);
      } else {
        //  navigate(-1); // Navigate back if no data is available
      }
    }
  };



  useEffect(() => {
    // Get the keyword data from local storage when the component mounts
    const storedKeywordData = localStorage.getItem('keywordData');
    if (storedKeywordData) {
      // Parse the string back to an object
      const parsedKeywordData = JSON.parse(storedKeywordData);
      // Set the keyword data
      setKeywordData(parsedKeywordData);
    }
  
   
  }, []);

useEffect(()=>{
   // Get the URL data from local storage when the component mounts
   const storedUrlData = localStorage.getItem('urlData');
   if (storedUrlData) {
     // Parse the string back to an object
     const parsedUrlData = JSON.parse(storedUrlData);
     // Set the URL data
     setUrlData(parsedUrlData);
   }
},[])
 
  useEffect(() => {
    if (keywordData ) {
      closePopup_keyword(); 
      handleDataSubmit(keywordData);
  
    }
  }, [keywordData]);
  useEffect(() => {
    if (urlData) {
      closePopup_url(); // Close the popup if data is received
      handleDataSubmit(urlData); 

    }
  }, [ urlData]);
  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };
  const closePopup=()=>{
    closePopup_url();
      closePopup_keyword();
  }
  useEffect(() => {
    // Get the last submitted data from local storage when the component mounts
    const lastSubmittedData = localStorage.getItem('lastSubmittedData');
    console.log(lastSubmittedData + "kfkkfk")
    if (lastSubmittedData) {
      // Parse the string back to an object
      const parsedData = JSON.parse(lastSubmittedData);
      // Set the last submitted data
      setLastSubmittedData(parsedData);
    }
  }, []);

  useEffect(() => {
    if (keywordData) {
      setKeywordDataArray(prevArray => [...prevArray, keywordData]);
    }
  }, [keywordData]);
  
  useEffect(() => {
    if (urlData) {
      setUrlDataArray(prevArray => [...prevArray, urlData]);
    }
  }, [urlData]);
  
  return (

    <div className={`mx-auto absolute z-[-10] bg-white h-screen 
    transition-all mt-[4rem]  inset-0 duration-300 ease-in-out `}> 

      {isPopupVisible && (
        <Transition.Root 
        show={true} as={Fragment}>
       
          <Dialog as="div" className="relative z-10 p-[30px]" 
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
                    

<Search 
  closePopup={closePopup} 

/>
</Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      )}

  


{urlData && (
        <>
          <CompanyTabs urlData={urlData} />
          <div className='justify-between p-[100px]
           pt-0 space-x-[30px] mt-[1rem] flex max-w-screen-2xl mx-auto md:flex-col lg:flex-row'>
            <AltTable urlData={urlData} />
            <CaptionTable urlData={urlData} />
          </div>
        </>
      )} 
     
   
      {keywordDataArray.length > 0 && <KeywordTabs data={keywordDataArray[keywordDataArray.length - 1]} />}

      
{!urlData && !keywordData && (
  <div className="flex justify-center items-center h-full" style={{ backgroundColor: 'white', padding: '20px' }}>
    <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}
    className='text-blue'
    >No Data Available Please Add Keyword or Url !</h2>
  </div>
)}


      {!isPopupVisible && (
        <div className="tooltip-container" 
        onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={openPopup}>
<FaPlus className="text-2xl bg-blue text-white 
rounded-full p-2 fixed bottom-[30px] right-[20px] 
hover:bg-white hover:text-blue hover:border-2 hover:border-blue 
hover:transition ease-in-out delay-30 mt-[100px] cursor-pointer" 
size={50} />
<span className={`tooltip-text text-blue bg-white 
shadow-md rounded-md p-3 fixed bottom-[40px] right-[76px] ${isHovering ? 'block' : 'hidden'}`}>
Add New keyword or Url
</span>
</div>
)}


</div>
);
};

export default KeywordResearch;