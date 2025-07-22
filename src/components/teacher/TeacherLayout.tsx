import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { GraduationCap, LogOut, BookOpen, Home, Plus, User } from 'lucide-react';
import { useTeacher } from '../../contexts/TeacherContext';
import { useTheme } from '../../contexts/ThemeContext';

const TeacherLayout: React.FC = () => {
  const { currentTeacher, teacherLogout } = useTeacher();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    teacherLogout();
    navigate('/teacher/login');
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Teacher Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center">
                <GraduationCap className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                <span className="mr-2 text-xl font-bold text-gray-900 dark:text-white">
                  منصة المعلمين
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 space-x-reverse">
              <button
                onClick={toggleTheme}
                className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {isDark ? '☀️' : '🌙'}
              </button>
              
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {currentTeacher?.name}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {currentTeacher?.specialization}
                  </div>
                </div>
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
      
      {/* Teacher Navigation */}
      <nav className="bg-blue-600 dark:bg-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 space-x-reverse">
            <button
              onClick={() => navigate('/teacher/dashboard')}
              className="flex items-center px-3 py-4 text-sm font-medium text-white hover:text-blue-100 transition-colors"
            >
              <Home className="w-4 h-4 ml-2" />
              الرئيسية
            </button>
            <button
              onClick={() => navigate('/teacher/create-lesson')}
              className="flex items-center px-3 py-4 text-sm font-medium text-white hover:text-blue-100 transition-colors"
            >
              <Plus className="w-4 h-4 ml-2" />
              إنشاء درس
            </button>
            <button
              onClick={() => navigate('/')}
              className="flex items-center px-3 py-4 text-sm font-medium text-white hover:text-blue-100 transition-colors"
            >
              <User className="w-4 h-4 ml-2" />
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

export default TeacherLayout;