import React from 'react';
import Cacheing from '../components/keywordresearch/Cacheing';
import Bookmarking from '../components/Bookmark/Bookmarking';
import QueriesDisplayBox from '../components/Quires/Query';
import {  useState } from 'react';
import QueriesDisplay from '../components/Quires/Query';
import TargetBox from '../components/TargetBox';

const Main = () => {

  return (
    <div className=' w-full  pt-0 bg-gray-200 '>
          <div className=" mx-auto  p-[20px] mt-[3rem] ">
         <div className='grid grid-cols-1 
         sm:grid-cols-2 md:grid-cols-4   '>
          <Cacheing/>      
          <Bookmarking/> 
          <Cacheing/>

          <Bookmarking/>  
      </div>
<div className=' flex flex-col  lg:flex-row items-center justify-center space-x-3 p-4'>

          <QueriesDisplay/>
          <TargetBox/>
</div>
</div>
 




   
    </div>
  );
};

export default Main;
