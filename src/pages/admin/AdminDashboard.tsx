import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  BookOpen, 
  GraduationCap, 
  TrendingUp,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import { useAdmin } from '../../contexts/AdminContext';
import { EDUCATION_LEVELS, SUBJECTS_BY_LEVEL } from '../../types/education';

const AdminDashboard: React.FC = () => {
  const { lessons, platformUsers, deleteLesson } = useAdmin();
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'classes' | 'lessons' | 'users'>('overview');

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const filteredLessons = lessons.filter(lesson => {
    const matchesSearch = lesson.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = selectedLevel === 'all' || lesson.level === selectedLevel;
    return matchesSearch && matchesLevel;
  });

  const renderOverview = () => (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      variants={staggerChildren}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="card text-center" variants={fadeIn}>
        <div className="flex justify-center mb-4">
          <Users className="w-8 h-8 text-primary-600 dark:text-primary-400" />
        </div>
        <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
          {platformUsers.length}
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-300">إجمالي المستخدمين</div>
      </motion.div>

      <motion.div className="card text-center" variants={fadeIn}>
        <div className="flex justify-center mb-4">
          <BookOpen className="w-8 h-8 text-success-600 dark:text-success-400" />
        </div>
        <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
          {lessons.length}
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-300">إجمالي الدروس</div>
      </motion.div>

      <motion.div className="card text-center" variants={fadeIn}>
        <div className="flex justify-center mb-4">
          <GraduationCap className="w-8 h-8 text-warning-600 dark:text-warning-400" />
        </div>
        <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
          {platformUsers.filter(u => u.hasSubscription).length}
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-300">المشتركون</div>
      </motion.div>

      <motion.div className="card text-center" variants={fadeIn}>
        <div className="flex justify-center mb-4">
          <TrendingUp className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </div>
        <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
          {platformUsers.filter(u => !u.hasTrialExpired && !u.hasSubscription).length}
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-300">في فترة تجريبية</div>
      </motion.div>
    </motion.div>
  );

  const renderClasses = () => (
    <div className="space-y-8">
      {Object.entries(EDUCATION_LEVELS).map(([level, levelInfo]) => (
        <motion.div 
          key={level}
          className="card"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            {levelInfo.name}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: levelInfo.years }, (_, i) => {
              const year = i + 1;
              const subjects = level === 'secondary' && year > 1 
                ? Object.keys(EDUCATION_LEVELS.secondary.streams).filter(s => !['cst', 'cah'].includes(s))
                : level === 'secondary' && year === 1
                ? ['cst', 'cah']
                : [year.toString()];

              return subjects.map((streamOrYear) => {
                const displayName = level === 'secondary' && year > 1
                  ? `${levelInfo.grades[year as keyof typeof levelInfo.grades]} - ${EDUCATION_LEVELS.secondary.streams[streamOrYear as keyof typeof EDUCATION_LEVELS.secondary.streams]}`
                  : level === 'secondary' && year === 1
                  ? `${levelInfo.grades[year as keyof typeof levelInfo.grades]} - ${EDUCATION_LEVELS.secondary.streams[streamOrYear as keyof typeof EDUCATION_LEVELS.secondary.streams]}`
                  : levelInfo.grades[year as keyof typeof levelInfo.grades];

                const subjectsList = level === 'secondary' 
                  ? SUBJECTS_BY_LEVEL.secondary[streamOrYear as keyof typeof SUBJECTS_BY_LEVEL.secondary] || []
                  : level === 'primary'
                  ? SUBJECTS_BY_LEVEL.primary[year as keyof typeof SUBJECTS_BY_LEVEL.primary] || []
                  : SUBJECTS_BY_LEVEL.middle[year as keyof typeof SUBJECTS_BY_LEVEL.middle] || [];

                return (
                  <div 
                    key={`${level}-${year}-${streamOrYear}`}
                    className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-primary-300 dark:hover:border-primary-500 transition-colors cursor-pointer"
                  >
                    <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                      {displayName}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                      {subjectsList.length} مادة دراسية
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {subjectsList.slice(0, 3).map((subject) => (
                        <span 
                          key={subject.id}
                          className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs rounded"
                        >
                          {subject.name}
                        </span>
                      ))}
                      {subjectsList.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded">
                          +{subjectsList.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                );
              });
            })}
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderLessons = () => (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex flex-col md:flex-row gap-4 flex-1">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pr-10"
              placeholder="البحث في الدروس..."
            />
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <Filter className="h-5 w-5 text-gray-400" />
            </div>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="input-field pr-10 appearance-none"
            >
              <option value="all">جميع المستويات</option>
              <option value="primary">الابتدائي</option>
              <option value="middle">المتوسط</option>
              <option value="secondary">الثانوي</option>
            </select>
          </div>
        </div>
        
        <button className="btn-primary flex items-center">
          <Plus className="w-4 h-4 ml-2" />
          إضافة درس جديد
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLessons.map((lesson) => (
          <motion.div
            key={lesson.id}
            className="card"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {lesson.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  {lesson.description}
                </p>
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 space-x-4 space-x-reverse">
                  <span>{lesson.duration} دقيقة</span>
                  <span>{lesson.exercises.length} تمرين</span>
                  <span>{lesson.flashcards.length} بطاقة</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-600">
              <div className="flex items-center space-x-2 space-x-reverse">
                <button className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => deleteLesson(lesson.id)}
                  className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {new Date(lesson.createdAt).toLocaleDateString('ar-DZ')}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card text-center">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
            {platformUsers.filter(u => !u.hasTrialExpired && !u.hasSubscription).length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300">في فترة تجريبية</div>
        </div>
        
        <div className="card text-center">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
            {platformUsers.filter(u => u.hasSubscription).length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300">مشتركون</div>
        </div>
        
        <div className="card text-center">
          <div className="text-2xl font-bold text-red-600 dark:text-red-400 mb-1">
            {platformUsers.filter(u => u.hasTrialExpired && !u.hasSubscription).length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300">انتهت فترتهم التجريبية</div>
        </div>
        
        <div className="card text-center">
          <div className="text-2xl font-bold text-gray-600 dark:text-gray-400 mb-1">
            {platformUsers.length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300">إجمالي المستخدمين</div>
        </div>
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          قائمة المستخدمين
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-600">
                <th className="text-right py-3 px-4 font-medium text-gray-900 dark:text-white">الاسم</th>
                <th className="text-right py-3 px-4 font-medium text-gray-900 dark:text-white">البريد الإلكتروني</th>
                <th className="text-right py-3 px-4 font-medium text-gray-900 dark:text-white">المستوى</th>
                <th className="text-right py-3 px-4 font-medium text-gray-900 dark:text-white">الحالة</th>
                <th className="text-right py-3 px-4 font-medium text-gray-900 dark:text-white">تاريخ التسجيل</th>
              </tr>
            </thead>
            <tbody>
              {platformUsers.map((user) => (
                <tr key={user.id} className="border-b border-gray-100 dark:border-gray-700">
                  <td className="py-3 px-4 text-gray-900 dark:text-white">{user.name}</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{user.email}</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                    {EDUCATION_LEVELS[user.education.level].name} - السنة {user.education.year}
                  </td>
                  <td className="py-3 px-4">
                    {user.hasSubscription ? (
                      <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded-full">
                        مشترك
                      </span>
                    ) : user.hasTrialExpired ? (
                      <span className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-xs rounded-full">
                        انتهت الفترة التجريبية
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full">
                        فترة تجريبية
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                    {new Date(user.createdAt).toLocaleDateString('ar-DZ')}
                  </td>
                </tr>
              ))}
              {platformUsers.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-500 dark:text-gray-400">
                    لا يوجد مستخدمون مسجلون حالياً
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            لوحة تحكم المدير
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            إدارة شاملة للمنصة التعليمية
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap border-b border-gray-200 dark:border-gray-600 mb-8">
          {[
            { id: 'overview', label: 'نظرة عامة', icon: TrendingUp },
            { id: 'classes', label: 'الصفوف والشعب', icon: GraduationCap },
            { id: 'lessons', label: 'إدارة الدروس', icon: BookOpen },
            { id: 'users', label: 'المستخدمين', icon: Users },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={`flex items-center mr-8 py-4 border-b-2 font-medium text-sm transition-colors ${
                activeTab === id
                  ? 'border-primary-600 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:border-primary-300'
              }`}
            >
              <Icon className="ml-2 h-5 w-5" />
              {label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'classes' && renderClasses()}
          {activeTab === 'lessons' && renderLessons()}
          {activeTab === 'users' && renderUsers()}
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;