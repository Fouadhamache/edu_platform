import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  FileText, 
  Target, 
  ClipboardList, 
  MessageCircle,
  User,
  LogOut,
  Menu,
  X,
  Sun,
  Moon,
  Settings,
  TrendingUp,
  Heart,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

const StudentLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const sidebarItems = [
    { id: 'dashboard', label: 'الرئيسية', icon: Home, path: '/dashboard' },
    { id: 'assignments', label: 'الواجبات', icon: ClipboardList, path: '/assignments' },
    { id: 'tests', label: 'الاختبارات', icon: Target, path: '/tests' },
    { id: 'summaries', label: 'الملخصات', icon: FileText, path: '/summaries' },
    { id: 'chatbot', label: 'المساعد الذكي', icon: MessageCircle, path: '/chatbot' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsProfileOpen(false);
    setIsSidebarOpen(false);
  };

  const getDisplayName = () => {
    if (!user) return '';
    
    if (user.name.includes('(ولي أمر')) {
      const match = user.name.match(/\(ولي أمر (.+)\)/);
      return match ? match[1] : user.name;
    }
    
    return user.name;
  };

  const isActivePath = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard' || location.pathname.includes('/semester/');
    }
    return location.pathname === path;
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-luxury">
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gray-900 dark:bg-white rounded-xl flex items-center justify-center mr-3">
              <span className="text-lg font-bold text-white dark:text-gray-900">ق</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">منصة قلم</h1>
              <p className="text-sm text-gray-600 dark:text-gray-300">للتعليم الذكي</p>
            </div>
          </div>
        </div>

        {/* User Profile Section */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center mr-3">
              <span className="text-lg font-bold text-gray-600 dark:text-gray-300">
                {getDisplayName().charAt(0)}
              </span>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {getDisplayName()}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">طالب</p>
            </div>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ChevronRight className={`w-4 h-4 text-gray-500 transition-transform ${isProfileOpen ? 'rotate-90' : ''}`} />
            </button>
          </div>
          
          {/* Profile Dropdown */}
          <AnimatePresence>
            {isProfileOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-2"
              >
                <button
                  onClick={() => {
                    navigate('/profile');
                    setIsProfileOpen(false);
                  }}
                  className="w-full flex items-center p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-sm"
                >
                  <Settings className="w-4 h-4 ml-3" />
                  الملف الشخصي
                </button>
                <button
                  onClick={() => {
                    navigate('/progress');
                    setIsProfileOpen(false);
                  }}
                  className="w-full flex items-center p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-sm"
                >
                  <TrendingUp className="w-4 h-4 ml-3" />
                  التقدم الدراسي
                </button>
                <button
                  onClick={() => {
                    navigate('/saved-lessons');
                    setIsProfileOpen(false);
                  }}
                  className="w-full flex items-center p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-sm"
                >
                  <Heart className="w-4 h-4 ml-3" />
                  الدروس المحفوظة
                </button>
              </motion.div>
            )}
          </AnimatePresence>
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

      {/* Mobile Header */}
      <div className="lg:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-900 dark:bg-white rounded-lg flex items-center justify-center mr-3">
            <span className="text-sm font-bold text-white dark:text-gray-900">ق</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">منصة قلم</h1>
          </div>
        </div>
        
        <div className="flex items-center space-x-3 space-x-reverse">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {isDark ? <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" /> : <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />}
          </button>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center"
          >
            <span className="text-sm font-bold text-gray-600 dark:text-gray-300">
              {getDisplayName().charAt(0)}
            </span>
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
            className="lg:hidden absolute top-16 left-4 right-4 bg-white dark:bg-gray-800 rounded-xl shadow-luxury border border-gray-200 dark:border-gray-700 z-50"
          >
            <div className="p-4">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center mr-3">
                  <span className="text-lg font-bold text-gray-600 dark:text-gray-300">
                    {getDisplayName().charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{getDisplayName()}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">طالب</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <button
                  onClick={() => {
                    navigate('/profile');
                    setIsProfileOpen(false);
                  }}
                  className="w-full flex items-center p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <Settings className="w-5 h-5 ml-3" />
                  الملف الشخصي
                </button>
                <button
                  onClick={() => {
                    navigate('/progress');
                    setIsProfileOpen(false);
                  }}
                  className="w-full flex items-center p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <TrendingUp className="w-5 h-5 ml-3" />
                  التقدم الدراسي
                </button>
                <button
                  onClick={() => {
                    navigate('/saved-lessons');
                    setIsProfileOpen(false);
                  }}
                  className="w-full flex items-center p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <Heart className="w-5 h-5 ml-3" />
                  الدروس المحفوظة
                </button>
                <hr className="my-2 border-gray-200 dark:border-gray-600" />
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center p-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
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
        {/* Page Content */}
        <main className="flex-1 overflow-auto pb-20 lg:pb-0">
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-luxury z-40">
        <div className="grid grid-cols-5 h-16">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.path)}
              className={`flex flex-col items-center justify-center space-y-1 transition-all ${
                isActivePath(item.path)
                  ? 'text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700'
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
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsProfileOpen(false)}
        />
      )}
    </div>
  );
};

export default StudentLayout;