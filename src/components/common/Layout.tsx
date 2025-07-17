import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import Notifications from './Notifications';
import { useLocation } from 'react-router-dom';


const Layout: React.FC = () => {
  const location = useLocation();
  // Hide header/footer for admin panel route
  const isAdminPanel = location.pathname.startsWith('/admin');
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {!isAdminPanel && <Header />}
      <main className="flex-1">
        <Outlet />
      </main>
      {!isAdminPanel && <Footer />}
      <Notifications />
    </div>
  );
};

export default Layout;