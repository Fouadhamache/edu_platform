import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Award, Target, Calendar, BookOpen, CheckCircle, Clock, BarChart3 } from 'lucide-react';

const ProgressPage: React.FC = () => {
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

  // Mock data for demonstration
  const subjects = [
    { name: 'الرياضيات', progress: 85, lessons: 20, completed: 17 },
    { name: 'الفيزياء', progress: 72, lessons: 18, completed: 13 },
    { name: 'الكيمياء', progress: 90, lessons: 15, completed: 14 },
    { name: 'اللغة العربية', progress: 68, lessons: 22, completed: 15 },
    { name: 'اللغة الإنجليزية', progress: 78, lessons: 16, completed: 12 },
  ];

  const recentActivities = [
    { type: 'lesson', title: 'درس المعادلات التفاضلية', subject: 'الرياضيات', date: '2025-01-15', score: 95 },
    { type: 'quiz', title: 'اختبار الكيمياء العضوية', subject: 'الكيمياء', date: '2025-01-14', score: 88 },
    { type: 'exercise', title: 'تمارين الفيزياء النووية', subject: 'الفيزياء', date: '2025-01-13', score: 92 },
    { type: 'lesson', title: 'درس النحو والصرف', subject: 'اللغة العربية', date: '2025-01-12', score: 85 },
  ];

  const achievements = [
    { title: 'متفوق في الرياضيات', description: 'حصلت على أكثر من 90% في 5 اختبارات متتالية', icon: <Award className="w-5 h-5 lg:w-6 lg:h-6" />, color: 'text-yellow-500' },
    { title: 'مثابر', description: 'أكملت 30 درساً في شهر واحد', icon: <Target className="w-5 h-5 lg:w-6 lg:h-6" />, color: 'text-blue-500' },
    { title: 'متميز في الكيمياء', description: 'حصلت على درجة كاملة في اختبار الكيمياء', icon: <CheckCircle className="w-5 h-5 lg:w-6 lg:h-6" />, color: 'text-green-500' },
  ];

  return (
    <div className="max-w-7xl mx-auto py-6 lg:py-12 px-3 sm:px-4 lg:px-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="mb-6 lg:mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
            <BarChart3 className="w-6 h-6 lg:w-8 lg:h-8 ml-2 text-primary-600 dark:text-primary-400" />
            التقدم الدراسي
          </h1>
          <p className="text-gray-600 dark:text-gray-300">تتبع تقدمك ونتائجك في جميع المواد الدراسية</p>
        </div>

        {/* Overall Statistics */}
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 mb-6 lg:mb-8"
          variants={staggerChildren}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="card text-center" variants={fadeIn}>
            <div className="flex justify-center mb-3 lg:mb-4">
              <BookOpen className="w-6 h-6 lg:w-8 lg:h-8 text-primary-600 dark:text-primary-400" />
            </div>
            <div className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-1">91</div>
            <div className="text-xs lg:text-sm text-gray-600 dark:text-gray-300">دروس مكتملة</div>
          </motion.div>

          <motion.div className="card text-center" variants={fadeIn}>
            <div className="flex justify-center mb-3 lg:mb-4">
              <CheckCircle className="w-6 h-6 lg:w-8 lg:h-8 text-success-600 dark:text-success-400" />
            </div>
            <div className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-1">78</div>
            <div className="text-xs lg:text-sm text-gray-600 dark:text-gray-300">اختبارات مجتازة</div>
          </motion.div>

          <motion.div className="card text-center" variants={fadeIn}>
            <div className="flex justify-center mb-3 lg:mb-4">
              <TrendingUp className="w-6 h-6 lg:w-8 lg:h-8 text-warning-600 dark:text-warning-400" />
            </div>
            <div className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-1">86%</div>
            <div className="text-xs lg:text-sm text-gray-600 dark:text-gray-300">متوسط الدرجات</div>
          </motion.div>

          <motion.div className="card text-center" variants={fadeIn}>
            <div className="flex justify-center mb-3 lg:mb-4">
              <Award className="w-6 h-6 lg:w-8 lg:h-8 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-1">12</div>
            <div className="text-xs lg:text-sm text-gray-600 dark:text-gray-300">إنجازات محققة</div>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Subject Progress */}
          <motion.div 
            className="card"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-lg lg:text-xl font-semibold text-gray-900 dark:text-white mb-4 lg:mb-6 flex items-center">
              <BarChart3 className="w-5 h-5 ml-2 text-primary-600 dark:text-primary-400" />
              تقدم المواد الدراسية
            </h2>
            <div className="space-y-4 lg:space-y-6">
              {subjects.map((subject, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-900 dark:text-white font-medium text-sm lg:text-base">{subject.name}</span>
                    <span className="text-xs lg:text-sm text-gray-600 dark:text-gray-300">
                      {subject.completed}/{subject.lessons} دروس
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-primary-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${subject.progress}%` }}
                    />
                  </div>
                  <div className="text-right mt-1">
                    <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                      {subject.progress}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Activities */}
          <motion.div 
            className="card"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-lg lg:text-xl font-semibold text-gray-900 dark:text-white mb-4 lg:mb-6 flex items-center">
              <Clock className="w-5 h-5 ml-2 text-primary-600 dark:text-primary-400" />
              النشاطات الأخيرة
            </h2>
            <div className="space-y-3 lg:space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 space-x-reverse p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className={`p-2 rounded-full ${
                    activity.type === 'lesson' ? 'bg-blue-100 dark:bg-blue-900/30' :
                    activity.type === 'quiz' ? 'bg-green-100 dark:bg-green-900/30' :
                    'bg-purple-100 dark:bg-purple-900/30'
                  }`}>
                    {activity.type === 'lesson' ? (
                      <BookOpen className={`w-3 h-3 lg:w-4 lg:h-4 ${
                        activity.type === 'lesson' ? 'text-blue-600 dark:text-blue-400' :
                        activity.type === 'quiz' ? 'text-green-600 dark:text-green-400' :
                        'text-purple-600 dark:text-purple-400'
                      }`} />
                    ) : activity.type === 'quiz' ? (
                      <CheckCircle className="w-3 h-3 lg:w-4 lg:h-4 text-green-600 dark:text-green-400" />
                    ) : (
                      <Target className="w-3 h-3 lg:w-4 lg:h-4 text-purple-600 dark:text-purple-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">{activity.title}</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-300">{activity.subject}</p>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(activity.date).toLocaleDateString('ar-DZ')}
                      </span>
                      <span className="text-xs font-medium text-primary-600 dark:text-primary-400">
                        {activity.score}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Achievements */}
        <motion.div 
          className="card mt-6 lg:mt-8"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-lg lg:text-xl font-semibold text-gray-900 dark:text-white mb-4 lg:mb-6 flex items-center">
            <Award className="w-5 h-5 ml-2 text-primary-600 dark:text-primary-400" />
            الإنجازات المحققة
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            {achievements.map((achievement, index) => (
              <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className={`flex items-center mb-3 ${achievement.color}`}>
                  {achievement.icon}
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mr-2">
                    {achievement.title}
                  </h3>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  {achievement.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProgressPage;