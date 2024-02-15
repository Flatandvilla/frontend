
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { FaArrowLeft, FaArrowRight, FaSearch } from 'react-icons/fa'; // Import FaSearch for the magnifier icon

const ComparePage = () => {
  const location = useLocation();
  const { comparisonData } = location.state || {};
  const domainNameStep1 = comparisonData.domainNameStep1;
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const filterData = (data) => {
    return data.filter((row) => row.keyword.toLowerCase().includes(searchTerm.toLowerCase()));
  };

  const enhanceAndFilterData = (data) => {
    // Assume enhanceDataWithAllKeywordsAndCompare function is defined elsewhere and correctly enhances the data
    let [enhancedParentData, ...enhancedChildrenData] = enhanceDataWithAllKeywordsAndCompare(data.parentData, ...data.childrenData);
    if (searchTerm) {
      enhancedParentData = filterData(enhancedParentData);
      enhancedChildrenData = enhancedChildrenData.map(childData => filterData(childData));
    }
    return [enhancedParentData, ...enhancedChildrenData];
  };

  const enhanceDataWithAllKeywordsAndCompare = (parentData, ...childrenData) => {
    const allKeywordsSet = new Set();
    [parentData, ...childrenData].forEach(selection =>
      selection.forEach(item => allKeywordsSet.add(item.keyword))
    );

    const allKeywords = Array.from(allKeywordsSet);

    const prepareData = (data, compareWith = null) => {
        return allKeywords.map(keyword => {
          const foundItem = data.find(item => item.keyword === keyword);
          const compareItem = compareWith?.find(item => item.keyword === keyword);
          return {
            keyword,
            count: foundItem ? foundItem.count : '-', // Ensure count is '-' if foundItem is undefined
            difference: compareWith ? (foundItem && compareItem ? foundItem.count - compareItem.count : '-') : undefined
          };
        });
      };
      

    const enhancedParentData = prepareData(parentData);
    const enhancedChildrenData = childrenData.map(childData => prepareData(childData, parentData));

    return [enhancedParentData, ...enhancedChildrenData];
  };

  // Assuming comparisonData is structured correctly
  const parentData = comparisonData?.step1ResultSample || [];
  const childrenData = comparisonData?.step2ResultsSample || []; // Assume this is an array of arrays

  // const [enhancedParentData, ...enhancedChildrenData] = enhanceDataWithAllKeywordsAndCompare(parentData, ...childrenData);

  const [enhancedParentData, ...enhancedChildrenData] = enhanceAndFilterData({
    parentData: comparisonData?.step1ResultSample || [],
    childrenData: comparisonData?.step2ResultsSample || []
  });

let columns = [
  { 
    name: 'Keyword', 
    cell: row => {
      const keyword = row.keyword;
      return keyword.length > 20 ? (
        <div className="tooltip">
          {`${keyword.substring(0, 20)}...`} {/* Show ellipsis for overflow */}
          <span className="tooltiptext">{keyword}</span>
        </div>
      ) : (
        <span>{keyword}</span>
      );
    },
    sortable: true,
  },
  { name: 'Count', selector: row => row.count, sortable: true },
];

  // Add a 'Difference' column dynamically for child tables
  const differenceColumn = {
    name: 'Difference',
    selector: row => typeof row.difference !== 'undefined' ? row.difference : '',
    sortable: true,
  };
  
  const totalItems = 1 + enhancedChildrenData.length;

  // Dynamically determine grid container class
  let gridContainerClass = "grid gap-1 ";
  if (totalItems < 3) {
    gridContainerClass += "md:grid-cols-2 justify-center"; // Adjust for fewer than 3 items
  } else if (totalItems < 4) {
    gridContainerClass += "md:grid-cols-3 justify-center"; // Adjust for fewer than 4 items
  } else {
    gridContainerClass += "md:grid-cols-4"; // Default for 4 or more items
  }


  const onPrev=()=>{
    // This assumes your pagination buttons can be selected by a class or other attribute, like data-id="pagination-next-page"
    document.querySelectorAll('#pagination-previous-page').forEach(button => {
      button.click();
    });
    
  }

  const onNext=()=>{
    // This assumes your pagination buttons can be selected by a class or other attribute, like data-id="pagination-next-page"
document.querySelectorAll('#pagination-next-page').forEach(button => {
  button.click();
});

  }
  return (
    <div className='lolo'>
 <div className="mx-auto p-6 ">
    <h1 className="text-xl font-semibold mb-4">Comparison Results</h1>


{/* <div className="relative mb-3 mt-[10px]">
  <input
    type="text"
    placeholder="Search by keyword"
    value={searchTerm}
    onChange={handleSearchChange}
    className="border p-3 pl-10 rounded w-[20%]  flex items-center justify-center"
  />
  <FaSearch
    className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 bg-blue"
    size={20}
  />
</div> */}

<div className="relative mb-3 mt-[10px] ">
  <input
    type="text"
    placeholder="Search by keyword"
    value={searchTerm}
    onChange={handleSearchChange}
    className="border p-3 pl-10 rounded lg-plus:w-[25%] w-[50%] flex items-center justify-center"
  />
  <FaSearch
    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
    size={20}
  />
</div>


    <div className={gridContainerClass}>

      <div>
      <h2 className="text-lg  heading_key px-[20px]  text-center font-bold  bg-gray-200  rounded-md "> {domainNameStep1}</h2>
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <DataTable 
          columns={columns} 
          data={enhancedParentData}
          pagination 
          paginationPerPage={15}
          paginationRowsPerPageOptions={[15,20,50,100]} />
        </div>
      </div>
      


{enhancedChildrenData.map((data, index) => (
  <div key={index}>
    <h2 className=" heading_key text-lg  px-[20px] text-center font-bold bg-gray-200 rounded-md ">
       {comparisonData.domainNamesStep2 && comparisonData.domainNamesStep2.length > index ? comparisonData.domainNamesStep2[index] : 'N/A'}
    </h2>
    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
      <DataTable 
        columns={[...columns, differenceColumn]} 
        data={data} 
        pagination 
        paginationPerPage={15} 
        paginationRowsPerPageOptions={[15,20,50,100]} />
    </div>
  </div>
))}



    </div>
  </div>
  <div className="flex justify-center    ">
      <button onClick={onPrev} className=" m-3 p-2 rounded-full hover:bg-gray-300
       bg-gray-200 transition-colors duration-150 text-blue ">
        <FaArrowLeft size={20} />
      </button>
      <button onClick={onNext} className="m-3 p-2 rounded-full hover:bg-gray-300 
       bg-gray-200 transition-colors duration-150 text-blue ">
        <FaArrowRight   size={20} />
      </button>
    </div>

    </div>
   
  
  );
};

export default ComparePage;
