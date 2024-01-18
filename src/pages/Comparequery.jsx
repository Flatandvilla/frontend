import React from 'react';
import { useLocation } from 'react-router-dom';
import KeywordtableQuery from '../components/keywordresearch/components/keyword/KeywordtableQuery';

const Comparequery = () => {
    const location = useLocation();
    const { selectedTabsData } = location.state || {};
  
    if (!selectedTabsData || selectedTabsData.length === 0) {
      return <div>No tabs selected for comparison.</div>;
    }
  
    return (

    <div className='mt-[50px] '>
        <h2 className='font-semibold text-xl'>Comparison of :</h2>
        {selectedTabsData.map((tabData, index) => (
          <div key={index}>
            <h3 className='text-center mx-auto mb-[1rem] capitalize font-semibold'>{tabData.tabName}</h3>
            <div className='flex  items-center justify-center mx-auto'>
            <KeywordtableQuery 
              data={tabData.data.results_sample}

              />
                </div>

          </div>
        ))}
      </div>
    );
  };
export default Comparequery;