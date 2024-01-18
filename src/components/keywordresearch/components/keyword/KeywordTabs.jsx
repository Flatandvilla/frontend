

import React, { useState, useEffect } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { useSelector } from "react-redux";
import ContentKeyword from "./ContentKeyword";
import AltQuery from "./AltQuery";
import CaptionQuery from "./CaptionQuery";
import KeywordtableQuery from "./KeywordtableQuery";
import  { CheckboxCustomIcon } from "../../../Checkbox";

  const KeywordTabs = () => {

  const keywordData = useSelector((state) => state.querySlice.data);
  const [selectedKeyword, setSelectedKeyword] = useState('');
  const [selectedTabResultsSample, setSelectedTabResultsSample] = useState([]);
  const [selectedTabAltSample, setSelectedTabAltSample] = useState([]);
  const [selectedTabTextContent, setSelectedTabTextContent] = useState([]);
  const [selectedCount, setSelectedCount] = useState(0); // Add this state

  const [selectedTabsData, setSelectedTabsData] = useState([]);

  const handleCheckboxChange = (tabName, isChecked) => {
    if (isChecked) {
      // Find and add the tab's data
      const tabData = keywordData.find(item => extractNameFromUrl(item.url) === tabName);
      console.log(tabData)
      if (tabData) {
        setSelectedTabsData(prev => [...prev, { tabName, data: tabData }]);
      }
    } else {
      // Remove the tab's data
      setSelectedTabsData(prev => prev.filter(item => item.tabName !== tabName));
    }
  };
  // useEffect(() => {
  //   onSelectionChange(selectedTabsData);
  // }, [selectedTabsData, onSelectionChange]);

  
  const extractNameFromUrl = (url) => {
    return url.replace(/^https?:\/\/(www\.)?/, '').replace(/\..+$/, '');
  };

  // New function to generate unique tab names
  const generateUniqueTabNames = (data) => {
    const nameCount = {};
    return data.map(item => {
      const name = extractNameFromUrl(item.url);
      nameCount[name] = (nameCount[name] || 0) + 1;
      return nameCount[name] > 1 ? `${name}${nameCount[name]}` : name;
    });
  };

  const uniqueTabNames = generateUniqueTabNames(keywordData);
  // useEffect(() => {
  //   console.log("Selected Keyword:", selectedKeyword);
  // }, [selectedKeyword]);



  const initialActiveTab = keywordData && keywordData.length > 0
    ? extractNameFromUrl(keywordData[0].url)
    : "";

  const [activeTab, setActiveTab] = useState(initialActiveTab);

  useEffect(() => {
    if (keywordData && keywordData.length > 0) {
      const firstTabData = keywordData[0];
      setSelectedTabResultsSample(firstTabData.results_sample);
      setSelectedTabAltSample(firstTabData.alt_sample);
      setSelectedTabTextContent(firstTabData.text_content);
      setSelectedCount(firstTabData.count); 

      console.log(firstTabData.text_content)
    }
  }, [keywordData]); // 


  const handleKeywordClick = (keyword) => {
    setSelectedKeyword(keyword);
  
    const selectedKeywordData = keywordData.find(
      (item) => extractNameFromUrl(item.url) === keyword
    );
  
    if (selectedKeywordData) {
      setSelectedTabResultsSample(selectedKeywordData.results_sample);
      setSelectedTabAltSample(selectedKeywordData.alt_sample);
      setSelectedTabTextContent(selectedKeywordData.text_content);
      setSelectedCount(selectedKeywordData.count); 
      // Update the count
    }
  };
  

  if (!keywordData || keywordData.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Tabs value={activeTab} 
      className="max-w-screen-xl mx-auto mt-[30px]  capitalize ">
        <TabsHeader
          className="rounded-none border-b border-blue-gray-50 
          bg-transparent p-0 max-w-screen-lg mx-auto"
          indicatorProps={{
            className:
              "bg-transparent border-b-2 border-blue shadow-none rounded-none ",
          }}
        >
          
          {keywordData.map((item, index) => (
            <Tab
            key={item.url}
            value={uniqueTabNames[index]}
            onClick={() => {
              setActiveTab(uniqueTabNames[index]);
              handleKeywordClick(uniqueTabNames[index]);
            }}
            className={activeTab === uniqueTabNames[index] ? "text-blue font-bold" : ""}
          >
       <div className="flex items-center space-around ">
       <div>
       <CheckboxCustomIcon
  checked={selectedTabsData.some(tabData => tabData.tabName === uniqueTabNames[index])}
  onChange={(e) => handleCheckboxChange(uniqueTabNames[index], e.target.checked)}
/>
        </div>
        <div>
        {uniqueTabNames[index]}

        </div>
       </div>
          </Tab>
        ))}

        </TabsHeader>
        <TabsBody>
          {keywordData.map((item,index) => (
            // <TabPanel key={item.url}

            //   value={extractNameFromUrl(item.url)}>
            <TabPanel key={item.url} value={uniqueTabNames[index]}>
              {/* <div
                className={`mx-auto bg-white h-screen 
    transition-all mt-[4rem] 
       max-w-screen-2xl inset-0 duration-300 ease-in-out `}> */}

                <div className="flex md:justify-between 
       space-x-[30px] mt-[2rem]
      max-w-screen-2xl mx-auto flex-col lg:flex-row">

                  <KeywordtableQuery
                    onKeywordClick={handleKeywordClick}
                    data={selectedTabResultsSample}
                  />
                  <ContentKeyword
                    selectedKeyword={selectedKeyword}
                    resultsSample={selectedTabResultsSample}
                    textContent={selectedTabTextContent}
                    count={selectedCount}
                  />



             
              </div>



              <div className=' justify-between 
      pt-0 space-x-[30px] mt-[1rem]
      flex  
      max-w-screen-2xl mx-auto  
      md:flex-col lg:flex-row
      '>
                <AltQuery
                  altData={selectedTabAltSample}
                />

                <CaptionQuery
                 textContent={selectedTabTextContent} />
              </div>


            </TabPanel>


          ))}
        </TabsBody>
      </Tabs>
    </>
  );
};

export default KeywordTabs;
