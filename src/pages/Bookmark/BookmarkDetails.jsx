import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import Chart from 'react-apexcharts';
import { useSelector } from 'react-redux';
import uniqBy from 'lodash/uniqBy';
import * as XLSX from 'xlsx';
import { format, parseISO } from 'date-fns';
import html2canvas from 'html2canvas';

const BookmarkDetails = () => {
    const chartRef = useRef(null); // Add this line

  const [favosData, setFavosData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = useSelector(state => state?.authSlice?.id);
  const { bookmarkId } = useParams();
  const [selectedPeriod, setSelectedPeriod] = useState('day');
  const [yAxisMin, setYAxisMin] = useState(0);
  const [yAxisMax, setYAxisMax] = useState(100);

  useEffect(() => {
    const fetchFavosData = async () => {
      try {
        const favosResponse = await axios.get(`${process.env.REACT_APP_API_URL}/api/DisplayFavos/${userId}/${bookmarkId}/`);
        console.log(favosResponse);
        if (favosResponse.status === 200) {
          setFavosData(favosResponse.data);
        } else {
          console.error('Error fetching favos data:', favosResponse.statusText);
        }
      } catch (error) {
        console.error('Error fetching favos data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavosData();
  }, [userId, bookmarkId]);

  useEffect(() => {
    handleFilter(selectedPeriod);
  }, [favosData, selectedPeriod]);

  const handleFilter = (period) => {
    const currentDate = new Date();
    let startDate;

    if (period === 'day') {
      startDate = new Date(currentDate);
      startDate.setHours(0, 0, 0, 0);
    } else if (period === 'week') {
      startDate = new Date(currentDate);
      startDate.setDate(currentDate.getDate() - 6);
    } else if (period === 'month') {
      startDate = new Date(currentDate);
      startDate.setDate(currentDate.getDate() - 30);
    } else {
      startDate = new Date(currentDate);
    }

    const filtered = favosData.filter(item => {
      const itemDate = new Date(item.rank.date);
      return itemDate >= startDate && itemDate <= currentDate;
    });

    // Remove duplicates based on 'rank.query'
    const uniqueFilteredData = uniqBy(filtered, 'rank.query');

    setFilteredData(uniqueFilteredData);

    const minRank = Math.min(...uniqueFilteredData.map(item => item.rank.rank));
    const maxRank = Math.max(...uniqueFilteredData.map(item => item.rank.rank));

    setYAxisMin(Math.max(0, minRank - 5)); // Adjust as needed
    setYAxisMax(maxRank + 5); // Adjust as needed
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color={'#2563EB'} loading={loading} size={50} />
        <p className="text-lg text-black ml-2">Loading...</p>
      </div>
    );
  }

  const tableColumns = [
    { name: 'Rank', selector: 'rank.rank' },
    { name: 'Query', selector: 'rank.query' },
    { 
      name: 'Target URL', 
      selector: 'rank.target_url',
      cell: (row) => (
        <div className='cursor-pointer font-semibold'>
          {row && row.rank && row.rank.target_url ? (
            <Link 
              to={`/targets/${userId}/${encodeURIComponent(row.rank.target_url)}/`}
              className="text-blue "
            >
              {row.rank.target_url.replace(/^(https?:\/\/)?(www\.)?/, '').replace(/\/$/, '')}
            </Link>
          ) : null}
        </div>
      ),
    },
    { name: 'Date', selector: 'rank.date', format: row => new Date(row.rank.date).toLocaleDateString() },
  ];

  const chartData = filteredData.map((favItem) => ({
    x: new Date(favItem.rank.date).getTime(),
    y: favItem.rank.rank,
  }));

  const chartOptions = {
    chart: {
      id: 'chart-id',
      type: 'line',
      zoom: {
        enabled: false,
      },
      dropShadow: {
        enabled: true,
        color: '#000',
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2,
      },
    },
    xaxis: {
      title: {
        text: 'Date',
      },
      reversed: true,
      type: 'datetime',
    },
    yaxis: {
      title: {
        text: 'Rank',
      },
      labels: {
        formatter: (value) => value.toFixed(0),
      },
      reversed: true,
      min: yAxisMin,
      max: yAxisMax,
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
      },
      dropShadow: {
        enabled: false,
        top: 1,
        left: 1,
        blur: 1,
        color: '#000',
        opacity: 0.45,
      },
    },
  };
  const exportToExcel = async () => {
    const wb = XLSX.utils.book_new();
    const wsData = [];
    wsData.push(['Date', 'Rank (Win)']);
    filteredData.forEach((item) => {
      wsData.push([format(parseISO(item.rank.date), 'MMM. d, yyyy'), item.rank.rank]);
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
    const chartWs = XLSX.utils.json_to_sheet([{ image: chartImage }]);
    XLSX.utils.book_append_sheet(wb, chartWs, 'Chart');
  
    // Save the workbook as an Excel file
    XLSX.writeFile(wb, `QueryData_${bookmarkId}.xlsx`);
  };
  
  return (
    <div className="relative flex flex-col min-h-screen z-[100] bg-white max-w-screen-xl mx-auto p-4 mt-[4rem]">
      <div className="mt-8 text-center mb-[60px]">
        {/* Additional components or content can be added here */}
      </div>

      <div className="text-black p-2 rounded-lg flex justify-between items-center space-x-2 lg:w-full w-[70%] mx-auto">
        <div className="flex items-center space-x-2 justify-center">
          <button
            className={`px-7 py-2 text-sm font-bold rounded-md transition-colors duration-300 ${
              selectedPeriod === 'day' ? 'bg-blue text-white shadow-sm' : 'bg-white text-blue hover:bg-blue hover:text-white hover:shadow'
            }`}
            onClick={() => {
              setSelectedPeriod('day');
              handleFilter('day');
            }}
          >
            Today
          </button>
          <button
            className={`px-7 py-2 text-sm font-bold rounded-md transition-colors duration-300 ${
              selectedPeriod === 'week' ? 'bg-blue text-white shadow-sm' : 'bg-white text-blue hover:bg-blue hover:text-white hover:shadow'
            }`}
            onClick={() => {
              setSelectedPeriod('week');
              handleFilter('week');
            }}
          >
            Week
          </button>
          <button
            className={`px-7 py-2 text-sm font-bold rounded-md transition-colors duration-300 ${
              selectedPeriod === 'month' ? 'bg-blue text-white shadow-sm' : 'bg-white text-blue hover:bg-blue hover:text-white hover:shadow'
            }`}
            onClick={() => {
              setSelectedPeriod('month');
              handleFilter('month');
            }}
          >
            Month
          </button>
        </div>

      <div>
      <button
         onClick={exportToExcel}

      className="bg-green-500 text-white px-2 py-1 rounded-lg border border-green-500 ml-2 hover:bg-green-600 hover:text-white transition-all ease-in-out duration-300"
    >
      Export to Excel
    </button>
        </div>
      </div>
      

  


 

   

   

      <div className="flex flex-col items-center justify-between lg:flex-row bg-white shadow-sm rounded-md lg:space-x-4 lg:space-y-0 space-y-10 p-[20px]">
        <div className="lg:mb-5 lg:w-1/2 mt-0">
          <DataTable
            columns={tableColumns}
            data={filteredData}
            pagination
            highlightOnHover
            paginationPerPage={5}
            paginationRowsPerPageOptions={[5, 10, 20, 50, 100]}
            striped
            customStyles={{
              rows: {
                style: {
                  minHeight: '72px',
                },
              },
              headCells: {
                style: {
                  backgroundColor: '#ba9934',
                  color: '#FFF',
                },
              },
            }}
          />
        </div>

      
<div className="lg:mb-0 lg:w-1/2 mt-0 md:mt-5 mb-[-10]" ref={chartRef}>
  <Chart options={chartOptions} series={[{ data: chartData }]} type="line" height={250} />
</div>

      </div>
    </div>
  );
};

export default BookmarkDetails;
