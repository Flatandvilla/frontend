
import React, { useEffect, useState ,useRef} from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import Chart from 'react-apexcharts';
import { format, parseISO, isSameDay } from 'date-fns';
import { ClipLoader } from 'react-spinners';
import * as XLSX from 'xlsx';
import html2canvas from 'html2canvas';
import USAFlagImage from '../assets/images/USA.png';
import EgyptFlagImage from '../assets/images/EGYPT.png';
import AEFlagImage from '../assets/images/DUBAI.png';
import Serpanalysis from '../components/Serpanalysis';
import { addDays } from 'date-fns';

const QueryDetails = () => {
  const [selectedData, setSelectedData] = useState(null);
  const [iframeLoading, setIframeLoading] = useState(true); // New state for tracking iframe loading
  const [yAxisMin, setYAxisMin] = useState(0);
const [yAxisMax, setYAxisMax] = useState(100);
  const handleRowClicked = (rowData) => {
    setSelectedData(rowData);
  };
  const chartRef = useRef(null);
  const { userId, encodedQuery, encodedTargetUrl, google_domain } = useParams();
  const [sourceUrl, setSourceUrl] = useState('');
  const [activeTab, setActiveTab] = useState("tab1");
  const [showTabs, setShowTabs] = useState(false);
  const [showIframe, setShowIframe] = useState(false); // State to control iframe visibility
  const navigate = useNavigate();

  const handleTargetUrlClick = () => {
    setShowIframe(true); // Show iframe when button is clicked
    setShowTabs(true); // Show tabs when button is clicked
};
const handleIframeLoad = () => {
  setIframeLoading(false); // Update state to indicate iframe has loaded
};

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('month');

  const [filteredData, setFilteredData] = useState([]);

  const filterButtons = [
    { label: 'Day', value: 'day' },
    { label: 'Week', value: 'week' },
    { label: 'Month', value: 'month' },
  ];
  const handleFilterChange = (newFilterType) => {
    setFilterType(newFilterType);
  };
  
  


// useEffect(() => {
//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch(`${process.env.REACT_APP_API_URL}/api/display-ranks/${userId}/${encodedQuery}/${encodedTargetUrl}/${google_domain}/`);
//       if (response.ok) {
//         const apiData = await response.json();
//         setData(apiData);

//         // Set the last entry of the dataset as the selected row by default
//         if (apiData.length > 0) {
//           setSelectedData(apiData[apiData.length - 1]);
//         }
//       } else {
//         console.error('Error fetching data:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchData();
// }, [userId, encodedQuery, encodedTargetUrl, google_domain]);


useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/display-ranks/${userId}/${encodedQuery}/${encodedTargetUrl}/${google_domain}/`);
      if (response.ok) {
        let apiData = await response.json();
        
        // Sort the data by date to ensure it's in the correct order
        apiData.sort((a, b) => new Date(a.date) - new Date(b.date));
        
        // Calculate rank differences
        apiData = apiData.map((item, index, array) => {
          // Assuming the array is sorted by date
          if (index > 0) {
            const previousRank = array[index - 1].rank;
            const currentRank = item.rank;
            return { ...item, rankDifference: previousRank -  currentRank};
          }
          return { ...item, rankDifference: 0 }; // No difference for the first item
        });
        
        setData(apiData);
        if (apiData.length > 0) {
          setSelectedData(apiData[apiData.length - 1]);
        }
      } else {
        console.error('Error fetching data:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [userId, encodedQuery, encodedTargetUrl, google_domain]);

 
  const filterData = (originalData, type) => {
    const currentDate = new Date();
    return originalData.filter((item) => {
      const itemDate = parseISO(item.date);
      switch (type) {
        case 'day':
          return isSameDay(currentDate, itemDate);
        case 'week':
          return itemDate >= addDays(currentDate, -6); // Last 7 days
        case 'month':
          return itemDate >= addDays(currentDate, -30); // Last 30 days
        default:
          return true;
      }
    });
  };
  useEffect(() => {
    setFilteredData(filterData(data, filterType));
  }, [filterType, data]);


  
  // const columns = [
  //   {
  //     name: 'Date',
  //     selector: (row) => format(parseISO(row.date), 'EEE, MMM d, yyyy'),
  
  //     cell: (row) => (
  //       <span>
  //         {format(parseISO(row.date), 'EEE, MMM d, yyyy')}
  //       </span>
  //     ),
  //   },
  //   {
  //     name: 'Rank ',
  //     selector: (row) => row.rank,
     
  //   },
   

    
  // ];


  const columns = [
    // Existing columns...
    {
      name: 'Date',
      selector: (row) => format(parseISO(row.date), ' MMM d, yyyy'),
      cell: (row) => format(parseISO(row.date), ' MMM d, yyyy'),
    },
    {
      name: 'Rank',
      selector: (row) => row.rank,
    },
    {
      name: 'Difference',
      selector: (row) => row.rankDifference,
      cell: (row) => (
        <div style={{ color: row.rankDifference > 0 ? 'green' : row.rankDifference < 0 ? 'red' : 'black' }}>
          {row.rankDifference > 0 ? `+${row.rankDifference}` : row.rankDifference}
        </div>
      ),
      sortable: true,
    },
  
  ];
  
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
            type: 'datetime',
            title: {
                text: 'Date'
            },
            reversed: true
        },
       
        yaxis: {
          title: {
            text: 'Rank'
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

  const chartSeries = [{
    name: 'Rank',
    data: filteredData.map(item => ({
      x: new Date(item.date).getTime(), // Convert date to timestamp
      y: parseInt(item.rank) // Ensure rank is an integer
    }))
  }];
  

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
    XLSX.writeFile(wb, `QueryData_${encodedQuery}.xlsx`);
  };
  




  return (
   <div className="  relative flex flex-col  min-h-screen md:w-full  z-[100] bg-white 
 p-0  lg-plus:px-[100px] mx-auto   mt-[4rem]">

     

    <h1 className="text-3xl font-bold text-center mt-[10px] mb-[10px]">{encodedQuery}</h1>

     
        <div className="text-black  p-2 rounded-lg flex justify-between 
        items-center space-x-2">
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
          // onClick={handleIframeToggle}
          onClick={handleTargetUrlClick}

    className="px-7 py-2 text-sm rounded-md transition-colors duration-300 bg-blue text-white shadow-sm hover:bg-white hover:text-blue"
  >
    {encodedTargetUrl}
  </button>
</Link>

  <div >
  {google_domain === 'US' && (
    <img className='w-8' src={USAFlagImage} alt="USA" />
  )}
  {google_domain === 'EG' && (
    <img className='w-8' src={EgyptFlagImage} alt="Egypt" />
  )}
  {google_domain === 'AE' && (
    <img className='w-8' src={AEFlagImage} alt="Dubai" />
  )}
    </div>

   <div>
   </div>
   
  </div>
      </div>




   
    {loading ? (
      <div className=" flex lg:flex-col justify-center items-center  mx-auto  h-64">
        <ClipLoader color={'#2563EB'} loading={loading} size={50} />
        <p className="text-lg text-black ml-2">Loading...</p>
      </div>
    ) : (

      <div className="flex flex-col items-center justify-between 
      lg-plus:flex-row bg-white 
       rounded-md   lg:space-x-4
      lg:space-y-0 space-y-10 p-[20px] ">
        <div className=" lg:mb-5 lg-plus:w-[35%] w-[100%] mt-0 ">
          <DataTable
            columns={columns}
            data={filteredData}
            pagination
            paginationPerPage={5}
            striped
            onRowClicked={handleRowClicked}
            highlightOnHover
            customStyles={{
              rows: {
                style: {
                  minHeight: '40px', // override the row height
                },
              },
              headCells: {
                style: {
                  backgroundColor: '#ba9934',
                  color: '#FFF', // white text
                },
              },
           
            }}
          />
        </div>
        <div className="lg:mb-0 w-[100%] lg-plus:w-[65%]  mt-0 md:mt-5  mb-[-10]" ref={chartRef}>
          <Chart
            options={chartOptions}
            series={chartSeries}
            type="line"
            height={250}
            className="shadow-sm bg-white px-3 py-4"


          
          />
        </div>
     
      </div>
    )}


{loading ? (
        <div className="flex lg:flex-col justify-center items-center mx-auto h-64
         ">
          <ClipLoader color={'#2563EB'} loading={loading} size={50} />
          <p className="text-lg text-black ml-2">Loading...</p>
        </div>
      ) : (
        <div className="flex space-x-[70px] w-full ">
          {/* Article Preview Section - 70% Width */}
          <div className="w-[70%]">
            <h1  className='border-b border-blue text-2xl p-3 mb-3 '>Article Preview</h1>
            {iframeLoading && (
              <div className="flex justify-center items-center h-64">
                <ClipLoader color={'#ba9934'} loading={iframeLoading} size={50} />
              </div>
            )}
            <iframe
              src={sourceUrl}
              title="External Content"
              width="100%"
              height="500px"
              frameBorder="0"
              onLoad={handleIframeLoad}
              style={{ display: iframeLoading ? 'none' : 'block' }}
            />
    

          </div>

          {/* SERP Analysis Section - 30% Width */}
          <div className="w-[30%]">
          <h1 className='border-b border-blue text-2xl p-3 mb-3 '>SERP Details</h1>

         {/* <Serpanalysis rowData={selectedData} /> */}
         {selectedData && <Serpanalysis rowData={selectedData} />}

          </div>
        </div>
      )}
    </div>
  
  );
};

export default QueryDetails;
