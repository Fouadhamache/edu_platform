import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  LogOut, 
  Settings, 
  Users, 
  BookOpen, 
  Home,
  Sun,
  Moon,
  User,
  ChevronDown,
  BarChart3
} from 'lucide-react';
import { useAdmin } from '../../contexts/AdminContext';
import { useTheme } from '../../contexts/ThemeContext';

const AdminLayout: React.FC = () => {
  const { adminUser, adminLogout } = useAdmin();
  const { isDark, toggleTheme } = useTheme();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const sidebarItems = [
    { id: 'dashboard', label: 'لوحة التحكم', icon: Home, path: '/admin/dashboard' },
    { id: 'teachers', label: 'إدارة المعلمين', icon: Users, path: '/admin/teachers' },
    { id: 'lessons', label: 'إدارة الدروس', icon: BookOpen, path: '/admin/create-lesson' },
    { id: 'analytics', label: 'الإحصائيات', icon: BarChart3, path: '/admin/analytics' },
  ];

  const handleLogout = () => {
    adminLogout();
    navigate('/admin/login');
    setIsProfileOpen(false);
  };

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {/* Desktop Sidebar - Only show on xl screens (1280px+) */}
      <div className="hidden xl:flex xl:flex-col xl:w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-luxury">
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-red-600 dark:bg-red-500 rounded-xl flex items-center justify-center mr-3">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">لوحة الإدارة</h1>
              <p className="text-sm text-gray-600 dark:text-gray-300">منصة قلم</p>
            </div>
          </div>
        </div>

        {/* Admin Profile Section */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center mr-3">
              <User className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {adminUser?.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">مدير المنصة</p>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-6">
          <div className="space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.path)}
                className={`w-full flex items-center p-4 rounded-xl transition-all ${
                  isActivePath(item.path)
                    ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-luxury'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <item.icon className="w-5 h-5 ml-3" />
                <span className="text-base font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Bottom Actions */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-600 dark:text-gray-300">الوضع</span>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {isDark ? <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" /> : <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />}
            </button>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center py-3 px-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
          >
            <LogOut className="w-5 h-5 ml-2" />
            تسجيل الخروج
          </button>
        </div>
      </div>

      {/* Mobile Header - Show on screens smaller than xl */}
      <div className="xl:hidden fixed top-0 left-0 right-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 p-4 flex items-center justify-between z-50">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center mr-3">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">لوحة الإدارة</h1>
          </div>
        </div>
        
        <div className="flex items-center space-x-3 space-x-reverse">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-colors"
          >
            {isDark ? <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" /> : <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />}
          </button>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center space-x-2 space-x-reverse p-2 rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-colors"
          >
            <ChevronDown className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {adminUser?.name}
            </span>
            <div className="w-6 h-6 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Profile Dropdown */}
      <AnimatePresence>
        {isProfileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="xl:hidden fixed top-20 left-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-luxury border border-gray-200/50 dark:border-gray-700/50 z-40"
          >
            <div className="p-4">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center mr-3">
                  <User className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{adminUser?.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">مدير المنصة</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <button
                  onClick={() => {
                    navigate('/');
                    setIsProfileOpen(false);
                  }}
                  className="w-full flex items-center p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 rounded-lg transition-colors"
                >
                  <Settings className="w-5 h-5 ml-3" />
                  عرض المنصة
                </button>
                <hr className="my-2 border-gray-200/50 dark:border-gray-600/50" />
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center p-3 text-red-600 dark:text-red-400 hover:bg-red-50/50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  <LogOut className="w-5 h-5 ml-3" />
                  تسجيل الخروج
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Add top padding on mobile to account for fixed header */}
        <main className="flex-1 overflow-auto pt-20 xl:pt-0 pb-24 xl:pb-0">
          <Outlet />
        </main>
      </div>

      {/* Glassmorphism Bottom Navigation - Only show on screens smaller than xl */}
      <div className="xl:hidden fixed bottom-2 left-2 right-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200/30 dark:border-gray-700/30 shadow-luxury z-40 rounded-2xl">
        <div className="grid grid-cols-4 h-16">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.path)}
              className={`flex flex-col items-center justify-center space-y-1 transition-all rounded-2xl ${
                isActivePath(item.path)
                  ? 'text-gray-900 dark:text-white bg-gray-100/50 dark:bg-gray-700/50'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Overlay */}
      {isProfileOpen && (
        <div 
          className="xl:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
          onClick={() => setIsProfileOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout;