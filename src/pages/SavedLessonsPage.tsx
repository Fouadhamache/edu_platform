import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookMarked, Search, Filter, Play, FileText, Clock, Trash2, Heart } from 'lucide-react';

const SavedLessonsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');

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

  // Mock saved lessons data
  const savedLessons = [
    {
      id: '1',
      title: 'المعادلات التفاضلية',
      subject: 'الرياضيات',
      semester: 'الفصل الأول',
      duration: 45,
      savedDate: '2025-01-15',
      type: 'video',
      progress: 75
    },
    {
      id: '2',
      title: 'الكيمياء العضوية - الألكانات',
      subject: 'الكيمياء',
      semester: 'الفصل الثاني',
      duration: 38,
      savedDate: '2025-01-14',
      type: 'document',
      progress: 100
    },
    {
      id: '3',
      title: 'الفيزياء النووية',
      subject: 'الفيزياء',
      semester: 'الفصل الثالث',
      duration: 52,
      savedDate: '2025-01-13',
      type: 'video',
      progress: 30
    },
    {
      id: '4',
      title: 'النحو والصرف',
      subject: 'اللغة العربية',
      semester: 'الفصل الأول',
      duration: 35,
      savedDate: '2025-01-12',
      type: 'document',
      progress: 60
    },
    {
      id: '5',
      title: 'Grammar - Present Perfect',
      subject: 'اللغة الإنجليزية',
      semester: 'الفصل الثاني',
      duration: 28,
      savedDate: '2025-01-11',
      type: 'video',
      progress: 90
    },
  ];

  const subjects = ['all', 'الرياضيات', 'الفيزياء', 'الكيمياء', 'اللغة العربية', 'اللغة الإنجليزية'];

  const filteredLessons = savedLessons.filter(lesson => {
    const matchesSearch = lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lesson.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || lesson.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  const handleRemoveLesson = (lessonId: string) => {
    // Here you would typically remove the lesson from saved lessons
    console.log('Removing lesson:', lessonId);
  };

  return (
    <div className="max-w-7xl mx-auto py-6 lg:py-12 px-3 sm:px-4 lg:px-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="mb-6 lg:mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
            <Heart className="w-6 h-6 lg:w-8 lg:h-8 ml-3 text-primary-600 dark:text-primary-400" />
            الدروس المحفوظة
          </h1>
          <p className="text-gray-600 dark:text-gray-300">جميع الدروس التي قمت بحفظها للمراجعة لاحقاً</p>
        </div>

        {/* Search and Filter */}
        <div className="card mb-6 lg:mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 lg:h-5 lg:w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pr-10"
                placeholder="البحث في الدروس المحفوظة..."
              />
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Filter className="h-4 w-4 lg:h-5 lg:w-5 text-gray-400" />
              </div>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="input-field pr-10 appearance-none min-w-[150px]"
              >
                <option value="all">جميع المواد</option>
                {subjects.slice(1).map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Lessons Grid */}
        {filteredLessons.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6"
            variants={staggerChildren}
            initial="hidden"
            animate="visible"
          >
            {filteredLessons.map((lesson) => (
              <motion.div
                key={lesson.id}
                variants={fadeIn}
                className="card hover:shadow-lg transition-all duration-300 group"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-2 lg:p-3 rounded-lg ${
                    lesson.type === 'video' 
                      ? 'bg-blue-100 dark:bg-blue-900/30' 
                      : 'bg-green-100 dark:bg-green-900/30'
                  }`}>
                    {lesson.type === 'video' ? (
                      <Play className={`w-4 h-4 lg:w-5 lg:h-5 ${
                        lesson.type === 'video' 
                          ? 'text-blue-600 dark:text-blue-400' 
                          : 'text-green-600 dark:text-green-400'
                      }`} />
                    ) : (
                      <FileText className="w-4 h-4 lg:w-5 lg:h-5 text-green-600 dark:text-green-400" />
                    )}
                  </div>
                  
                  <button
                    onClick={() => handleRemoveLesson(lesson.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <h3 className="text-base lg:text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                  {lesson.title}
                </h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-primary-600 dark:text-primary-400 font-medium">
                      {lesson.subject}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">
                      {lesson.semester}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <Clock className="w-3 h-3 lg:w-4 lg:h-4 ml-1" />
                    {lesson.duration} دقيقة
                  </div>
                  
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    محفوظ في: {new Date(lesson.savedDate).toLocaleDateString('ar-DZ')}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-600 dark:text-gray-300">التقدم</span>
                    <span className="text-xs font-medium text-primary-600 dark:text-primary-400">
                      {lesson.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                    <div 
                      className="bg-primary-600 h-1.5 rounded-full transition-all duration-300"
                      style={{ width: `${lesson.progress}%` }}
                    />
                  </div>
                </div>

                <button className="btn-primary w-full text-sm lg:text-base">
                  {lesson.progress === 100 ? 'مراجعة الدرس' : 'متابعة الدرس'}
                </button>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            className="text-center py-12"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            <Heart className="w-12 h-12 lg:w-16 lg:h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg lg:text-xl font-semibold text-gray-900 dark:text-white mb-2">
              لا توجد دروس محفوظة
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm lg:text-base">
              {searchTerm || selectedSubject !== 'all' 
                ? 'لم يتم العثور على دروس تطابق البحث'
                : 'لم تقم بحفظ أي دروس بعد. ابدأ بحفظ الدروس المهمة للمراجعة لاحقاً'
              }
            </p>
            {(!searchTerm && selectedSubject === 'all') && (
              <button 
                onClick={() => window.history.back()}
                className="btn-primary"
              >
                تصفح الدروس
              </button>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default SavedLessonsPage;