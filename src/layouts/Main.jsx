import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Shared/Navbar/Navbar';
import Footer from '../components/Shared/Footer/Footer';

const Main = () => {
    return (
        <div className="bg-white w-full mx-auto">
        <Navbar></Navbar>
        <div className="pt-22 min-h-[calc(100vh-68px)]">
           <Outlet />
         </div>
         <Footer></Footer>
     </div>
    );
};

export default Main;