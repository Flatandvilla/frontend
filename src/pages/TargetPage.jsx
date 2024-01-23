
import React, { useEffect, useState ,useRef} from 'react';
import { Link, useParams } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import Chart from 'react-apexcharts';
import { format, parseISO, isSameDay, isSameWeek, isSameMonth, startOfWeek } from 'date-fns';
import { ClipLoader } from 'react-spinners';
import { useDispatch } from 'react-redux';
import { deleteRank } from '../redux/lib/deleteRow';
import * as XLSX from 'xlsx';
import html2canvas from 'html2canvas';
import { MdDeleteOutline } from "react-icons/md";

import { addDays } from 'date-fns';
import { ImSpinner11 } from "react-icons/im";
import { FaEye } from 'react-icons/fa';
import EGYPT from '../assets/images/EGYPT.png'
import USA from '../assets/images/USA.png'
import AE from '../assets/images/DUBAI.png'
import { toast } from 'react-toastify';
import axios from 'axios';
import QueryDetails from './DetailsPage';
import TargetDetails from '../components/TargetDetails';
const TargetPage = () => {
  const [updatingRows, setUpdatingRows] = useState(new Set());
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedQuery, setSelectedQuery] = useState(null);

  const [yAxisMin, setYAxisMin] = useState(0);
const [yAxisMax, setYAxisMax] = useState(100);
const [selectedQueryId, setSelectedQueryId] = useState(null); // Holds the query_id of the selected query


const handleRowClicked = (row) => {
  const { query_id } = row; // Extract query_id from the selected row
  console.log('Clicked row with query_id:', query_id); // Log the query_id
  setSelectedQueryId(query_id); // Set the selected query_id on row click
};

  const chartRef = useRef(null);
  const { userId,  encodedTargetUrl } = useParams();
  const [sourceUrl, setSourceUrl] = useState('');
  const [chartSeries, setChartSeries] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('day');
  const [filteredData, setFilteredData] = useState([]);
  const dispatch = useDispatch(); 
  const [showTabs, setShowTabs] = useState(false);
  const [showIframe, setShowIframe] = useState(false);

  const handleEyeButtonClick = (query_id) => {
    console.log('Clicked on Eye button for query_id:', query_id);
    // Set the selected query_id when the "Eye" button is clicked
    setSelectedQueryId(query_id);
  };
  

  const handleDeleteButtonClick = (query_id, queryName,rank) => {
    dispatch(deleteRank(query_id))
      .unwrap()
      .then(() => {
        setFilteredData(currentData =>
          currentData.filter(rank => rank.query_id !== query_id)
        );
        toast.success(`'${queryName}' deleted with rank ${rank} successfully!`); // Show query name in the toast message
      })
      .catch((error) => {
        console.error('Error deleting rank:', error);
        toast.error(`An error occurred: ${error?.message || 'Unknown error'}`);
      });
  };
  const handleUpdateButtonClick = async (query_id, query, targetUrl, google_domain,updatedrank) => {
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
    

      toast.success(`${query} Updates successfully with rank ${updatedrank}!`);
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

  useEffect(() => {
    const fetchDataForTable = async () => {
      const url = `${process.env.REACT_APP_API_URL}/api/get_by_url/${userId}/${encodedTargetUrl}/`;
      setLoading(true);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data)
        setData(data); // Set the state with the fetched data
      } catch (error) {
        console.error('Fetching table data failed:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchDataForTable();
  }, [userId, encodedTargetUrl]);

  const columns = [
    {
      name: 'Query',
      selector: row => row.query,
      sortable: true,
      cell: row => <a href={row.source_url} target="_blank" rel="noopener noreferrer">{row.query}</a>,

    },
    {
      name: 'Rank',
      selector: row => row.rank,
      sortable: true,
    },
    {
      name: 'Date',

    selector: row => format(parseISO(row.date), 'MMMM d'),

      sortable: true,
    },
    {
      name: 'Location',
      selector: row => row.google_domain,
      sortable: true,
      cell: (row) => (
        <div className="flex items-center">
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
        name: 'Actions',
        sortable: true,
  
        cell: (row, rowIndex) => (
          <div className='flex'>
           
           <button
        onClick={() => handleUpdateButtonClick(row.query_id, row.query, row.target_url, row.google_domain,row.rank)}
        className={`text-green-500 px-2 py-1 rounded-lg border border-green-500 ${updatingRows[row.query_id] ? 'cursor-not-allowed border-transparent' : ''}`}
        style={{ width: '27px', height: '21px' }}
      >
        {updatingRows[row.query_id] ? (
          <ClipLoader size={14} color={'green'} loading={true} />
        ) : (
          <ImSpinner11 />
        )}
      </button>
  
  
  
            <button
                      onClick={() => handleDeleteButtonClick(row.query_id, row.query,row.rank)} // Pass the query name here

              className="text-red-500 px-2 py-1 rounded-lg border border-red-500 ml-2"
              style={{ width: '27px', height: '21px' }}
  
            >
              <MdDeleteOutline />
            </button>
  
            <button className="text-slate-500 px-2 py-1 rounded-lg border border-blue ml-2" 
                          style={{ width: '27px', height: '21px' }}
                          >
               {/* <button  className='flex items-center justify-center' 
              onClick={() => handleEyeButtonClick(row.query_id)}>
        <FaEye className="text-blue hover:text-blue-600 
       " />
      </button> */}


<Link to={`/details/${userId}/${encodeURIComponent(row.query)}/${encodeURIComponent(row.target_url)}/${row.google_domain}/`}>
              <FaEye className="text-blue hover:text-blue-600" />
            </Link>
  
            </button>
          </div>
        ),
      }
  ];
  useEffect(() => {
    const fetchDataForChart = async () => {
      const url = `${process.env.REACT_APP_API_URL}/api/getit_by_url/${userId}/${encodedTargetUrl}/`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const apiData = await response.json();
        processChartData(apiData); // Function to process and set chart data
      } catch (error) {
        console.error('Fetching chart data failed:', error);
      }
    };
  
    fetchDataForChart();
  }, []); 




  const filterButtons = [
    { label: 'Day', value: 'day' },
    { label: 'Week', value: 'week' },
    { label: 'Month', value: 'month' },
  ];
  const handleFilterChange = (newFilterType) => {
    setFilterType(newFilterType);
  };
  
  const filterData = (originalData, type) => {
    const currentDate = new Date();
    return originalData.filter((item) => {
      const itemDate = parseISO(item.date);
      switch (type) {
        case 'day':
          return isSameDay(currentDate, itemDate);
        case 'week':
          return isSameWeek(currentDate, itemDate);
        case 'month':
          return isSameMonth(currentDate, itemDate);
        default:
          return true;
      }
    });
  };
  

  useEffect(() => {
    setFilteredData(filterData(data, filterType));
  }, [filterType, data]);


  const processChartData = (apiData) => {
    const chartData = apiData.map(item => ({
      x: new Date(item.date_truncated),
      y: item.average_rank
    }));
    const dates = apiData.map(item => new Date(item.date_truncated));


    // Assuming average_rank is a number
    const ranks = apiData.map(item => item.average_rank);
    const minRank = Math.min(...ranks);
    const maxRank = Math.max(...ranks);
    setYAxisMin(minRank);
    setYAxisMax(maxRank);
  
    setChartSeries([{ name: "Average Rank", data: chartData }]);
     // Update state or context to hold min and max dates for x-axis

  };
  
  
  

  
  

 
 const chartOptions = {
        chart: {
            id: 'chart-id',
            type: 'line',
            zoom: {
                enabled: false
            },
            dropShadow: {
                enabled: true,
                color: '#000',
                top: 18,
                left: 7,
                blur: 10,
                opacity: 0.2
            }
        },
        xaxis: {
            title: {
                text: 'Date'
            },
            reversed: true,
            type: 'datetime',
           
        },
       
        yaxis: {
          title: {
            text: 'Avg-Rank'
          },
          labels: {
            formatter: (value) => value.toFixed(0)
          },
          reversed: true,
          min: yAxisMin,
          max: yAxisMax
        },
        colors: ['#ba9934'],
        dataLabels: {
          enabled: true,
          offsetX: 0,
          offsetY: -5,
          style: {
              fontSize: '14px',
              colors: ['#fff'],
              fontFamily: 'Helvetica, Arial, sans-serif',

              
          },
          background: {
              enabled: true,
              foreColor: '#000',
              borderRadius: 2,
              padding: 3,
              borderColor: '#ba9934',
              // backgroundColor:'green',
              borderRadius: 2
          },
          dropShadow: {
              enabled: false,
              top: 1,
              left: 1,
              blur: 1,
              color: '#000',
              opacity: 0.45
          }

         
      }
};

   
  

  const exportToExcel = async () => {
    const wb = XLSX.utils.book_new();
    const wsData = [];
    wsData.push(['Date', 'Rank (Win)']);
    filteredData.forEach((item) => {
      wsData.push([format(parseISO(item.date), 'MMM. d, yyyy'), item.rank]);
    });
  
    // Capture the chartRef as an image
    const canvas = await html2canvas(chartRef.current);
    const chartImage = canvas.toDataURL('image/png');
  
    // Insert the image placeholder into wsData
    wsData.push(['Chart Image', '', '']);
  
    const ws = XLSX.utils.aoa_to_sheet(wsData);
  
    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Data');
  
    // Convert the chart image to a worksheet
    const chartWs = XLSX.utils.table_to_sheet(chartRef.current);
  
    // Add the chart worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, chartWs, 'Chart');
  
    // Update the image placeholder with the actual image
    ws['C3'] = { t: 's', v: chartImage, s: { dataType: 's', hyperlink: chartImage } };
  
    // Save the workbook as an Excel file
    // XLSX.writeFile(wb, `QueryData_${encodedQuery}.xlsx`);
  };
  


  

  return (
   <div className="  relative flex flex-col  min-h-screen   z-[100] bg-white 
   max-w-screen-xl  mx-auto  p-4 mt-[4rem]">

        <div className="mt-8 text-center  mb-[60px]">
        </div>
        
        <div className="text-black  p-2 rounded-lg flex justify-between 
        items-center space-x-2 lg:w-full w-[70%] mx-auto">
  <div className="flex items-center space-x-2 justify-center">
  {filterButtons.map((button) => (
  <button
    key={button.value}
    onClick={() => handleFilterChange(button.value)}
    className={`px-7 py-2 text-sm font-bold rounded-md transition-colors duration-300 ${
      filterType === button.value
        ? 'bg-blue text-white shadow-sm'
        : 'bg-white text-blue hover:bg-blue hover:text-white hover:shadow'
    }`}
  >
    {button.label}
  </button>
))}
  </div>

  <div className='flex space-x-3'>
  <button
      onClick={exportToExcel}
      className="bg-green-500 text-white px-2 py-1 rounded-lg border border-green-500 ml-2 hover:bg-green-600 hover:text-white transition-all ease-in-out duration-300"
    >
      Export to Excel
    </button>


    <Link >
  <button 
       

    className="px-7 py-2 text-sm rounded-md transition-colors duration-300 bg-blue text-white shadow-sm hover:bg-white hover:text-blue"
  >
    {encodedTargetUrl}
  </button>
</Link>

 

   <div>
   </div>
   
  </div>
</div>




   
   
      <div className="flex flex-col items-center justify-between lg:flex-row bg-white shadow-sm
       rounded-md   lg:space-x-4
      lg:space-y-0 space-y-10 p-[20px] ">
        <div className=" lg:mb-5 lg:w-1/2 mt-0 ">
        <DataTable
          columns={columns}
          data={filteredData} // Use filteredData for the table
          pagination
          highlightOnHover
          paginationPerPage={5}
          paginationRowsPerPageOptions={[5, 10, 20, 50, 100]}
          striped
          customStyles={{
            rows: {
              style: {
                minHeight: '72px', // Override the row height if necessary
              },
            },
            headCells: {
              style: {
                backgroundColor: '#ba9934', // Customize the header background and text color
                color: '#FFF',
              },
            },
          }}
          onRowClicked={handleRowClicked}
        />
        </div>
        <div className="lg:mb-0 lg:w-1/2 mt-0 md:mt-5 mb-[-10]" ref={chartRef}>
        <Chart options={chartOptions} series={chartSeries} type="line" height={250} />
        
      </div>

     
      </div>
      {selectedQueryId && <TargetDetails query={selectedQuery} />}


    

    </div>
  
  );
};

export default TargetPage;
