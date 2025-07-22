import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, Sun, Moon, Settings, LogOut, BookMarked, TrendingUp } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTrial } from '../../contexts/TrialContext';
import { useTheme } from '../../contexts/ThemeContext';
import TrialTimer from '../subscription/TrialTimer';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const { isTrialActive, hasSubscription } = useTrial();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const handleLogout = () => {
    logout();
    navigate('/');
    setIsProfileOpen(false);
  };

  // Extract student name for display
  const getDisplayName = () => {
    if (!user) return '';
    
    // If it's a guardian account, extract student name
    if (user.name.includes('(ولي أمر')) {
      const match = user.name.match(/\(ولي أمر (.+)\)/);
      return match ? match[1] : user.name;
    }
    
    return user.name;
  };
  
  return (
    <nav className="bg-white dark:bg-gray-900 shadow-luxury sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex justify-between h-14 lg:h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <svg 
                className="h-8 w-auto lg:h-10 text-gray-900 dark:text-white" 
                viewBox="0 0 414 189"
                fill="currentColor"
              >
                <use href="/logo.svg#Calque_1" />
              </svg>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-4 space-x-reverse">
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {isAuthenticated && isTrialActive && (
              <div className="ml-4">
                <TrialTimer />
              </div>
            )}
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-4 space-x-reverse">
                {(hasSubscription || isTrialActive) && (
                  <Link 
                    to="/dashboard" 
                    className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors font-medium rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    ادرس الآن
                  </Link>
                )}
                
                <div className="relative">
                  <button 
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-2 space-x-reverse text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors rounded-xl p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <User className="w-5 h-5" />
                    <span className="font-medium">{getDisplayName()}</span>
                  </button>
                  
                  {isProfileOpen && (
                    <div className="absolute left-0 mt-2 w-56 rounded-2xl shadow-luxury py-2 bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 border border-gray-200 dark:border-gray-700">
                      <Link 
                        to="/profile"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <Settings className="w-4 h-4 ml-2" />
                        الملف الشخصي
                      </Link>
                      <Link 
                        to="/progress"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <TrendingUp className="w-4 h-4 ml-2" />
                        التقدم الدراسي
                      </Link>
                      <Link 
                        to="/saved-lessons"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <BookMarked className="w-4 h-4 ml-2" />
                        الدروس المحفوظة
                      </Link>
                      <hr className="my-2 border-gray-200 dark:border-gray-600" />
                      <button 
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <LogOut className="w-4 h-4 ml-2" />
                        تسجيل الخروج
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4 space-x-reverse">
                <Link 
                  to="/login" 
                  className="btn-secondary"
                >
                  تسجيل الدخول
                </Link>
                <Link 
                  to="/register" 
                  className="btn-primary"
                >
                  إنشاء حساب
                </Link>
              </div>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden space-x-2 space-x-reverse">
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors rounded-xl"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button 
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-xl text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none transition-colors"
            >
              {isMenuOpen ? (
                <X className="block h-5 w-5" />
              ) : (
                <Menu className="block h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <div className="px-3 pt-2 pb-3 space-y-1">
            {isAuthenticated ? (
              <>
                {isTrialActive && (
                  <div className="px-3 py-2">
                    <TrialTimer />
                  </div>
                )}
                
                {(hasSubscription || isTrialActive) && (
                  <Link 
                    to="/dashboard" 
                    className="block px-3 py-3 rounded-xl text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    ادرس الآن
                  </Link>
                )}
                
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 pb-3">
                  <div className="px-4">
                    <div className="text-base font-medium text-gray-800 dark:text-gray-200">{getDisplayName()}</div>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">{user?.email}</div>
                  </div>
                  <div className="mt-3 space-y-1">
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors rounded-xl mx-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Settings className="w-5 h-5 ml-2" />
                      الملف الشخصي
                    </Link>
                    <Link
                      to="/progress"
                      className="flex items-center px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors rounded-xl mx-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <TrendingUp className="w-5 h-5 ml-2" />
                      التقدم الدراسي
                    </Link>
                    <Link
                      to="/saved-lessons"
                      className="flex items-center px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors rounded-xl mx-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <BookMarked className="w-5 h-5 ml-2" />
                      الدروس المحفوظة
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center w-full text-right px-4 py-3 text-base font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors rounded-xl mx-2"
                    >
                      <LogOut className="w-5 h-5 ml-2" />
                      تسجيل الخروج
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="space-y-2 px-3 py-2">
                <Link 
                  to="/login" 
                  className="block btn-secondary w-full text-center py-3"
                  onClick={() => setIsMenuOpen(false)}
                >
                  تسجيل الدخول
                </Link>
                <Link 
                  to="/register" 
                  className="block btn-primary w-full text-center py-3"
                  onClick={() => setIsMenuOpen(false)}
                >
                  إنشاء حساب
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;