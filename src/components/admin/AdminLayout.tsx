import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Shield, LogOut, Settings, Users, BookOpen, Home } from 'lucide-react';
import { useAdmin } from '../../contexts/AdminContext';
import { useTheme } from '../../contexts/ThemeContext';

const AdminLayout: React.FC = () => {
  const { adminUser, adminLogout } = useAdmin();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    adminLogout();
    navigate('/admin/login');
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Admin Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center">
                <Shield className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                <span className="mr-2 text-xl font-bold text-gray-900 dark:text-white">
                  لوحة تحكم المدير
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 space-x-reverse">
              <button
                onClick={toggleTheme}
                className="p-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                {isDark ? '☀️' : '🌙'}
              </button>
              
              <div className="flex items-center space-x-3 space-x-reverse">
                <span className="text-gray-700 dark:text-gray-300">
                  {adminUser?.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                >
                  <LogOut className="w-5 h-5 ml-1" />
                  تسجيل الخروج
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Admin Navigation */}
      <nav className="bg-primary-600 dark:bg-primary-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 space-x-reverse">
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="flex items-center px-3 py-4 text-sm font-medium text-white hover:text-primary-100 transition-colors"
            >
              <Home className="w-4 h-4 ml-2" />
              الرئيسية
            </button>
            <button
              onClick={() => navigate('/admin/teachers')}
              className="flex items-center px-3 py-4 text-sm font-medium text-white hover:text-primary-100 transition-colors"
            >
              <Users className="w-4 h-4 ml-2" />
              إدارة المعلمين
            </button>
            <button
              onClick={() => navigate('/admin/create-lesson')}
              className="flex items-center px-3 py-4 text-sm font-medium text-white hover:text-primary-100 transition-colors"
            >
              <BookOpen className="w-4 h-4 ml-2" />
              إضافة درس
            </button>
            <button
              onClick={() => navigate('/')}
              className="flex items-center px-3 py-4 text-sm font-medium text-white hover:text-primary-100 transition-colors"
            >
              <Users className="w-4 h-4 ml-2" />
              عرض المنصة
            </button>
          </div>
        </div>
      </nav>
      
      {/* Main Content */}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;