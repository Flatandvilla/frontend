import React from 'react';
import DataTableComponent from '../components/DataTable';
// import { TabsCustomAnimation } from '../components/Tabs/queryTabs';

const Dashboard = () => {

  return (
    <div className=' w-full min-h-screen mx-auto pt-0 dark:bg-gray-400 '>
      <DataTableComponent  />
    </div>
  );
};

export default Dashboard;
