import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Calendar, 
  Settings, 
  TrendingUp, 
  Clock,
  Play,
  Award,
  Target,
  Bell,
  Calculator,
  Atom,
  FlaskConical,
  Languages,
  Globe,
  Microscope,
  MapPin,
  Scroll,
  CheckCircle,
  BarChart3,
  Users,
  MessageCircle
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTrial } from '../contexts/TrialContext';
import { useLesson } from '../contexts/LessonContext';
import { useTeacher } from '../contexts/TeacherContext';
import { SUBJECTS_BY_LEVEL, EDUCATION_LEVELS } from '../types/education';

const semesters = [
  { id: '1', name: 'الفصل الأول' },
  { id: '2', name: 'الفصل الثاني' },
  { id: '3', name: 'الفصل الثالث' },
];

// Subject icons mapping
const getSubjectIcon = (subjectId: string, index: number) => {
  const iconMap: { [key: string]: React.ReactNode } = {
    'mathematics': <Calculator className="w-5 h-5 lg:w-8 lg:h-8" />,
    'physics': <Atom className="w-5 h-5 lg:w-8 lg:h-8" />,
    'chemistry': <FlaskConical className="w-5 h-5 lg:w-8 lg:h-8" />,
    'natural-sciences': <Microscope className="w-5 h-5 lg:w-8 lg:h-8" />,
    'arabic': <Scroll className="w-5 h-5 lg:w-8 lg:h-8" />,
    'french': <Languages className="w-5 h-5 lg:w-8 lg:h-8" />,
    'english': <Globe className="w-5 h-5 lg:w-8 lg:h-8" />,
    'history-geography': <MapPin className="w-5 h-5 lg:w-8 lg:h-8" />,
    'islamic': <BookOpen className="w-5 h-5 lg:w-8 lg:h-8" />,
    'philosophy': <BookOpen className="w-5 h-5 lg:w-8 lg:h-8" />,
    'economics': <TrendingUp className="w-5 h-5 lg:w-8 lg:h-8" />,
    'accounting': <Calculator className="w-5 h-5 lg:w-8 lg:h-8" />,
    'technology': <Settings className="w-5 h-5 lg:w-8 lg:h-8" />,
    'computer-science': <Settings className="w-5 h-5 lg:w-8 lg:h-8" />,
    'ict': <Settings className="w-5 h-5 lg:w-8 lg:h-8" />,
    'third-language': <Languages className="w-5 h-5 lg:w-8 lg:h-8" />,
  };
  
  return iconMap[subjectId] || <BookOpen className="w-5 h-5 lg:w-8 lg:h-8" />;
};

const getSubjectHoverClass = (index: number) => {
  const hoverClasses = [
    'subject-card-pink',
    'subject-card-blue', 
    'subject-card-purple',
    'subject-card-green',
    'subject-card-orange',
    'subject-card-yellow'
  ];
  return hoverClasses[index % hoverClasses.length];
};

const Dashboard: React.FC = () => {
  const [selectedSemester, setSelectedSemester] = useState<string>(semesters[0].id);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isTrialActive, remainingTime } = useTrial();
  const { getSubjectProgress, userProgress } = useLesson();
  const { getAllPublishedLessons } = useTeacher();
  
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
  
  const handleSubjectClick = (subjectId: string) => {
    navigate(`/semester/${selectedSemester}/subject/${subjectId}`);
  };

  // Get subjects based on user's education level
  const getSubjectsForUser = () => {
    if (!user) return [];
    
    const { level, year, stream } = user.education;
    
    if (level === 'primary' || level === 'middle') {
      return SUBJECTS_BY_LEVEL[level][year as keyof typeof SUBJECTS_BY_LEVEL[typeof level]] || [];
    } else if (level === 'secondary') {
      const streamKey = stream || 'cst';
      return SUBJECTS_BY_LEVEL.secondary[streamKey] || [];
    }
    
    return [];
  };

  // Get display name for education info
  const getEducationDisplayInfo = () => {
    if (!user) return '';
    
    const { level, year, stream, technicalSpecialization, foreignLanguageChoice } = user.education;
    
    let info = `${EDUCATION_LEVELS[level].name} - `;
    
    if (level === 'primary') {
      info += EDUCATION_LEVELS.primary.grades[year as keyof typeof EDUCATION_LEVELS.primary.grades];
    } else if (level === 'middle') {
      info += EDUCATION_LEVELS.middle.grades[year as keyof typeof EDUCATION_LEVELS.middle.grades];
    } else if (level === 'secondary') {
      info += EDUCATION_LEVELS.secondary.grades[year as keyof typeof EDUCATION_LEVELS.secondary.grades];
      
      if (stream) {
        info += ` - ${EDUCATION_LEVELS.secondary.streams[stream]}`;
        
        if (stream === 'technical-mathematics' && technicalSpecialization) {
          info += ` (${EDUCATION_LEVELS.secondary.technicalSpecializations[technicalSpecialization]})`;
        }
        
        if (stream === 'foreign-languages' && foreignLanguageChoice) {
          info += ` (${EDUCATION_LEVELS.secondary.foreignLanguageChoices[foreignLanguageChoice]})`;
        }
      }
    }
    
    return info;
  };

  const formatRemainingTime = (timeInMs: number) => {
    const hours = Math.floor(timeInMs / (1000 * 60 * 60));
    const minutes = Math.floor((timeInMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}س ${minutes}د`;
  };

  // Calculate real statistics from user progress
  const calculateStats = () => {
    const publishedLessons = getAllPublishedLessons();
    const completedLessons = userProgress.filter(p => p.completed).length;
    const totalQuizzes = userProgress.reduce((sum, p) => sum + p.quizScores.length, 0);
    const totalTimeSpent = Math.round(userProgress.reduce((sum, p) => sum + p.timeSpent, 0) / 60); // Convert to hours
    const averageScore = userProgress.length > 0 
      ? Math.round(userProgress.reduce((sum, p) => sum + p.progress, 0) / userProgress.length)
      : 0;
    const totalAvailableLessons = publishedLessons.length;

    return {
      completedLessons,
      totalQuizzes,
      totalTimeSpent,
      averageScore,
      totalAvailableLessons
    };
  };

  const stats = calculateStats();
  const subjects = getSubjectsForUser();
  
  return (
    <div className="min-h-full bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-3 lg:py-6">
        {/* Enhanced Header with Better UX */}
        <motion.div 
          className="flex flex-col lg:flex-row justify-between items-start mb-6 lg:mb-8"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <div className="flex-1">
            <div className="flex items-center mb-3 lg:mb-4">
              <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gray-900 dark:bg-white rounded-xl lg:rounded-2xl flex items-center justify-center mr-3 lg:mr-4">
                <span className="text-lg lg:text-2xl font-bold text-white dark:text-gray-900">
                  {user?.name.charAt(0)}
                </span>
              </div>
              <div>
                <h1 className="text-xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                  مرحباً، {user?.name}
                </h1>
                <p className="text-gray-600 dark:text-gray-300 text-sm lg:text-lg">
                  {getEducationDisplayInfo()}
                </p>
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="hidden lg:flex items-center space-x-4 space-x-reverse">
              <motion.button 
                className="flex items-center px-4 py-2 bg-white dark:bg-gray-800 rounded-xl shadow-luxury hover:shadow-luxury-hover transition-all border border-gray-200 dark:border-gray-700"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/progress')}
              >
                <BarChart3 className="w-4 h-4 ml-2 text-gray-600 dark:text-gray-300" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">عرض التقدم</span>
              </motion.button>
              
              <motion.button 
                className="flex items-center px-4 py-2 bg-white dark:bg-gray-800 rounded-xl shadow-luxury hover:shadow-luxury-hover transition-all border border-gray-200 dark:border-gray-700"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/saved-lessons')}
              >
                <BookOpen className="w-4 h-4 ml-2 text-gray-600 dark:text-gray-300" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">الدروس المحفوظة</span>
              </motion.button>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center space-x-4 space-x-reverse mt-4 lg:mt-0">
            {/* Notifications */}
            <motion.button 
              className="relative p-3 bg-white dark:bg-gray-800 rounded-2xl shadow-luxury hover:shadow-luxury-hover transition-all border border-gray-200 dark:border-gray-700 hover-lift"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-gray-900 dark:bg-white rounded-full"></span>
            </motion.button>
          </div>
        </motion.div>

        {/* Enhanced Stats Cards with Real Data */}
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 mb-4 lg:mb-8"
          variants={staggerChildren}
          initial="hidden"
          animate="visible"
        >
          {[
            { 
              title: 'الدروس المكتملة', 
              value: `${stats.completedLessons}/${stats.totalAvailableLessons}`, 
              icon: BookOpen, 
              color: 'text-gray-700 dark:text-gray-300',
              bgColor: 'bg-blue-50 dark:bg-blue-900/20',
              iconColor: 'text-blue-600 dark:text-blue-400'
            },
            { 
              title: 'الاختبارات', 
              value: stats.totalQuizzes.toString(), 
              icon: Target, 
              color: 'text-gray-700 dark:text-gray-300',
              bgColor: 'bg-green-50 dark:bg-green-900/20',
              iconColor: 'text-green-600 dark:text-green-400'
            },
            { 
              title: 'متوسط الدرجات', 
              value: `${stats.averageScore}%`, 
              icon: Award, 
              color: 'text-gray-700 dark:text-gray-300',
              bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
              iconColor: 'text-yellow-600 dark:text-yellow-400'
            },
            { 
              title: 'ساعات الدراسة', 
              value: stats.totalTimeSpent.toString(), 
              icon: Clock, 
              color: 'text-gray-700 dark:text-gray-300',
              bgColor: 'bg-purple-50 dark:bg-purple-900/20',
              iconColor: 'text-purple-600 dark:text-purple-400'
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              className="bg-white dark:bg-gray-800 rounded-2xl lg:rounded-3xl p-3 lg:p-6 shadow-luxury border border-gray-100 dark:border-gray-700 hover-lift"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-center">
                <div className="mb-2 lg:mb-3">
                  <div className={`w-8 h-8 lg:w-12 lg:h-12 rounded-xl lg:rounded-2xl flex items-center justify-center ${stat.bgColor} mx-auto`}>
                    <stat.icon className={`w-4 h-4 lg:w-6 lg:h-6 ${stat.iconColor}`} />
                  </div>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-300 text-xs lg:text-sm mb-1">{stat.title}</p>
                  <p className="text-base lg:text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Semester Selection */}
        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-2xl lg:rounded-3xl p-3 lg:p-6 shadow-luxury border border-gray-100 dark:border-gray-700 mb-4 lg:mb-8"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h2 className="text-base lg:text-xl font-semibold text-gray-900 dark:text-white mb-3 lg:mb-4 flex items-center">
            <Calendar className="w-4 h-4 lg:w-5 lg:h-5 ml-2 text-gray-600 dark:text-gray-400" />
            اختر الفصل الدراسي
          </h2>
          <div className="grid grid-cols-3 gap-2 lg:gap-4">
            {semesters.map((semester) => (
              <motion.button
                key={semester.id}
                onClick={() => setSelectedSemester(semester.id)}
                className={`px-2 py-2 lg:px-6 lg:py-3 rounded-lg lg:rounded-2xl font-medium text-xs lg:text-base transition-all shadow-luxury-soft ${
                  selectedSemester === semester.id
                    ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-luxury-hover'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {semester.name}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Enhanced Subjects Grid with Real Progress */}
        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-2xl lg:rounded-3xl p-3 lg:p-6 shadow-luxury border border-gray-100 dark:border-gray-700"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h2 className="text-base lg:text-xl font-semibold text-gray-900 dark:text-white mb-3 lg:mb-6 flex items-center">
            <BookOpen className="w-4 h-4 lg:w-5 lg:h-5 ml-2 text-gray-600 dark:text-gray-400" />
            المواد الدراسية
          </h2>
          {subjects.length > 0 ? (
            <motion.div 
              className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 lg:gap-6"
              variants={staggerChildren}
              initial="hidden"
              animate="visible"
            >
              {subjects.map((subject, index) => {
                const hoverClass = getSubjectHoverClass(index);
                const progress = getSubjectProgress(subject.id);
                const publishedLessons = getAllPublishedLessons();
                const subjectLessons = publishedLessons.filter(lesson => lesson.subjectId === subject.id);
                const lessonsCount = subjectLessons.length;
                const completedLessons = Math.round((progress / 100) * lessonsCount);
                
                return (
                  <motion.div
                    key={subject.id}
                    variants={fadeIn}
                    onClick={() => handleSubjectClick(subject.id)}
                    className="group cursor-pointer"
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={`bg-gray-50 dark:bg-gray-700 rounded-xl lg:rounded-3xl p-2 lg:p-6 transition-all duration-300 border border-gray-200 dark:border-gray-600 group-hover:border-gray-300 dark:group-hover:border-gray-500 shadow-luxury-soft hover:shadow-luxury ${hoverClass}`}>
                      <div className="flex flex-col items-center text-center">
                        <div className={`w-8 h-8 lg:w-16 lg:h-16 rounded-xl lg:rounded-3xl flex items-center justify-center mb-1 lg:mb-4 bg-white dark:bg-gray-800 shadow-luxury-soft`}>
                          <span className="text-gray-700 dark:text-gray-300">
                            {getSubjectIcon(subject.id, index)}
                          </span>
                        </div>
                        <h3 className="text-xs lg:text-lg font-semibold text-gray-900 dark:text-white mb-1 lg:mb-2 group-hover:text-gray-800 dark:group-hover:text-gray-100 transition-colors line-clamp-2">
                          {subject.name}
                        </h3>
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-1 lg:mb-4">
                          <Play className="w-2 h-2 lg:w-4 lg:h-4 ml-1" />
                          <span>{completedLessons}/{lessonsCount} درس</span>
                        </div>
                        
                        {/* Enhanced Progress Bar */}
                        <div className="w-full">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs text-gray-600 dark:text-gray-300">التقدم</span>
                            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                              {progress}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1 lg:h-2 overflow-hidden">
                            <motion.div 
                              className="bg-gray-700 dark:bg-gray-300 h-1 lg:h-2 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${progress}%` }}
                              transition={{ duration: 1, delay: index * 0.1 }}
                            />
                          </div>
                          {progress > 0 && (
                            <div className="flex items-center mt-1 lg:mt-1">
                              <CheckCircle className="w-2 h-2 lg:w-3 lg:h-3 text-green-500 ml-1" />
                              <span className="text-xs text-green-600 dark:text-green-400">
                                {progress === 100 ? 'مكتمل' : 'قيد التقدم'}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <div className="text-center py-6 lg:py-12">
              <div className="w-10 h-10 lg:w-16 lg:h-16 bg-gray-200 dark:bg-gray-700 rounded-xl lg:rounded-3xl flex items-center justify-center mx-auto mb-2 lg:mb-4">
                <BookOpen className="w-5 h-5 lg:w-8 lg:h-8 text-gray-400" />
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-xs lg:text-lg px-4">
                لا توجد مواد متاحة لهذا المستوى التعليمي
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;