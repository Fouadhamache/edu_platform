import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Video, 
  FileText, 
  ListChecks, 
  Layers, 
  Users, 
  Clock, 
  Award,
  MapPin 
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTrial } from '../contexts/TrialContext';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { isTrialActive, hasSubscription } = useTrial();
  
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
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

  const handleMainAction = () => {
    if (isAuthenticated && (hasSubscription || isTrialActive)) {
      navigate('/dashboard');
    } else {
      navigate('/register');
    }
  };

  const getMainButtonText = () => {
    if (isAuthenticated && (hasSubscription || isTrialActive)) {
      return 'ادرس الآن';
    }
    return 'ابدأ مجانًا لمدة 24 ساعة';
  };
  
  return (
    <div className="bg-gradient-to-b from-white to-primary-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section - Mobile Optimized */}
      <section className="relative py-12 lg:py-20 xl:py-28">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center">
            <motion.div 
              className="lg:w-1/2 lg:ml-8 text-center lg:text-right"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 dark:text-white mb-4 lg:mb-6">
                منصة قلم التعليمية
                <span className="block text-primary-600 dark:text-primary-400 mt-1 lg:mt-2">تعلم بطريقة مبتكرة</span>
              </h1>
              <p className="text-base lg:text-xl text-gray-700 dark:text-gray-300 mb-6 lg:mb-8 px-2 lg:px-0">
                منصة تعليمية شاملة مصممة خصيصًا للطلاب العرب، توفر أدوات تفاعلية وموارد تعليمية عالية الجودة لمساعدتك على التفوق في دراستك.
              </p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 sm:space-x-reverse justify-center lg:justify-start">
                <button 
                  onClick={handleMainAction} 
                  className="btn-primary text-base lg:text-lg py-3 lg:py-3 px-6 lg:px-8 w-full sm:w-auto"
                >
                  {getMainButtonText()}
                </button>
                {!isAuthenticated && (
                  <button 
                    onClick={() => navigate('/login')} 
                    className="btn-secondary text-base lg:text-lg py-3 lg:py-3 px-6 lg:px-8 w-full sm:w-auto"
                  >
                    تسجيل الدخول
                  </button>
                )}
              </div>
            </motion.div>
            
            <motion.div 
              className="lg:w-1/2 mt-8 lg:mt-0 px-4 lg:px-0"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
            >
              <img 
                src="https://images.pexels.com/photos/4145153/pexels-photo-4145153.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="طلاب يدرسون" 
                className="rounded-lg lg:rounded-xl shadow-lg lg:shadow-xl w-full"
              />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Features Section - Mobile Optimized */}
      <section className="py-12 lg:py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <motion.div 
            className="text-center mb-12 lg:mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-3 lg:mb-4">ميزات منصتنا التعليمية</h2>
            <p className="text-base lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-2 lg:px-0">
              نقدم مجموعة متكاملة من الأدوات والموارد التعليمية المصممة خصيصًا لتعزيز تجربة التعلم العربية
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8"
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div className="card text-center" variants={fadeIn}>
              <div className="flex justify-center mb-3 lg:mb-4">
                <Video className="h-10 w-10 lg:h-12 lg:w-12 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white mb-2">فيديوهات تعليمية</h3>
              <p className="text-sm lg:text-base text-gray-600 dark:text-gray-300">شروحات مفصلة ومبسطة للدروس من أفضل المعلمين</p>
            </motion.div>
            
            <motion.div className="card text-center" variants={fadeIn}>
              <div className="flex justify-center mb-3 lg:mb-4">
                <FileText className="h-10 w-10 lg:h-12 lg:w-12 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white mb-2">وثائق الدروس</h3>
              <p className="text-sm lg:text-base text-gray-600 dark:text-gray-300">ملخصات وملاحظات شاملة لكل درس لتسهيل المراجعة</p>
            </motion.div>
            
            <motion.div className="card text-center" variants={fadeIn}>
              <div className="flex justify-center mb-3 lg:mb-4">
                <ListChecks className="h-10 w-10 lg:h-12 lg:w-12 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white mb-2">تمارين تفاعلية</h3>
              <p className="text-sm lg:text-base text-gray-600 dark:text-gray-300">سلسلة من التمارين المتنوعة لتثبيت المعلومات واختبار الفهم</p>
            </motion.div>
            
            <motion.div className="card text-center" variants={fadeIn}>
              <div className="flex justify-center mb-3 lg:mb-4">
                <BookOpen className="h-10 w-10 lg:h-12 lg:w-12 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white mb-2">بطاقات تعليمية</h3>
              <p className="text-sm lg:text-base text-gray-600 dark:text-gray-300">أداة فعالة للمراجعة السريعة وحفظ المعلومات الأساسية</p>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Subjects Section - Mobile Optimized */}
      <section className="py-12 lg:py-16 bg-primary-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <motion.div 
            className="text-center mb-12 lg:mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-3 lg:mb-4">المواد الدراسية</h2>
            <p className="text-base lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-2 lg:px-0">
              نغطي مجموعة واسعة من المواد الدراسية لجميع الفصول الدراسية
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-6"
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { name: 'الرياضيات', icon: <Layers className="h-5 w-5 lg:h-6 lg:w-6" /> },
              { name: 'الفيزياء', icon: <Award className="h-5 w-5 lg:h-6 lg:w-6" /> },
              { name: 'الكيمياء', icon: <Award className="h-5 w-5 lg:h-6 lg:w-6" /> },
              { name: 'اللغة العربية', icon: <BookOpen className="h-5 w-5 lg:h-6 lg:w-6" /> },
              { name: 'اللغة الإنجليزية', icon: <BookOpen className="h-5 w-5 lg:h-6 lg:w-6" /> },
              { name: 'العلوم الطبيعية', icon: <Award className="h-5 w-5 lg:h-6 lg:w-6" /> },
              { name: 'التاريخ', icon: <Clock className="h-5 w-5 lg:h-6 lg:w-6" /> },
              { name: 'الجغرافيا', icon: <MapPin className="h-5 w-5 lg:h-6 lg:w-6" /> },
              { name: 'العلوم الإسلامية', icon: <BookOpen className="h-5 w-5 lg:h-6 lg:w-6" /> },
            ].map((subject, index) => (
              <motion.div 
                key={index} 
                className="card flex items-center p-4 lg:p-5 hover:bg-primary-100 dark:hover:bg-primary-900/20 cursor-pointer transition-all"
                variants={fadeIn}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="ml-3 lg:ml-4 p-2 lg:p-3 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300">
                  {subject.icon}
                </div>
                <h3 className="text-base lg:text-lg font-semibold text-gray-900 dark:text-white">{subject.name}</h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* How It Works - Mobile Optimized */}
      <section className="py-12 lg:py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <motion.div 
            className="text-center mb-12 lg:mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-3 lg:mb-4">كيف تعمل المنصة؟</h2>
            <p className="text-base lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-2 lg:px-0">
              بدء استخدام منصة قلم التعليمية سهل وبسيط، اتبع الخطوات التالية
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8"
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div className="relative" variants={fadeIn}>
              <div className="card text-center h-full">
                <div className="absolute -top-2 lg:-top-4 right-3 lg:right-4 w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-sm lg:text-lg">
                  1
                </div>
                <div className="flex justify-center mb-3 lg:mb-4 pt-4 lg:pt-6">
                  <Users className="h-10 w-10 lg:h-12 lg:w-12 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white mb-2">إنشاء حساب</h3>
                <p className="text-sm lg:text-base text-gray-600 dark:text-gray-300">قم بإنشاء حساب جديد والاستفادة من فترة تجريبية مجانية لمدة 24 ساعة</p>
              </div>
            </motion.div>
            
            <motion.div className="relative" variants={fadeIn}>
              <div className="card text-center h-full">
                <div className="absolute -top-2 lg:-top-4 right-3 lg:right-4 w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-sm lg:text-lg">
                  2
                </div>
                <div className="flex justify-center mb-3 lg:mb-4 pt-4 lg:pt-6">
                  <Layers className="h-10 w-10 lg:h-12 lg:w-12 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white mb-2">اختر الفصل والمواد</h3>
                <p className="text-sm lg:text-base text-gray-600 dark:text-gray-300">اختر الفصل الدراسي المناسب والمواد التي ترغب في دراستها</p>
              </div>
            </motion.div>
            
            <motion.div className="relative" variants={fadeIn}>
              <div className="card text-center h-full">
                <div className="absolute -top-2 lg:-top-4 right-3 lg:right-4 w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-sm lg:text-lg">
                  3
                </div>
                <div className="flex justify-center mb-3 lg:mb-4 pt-4 lg:pt-6">
                  <BookOpen className="h-10 w-10 lg:h-12 lg:w-12 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white mb-2">ابدأ التعلم</h3>
                <p className="text-sm lg:text-base text-gray-600 dark:text-gray-300">استفد من الفيديوهات والوثائق والأدوات التفاعلية لتحسين مستواك الدراسي</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Pricing Section - Mobile Optimized */}
      <section className="py-12 lg:py-16 bg-primary-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <motion.div 
            className="text-center mb-12 lg:mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-3 lg:mb-4">خطط الاشتراك</h2>
            <p className="text-base lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-2 lg:px-0">
              أسعار مناسبة للجميع مع ميزات متكاملة
            </p>
          </motion.div>
          
          <motion.div 
            className="max-w-lg mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <div className="card border-2 border-primary-500">
              <div className="p-6 lg:p-8 text-center">
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-2">الاشتراك الفصلي</h3>
                <div className="text-3xl lg:text-4xl font-bold text-primary-700 dark:text-primary-400 mb-4 lg:mb-6">
                  1000 دينار جزائري
                  <span className="text-base lg:text-lg text-gray-600 dark:text-gray-400 font-normal block"> / فصل دراسي</span>
                </div>
                
                <ul className="text-right mb-6 lg:mb-8 space-y-2 lg:space-y-3">
                  {[
                    'جميع الفيديوهات الدراسية',
                    'جميع وثائق الدروس',
                    'سلاسل تمارين تفاعلية',
                    'بطاقات المراجعة',
                    'اختبارات تفاعلية',
                    'دعم عبر البريد الإلكتروني',
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center text-sm lg:text-base text-gray-700 dark:text-gray-300">
                      <div className="ml-2 p-1 rounded-full bg-success-500 text-white flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 lg:h-4 lg:w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <button 
                  onClick={handleMainAction} 
                  className="btn-primary w-full text-base lg:text-lg py-3"
                >
                  {getMainButtonText()}
                </button>
                {!isAuthenticated && (
                  <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400 mt-3 lg:mt-4">
                    ابدأ بفترة تجريبية مجانية لمدة 24 ساعة
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* CTA Section - Mobile Optimized */}
      <section className="py-12 lg:py-16 bg-primary-800 dark:bg-primary-900 text-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <motion.div 
            className="text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-2xl lg:text-3xl font-bold mb-3 lg:mb-4">ابدأ رحلتك التعليمية اليوم</h2>
            <p className="text-base lg:text-xl text-primary-100 max-w-3xl mx-auto mb-6 lg:mb-8 px-2 lg:px-0">
              انضم إلى آلاف الطلاب الذين يستفيدون من منصتنا التعليمية لتحسين مستواهم الدراسي
            </p>
            <button 
              onClick={handleMainAction} 
              className="btn-primary bg-white text-primary-700 hover:bg-primary-50 text-base lg:text-lg py-3 px-6 lg:px-8 w-full sm:w-auto"
            >
              {isAuthenticated && (hasSubscription || isTrialActive) ? 'ادرس الآن' : 'إنشاء حساب مجاني'}
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;