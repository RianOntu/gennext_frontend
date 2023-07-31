import React from 'react';
import './DashboardLayout.css';
import Sidenav from '../Sidenav/Sidenav';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
    return (
        <div>
        <div className="row">
            <div className="sidenav h-100">
                <Sidenav></Sidenav>
            </div>
            <div className="outlet h-100">
                <Outlet></Outlet>
            </div>
        </div>
        
    </div>
    );
};

export default DashboardLayout;