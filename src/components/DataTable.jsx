
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Select from 'react-select';
import { FaEye } from 'react-icons/fa';
import makeAnimated from 'react-select/animated';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../redux/lib/fetchData';
import { FiSearch } from 'react-icons/fi';
import { format } from 'date-fns';
import ClipLoader from "react-spinners/ClipLoader";
import { ImSpinner11 } from "react-icons/im";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteRank } from '../redux/lib/deleteRow'
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { keywordschema } from '../utils/validation';
import { addKeyword } from '../redux/lib/keyword';
import axios from 'axios';
import { FaDownload } from "react-icons/fa";
import EGYPT from '../assets/images/EGYPT.png'
import USA from '../assets/images/USA.png'
import AE from '../assets/images/DUBAI.png'
import LocationFilter from './LocationFilter';
import { DndContext, DragOverlay, useDraggable } from '@dnd-kit/core';
import BookmarkSidebar from './Bookmark/BookmarkSidebar';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useRef } from 'react';
import { FaPlus } from 'react-icons/fa'; // Importing an icon
import TabsCustomAnimation from '../components/Tabs/queryTabs';
import * as XLSX from 'xlsx';
import { FaUpload } from "react-icons/fa";
import { BiDotsVertical } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";
import { FaArrowsToEye } from "react-icons/fa6";
import { Menu } from '@headlessui/react';



import { addsingleKeyword } from '../redux/lib/singlekeyword';
const DataTableComponent = () => {
  const [menuOpen, setMenuOpen] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(false);
  const toggleDropdown = (query_id) => {
    setActiveDropdown(activeDropdown === query_id ? null : query_id);
  };
const navigate=useNavigate();
  const [selectedRow, setSelectedRow] = useState(null);
  const [folderRanks, setFolderRanks] = useState({});
  const [averageRank, setAverageRank] = useState( ); 
  const [isPopupVisible, setIsPopupVisible] = useState(true);

   const tabsRef = useRef(null);

  const scrollToTabs = () => {
    if (tabsRef.current) {
      tabsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const [isItemDropped, setIsItemDropped] = useState(false);
  const [isSidebarOpenn, setIsSidebarOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  
  const [isHover, setIsHover] = useState(false);
  const [is_Hover_, set_Is_Hover] = useState(false);
  const handle_Mouse_Enter = () => set_Is_Hover(true);
  const handle_Mouse_Leave = () => set_Is_Hover(false);

  const handleMouse_Enter = () => setIsHover(true);
  const handleMouse_Leave = () => setIsHover(false);

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  const [isModal_Open, setIsModal_Open] = useState(false);
  const open_Modal = () => setIsModal_Open(true);
  const close_Modal = () => setIsModal_Open(false);
  // Function to close the sidebar
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  const isSidebarOpen = useSelector((state) => state.SidebarSlice.isOpen);
  const [draggedItem, setDraggedItem] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState({
    value: 'EG',
    label: 'Egypt',
    icon: <img src={EGYPT} alt="Egypt" />,
  });
  const [selectedLocationFilter, setSelectedLocationFilter] = useState('All Locations');
  // const [updatingRow, setUpdatingRow] = useState(null);
  const [updatingRows, setUpdatingRows] = useState(new Set());

  const [isAdding, setIsAdding] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const userId = useSelector(state => state?.authSlice?.id);
 
  const dispatch = useDispatch();
  const tableData = useSelector((state) => state.tableSlice.data);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTargetUrl, setSelectedTargetUrl] = useState('All Sources'); 
  const [loading, setLoading] = useState(true);
  const animatedComponents = makeAnimated();
  const [dataFetched, setDataFetched] = useState(false);
  const [queryInfo, setQueryInfo] = useState(null);
  const [isDropped, setIsDropped] = useState(false);
  const [filteredData, setFilteredData] = useState(tableData);
 



  const [activeTab, setActiveTab] = useState("single"); // Changed "keyword" to "query"


  const customStyles = {
    headCells: {
      style: {
        fontSize: '12px',
        fontWeight: 'bold',
        color: '#FFFFFF',
        backgroundColor: '#ba9934',
      },
    },
  };
  const [isSubmitting, setIsSubmitting] = useState(false);


  const locationOptions = [
    { value: 'US', label: 'USA', icon: <img src={USA} alt="USA" /> },
    { value: 'EG', label: 'Egypt', icon: <img src={EGYPT} alt="Egypt" /> },
    { value: 'AE', label: 'Dubai ', icon: <img src={AE} alt="dubai" /> },
  ];

  const handleLocationChange = (selectedOption) => {
    setSelectedLocation(selectedOption);
  };
 
  const fetchDataFromApi = async () => {
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
  
//   const updateFilteredData = () => {
//     let filteredResult = [...tableData];
  
//     // If a search query is present, filter the results based on the search query
//     // if (searchQuery) {
//     //   const queryRegex = new RegExp(searchQuery, 'i');
//     //   filteredResult = filteredResult.filter(
//     //     (item) => item.query.match(queryRegex) || item.query.includes(searchQuery)
//     //   );
//     // }
//     if (searchQuery) {
//       const queryRegex = new RegExp(searchQuery, 'i');
//       filteredResult = filteredResult.filter(
//         (item) => item.query.match(queryRegex) || item.query.includes(searchQuery)
//       );
//     }
//     // // If target URLs are selected, filter the results based on target URLs
//     // if (selectedTargetUrls.length > 0 && !selectedTargetUrls.includes('All Sources')) {
//     //   filteredResult = filteredResult.filter((item) =>
//     //     selectedTargetUrls.includes(
//     //       item.target_url.replace(/^(https?:\/\/)?(www\.)?/, '').replace(/\/$/, '')
//     //     )
//     //   );
//     // }
//   // If a target URL is selected, filter the results based on the target URL
// if (selectedTargetUrl) {
//   filteredResult = filteredResult.filter((item) =>
//     item.target_url.replace(/^(https?:\/\/)?(www\.)?/, '').replace(/\/$/, '') === selectedTargetUrl
//   );
// }

//     // If a location filter is selected, filter the results based on location
//     if (selectedLocationFilter !== 'All Locations') {
//       filteredResult = filteredResult.filter((item) =>
//         item.google_domain === selectedLocationFilter
//       );
//     }
  
//     // Sort the array in descending order based on the date
//     filteredResult.sort((a, b) => new Date(b.date) - new Date(a.date));
  
//     // Check if the filtered results array is empty after all filters are applied
   

//     if (filteredResult.length === 0) {
//       // If there are no results, create a special entry in your data array
//       setFilteredData([{ noDataIndicator: true }]);
//     } else {
//       setFilteredData(filteredResult);
//     }
//   };
const updateFilteredData = () => {
  let filteredResult = [...tableData];

  // Apply search query filter
  if (searchQuery) {
    const queryRegex = new RegExp(searchQuery, 'i');
    filteredResult = filteredResult.filter(
      (item) => item.query.match(queryRegex) || item.query.includes(searchQuery)
    );
  }

  // Apply target URL filter only if a specific URL is selected (and not "All Sources")
  if (selectedTargetUrl && selectedTargetUrl !== 'All Sources') {
    filteredResult = filteredResult.filter((item) =>
      item.target_url.replace(/^(https?:\/\/)?(www\.)?/, '').replace(/\/$/, '') === selectedTargetUrl
    );
  }

  // Apply location filter
  if (selectedLocationFilter !== 'All Locations') {
    filteredResult = filteredResult.filter((item) =>
      item.google_domain === selectedLocationFilter
    );
  }

  // Sort the array in descending order based on the date
  filteredResult.sort((a, b) => new Date(b.date) - new Date(a.date));

  // Check if the filtered results array is empty after all filters are applied
  if (filteredResult.length === 0) {
    setFilteredData([{ noDataIndicator: true }]);
  } else {
    setFilteredData(filteredResult);
  }
};

  useEffect(() => {
    updateFilteredData();
  }, [searchQuery, selectedTargetUrl, selectedLocationFilter, tableData]);

  const NoDataComponent = () => (
    <div className="text-center" style={{ padding: '20px', gridColumn: '1 / -1' }}>
      No data
    </div>
  );
  
 

  useEffect(() => {
    if (!dataFetched) {
      setLoading(true);
      dispatch(fetchData(selectedTargetUrl))
        .then(() => {
          setLoading(false);
          setDataFetched(true);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setLoading(false);
        });
    }
  }, [dataFetched, dispatch, selectedTargetUrl]);
  useEffect(() => {
    setFilteredData(tableData);
  }, [tableData]);
  useEffect(() => {
    updateFilteredData();
  }, [searchQuery, selectedTargetUrl, tableData]);

  const uniqueTargetUrls = [
    'All Sources',
    ...new Set(tableData.map((item) => item.target_url.replace(/^(https?:\/\/)?(www\.)?/, '').replace(/\/$/, '')))
  ];
  const handleDeleteButtonClick = (query_id) => {
    dispatch(deleteRank(query_id))
      .unwrap()
      .then(() => {
        setFilteredData(currentData =>
          currentData.filter(rank => rank.query_id !== query_id)
        );
        toast.success('Rank deleted successfully!');
      })
      .catch((error) => {

        console.error('Error deleting rank:', error);

        toast.error(`An error occurred: ${error?.message || 'Unknown error'}`);
      });
  };

  const handleUpdateButtonClick = async (query_id, query, targetUrl, google_domain) => {
    try {
    //  setUpdatingRows(prev => new Set(prev.add(rowIndex)));
     setUpdatingRows(prev => ({ ...prev, [query_id]: true }));

    
    setIsUpdating(true);

    // Construct the API endpoint for updating the rank
    const updateUrl = `${process.env.REACT_APP_API_URL}/api/update-rank/${userId}/${query}/${targetUrl}/${google_domain}/`;

    // Send the update request
    const response = await axios.put(updateUrl, {
      // Include any necessary data for the update request
    });

    if (response.status === 200) {
      // Process the response and update your application state as necessary
      const updatedData = response.data;
      
      // Update the data in your state, this might vary depending on how your state is structured
      setFilteredData((prevData) => {
        return prevData.map((item) => {
          if (item.query_id === query_id) {
            // Update with new data from response
            return { ...item, ...updatedData };
          }
          return item;
        });
      });
    

      toast.success(`${query} Update successful`);
    } else {
      toast.error('Update failed');
    }
  } catch (error) {
    console.error('Error updating rank:', error);
    toast.error('An error occurred while updating the rank.');
  }
  finally {
    setUpdatingRows(prev => ({ ...prev, [query_id]: false }));
    setIsUpdating(false);
  }
};

const DraggableRow = ({ item, children, ...props }) => {
    const { attributes, listeners, setNodeRef } = useDraggable({
      id: `draggable-${item.query_id}`,
      data: item,
    });
    return (
      <div ref={setNodeRef}  {...listeners} {...attributes} {...props}>
        {children}
      </div>
    );
  };




 
  const renderAccordionContent = (row) => {
    // Render TabsCustomAnimation with the row data
    return (
      <div className="p-4">
        <TabsCustomAnimation rowData={row} />
      </div>
    );
  };
  const handleRowClicked = row => {
    // Toggle accordion for the clicked row
    setActiveAccordion(activeAccordion === row.query_id ? null : row.query_id);
  };

  
  useEffect(() => {
    // Select the first header element in the DataTable and change its text
    const firstHeader = document.querySelector(".rdt_TableHeadRow div");
    if (firstHeader) {
      firstHeader.innerText = "Details";
    }
  }, []); 

  const navigateToDetails = (userId, query, targetUrl, google_domain) => {
    const path = `/details/${userId}/${encodeURIComponent(query)}/${encodeURIComponent(targetUrl)}/${google_domain}/`;
    console.log('Navigating to path:', path);
    navigate(path);
};
  const columns = [

    {
      name: 'keywords',
      maxWidth: '20%',

      sortable: true,
      selector: (row) => row.query,

      cell: (row) => (
         row.noDataIndicator ? <div className="text-center" colSpan="6">  </div> :    
          <DraggableRow item={row}>
        {row.query} 
      </DraggableRow>

        
     ),
    },

    {
      name: 'Rank',
      maxWidth: '5%',

      sortable: true,
      selector: (row) => row.rank,
      cell: row => row.noDataIndicator ? null : <div>{row.rank}</div>,

    },
   
    
    {
      name: 'Date',
      maxWidth: '20%',

      selector: row => row.date,
      cell: row => row.noDataIndicator ? null : <div>{format(new Date(row.date), 'MMMM dd, yyyy')}</div>,

    },
  
   

   
    
    {
      name: 'Location',
      sortable: true,
      maxWidth: '20%',

      selector: (row) => row.google_domain,
      cell: (row) => (
        <div className="flex items-center justify-center ">
          {row.google_domain === 'US' && (
            <img className="w-6" src={USA} alt="USA" title="United States" />
          )}
          {row.google_domain === 'EG' && (
            <img className="w-6" src={EGYPT} alt="Egypt" title="Egypt" />
          )}
          {row.google_domain === 'AE' && (
            <img className="w-6" src={AE} alt="Dubai" title="Dubai" />
          )}
        </div>
      ),
    },
  
 
  {
    name: 'Origin',
    sortable: true,
    cell: (row) => {
      if (row.noDataIndicator) {
        return null;
      }
  
      // Regular expression to find the domain extension and extract everything after it
      const regex = /\.(com|eg|net|ru|org|au|sa|uk|de)(\/.*)?$/;
      const matches = row.source_url.match(regex);
      const urlAfterDomain = matches && matches[2] ? decodeURIComponent(matches[2]) : '';
  
      // Shorten the URL for display
      const displayUrl = urlAfterDomain.length > 20 ? `${urlAfterDomain.substring(0, 20)}...` : urlAfterDomain;
  
      return (
        <div className="tooltip-container">
          <a href={row.source_url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>
            {displayUrl}
          </a>
          <span className="tooltip-text">{urlAfterDomain}</span>
        </div>
      );
    },
  },
   
  

  {
    name: 'Actions',
    sortable: true,
    maxWidth: '5%',
    cell: (row, rowIndex) => {
      if (row.noDataIndicator) {
        return 'No data Found';
      }

      return (
        <Menu as="div" className="px-[10px] pt-[10px] relative inline-block text-left 
        hover:bg-gray-300  p-1 rounded-full transition-all duration-300 ease-in-out " onClick={() => toggleDropdown(row.query_id)}>
        <Menu.Button >
          <BiDotsVertical  size={18} className='cursor-pointer ' />
        </Menu.Button>

       
 
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-[20px] 
    z-10 top-[0px] m-[1rem] p-[0.5rem]  w-[90px] bg-white rounded-lg shadowmenu">
              {/* Update Button */}
              <Menu.Item>
                {({ active }) => (
                     <div className='flex   mt-[5px] justify-around'>

                  <button
                    onClick={() => handleUpdateButtonClick(row.query_id, row.query, row.target_url, row.google_domain)}
                className={`text-green-500  rounded-lg flex items-center  justify-around  ${updatingRows[row.query_id] ? 'cursor-not-allowed' : ''}`}
                  >
                    {updatingRows[row.query_id] ? (
                      <ClipLoader size={14} color={'green'} loading={true} />
                    ) : (
                      <ImSpinner11 />
                    )}
                                       <span className=' ml-[5px]  text-md'>  Update</span>

                  </button>

                  </div>
                )}
              </Menu.Item>

              {/* Delete Button */}
              <Menu.Item>
                {({ active }) => (
                     <div className='flex   mt-[5px] justify-around'>

                  
                  <button
                    onClick={() => handleDeleteButtonClick(row.query_id)}
                    className="text-red-500  rounded-lg flex items-center  justify-around "
                  >
                    <FaTrash />
                    <span className=' ml-[5px]  text-md'>  Delete</span>

                  </button>

                  </div>
                )}
              </Menu.Item>

              {/* View Button */}
              <Menu.Item>
                {({ active }) => (
                                       <div className='flex   mt-[5px] justify-around'>

                  {/* <button
                    onClick={() => navigateToDetails(row.userId, row.query, row.target_url, row.google_domain)}
                    className='text-slate-500  rounded-lg flex items-center'
                  >
                    <FaArrowsToEye className="text-blue hover:text-blue-600" />
                    <span className=' text-md  ml-[5px]'>    View &nbsp;</span>

                  </button> */}
                   <button
        onClick={() => navigateToDetails(row.query, row.target_url, row.google_domain)}
        className='text-slate-500 rounded-lg flex items-center'
      >
        <FaArrowsToEye className="text-blue hover:text-blue-600" />
        <span className=' text-md ml-[5px]'>View</span>
      </button>
                

</div>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      );
    },
  },

  ];

  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
  };
  // const handleTargetUrlFilterChange = (selectedOptions) => {
  //   const selectedUrls = selectedOptions.map((option) => option.value);
  //   setSelectedTargetUrls(selectedUrls);
  // };
  const handleTargetUrlFilterChange = (selectedOption) => {
    setSelectedTargetUrl(selectedOption ? selectedOption.value : '');
  };
  
  const { handleSubmit, control, register, reset, formState: { errors } } = useForm({
    resolver: zodResolver(keywordschema),
  });


  const onSingleSubmit = (data) => {
    console.log("single submit data:", data);
    if (isSubmitting) return;
        setIsSubmitting(true);
        setIsAdding(true);
      const keywordData = {
        query: data.keyword,
        target_url: data.singleurl,  // This should match your input field's name
        google_domain: selectedLocation?.value,
      };

   
        console.log("Submitting single keyword data:", keywordData); // Debug log
        dispatch(addsingleKeyword(keywordData))
        .unwrap()
        .then((response) => {
          console.log('Success:', response);
          console.log(queryInfo)
          toast.success('Keyword added successfully!');
          setQueryInfo({
            keywords: data.keyword,
            targetUrl: data.url,
            rank: response[0].rank,
            location: selectedLocation?.label,
          });
          console.log('Location:', selectedLocation?.value)
          console.log('queryInfo:', queryInfo);
          reset({ keywords: '', url: '' });
          dispatch(fetchData());
          // Close the modal here
          close_Modal();  // Call the function to close the modal
        })
        .catch((error) => {
          console.error('Error adding keyword:', error);
          toast.warning(`:warning: Sorry, keyword not existent !`, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 7000,
          });
        })
        .finally(() => {
          setIsSubmitting(false);
        });
  };



const onBulkSubmit = async (data) => {
  setIsDataLoading(true); // Start loading
  close_Modal();
  if (isSubmitting) return;
  setIsSubmitting(true);
  setIsAdding(true);
  reset({ keywords: '', url: '' });

  const currentDate = new Date();
 
  // Splitting the textarea input by newlines
  const queries = data.keywords.split('\n').map(line => line.trim()).filter(line => line);


  // First, add all queries with a 'Loading...' state
  const tempKeywordData = queries.map(query => ({
    query,
    target_url: data.url,
    google_domain: selectedLocation?.value,
    temp: true,
    date: currentDate,
    rank: 'Loading...',
  }));

  setFilteredData(currentData => [...tempKeywordData, ...currentData]);

  // Process each query and update its status
  for (const query of queries) {
    try {
      const keywordData = {
        query,
        target_url: data.url,
        google_domain: selectedLocation?.value,
      };

      const response = await dispatch(addKeyword(keywordData)).unwrap();
      console.log("API response for query", query, ":", response);

      if (Array.isArray(response) && response.length > 0) {
        const rank = response[0][0].rank;

        setFilteredData(currentData => {
          return currentData.map(item => {
            if (item.temp && item.query === query) {
              // Replace temporary row with actual data
              return { ...item, rank: rank, temp: false };
            }
            return item;
          });
        });
        toast.success(` "${query}" added successfully with rank: ${rank}`);

      } else {
        throw new Error('Invalid response format or no data returned for query: ' + query);
      }
     
    } catch (error) {
      console.error('Error adding keyword:', error);
      toast.error(`Error: ${error.message}`);
      // Update the failed query status in the table
      setFilteredData(currentData => {
        return currentData.map(item => {
          if (item.temp && item.query === query) {
            return { ...item, rank: 'Error', temp: false };
          }
          return item;
        });
      });
    }
  }

  setIsSubmitting(false);
  setIsAdding(false);
    setIsDataLoading(false);
};

const openPopup = () => {
  setIsPopupVisible(true);
};

  const closeModal = () => {
    setIsModalOpen(false);
    // Optionally, clear queryInfo when the modal is closed
    setQueryInfo(null);
  };
  const handleDragStart = (event) => {
    const { active } = event;
    const item = tableData.find((data) => `draggable-${data.query_id}` === active.id);

    if (item) {
      console.log('Dragging item:', item);

      setDraggedItem(item);
    } else {
      console.log('Item not found for id:', active.id);
    }
  };
const handleDragEnd = async (event) => {
  const { active, over } = event;

  if (over) {
    const dropData = over.data.current;
    setIsItemDropped(true);

    if (active) {
      const dragData = active.data.current;
      const { query, target_url, google_domain } = dragData;
      const { b_id } = dropData;
      setIsItemDropped(true);
      setDraggedItem({ query: dragData.query, bookmark: dropData.name });

      const apiUrl = `${process.env.REACT_APP_API_URL}/api/favourites/${userId}/${encodeURIComponent(query)}/${target_url}/${google_domain}/${b_id}/`;

      try {
        const response = await axios.get(apiUrl);
        console.log("API Response:", response.data.rank); 

        // Extract the rank value from the response
        const currentRank = response.data.rank;
        console.log("Current Rank:", currentRank);

        setFolderRanks((prevRanks) => {
          const updatedRanks = { ...prevRanks };

          if (!updatedRanks[b_id]) {
            updatedRanks[b_id] = [];
          }

          // Check if the currentRank is already in the folderRanks array
          if (!updatedRanks[b_id].includes(currentRank)) {
            updatedRanks[b_id].push(currentRank);
          }

          console.log(`Updated ranks for folder ${b_id}:`, updatedRanks[b_id]);
          localStorage.setItem('folderRanks', JSON.stringify(updatedRanks));

          return updatedRanks;
        });

        const ranksForFolder = folderRanks[b_id] || [];
        const averageRank = ranksForFolder.length
          ? ranksForFolder.reduce((sum, rank) => sum + rank, 0) / ranksForFolder.length
          : 0;
        console.log(`Average Rank for folder ${b_id}:`, averageRank);
        setAverageRank(averageRank);

      } catch (error) {
        console.error('Error making API call:', error);
      }
    }
  }
};
useEffect(() => {
  const savedRanks = localStorage.getItem('folderRanks');
  if (savedRanks) {
    setFolderRanks(JSON.parse(savedRanks));
  }
}, []);

const showDroppedNotification = () => {
  if (draggedItem) {
    toast.info(`'${draggedItem.query}' has been dragged into '${draggedItem.bookmark}'!`, {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  }
  };
  useEffect(() => {
    if (isItemDropped) {
      showDroppedNotification();
      setIsItemDropped(false); // Reset the state
    }
  }, [isItemDropped]);

  const [rowsPerPage, setRowsPerPage] = useState(5); // Default rows per page
  const totalRows = tableData.length; // Assuming tableData is your dataset
  const allRowsValue = 10000; // A large number for 'All'

  const handlePerPageChange = (perPage) => {
    setRowsPerPage(perPage === allRowsValue ? totalRows : perPage);
  };

  // Pagination options including 'All'
  const paginationOptions = {
    rowsPerPageOptions: [5, 10, 20, 50, 100, allRowsValue],
    rowsPerPageText: (perPage) => perPage === allRowsValue ? 'All' : perPage.toString(),
    selectAllRowsItem: true,
    selectAllRowsItemText: 'All'
  };


  const tabsData = [
    // {
    //   label: "Single Keyword",
    //   value: "single",
    //   formFields: [
    //     { name: "keyword", placeholder: "Enter single keyword", type: "input" },
    //     { name: "singleurl", placeholder: "Add URL", type: "input" },
    //     { name: "singlelocation", placeholder: "Select Location", type: "select" }
    //   ],
    //   submitHandler: onSingleSubmit // Define this function
    // },
    {
      label: "Single Or Bulk Keywords",
      value: "bulk",
      formFields: [
        { name: "keywords", placeholder: "Enter Single or Bulk keywords", type: "textarea" },
        { name: "url", placeholder: "Add URL", type: "input" },
        { name: "location", placeholder: "Select Location", type: "select" }
      ],
      submitHandler: onBulkSubmit // Define this function
    }
  ];

  const handlePopup=()=>{
    setIsPopupVisible(false)
   
  }
  const closePopup = () => {
    setIsPopupVisible(false);
    // if (!urlData) {
    //   navigate(-1);
    // }
  };

  const conditionalRowStyles = [
    {
      when: row => row.noDataIndicator,
      style: {
        display: 'flex', // Use flexbox to center content
        justifyContent: 'center', // Horizontally center the content
        alignItems: 'center', // Vertically center the content
        height: '20%', // Set the height you want for the row
        // If you know the height of your rows, you can set a fixed height here
        textAlign: 'center', // Center align the text
        // Apply this style to all cells in the row
        '& > *': {
          flex: 1, // This makes each cell flex to fill the row
        }
      },
    },
  ];
  

  // const handleFileChange = async (e) => {
  //   const file = e.target.files[0];

  //   if (file) {
  //     await uploadFile(file);
  //   }
  // };
  // const handleFileChange = async (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       const workbook = XLSX.read(e.target.result, { type: 'binary' });
  //       const sheetName = workbook.SheetNames[0];
  //       const worksheet = workbook.Sheets[sheetName];
  //       const jsonData = XLSX.utils.sheet_to_json(worksheet);
  //       updateTableData(jsonData); // Update the table data
  //     };
  //     reader.readAsBinaryString(file);
  //   } else {
  //     toast.error('Please select an Excel file.');
  //   }
  // };
  // const updateTableData = (jsonData) => {
  //   setFilteredData(jsonData); // Assuming setFilteredData updates the state for your DataTable
  //   toast.success('Data imported successfully!');
  // };
  
  
  // const uploadFile = async (file) => {
  //   const formData = new FormData();
  //   formData.append('file', file);

  //   try {
  //     const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/upload/${userId}/`, formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     });

  //     if (response.status === 200) {
  
  //       setFilteredData(response.data);
  //       toast.success('Data imported successfully!');
  //     } else {
  //       toast.error('Failed to import data');
  //     }
  //   } catch (error) {
  //     console.error('Error uploading file:', error);
  //     toast.error('Error uploading file');
  //   }
  // };
  // const triggerFileInput = () => {
  //   document.getElementById('excelFileInput').click();
  // };



  // This function is triggered when a file is selected
const handleFileChange = async (e) => {
  const file = e.target.files[0];
  if (file) {
    // Read the file using FileReader
    const reader = new FileReader();
    reader.onload = async (event) => {
      // Read the Excel file
      const workbook = XLSX.read(event.target.result, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      // Convert Excel to JSON
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      // Upload the JSON data
      await uploadFile(jsonData);
    };
    reader.readAsBinaryString(file);
  } else {
    toast.error('Please select an Excel file.');
  }
};

// This function uploads the JSON data to the server

const uploadFile = async (jsonData) => {
  const formData = new FormData();
  // Convert JSON data to Blob and append to FormData
  formData.append('file', new Blob([JSON.stringify(jsonData)], { type: 'application/json' }));

  try {
      const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/upload/${userId}/`,
          formData, // Send FormData
          {
              headers: {
                  'Content-Type': 'multipart/form-data', // Set the correct content type for file upload
              },
          }
      );

      if (response.status === 200) {
          setFilteredData(response.data);
          toast.success('Data imported successfully!');
      } else {
          toast.error('Failed to import data');
      }
  } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Error uploading file');
  }
};


// Function to trigger the file input dialog
const triggerFileInput = () => {
  document.getElementById('excelFileInput').click();
};





  return (
    <>
   

      <div className="tooltip-container z-[1000]" 
      onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <FaPlus
          onClick={open_Modal}
          className="text-2xl bg-blue
           text-white rounded-full 
          p-[10px] fixed bottom-[30px] right-[20px]
                   hover:bg-white hover:text-blue hover:border-2
                    hover:border-blue hover:transition ease-in-out delay-30
                   mt-[100px] cursor-pointer"
          size={50}
        />
        <span className={`tooltip-text text-blue
         bg-white shadow-md rounded-md p-3 fixed bottom-[40px] 
         right-[76px] ${isHovering ? 'block' : 'hidden'}`}>
          Add New Query
        </span>
      </div>


      <div className="tooltip-container z-[1000]" 
      onMouseEnter={handleMouse_Enter} onMouseLeave={handleMouse_Leave}>
        <FaDownload 

        
          onClick={exportToExcel}

          className="text-2xl bg-blue
           text-white rounded-full 
          p-[10px] fixed bottom-[100px] right-[20px]
                   hover:bg-white hover:text-blue hover:border-2
                    hover:border-blue hover:transition ease-in-out delay-30
                   mt-[100px] cursor-pointer"
          size={50}
        />
        <span className={`tooltip-text text-blue
         bg-white shadow-md rounded-md p-3 fixed bottom-[100px] 
         right-[76px] ${isHover ? 'block' : 'hidden'}`}>
         Export Excel
        </span>
      </div>
      {/* <div className="tooltip-container z-[1000]" 
      onMouseEnter={handle_Mouse_Enter} onMouseLeave={handle_Mouse_Leave}>
      <FaUpload

        onClick={triggerFileInput}
        className="text-2xl bg-blue text-white rounded-full p-[10px] fixed bottom-[170px] right-[20px] hover:bg-white hover:text-blue hover:border-2 hover:border-blue hover:transition ease-in-out delay-30 mt-[100px] cursor-pointer"
        size={50}
      />
      <span className={`tooltip-text text-blue bg-white shadow-md 
      rounded-md p-3 fixed bottom-[170px] right-[76px] ${is_Hover_ ? 'block' : 'hidden'}`}>
        Import excel
      </span>
      <input
        type="file"
        id="excelFileInput"
        style={{ display: 'none' }}
        onChange={handleFileChange}
        accept=".xlsx, .xls"
      />
    </div> */}

<div className="tooltip-container z-[1000]" onMouseEnter={handle_Mouse_Enter} onMouseLeave={handle_Mouse_Leave}>
        <FaUpload onClick={triggerFileInput} className="text-2xl bg-blue text-white rounded-full p-[10px] fixed bottom-[170px] right-[20px] hover:bg-white hover:text-blue hover:border-2 hover:border-blue hover:transition ease-in-out delay-30 mt-[100px] cursor-pointer" size={50} />
        <span className={`tooltip-text text-blue bg-white shadow-md rounded-md p-3 fixed bottom-[170px] right-[76px] ${is_Hover_ ? 'block' : 'hidden'}`}>Import Excel</span>
        <input type="file" id="excelFileInput" style={{ display: 'none' }} onChange={handleFileChange} accept=".xlsx, .xls" />
      </div>
      {isPopupVisible && (
      <Transition.Root   show={isModal_Open}
        as={Fragment}>
        <Dialog as="div" 
        className="relative z-10"
         initialFocus={cancelButtonRef} 
         onClose={closePopup}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-0 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">

{isModalOpen && (


<div className="px-10 py-[70px]">
  <div 
  
      className="bg-blue/20 border-b rounded-none border-blue
        shadow-none z-[10] p-2 mb-2 text-center"
       
  
   >
  <h1 className='font-semibold'>Single or Bulk keyword</h1>
  </div>

  <div>


  <form onSubmit={handleSubmit(onBulkSubmit)}>
  {/* Single or Bulk Keywords Field */}
  <textarea
    {...register("keywords")}
    placeholder="Enter Single or Bulk keywords"
    className="w-full p-2 mt-1 border-b"
  />

<div className='flex justify-between space-x-4'>
   
    <input
    {...register("url")}
    placeholder="Add URL"
    className="w-full p-2 mt-1 border-b"
  />

  <Controller
    name="location"
    control={control}
    render={({ field }) => (
      <Select
        {...field}
        components={animatedComponents}
        options={locationOptions}
        value={selectedLocation}
        onChange={handleLocationChange}
        className="w-[100%] mt-3"
        styles={{
          option: (provided) => ({
            ...provided,
            display: 'flex',
            alignItems: 'center',
            padding: '4px 8px',
          }),
          singleValue: (provided) => ({
            ...provided,
            display: 'flex',
            alignItems: 'center',
          }),
          valueContainer: (provided) => ({
            ...provided,
            display: 'flex',
            alignItems: 'center',
            padding: '1px',
            marginLeft: '4px',
          }),
        }}
        isSearchable={false}
        getOptionLabel={(option) => (
          <>
            {
option.icon && <span className="mr-2 w-6">{option.icon}</span>}
{option.label}
</>
)}
getOptionValue={(option) => option.value}
/>
)}
/>
</div>

{/* Submit Button */}
{/* <button
type="submit"
className="px-4 py-2 text-white bg-blue rounded w-full mt-4"

>
Submit Keywords
  </button> */}
<button
  type="submit"
  className={`px-4 py-2 rounded w-full mt-4 font-semibold ${isDataLoading ? 'bg-gray-200 text-slate-800 cursor-not-allowed' : 'bg-blue text-white'}`}
  disabled={isDataLoading}
>
  Submit Keywords
</button>


</form>

  </div>
</div>
)}


                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
  )}

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
            Add New query
          </span>
        </div>
      )}

      <div className="max-w-screen-lg mx-auto  p-4 mt-[4rem] ">
      {
  (filteredData && filteredData.length > 0) && (
    <div className="flex flex-wrap justify-between mb-4 -mx-2">
      <div className="p-4 w-full md:w-1/3 px-2">
        <label className="block font-semibold mt-3 mb-1">Search for keyword</label>
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700" size={20} />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchInputChange}
            className="pl-10 pr-4 h-[39px] border font-semibold rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
      </div>

     

<div className="p-4 w-full md:w-1/3 px-2">
  <label className="block font-semibold mt-3 mb-1">Filter by Target URL</label>
  <Select
    closeMenuOnSelect={true}
    components={animatedComponents}
    options={uniqueTargetUrls.map((url) => ({ value: url, label: url }))}
    value={{ value: selectedTargetUrl, label: selectedTargetUrl }}
    onChange={handleTargetUrlFilterChange}
    className="w-full"
  />
</div>


      <div className="p-4 w-full md:w-1/3 px-2">
        <label className="block font-semibold mt-3 mb-[-8px]">Filter by Location</label>
        <LocationFilter
          selectedLocationFilter={selectedLocationFilter}
          setSelectedLocationFilter={setSelectedLocationFilter}
        />
      </div>
    </div>
  )
}


        {loading && isUpdating ? (

          <div className="text-center">
            <ClipLoader
              size={100}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        ) : (
          <div className="max-w-screen-lg mx-auto p-4 mt-4">

  {selectedTargetUrl && (
  <div className="mb-4">
    <h3 className="font-semibold mb-2">Selected Target URL:</h3>
      {/* Display the selected URL; adjust styling as needed */}
      <p className="m-0">{selectedTargetUrl.label || selectedTargetUrl}</p>
  
  </div>
)}

          <DndContext
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}>
            <DataTable
              columns={columns}
              data={filteredData}
              pagination
              highlightOnHover
              striped
               paginationPerPage={10}
              customStyles={customStyles}
              paginationRowsPerPageOptions={[5,10,20,50,100]}
              onRowClicked={handleRowClicked}
              onChangeRowsPerPage={handlePerPageChange}
               paginationComponentOptions={paginationOptions}
               conditionalRowStyles={conditionalRowStyles}

                noDataComponent={<NoDataComponent />}
                expandableRows
                expandableRowsComponent={({ data }) => renderAccordionContent(data)}
                expandOnRowClicked


            />




              {isSidebarOpen &&
                <BookmarkSidebar
                    isOpen={isSidebarOpen}
                    onClose={closeSidebar}
                    folderRanks={folderRanks}
                    averageRank={averageRank}
                />




            }

          

            <DragOverlay

              dropAnimation={null}
            >
              {draggedItem && (
                <div className="my-drag-overlay"
                  style={{
                    width: 150,
                    backgroundColor: 'gray',
                    borderRadius: '10px',
                    textAlign: 'center'
                  }}
                >
                  <div>{draggedItem.query}</div>
                </div>
              )}



            </DragOverlay>
          </DndContext>

          </div>
        )}

    
    
    </div>

    </>
  );
};

export default DataTableComponent;

















