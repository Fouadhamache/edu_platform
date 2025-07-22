import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout: React.FC = () => {
  const location = useLocation();
  
  // Don't show footer on student interface pages
  const hideFooterPaths = ['/dashboard', '/profile', '/progress', '/saved-lessons', '/subscription', '/summaries', '/tests', '/assignments', '/chatbot'];
  const isSubjectPage = location.pathname.includes('/semester/') && location.pathname.includes('/subject/');
  const shouldHideFooter = hideFooterPaths.some(path => location.pathname.startsWith(path)) || isSubjectPage;
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      {!shouldHideFooter && <Footer />}
    </div>
  );
};

export default Layout;