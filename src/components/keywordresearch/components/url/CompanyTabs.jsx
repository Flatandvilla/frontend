import React, { useState } from "react";
import KeywordsTable from "./KeywordsTable";
import ArticleContent from "./ArticleContent";
import { useSelector } from "react-redux";

const CompanyTabs = () => {
  const [selectedKeyword, setSelectedKeyword] = useState('');
  const urlData = useSelector(state => state.UrlSlice.data);

  const handleKeywordClick = (keyword) => {
    setSelectedKeyword(keyword);
  };

  if (!urlData) {
    return <div>Loading...</div>;
  }



  return (
    <>
        
      

      <div className="flex md:justify-between mt-[2rem]
       px-[100px] space-x-[30px] 
      max-w-screen-2xl mx-auto flex-col lg:flex-row">

        {urlData && (
          <>
            <KeywordsTable 
              onKeywordClick={handleKeywordClick}
              data={urlData.results_sample}
            />
            <ArticleContent
              selectedKeyword={selectedKeyword}
            />
          </>
        )}
      </div>
      
    </>
  );
};

export default CompanyTabs;
