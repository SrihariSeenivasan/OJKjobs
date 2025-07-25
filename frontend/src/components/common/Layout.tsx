import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import Notifications from './Notifications';
import { useLocation } from 'react-router-dom';


const Layout: React.FC = () => {
  const location = useLocation();
  const path = location.pathname.toLowerCase();
  // Hide header/footer for admin panel, login, register, profile-setup, and all /auth* routes
  const hideHeaderFooter =
    path.startsWith('/admin') ||
    path === '/login' ||
    path === '/register' ||
    path === '/profile-setup' ||
    path.startsWith('/auth') ||
    path === '/jobseekerlogin' ||
    path === '/employerlogin';
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {!hideHeaderFooter && <Header />}
      <main className="flex-1">
        <Outlet />
      </main>
      {!hideHeaderFooter && <Footer />}
      <Notifications />
      <Chatbot />
    </div>
  );
};

import Chatbot from './Chatbot';
export default Layout;