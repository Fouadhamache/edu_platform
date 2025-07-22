import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, GraduationCap, Calendar, Edit2, Save, X, Shield, TrendingUp, BookOpen } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { EDUCATION_LEVELS } from '../types/education';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user?.name || '');
  
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const handleSave = () => {
    // Here you would typically update the user data
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedName(user?.name || '');
    setIsEditing(false);
  };

  if (!user) return null;

  const educationLevel = EDUCATION_LEVELS[user.education.level];
  const streamName = user.education.level === 'secondary' && user.education.stream 
    ? EDUCATION_LEVELS.secondary.streams[user.education.stream]
    : null;

  // Get technical specialization name if applicable
  const technicalSpecializationName = user.education.level === 'secondary' && 
    user.education.stream === 'technical-mathematics' && 
    user.education.technicalSpecialization
    ? EDUCATION_LEVELS.secondary.technicalSpecializations[user.education.technicalSpecialization]
    : null;

  // Get foreign language choice name if applicable
  const foreignLanguageName = user.education.level === 'secondary' && 
    user.education.stream === 'foreign-languages' && 
    user.education.foreignLanguageChoice
    ? EDUCATION_LEVELS.secondary.foreignLanguageChoices[user.education.foreignLanguageChoice]
    : null;

  return (
    <div className="max-w-4xl mx-auto py-6 lg:py-12 px-3 sm:px-4 lg:px-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="mb-6 lg:mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
            <User className="w-6 h-6 lg:w-8 lg:h-8 ml-2 text-primary-600 dark:text-primary-400" />
            الملف الشخصي
          </h1>
          <p className="text-gray-600 dark:text-gray-300">إدارة معلومات حسابك الشخصي</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="card text-center">
              <div className="flex justify-center mb-4 lg:mb-6">
                <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                  <User className="w-10 h-10 lg:w-12 lg:h-12 text-primary-600 dark:text-primary-400" />
                </div>
              </div>
              
              {isEditing ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="input-field text-center"
                    placeholder="الاسم"
                  />
                  <div className="flex justify-center space-x-2 space-x-reverse">
                    <button
                      onClick={handleSave}
                      className="btn-primary flex items-center text-sm"
                    >
                      <Save className="w-4 h-4 ml-1" />
                      حفظ
                    </button>
                    <button
                      onClick={handleCancel}
                      className="btn-secondary flex items-center text-sm"
                    >
                      <X className="w-4 h-4 ml-1" />
                      إلغاء
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <h2 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-2">{user.name}</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm lg:text-base">{user.email}</p>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="btn-secondary flex items-center mx-auto text-sm"
                  >
                    <Edit2 className="w-4 h-4 ml-1" />
                    تعديل الملف
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Information Cards */}
          <div className="lg:col-span-2 space-y-6">
            {/* Account Information */}
            <div className="card">
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 dark:text-white mb-4 lg:mb-6 flex items-center">
                <Shield className="w-5 h-5 ml-2 text-primary-600 dark:text-primary-400" />
                معلومات الحساب
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    الاسم الكامل
                  </label>
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span className="text-gray-900 dark:text-white text-sm lg:text-base">{user.name}</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    البريد الإلكتروني
                  </label>
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center">
                    <Mail className="w-4 h-4 ml-2 text-gray-500" />
                    <span className="text-gray-900 dark:text-white text-sm lg:text-base">{user.email}</span>
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    تاريخ إنشاء الحساب
                  </label>
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center">
                    <Calendar className="w-4 h-4 ml-2 text-gray-500" />
                    <span className="text-gray-900 dark:text-white text-sm lg:text-base">
                      {new Date(user.createdAt).toLocaleDateString('ar-DZ')}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Educational Information */}
            <div className="card">
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 dark:text-white mb-4 lg:mb-6 flex items-center">
                <GraduationCap className="w-5 h-5 ml-2 text-primary-600 dark:text-primary-400" />
                المعلومات التعليمية
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    المستوى التعليمي
                  </label>
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span className="text-gray-900 dark:text-white text-sm lg:text-base">{educationLevel.name}</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    السنة الدراسية
                  </label>
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span className="text-gray-900 dark:text-white text-sm lg:text-base">السنة {user.education.year}</span>
                  </div>
                </div>
                
                {streamName && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      الشعبة
                    </label>
                    <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span className="text-gray-900 dark:text-white text-sm lg:text-base">{streamName}</span>
                    </div>
                  </div>
                )}

                {technicalSpecializationName && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      التخصص الهندسي
                    </label>
                    <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span className="text-gray-900 dark:text-white text-sm lg:text-base">{technicalSpecializationName}</span>
                    </div>
                  </div>
                )}

                {foreignLanguageName && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      اللغة الأجنبية الثالثة
                    </label>
                    <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span className="text-gray-900 dark:text-white text-sm lg:text-base">{foreignLanguageName}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Account Statistics */}
            <div className="card">
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 dark:text-white mb-4 lg:mb-6 flex items-center">
                <TrendingUp className="w-5 h-5 ml-2 text-primary-600 dark:text-primary-400" />
                إحصائيات الحساب
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
                <div className="text-center p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                  <div className="flex justify-center mb-2">
                    <BookOpen className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div className="text-xl lg:text-2xl font-bold text-primary-600 dark:text-primary-400 mb-1">24</div>
                  <div className="text-xs lg:text-sm text-gray-600 dark:text-gray-300">دروس مكتملة</div>
                </div>
                
                <div className="text-center p-4 bg-success-50 dark:bg-success-900/20 rounded-lg">
                  <div className="flex justify-center mb-2">
                    <TrendingUp className="w-6 h-6 text-success-600 dark:text-success-400" />
                  </div>
                  <div className="text-xl lg:text-2xl font-bold text-success-600 dark:text-success-400 mb-1">18</div>
                  <div className="text-xs lg:text-sm text-gray-600 dark:text-gray-300">اختبارات مجتازة</div>
                </div>
                
                <div className="text-center p-4 bg-warning-50 dark:bg-warning-900/20 rounded-lg">
                  <div className="flex justify-center mb-2">
                    <BookOpen className="w-6 h-6 text-warning-600 dark:text-warning-400" />
                  </div>
                  <div className="text-xl lg:text-2xl font-bold text-warning-600 dark:text-warning-400 mb-1">12</div>
                  <div className="text-xs lg:text-sm text-gray-600 dark:text-gray-300">دروس محفوظة</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;