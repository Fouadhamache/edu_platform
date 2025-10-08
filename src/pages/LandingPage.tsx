import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Video, 
  FileText, 
  ListChecks, 
  Users, 
  Clock, 
  Award,
  GraduationCap,
  Target,
  Sparkles,
  CheckCircle,
  ArrowLeft,
  Play,
  Star,
  Zap,
  Brain,
  Trophy
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTrial } from '../contexts/TrialContext';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { isTrialActive, hasSubscription } = useTrial();
  
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };
  
  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const handleMainAction = () => {
    if (isAuthenticated && (hasSubscription || isTrialActive)) {
      navigate('/dashboard');
    } else {
      navigate('/register');
    }
  };

  const getMainButtonText = () => {
    if (isAuthenticated && (hasSubscription || isTrialActive)) {
      return 'ادخل إلى منصتك';
    }
    return 'ابدأ رحلتك التعليمية';
  };

  const educationalLevels = [
    {
      level: 'الابتدائي',
      years: ['السنة الأولى', 'السنة الثانية', 'السنة الثالثة', 'السنة الرابعة', 'السنة الخامسة'],
      color: 'from-pink-400 to-purple-500',
      icon: <BookOpen className="w-6 h-6" />,
      description: 'أساسيات التعلم والمهارات الأولى'
    },
    {
      level: 'المتوسط',
      years: ['السنة الأولى متوسط', 'السنة الثانية متوسط', 'السنة الثالثة متوسط', 'السنة الرابعة متوسط'],
      color: 'from-blue-400 to-cyan-500',
      icon: <GraduationCap className="w-6 h-6" />,
      description: 'تطوير المفاهيم والمهارات المتقدمة'
    },
    {
      level: 'الثانوي',
      years: ['السنة الأولى ثانوي', 'السنة الثانية ثانوي', 'السنة الثالثة ثانوي'],
      streams: ['علوم تجريبية', 'رياضيات', 'تقني رياضي', 'آداب وفلسفة', 'لغات أجنبية', 'تسيير واقتصاد'],
      color: 'from-emerald-400 to-teal-500',
      icon: <Trophy className="w-6 h-6" />,
      description: 'التحضير للبكالوريا والتعليم العالي'
    }
  ];

  const features = [
    {
      title: 'فيديوهات تعليمية تفاعلية',
      description: 'شروحات مفصلة ومبسطة من أفضل المعلمين مع إمكانية التفاعل والأسئلة',
      icon: <Video className="w-8 h-8" />,
      color: 'from-red-400 to-pink-500',
      bgColor: 'bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20'
    },
    {
      title: 'ملخصات ووثائق شاملة',
      description: 'ملاحظات منظمة وملخصات مركزة لكل درس مع إمكانية التحميل والطباعة',
      icon: <FileText className="w-8 h-8" />,
      color: 'from-blue-400 to-indigo-500',
      bgColor: 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20'
    },
    {
      title: 'تمارين ذكية متدرجة',
      description: 'سلاسل تمارين متنوعة مع تصحيح فوري وشرح مفصل للأخطاء',
      icon: <Target className="w-8 h-8" />,
      color: 'from-green-400 to-emerald-500',
      bgColor: 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20'
    },
    {
      title: 'بطاقات مراجعة ذكية',
      description: 'نظام بطاقات تفاعلي يساعد على الحفظ والمراجعة السريعة',
      icon: <Brain className="w-8 h-8" />,
      color: 'from-purple-400 to-violet-500',
      bgColor: 'bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20'
    },
    {
      title: 'اختبارات تفاعلية',
      description: 'اختبارات محاكية للامتحانات الحقيقية مع تقييم فوري ونصائح للتحسين',
      icon: <ListChecks className="w-8 h-8" />,
      color: 'from-orange-400 to-amber-500',
      bgColor: 'bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20'
    },
    {
      title: 'مساعد ذكي شخصي',
      description: 'مساعد AI يجيب على أسئلتك ويقترح خطط دراسية مخصصة لك',
      icon: <Sparkles className="w-8 h-8" />,
      color: 'from-cyan-400 to-blue-500',
      bgColor: 'bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20'
    }
  ];

  const steps = [
    {
      number: 1,
      title: 'إنشاء حساب',
      description: 'سجل بياناتك التعليمية واحصل على فترة تجريبية مجانية',
      icon: <Users className="w-8 h-8" />,
      color: 'from-blue-400 to-indigo-500'
    },
    {
      number: 2,
      title: 'اختر مستواك',
      description: 'حدد مستواك التعليمي والمواد التي تريد دراستها',
      icon: <GraduationCap className="w-8 h-8" />,
      color: 'from-green-400 to-emerald-500'
    },
    {
      number: 3,
      title: 'ابدأ التعلم',
      description: 'استمتع بتجربة تعليمية تفاعلية ومخصصة لاحتياجاتك',
      icon: <Zap className="w-8 h-8" />,
      color: 'from-purple-400 to-pink-500'
    }
  ];

  return (
    <div className="bg-gradient-to-b from-white via-purple-50/30 to-blue-50/50 dark:from-gray-900 dark:via-purple-900/10 dark:to-blue-900/10 overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 xl:py-32">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 left-10 w-40 h-40 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-yellow-400/10 to-orange-400/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col lg:flex-row items-center">
            <motion.div 
              className="lg:w-1/2 text-center lg:text-right mb-12 lg:mb-0"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full text-purple-700 dark:text-purple-300 text-sm font-medium mb-6"
              >
                <Sparkles className="w-4 h-4 ml-2" />
                منصة التعليم الذكي الأولى في الجزائر
              </motion.div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                أفضل مكان للـ
                <span className="block bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  تعلم والنمو
                </span>
                <span className="block text-3xl sm:text-4xl lg:text-5xl xl:text-6xl">للطلاب العرب</span>
              </h1>
              
              <p className="text-lg lg:text-xl xl:text-2xl text-gray-600 dark:text-gray-300 mb-8 lg:mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                اكتشف آلاف الأنشطة التعليمية الممتعة والتفاعلية لدعم نمو طفلك وعملية التعلم مع أحدث التقنيات التعليمية
              </p>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 sm:space-x-reverse justify-center lg:justify-start">
                <motion.button 
                  onClick={handleMainAction} 
                  className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 overflow-hidden"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center justify-center">
                    <Play className="w-5 h-5 ml-2" />
                    {getMainButtonText()}
                  </div>
                </motion.button>
                
                {!isAuthenticated && (
                  <motion.button 
                    onClick={() => navigate('/login')} 
                    className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-200 dark:border-gray-600 rounded-2xl font-semibold text-lg hover:border-purple-300 dark:hover:border-purple-500 hover:shadow-xl transition-all duration-300"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    تسجيل الدخول
                  </motion.button>
                )}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="mt-8 flex items-center justify-center lg:justify-start space-x-6 space-x-reverse text-sm text-gray-600 dark:text-gray-400"
              >
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-500 ml-1" />
                  <span>تقييم 4.9/5</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 text-green-500 ml-1" />
                  <span>+10,000 طالب</span>
                </div>
                <div className="flex items-center">
                  <Trophy className="w-4 h-4 text-orange-500 ml-1" />
                  <span>معتمدة رسمياً</span>
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="lg:w-1/2 lg:mr-8"
              initial="hidden"
              animate="visible"
              variants={scaleIn}
            >
              <div className="relative">
                {/* Main Image */}
                <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.pexels.com/photos/4145153/pexels-photo-4145153.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                    alt="طلاب يدرسون" 
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent"></div>
                </div>
                
                {/* Floating Cards */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1, duration: 0.6 }}
                  className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-xl border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">معدل النجاح</p>
                      <p className="text-lg font-bold text-green-600 dark:text-green-400">95%</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                  className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-xl border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center">
                      <Brain className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">تعلم ذكي</p>
                      <p className="text-lg font-bold text-purple-600 dark:text-purple-400">AI مدعوم</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-white dark:bg-gray-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              ميزاتنا <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">التفاعلية</span>
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              نقدم مجموعة شاملة من الأدوات التعليمية المبتكرة المصممة لتعزيز تجربة التعلم
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className={`${feature.bgColor} rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 group`}
                variants={fadeIn}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-4">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Educational Levels Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 dark:from-purple-900/10 dark:via-blue-900/10 dark:to-cyan-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              المراحل <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">التعليمية</span>
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              نغطي جميع المراحل التعليمية من الابتدائي إلى الثانوي بمحتوى شامل ومتخصص
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {educationalLevels.map((level, index) => (
              <motion.div 
                key={index}
                className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-500 group"
                variants={fadeIn}
                whileHover={{ y: -8 }}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${level.color} rounded-2xl flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform duration-300`}>
                  {level.icon}
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{level.level}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{level.description}</p>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">السنوات الدراسية:</h4>
                  {level.years.map((year, yearIndex) => (
                    <div key={yearIndex} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full ml-2"></div>
                      {year}
                    </div>
                  ))}
                  
                  {level.streams && (
                    <div className="mt-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">الشعب المتخصصة:</h4>
                      {level.streams.slice(0, 3).map((stream, streamIndex) => (
                        <div key={streamIndex} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                          <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full ml-2"></div>
                          {stream}
                        </div>
                      ))}
                      {level.streams.length > 3 && (
                        <div className="text-sm text-purple-600 dark:text-purple-400 mt-2">
                          +{level.streams.length - 3} شعب أخرى
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 lg:py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              كيف <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">تعمل؟</span>
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              ثلاث خطوات بسيطة للبدء في رحلتك التعليمية المميزة
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                className="relative text-center group"
                variants={fadeIn}
              >
                <div className="relative">
                  {/* Connection Line */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-purple-300 to-blue-300 dark:from-purple-600 dark:to-blue-600 z-0"></div>
                  )}
                  
                  <div className="relative z-10 bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-500">
                    <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center mb-6 text-white mx-auto group-hover:scale-110 transition-transform duration-300`}>
                      {step.icon}
                    </div>
                    
                    <div className="absolute -top-4 right-4 w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                      {step.number}
                    </div>
                    
                    <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-4">{step.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 via-purple-50/30 to-blue-50/30 dark:from-gray-800 dark:via-purple-900/10 dark:to-blue-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              خطط <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">الاشتراك</span>
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              اختر الخطة المناسبة لك واستمتع بتجربة تعليمية لا مثيل لها
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto"
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Quarterly Plan */}
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-500 relative overflow-hidden group"
              variants={fadeIn}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-2xl"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">الاشتراك الفصلي</h3>
                  <div className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                    الأكثر مرونة
                  </div>
                </div>
                
                <div className="mb-8">
                  <div className="flex items-baseline justify-center lg:justify-start">
                    <span className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">500</span>
                    <span className="text-xl text-gray-600 dark:text-gray-300 mr-2">دج</span>
                    <span className="text-gray-500 dark:text-gray-400">/ فصل</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">فصل دراسي واحد (3 أشهر)</p>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {[
                    'وصول كامل لمواد الفصل المختار',
                    'جميع الفيديوهات التعليمية',
                    'ملخصات ووثائق شاملة',
                    'تمارين تفاعلية متدرجة',
                    'اختبارات محاكية',
                    'مساعد ذكي شخصي',
                    'تتبع التقدم والإحصائيات',
                    'دعم فني متواصل'
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-500 ml-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <button 
                  onClick={handleMainAction} 
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  {getMainButtonText()}
                </button>
              </div>
            </motion.div>

            {/* Yearly Plan */}
            <motion.div 
              className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl p-8 shadow-2xl text-white relative overflow-hidden group"
              variants={fadeIn}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold">الاشتراك السنوي</h3>
                  <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                    الأكثر توفيراً
                  </div>
                </div>
                
                <div className="mb-8">
                  <div className="flex items-baseline justify-center lg:justify-start">
                    <span className="text-4xl lg:text-5xl font-bold">1000</span>
                    <span className="text-xl mr-2">دج</span>
                    <span className="text-white/80">/ سنة</span>
                  </div>
                  <p className="text-white/80 mt-2">السنة الدراسية كاملة (3 فصول)</p>
                  <div className="mt-3 inline-flex items-center px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm">
                    <span className="text-green-300 font-semibold ml-2">وفر 500 دج</span>
                    <span className="text-white/80">مقارنة بالاشتراك الفصلي</span>
                  </div>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {[
                    'وصول كامل لجميع الفصول الثلاثة',
                    'جميع المواد والتخصصات',
                    'محتوى محدث باستمرار',
                    'أولوية في الدعم الفني',
                    'تقارير تقدم مفصلة',
                    'جلسات مراجعة إضافية',
                    'شهادات إنجاز معتمدة',
                    'خصومات على الدورات الإضافية'
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-300 ml-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <button 
                  onClick={handleMainAction} 
                  className="w-full py-4 bg-white text-purple-600 rounded-2xl font-semibold text-lg hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  {getMainButtonText()}
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-6">
              ابدأ رحلتك التعليمية اليوم
            </h2>
            <p className="text-lg lg:text-xl text-white/90 max-w-3xl mx-auto mb-10">
              انضم إلى آلاف الطلاب الذين حققوا نتائج مذهلة مع منصة قلم التعليمية
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 sm:space-x-reverse justify-center items-center">
              <motion.button 
                onClick={handleMainAction} 
                className="px-8 py-4 bg-white text-purple-600 rounded-2xl font-semibold text-lg hover:bg-gray-50 transition-all duration-300 shadow-xl hover:shadow-2xl"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {isAuthenticated && (hasSubscription || isTrialActive) ? 'ادخل إلى منصتك' : 'ابدأ مجاناً الآن'}
              </motion.button>
              
              <div className="flex items-center space-x-4 space-x-reverse text-white/90">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 ml-1" />
                  <span className="text-sm">فترة تجريبية 24 ساعة</span>
                </div>
                <div className="flex items-center">
                  <Shield className="w-4 h-4 ml-1" />
                  <span className="text-sm">بدون التزام</span>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            >
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">+10,000</div>
                <div className="text-white/80">طالب نشط</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">95%</div>
                <div className="text-white/80">معدل النجاح</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">4.9/5</div>
                <div className="text-white/80">تقييم المستخدمين</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;