import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout';
import Login from './pages/auth/Login';
import { useSelector } from 'react-redux';
import PrivateRoutes from './utils/PrivateRoutes';
import Register from './pages/auth/Register';
import  DetailsPage  from './pages/DetailsPage';
import TargetPage from './pages/TargetPage';
import { ToastContainer } from 'react-toastify';

const App = () => {
  // const isAuth =useSelector(state => state?.authSlice?.user?.isAuth);
  const isAuth = useSelector((state) => state?.authSlice?.user?.id);
console.log("iam "+isAuth)
  return (
    <div>
      
      <ToastContainer 
      position="top-right"

  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={true}
  pauseOnFocusLoss
  draggable
  pauseOnHover
/>
      <Routes>
          <Route element={<PrivateRoutes />}>
          <Route path='/*' element={<Layout />} />
          <Route path="/details/:userId/" element={<DetailsPage/>} />
          <Route path="/targets/:userId/" element={<TargetPage/>} />

          </Route>
        {/* <Route path='/login/*' element={isAuth ? <Route path="/" element={<Layout/>} />
          
          : <Login />} /> */}


<Route path='/login' element={isAuth ? <Navigate to="/" /> : <Login />} />

        
        <Route path='/register' element={isAuth ? <Navigate to="/" />: <Register />} />

       
      </Routes>
     
    </div>
  );
};

export default App;
