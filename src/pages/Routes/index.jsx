import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../Dashboard';
import Calender from '../Calender';
import Messages from '../Messages';
import Invoice from '../Invoice';
import Notification from '../Notification';
import Schedule from '../Schedule';
import Account from '../Account';
import { useSelector } from 'react-redux';
import DetailsPage from '../DetailsPage';
import KeywordResearch from '../KeywordResearch';
import FavouriteBookmark from '../../components/Bookmark/FavouriteBookmark';
import KeywordQuery from '../KeywordQuery';
import TargetPage from '../TargetPage';
import KeywordUrl from '../KeywordUrl';
import Comparequery from '../Comparequery';

const Index = () => {
  
  const userId = useSelector(state => state?.authSlice?.user?.id);
  const isAuthenticated = !!userId;
  
  return (
    <Routes>
      <Route path='/' element={<Dashboard />} />
      <Route path='/keywordresearch' element={<KeywordResearch />} />
      <Route path='/keywordquery' element={<KeywordQuery />} />
      <Route path='/Comparequery' element={<Comparequery />} />

      <Route path='/url' element={<KeywordUrl />} />

      <Route path='/invoice' element={<Invoice />} />
      <Route path='/schedule' element={<Schedule />} />
      <Route path='/calender' element={<Calender />} />
      <Route path='/messages' element={<Messages />} />
      <Route path='/notification' element={<Notification />} />
      <Route path='/Account' element={<Account />} />
      <Route path='/favourite' element={<FavouriteBookmark />} />
      <Route
    path="/details/:userId/:encodedQuery/:encodedTargetUrl/:google_domain/"
    element={<DetailsPage />}
  />
  <Route
    path="/targets/:userId/:encodedTargetUrl/" element={<TargetPage />}
    />

    </Routes>
  );
};

export default Index;
