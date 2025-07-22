import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Video,
  FileText,
  ListChecks,
  ChevronRight,
  Play,
  CheckCircle,
  BookOpenCheck,
  Clock,
  ArrowLeft,
  Heart,
  Share2,
  Download,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  Maximize,
  User,
  Star,
  MessageSquare,
  Target
} from 'lucide-react';
import { useLesson } from '../contexts/LessonContext';
import { SUBJECTS_BY_LEVEL } from '../types/education';

// Fake subject data for demonstration
const getSubjectDetails = (id: string) => {
  const subjects = {
    'mathematics': { name: 'الرياضيات' },
    'physics': { name: 'الفيزياء' },
    'chemistry': { name: 'الكيمياء' },
    'arabic': { name: 'اللغة العربية' },
    'french': { name: 'اللغة الفرنسية' },
    'english': { name: 'اللغة الإنجليزية' },
    'natural-sciences': { name: 'العلوم الطبيعية' },
    'history-geography': { name: 'التاريخ والجغرافيا' },
    'islamic': { name: 'العلوم الإسلامية' },
  };
  return subjects[id as keyof typeof subjects];
};

const getSemesterName = (id: string) => {
  const semesters = {
    '1': 'الفصل الأول',
    '2': 'الفصل الثاني',
    '3': 'الفصل الثالث',
  };
  return semesters[id as keyof typeof semesters];
};

// Generate fake lessons for demonstration
const generateLessons = (subjectId: string) => {
  return Array.from({ length: 20 }, (_, i) => ({
    id: `${subjectId}-${i + 1}`,
    title: `الدرس ${i + 1}: ${getRandomLessonTitle(subjectId)}`,
    description: `وصف شامل للدرس ${i + 1} في مادة ${getSubjectDetails(subjectId)?.name}`,
    duration: Math.floor(Math.random() * 30) + 15,
    hasQuiz: Math.random() > 0.5,
    hasExercises: Math.random() > 0.3,
    difficulty: ['سهل', 'متوسط', 'صعب'][Math.floor(Math.random() * 3)],
    instructor: 'أ. محمد أحمد',
    rating: (4 + Math.random()).toFixed(1),
    views: Math.floor(Math.random() * 1000) + 100,
  }));
};

const getRandomLessonTitle = (subjectId: string) => {
  const titles = {
    'mathematics': ['المعادلات التفاضلية', 'النهايات والاتصال', 'التكامل', 'المصفوفات', 'الهندسة التحليلية'],
    'physics': ['الحركة المستقيمة', 'قوانين نيوتن', 'الطاقة والشغل', 'الكهرباء الساكنة', 'المغناطيسية'],
    'chemistry': ['التفاعلات الكيميائية', 'الجدول الدوري', 'الروابط الكيميائية', 'الأحماض والقواعد', 'الكيمياء العضوية'],
    'arabic': ['النحو والصرف', 'البلاغة', 'الأدب العربي', 'الشعر الجاهلي', 'النثر الحديث'],
  };
  const subjectTitles = titles[subjectId as keyof typeof titles] || ['موضوع عام'];
  return subjectTitles[Math.floor(Math.random() * subjectTitles.length)];
};

interface LessonViewProps {
  lessonId: string;
  onBack: () => void;
}

const LessonView: React.FC<LessonViewProps> = ({ lessonId, onBack }) => {
  const [activeTab, setActiveTab] = useState<'video' | 'document' | 'exercises' | 'interactive'>('video');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(2400); // 40 minutes in seconds
  const [isSaved, setIsSaved] = useState(false);
  const { currentLesson, updateProgress, completeLesson } = useLesson();

  useEffect(() => {
    // Simulate video progress tracking
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          const newTime = prev + 1;
          // Update lesson progress
          const progress = Math.round((newTime / duration) * 100);
          updateProgress(lessonId, progress, 1);
          
          // Complete lesson when video ends
          if (newTime >= duration) {
            setIsPlaying(false);
            completeLesson(lessonId);
          }
          
          return Math.min(newTime, duration);
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration, lessonId, updateProgress, completeLesson]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  const renderVideoContent = () => (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="space-y-4"
    >
      {/* Enhanced Video Player */}
      <div className="aspect-video bg-gray-900 rounded-2xl overflow-hidden relative group">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <motion.button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-16 h-16 lg:w-20 lg:h-20 bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 hover:bg-opacity-30 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isPlaying ? (
                <Pause className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
              ) : (
                <Play className="w-8 h-8 lg:w-10 lg:h-10 text-white mr-1" />
              )}
            </motion.button>
            <p className="text-white text-base lg:text-lg font-medium">
              {currentLesson?.title || `الدرس ${lessonId}`}
            </p>
            <p className="text-gray-300 mt-2 text-sm lg:text-base">
              {isPlaying ? 'جاري التشغيل...' : 'انقر للتشغيل'}
            </p>
          </div>
        </div>
        
        {/* Video Controls */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex items-center space-x-4 space-x-reverse">
            <button className="text-white hover:text-gray-300">
              <SkipBack className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="text-white hover:text-gray-300"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>
            <button className="text-white hover:text-gray-300">
              <SkipForward className="w-5 h-5" />
            </button>
            
            <div className="flex-1 mx-4">
              <div className="bg-gray-600 h-1 rounded-full overflow-hidden">
                <div 
                  className="bg-white h-full transition-all duration-300"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                />
              </div>
            </div>
            
            <span className="text-white text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
            
            <button className="text-white hover:text-gray-300">
              <Volume2 className="w-5 h-5" />
            </button>
            <button className="text-white hover:text-gray-300">
              <Maximize className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Lesson Info */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 lg:p-6 shadow-luxury border border-gray-200 dark:border-gray-700">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h2 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {currentLesson?.title || `الدرس ${lessonId}`}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {currentLesson?.description || 'وصف الدرس سيظهر هنا'}
            </p>
            
            <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center">
                <User className="w-4 h-4 ml-1" />
                <span>أ. محمد أحمد</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 ml-1" />
                <span>{currentLesson?.duration || 40} دقيقة</span>
              </div>
              <div className="flex items-center">
                <Star className="w-4 h-4 ml-1 text-yellow-500" />
                <span>4.8</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 space-x-reverse">
            <motion.button
              onClick={() => setIsSaved(!isSaved)}
              className={`p-2 rounded-xl transition-colors ${
                isSaved 
                  ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
            </motion.button>
            
            <motion.button
              className="p-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Share2 className="w-5 h-5" />
            </motion.button>
            
            <motion.button
              className="p-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-300">تقدم المشاهدة</span>
            <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
              {Math.round((currentTime / duration) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderDocumentContent = () => (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-luxury border border-gray-200 dark:border-gray-700"
    >
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">وثيقة الدرس</h3>
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {currentLesson?.documentContent || 'محتوى الدرس النصي سيظهر هنا. يمكن أن يتضمن شرحاً مفصلاً للمفاهيم، أمثلة محلولة، وملاحظات مهمة للطلاب.'}
        </p>
      </div>
    </motion.div>
  );

  const renderExercisesContent = () => (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="space-y-4"
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-luxury border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">سلسلة التمارين</h3>
        
        {currentLesson?.exercises.map((exercise, index) => (
          <div key={exercise.id} className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-gray-900 dark:text-white">
                التمرين {index + 1}
              </h4>
              <span className={`px-2 py-1 text-xs rounded-full ${
                exercise.difficulty === 'easy' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
                exercise.difficulty === 'medium' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300' :
                'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
              }`}>
                {exercise.difficulty === 'easy' ? 'سهل' :
                 exercise.difficulty === 'medium' ? 'متوسط' : 'صعب'}
              </span>
            </div>
            
            <p className="text-gray-900 dark:text-white font-medium mb-3">
              {exercise.question}
            </p>
            
            {exercise.options && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                {exercise.options.map((option, optIndex) => (
                  <button
                    key={optIndex}
                    className="p-3 text-right bg-white dark:bg-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-500 transition-colors border border-gray-200 dark:border-gray-500"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
            
            {exercise.explanation && (
              <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>الشرح:</strong> {exercise.explanation}
                </p>
              </div>
            )}
          </div>
        )) || (
          <p className="text-gray-600 dark:text-gray-300">لا توجد تمارين متاحة لهذا الدرس حالياً.</p>
        )}
      </div>
    </motion.div>
  );

  const renderInteractiveContent = () => (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="space-y-4"
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-luxury border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">الأدوات التفاعلية</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.button
            className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl border border-blue-200 dark:border-blue-700 hover:shadow-lg transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <BookOpen className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-3" />
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">البطاقات التعليمية</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">مراجعة سريعة للمفاهيم الأساسية</p>
          </motion.button>
          
          <motion.button
            className="p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl border border-green-200 dark:border-green-700 hover:shadow-lg transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Target className="w-8 h-8 text-green-600 dark:text-green-400 mb-3" />
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">اختبار تفاعلي</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">اختبر فهمك للدرس</p>
          </motion.button>
          
          <motion.button
            className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl border border-purple-200 dark:border-purple-700 hover:shadow-lg transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <MessageSquare className="w-8 h-8 text-purple-600 dark:text-purple-400 mb-3" />
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">مناقشة الدرس</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">شارك أسئلتك مع الطلاب الآخرين</p>
          </motion.button>
          
          <motion.button
            className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-xl border border-orange-200 dark:border-orange-700 hover:shadow-lg transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Star className="w-8 h-8 text-orange-600 dark:text-orange-400 mb-3" />
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">تقييم الدرس</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">قيم جودة الدرس وأضف تعليقك</p>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="p-3 lg:p-0">
      <button
        onClick={onBack}
        className="flex items-center text-primary-600 hover:text-primary-700 mb-4 lg:mb-6 p-2 lg:p-0"
      >
        <ArrowLeft className="h-5 w-5 ml-1" />
        العودة إلى قائمة الدروس
      </button>

      {/* Enhanced Mobile-optimized tabs */}
      <div className="flex overflow-x-auto border-b border-gray-200 dark:border-gray-700 mb-6 lg:mb-8 -mx-3 px-3 lg:mx-0 lg:px-0">
        <div className="flex space-x-6 space-x-reverse min-w-max">
          {[
            { id: 'video', label: 'فيديو الدرس', icon: Video },
            { id: 'document', label: 'وثيقة الدرس', icon: FileText },
            { id: 'exercises', label: 'سلسلة التمارين', icon: ListChecks },
            { id: 'interactive', label: 'الأدوات التفاعلية', icon: BookOpen },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center py-3 lg:py-4 border-b-2 font-medium text-sm lg:text-base whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-primary-600 hover:border-primary-300'
              }`}
            >
              <tab.icon className="ml-2 h-4 w-4 lg:h-5 lg:w-5" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'video' && renderVideoContent()}
        {activeTab === 'document' && renderDocumentContent()}
        {activeTab === 'exercises' && renderExercisesContent()}
        {activeTab === 'interactive' && renderInteractiveContent()}
      </div>
    </div>
  );
};

const SubjectPage: React.FC = () => {
  const { semesterId, subjectId } = useParams<{ semesterId: string; subjectId: string }>();
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
  const { loadLesson, getLessonProgress } = useLesson();
  
  const subject = getSubjectDetails(subjectId || 'mathematics');
  const semesterName = getSemesterName(semesterId || '1');
  const lessons = generateLessons(subjectId || 'mathematics');
  
  if (!subject) {
    return <div>المادة غير موجودة</div>;
  }
  
  const fadeIn = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  const handleLessonClick = async (lessonId: string) => {
    await loadLesson(lessonId);
    setSelectedLesson(lessonId);
  };

  if (selectedLesson) {
    return (
      <div className="max-w-7xl mx-auto lg:px-4 lg:sm:px-6 lg:lg:px-8 py-6 lg:py-12">
        <LessonView 
          lessonId={selectedLesson} 
          onBack={() => setSelectedLesson(null)} 
        />
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-6 lg:py-12">
      <div className="mb-6 lg:mb-8">
        <div className="flex items-center text-xs lg:text-sm text-gray-500 dark:text-gray-400 mb-3 lg:mb-4 overflow-x-auto">
          <Link to="/dashboard" className="hover:text-primary-600 whitespace-nowrap">لوحة التحكم</Link>
          <ChevronRight className="mx-1 lg:mx-2 h-3 w-3 lg:h-4 lg:w-4 flex-shrink-0" />
          <span className="whitespace-nowrap">{semesterName}</span>
          <ChevronRight className="mx-1 lg:mx-2 h-3 w-3 lg:h-4 lg:w-4 flex-shrink-0" />
          <span className="whitespace-nowrap">{subject.name}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-1 lg:mb-2">{subject.name}</h1>
            <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300">{semesterName}</p>
          </div>
          
          <div className="text-right">
            <p className="text-sm text-gray-500 dark:text-gray-400">إجمالي الدروس</p>
            <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">{lessons.length}</p>
          </div>
        </div>
      </div>

      {/* Enhanced Lessons Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
        {lessons.map((lesson, index) => {
          const progress = getLessonProgress(lesson.id);
          const isCompleted = progress?.completed || false;
          const progressPercent = progress?.progress || 0;
          
          return (
            <motion.div
              key={lesson.id}
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-4 lg:p-6 shadow-luxury border border-gray-100 dark:border-gray-700 cursor-pointer hover:border-primary-300 dark:hover:border-primary-500 transition-all group"
              onClick={() => handleLessonClick(lesson.id)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-start">
                <div className="ml-3 lg:ml-4 p-2 lg:p-3 rounded-xl bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 flex-shrink-0 group-hover:bg-primary-100 dark:group-hover:bg-primary-800/30 transition-colors">
                  <BookOpenCheck className="h-5 w-5 lg:h-6 lg:w-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-base lg:text-lg font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
                      {lesson.title}
                    </h3>
                    {isCompleted && (
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mr-2" />
                    )}
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 lg:mb-4 line-clamp-2">
                    {lesson.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs lg:text-sm mb-3">
                    <div className="flex items-center space-x-4 space-x-reverse text-gray-500 dark:text-gray-400">
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 lg:h-4 lg:w-4 ml-1" />
                        {lesson.duration} دقيقة
                      </div>
                      <div className="flex items-center">
                        <User className="h-3 w-3 lg:h-4 lg:w-4 ml-1" />
                        {lesson.instructor}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 space-x-reverse">
                      {lesson.hasQuiz && (
                        <span className="flex items-center text-green-600 dark:text-green-400">
                          <CheckCircle className="h-3 w-3 lg:h-4 lg:w-4 ml-1" />
                          <span className="hidden lg:inline">اختبار</span>
                        </span>
                      )}
                      {lesson.hasExercises && (
                        <span className="flex items-center text-blue-600 dark:text-blue-400">
                          <ListChecks className="h-3 w-3 lg:h-4 lg:w-4 ml-1" />
                          <span className="hidden lg:inline">تمارين</span>
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Enhanced Progress Bar */}
                  {progressPercent > 0 && (
                    <div className="mb-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-gray-600 dark:text-gray-300">التقدم</span>
                        <span className="text-xs font-medium text-primary-600 dark:text-primary-400">
                          {progressPercent}%
                        </span>
                      </div>
                      <div className="h-1.5 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-primary-600 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${progressPercent}%` }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        />
                      </div>
                    </div>
                  )}
                  
                  {/* Additional Info */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 space-x-reverse text-xs text-gray-500 dark:text-gray-400">
                      <div className="flex items-center">
                        <Star className="h-3 w-3 text-yellow-500 ml-1" />
                        {lesson.rating}
                      </div>
                      <span>•</span>
                      <span>{lesson.views} مشاهدة</span>
                    </div>
                    
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      lesson.difficulty === 'سهل' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
                      lesson.difficulty === 'متوسط' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300' :
                      'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                    }`}>
                      {lesson.difficulty}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default SubjectPage;