import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Lock, 
  Mail, 
  User, 
  GraduationCap, 
  ChevronRight, 
  ChevronLeft,
  Users,
  School,
  Settings,
  Phone,
  Chrome
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTrial } from '../contexts/TrialContext';
import { 
  EDUCATION_LEVELS, 
  type EducationalLevel, 
  type SecondaryStream, 
  type EducationInfo,
  type PrimaryGrade,
  type MiddleGrade,
  type SecondaryYear,
  type TechnicalSpecialization,
  type ForeignLanguageChoice
} from '../types/education';
import { motion, AnimatePresence } from 'framer-motion';

type UserType = 'student' | 'guardian';
type RegistrationType = 'email' | 'google' | 'phone';

interface FormData {
  userType: UserType;
  registrationType: RegistrationType;
  guardianName: string;
  studentName: string;
  level: EducationalLevel;
  year: PrimaryGrade | MiddleGrade | SecondaryYear;
  stream: SecondaryStream;
  technicalSpecialization: TechnicalSpecialization;
  foreignLanguageChoice: ForeignLanguageChoice;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

const RegisterPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    userType: 'student',
    registrationType: 'email',
    guardianName: '',
    studentName: '',
    level: 'primary',
    year: 1,
    stream: 'cst',
    technicalSpecialization: 'electrical',
    foreignLanguageChoice: 'spanish',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  
  const [error, setError] = useState('');
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();
  
  const getTotalSteps = () => {
    let steps = 7; // Base steps: user type, registration type, names, level, year/stream, email/phone, password
    
    // Add step for technical specialization if needed
    if (formData.level === 'secondary' && 
        formData.year > 1 && 
        formData.stream === 'technical-mathematics') {
      steps += 1;
    }
    
    // Add step for foreign language choice if needed
    if (formData.level === 'secondary' && 
        formData.year > 1 && 
        formData.stream === 'foreign-languages') {
      steps += 1;
    }
    
    // Skip password step for Google registration
    if (formData.registrationType === 'google') {
      steps -= 1;
    }
    
    return steps;
  };
  
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };
  
  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => prev + 1);
    }
  };
  
  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };
  
  const validateCurrentStep = () => {
    setError('');
    
    switch (currentStep) {
      case 1:
        return true;
      case 2:
        if (formData.userType === 'guardian') {
          if (!formData.guardianName.trim()) {
            setError('الرجاء إدخال اسم ولي الأمر');
            return false;
          }
          if (!formData.studentName.trim()) {
            setError('الرجاء إدخال اسم الطالب');
            return false;
          }
        } else {
          if (!formData.studentName.trim()) {
            setError('الرجاء إدخال اسم الطالب');
            return false;
          }
        }
        return true;
      case 3:
        return true;
      case 4:
        return true;
      case 5:
        // This could be technical specialization, foreign language choice, or email
        return true;
      case 6:
      case 7:
      case 8:
        // Handle email step
        if (isEmailStep() && formData.registrationType === 'email') {
          if (!formData.email) {
            setError('الرجاء إدخال البريد الإلكتروني');
            return false;
          }
          if (!/\S+@\S+\.\S+/.test(formData.email)) {
            setError('الرجاء إدخال بريد إلكتروني صحيح');
            return false;
          }
        }
        // Handle phone step
        if (isPhoneStep()) {
          if (!formData.phone) {
            setError('الرجاء إدخال رقم الهاتف');
            return false;
          }
          if (!/^(\+213|0)[5-7][0-9]{8}$/.test(formData.phone)) {
            setError('الرجاء إدخال رقم هاتف جزائري صحيح');
            return false;
          }
        }
        // Handle password step
        if (isPasswordStep()) {
          if (!formData.password) {
            setError('الرجاء إدخال كلمة المرور');
            return false;
          }
          if (formData.password.length < 6) {
            setError('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
            return false;
          }
          if (formData.password !== formData.confirmPassword) {
            setError('كلمات المرور غير متطابقة');
            return false;
          }
        }
        return true;
      default:
        return true;
    }
  };
  
  const isEmailStep = () => {
    const totalSteps = getTotalSteps();
    return currentStep === totalSteps - (formData.registrationType === 'google' ? 0 : 1);
  };
  
  const isPhoneStep = () => {
    const totalSteps = getTotalSteps();
    return formData.registrationType === 'phone' && currentStep === totalSteps - 1;
  };
  
  const isPasswordStep = () => {
    const totalSteps = getTotalSteps();
    return formData.registrationType !== 'google' && currentStep === totalSteps;
  };
  
  const isTechnicalSpecializationStep = () => {
    const baseStep = formData.registrationType === 'google' ? 5 : 6;
    return currentStep === baseStep && 
           formData.level === 'secondary' && 
           formData.year > 1 && 
           formData.stream === 'technical-mathematics';
  };
  
  const isForeignLanguageChoiceStep = () => {
    const baseStep = formData.registrationType === 'google' ? 5 : 6;
    const expectedStep = formData.stream === 'technical-mathematics' ? baseStep + 1 : baseStep;
    return currentStep === expectedStep && 
           formData.level === 'secondary' && 
           formData.year > 1 && 
           formData.stream === 'foreign-languages';
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateCurrentStep()) return;
    
    const education: EducationInfo = {
      level: formData.level,
      year: formData.year,
      ...(formData.level === 'secondary' ? { stream: formData.stream } : {}),
      ...(formData.level === 'secondary' && formData.stream === 'technical-mathematics' ? 
          { technicalSpecialization: formData.technicalSpecialization } : {}),
      ...(formData.level === 'secondary' && formData.stream === 'foreign-languages' ? 
          { foreignLanguageChoice: formData.foreignLanguageChoice } : {})
    };
    
    const displayName = formData.userType === 'guardian' 
      ? `${formData.guardianName} (ولي أمر ${formData.studentName})`
      : formData.studentName;
    
    const contactInfo = formData.registrationType === 'phone' ? formData.phone : formData.email;
    const password = formData.registrationType === 'google' ? 'google-auth' : formData.password;
    
    try {
      await register(displayName, contactInfo, password, education);
      
      // Navigate to dashboard - trial will be automatically initiated by TrialContext
      console.log('Registration successful, navigating to dashboard...');
      navigate('/dashboard');
    } catch (err) {
      setError('فشل إنشاء الحساب. يرجى المحاولة مرة أخرى.');
    }
  };
  
  const renderStepContent = (step: number) => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">من سيستخدم المنصة؟</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, userType: 'student' }))}
                className={`p-6 rounded-xl border-2 transition-all ${
                  formData.userType === 'student'
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-gray-200 dark:border-gray-600 hover:border-primary-200 dark:hover:border-primary-400'
                }`}
              >
                <div className="flex flex-col items-center">
                  <School className="w-12 h-12 text-primary-600 dark:text-primary-400 mb-3" />
                  <span className="text-lg font-medium text-gray-800 dark:text-gray-200">طالب</span>
                </div>
              </button>
              
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, userType: 'guardian' }))}
                className={`p-6 rounded-xl border-2 transition-all ${
                  formData.userType === 'guardian'
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-gray-200 dark:border-gray-600 hover:border-primary-200 dark:hover:border-primary-400'
                }`}
              >
                <div className="flex flex-col items-center">
                  <Users className="w-12 h-12 text-primary-600 dark:text-primary-400 mb-3" />
                  <span className="text-lg font-medium text-gray-800 dark:text-gray-200">ولي أمر</span>
                </div>
              </button>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">كيف تريد التسجيل؟</h2>
            <div className="grid grid-cols-1 gap-4">
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, registrationType: 'email' }))}
                className={`p-6 rounded-xl border-2 transition-all ${
                  formData.registrationType === 'email'
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-gray-200 dark:border-gray-600 hover:border-primary-200 dark:hover:border-primary-400'
                }`}
              >
                <div className="flex items-center">
                  <Mail className="w-8 h-8 text-primary-600 dark:text-primary-400 ml-4" />
                  <div className="text-right">
                    <span className="text-lg font-medium text-gray-800 dark:text-gray-200 block">البريد الإلكتروني</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">التسجيل باستخدام البريد الإلكتروني</span>
                  </div>
                </div>
              </button>
              
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, registrationType: 'google' }))}
                className={`p-6 rounded-xl border-2 transition-all ${
                  formData.registrationType === 'google'
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-gray-200 dark:border-gray-600 hover:border-primary-200 dark:hover:border-primary-400'
                }`}
              >
                <div className="flex items-center">
                  <Chrome className="w-8 h-8 text-primary-600 dark:text-primary-400 ml-4" />
                  <div className="text-right">
                    <span className="text-lg font-medium text-gray-800 dark:text-gray-200 block">حساب Google</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">التسجيل السريع بحساب Google</span>
                  </div>
                </div>
              </button>
              
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, registrationType: 'phone' }))}
                className={`p-6 rounded-xl border-2 transition-all ${
                  formData.registrationType === 'phone'
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-gray-200 dark:border-gray-600 hover:border-primary-200 dark:hover:border-primary-400'
                }`}
              >
                <div className="flex items-center">
                  <Phone className="w-8 h-8 text-primary-600 dark:text-primary-400 ml-4" />
                  <div className="text-right">
                    <span className="text-lg font-medium text-gray-800 dark:text-gray-200 block">رقم الهاتف</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">التسجيل باستخدام رقم الهاتف</span>
                  </div>
                </div>
              </button>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
              {formData.userType === 'student' ? 'ما هو اسمك؟' : 'أدخل البيانات المطلوبة'}
            </h2>
            
            {formData.userType === 'guardian' && (
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">اسم ولي الأمر</label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={formData.guardianName}
                    onChange={(e) => setFormData(prev => ({ ...prev, guardianName: e.target.value }))}
                    className="input-field pr-10"
                    placeholder="أدخل اسم ولي الأمر"
                    required
                  />
                </div>
              </div>
            )}
            
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">
                {formData.userType === 'guardian' ? 'اسم الطالب' : 'اسمك الكامل'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={formData.studentName}
                  onChange={(e) => setFormData(prev => ({ ...prev, studentName: e.target.value }))}
                  className="input-field pr-10"
                  placeholder={formData.userType === 'guardian' ? 'أدخل اسم الطالب' : 'أدخل اسمك الكامل'}
                  required
                />
              </div>
            </div>
          </div>
        );
      
      case 4:
        return (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">ما هو المستوى التعليمي؟</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(EDUCATION_LEVELS).map(([value, { name }]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setFormData(prev => ({ 
                    ...prev, 
                    level: value as EducationalLevel,
                    year: 1,
                    stream: 'cst'
                  }))}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    formData.level === value
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                      : 'border-gray-200 dark:border-gray-600 hover:border-primary-200 dark:hover:border-primary-400'
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <GraduationCap className="w-8 h-8 text-primary-600 dark:text-primary-400 mb-2" />
                    <span className="text-lg font-medium text-gray-800 dark:text-gray-200">{name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );
      
      case 5:
        if (formData.level === 'secondary') {
          return (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">اختر السنة الدراسية والشعبة</h2>
              
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">السنة الدراسية</h3>
                <div className="grid grid-cols-3 gap-4">
                  {Array.from({ length: EDUCATION_LEVELS[formData.level].years }, (_, i) => (
                    <button
                      key={i + 1}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, year: (i + 1) as SecondaryYear }))}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        formData.year === i + 1
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                          : 'border-gray-200 dark:border-gray-600 hover:border-primary-200 dark:hover:border-primary-400'
                      }`}
                    >
                      <span className="text-lg font-medium text-gray-800 dark:text-gray-200">
                        {EDUCATION_LEVELS.secondary.grades[i + 1 as SecondaryYear]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">
                  {formData.year === 1 ? 'الجذع المشترك' : 'الشعبة المتخصصة'}
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {formData.year === 1 ? (
                    // First year - Common Core options
                    <>
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, stream: 'cst' }))}
                        className={`p-4 rounded-xl border-2 transition-all text-right ${
                          formData.stream === 'cst'
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                            : 'border-gray-200 dark:border-gray-600 hover:border-primary-200 dark:hover:border-primary-400'
                        }`}
                      >
                        <span className="text-lg font-medium text-gray-800 dark:text-gray-200">
                          {EDUCATION_LEVELS.secondary.streams.cst}
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, stream: 'cah' }))}
                        className={`p-4 rounded-xl border-2 transition-all text-right ${
                          formData.stream === 'cah'
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                            : 'border-gray-200 dark:border-gray-600 hover:border-primary-200 dark:hover:border-primary-400'
                        }`}
                      >
                        <span className="text-lg font-medium text-gray-800 dark:text-gray-200">
                          {EDUCATION_LEVELS.secondary.streams.cah}
                        </span>
                      </button>
                    </>
                  ) : (
                    // Years 2 & 3 - Specialized streams
                    Object.entries(EDUCATION_LEVELS.secondary.streams)
                      .filter(([key]) => !['cst', 'cah'].includes(key))
                      .map(([value, name]) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, stream: value as SecondaryStream }))}
                          className={`p-4 rounded-xl border-2 transition-all text-right ${
                            formData.stream === value
                              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                              : 'border-gray-200 dark:border-gray-600 hover:border-primary-200 dark:hover:border-primary-400'
                          }`}
                        >
                          <span className="text-lg font-medium text-gray-800 dark:text-gray-200">{name}</span>
                        </button>
                      ))
                  )}
                </div>
              </div>
            </div>
          );
        } else {
          return (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">اختر السنة الدراسية</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Array.from({ length: EDUCATION_LEVELS[formData.level].years }, (_, i) => (
                  <button
                    key={i + 1}
                    type="button"
                    onClick={() => setFormData(prev => ({ 
                      ...prev, 
                      year: (i + 1) as PrimaryGrade | MiddleGrade 
                    }))}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      formData.year === i + 1
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                        : 'border-gray-200 dark:border-gray-600 hover:border-primary-200 dark:hover:border-primary-400'
                    }`}
                  >
                    <span className="text-lg font-medium text-gray-800 dark:text-gray-200">
                      {formData.level === 'primary' 
                        ? EDUCATION_LEVELS.primary.grades[i + 1 as PrimaryGrade]
                        : EDUCATION_LEVELS.middle.grades[i + 1 as MiddleGrade]
                      }
                    </span>
                  </button>
                ))}
              </div>
            </div>
          );
        }
      
      case 6:
        if (isTechnicalSpecializationStep()) {
          return (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">اختر التخصص الهندسي</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(EDUCATION_LEVELS.secondary.technicalSpecializations).map(([value, name]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, technicalSpecialization: value as TechnicalSpecialization }))}
                    className={`p-6 rounded-xl border-2 transition-all text-right ${
                      formData.technicalSpecialization === value
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                        : 'border-gray-200 dark:border-gray-600 hover:border-primary-200 dark:hover:border-primary-400'
                    }`}
                  >
                    <div className="flex items-center">
                      <Settings className="w-6 h-6 text-primary-600 dark:text-primary-400 ml-3" />
                      <span className="text-lg font-medium text-gray-800 dark:text-gray-200">{name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          );
        } else if (isForeignLanguageChoiceStep()) {
          return (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">اختر اللغة الأجنبية الثالثة</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(EDUCATION_LEVELS.secondary.foreignLanguageChoices).map(([value, name]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, foreignLanguageChoice: value as ForeignLanguageChoice }))}
                    className={`p-6 rounded-xl border-2 transition-all text-center ${
                      formData.foreignLanguageChoice === value
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                        : 'border-gray-200 dark:border-gray-600 hover:border-primary-200 dark:hover:border-primary-400'
                    }`}
                  >
                    <span className="text-lg font-medium text-gray-800 dark:text-gray-200">{name}</span>
                  </button>
                ))}
              </div>
            </div>
          );
        } else if (isEmailStep() && formData.registrationType === 'email') {
          return (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">أدخل بريدك الإلكتروني</h2>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="input-field pr-10"
                  placeholder="أدخل بريدك الإلكتروني"
                  required
                />
              </div>
            </div>
          );
        } else if (isPhoneStep()) {
          return (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">أدخل رقم هاتفك</h2>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="input-field pr-10"
                  placeholder="0555 123 456"
                  required
                />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                سيتم إرسال رمز التحقق إلى هذا الرقم
              </p>
            </div>
          );
        } else if (formData.registrationType === 'google') {
          return (
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">التسجيل بحساب Google</h2>
              <div className="p-8 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <Chrome className="w-16 h-16 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  سيتم توجيهك إلى Google لإكمال التسجيل بأمان
                </p>
                <button
                  type="button"
                  className="btn-primary flex items-center mx-auto"
                  onClick={() => {
                    // Simulate Google OAuth
                    setFormData(prev => ({ 
                      ...prev, 
                      email: 'user@gmail.com',
                      studentName: prev.studentName || 'مستخدم Google'
                    }));
                    handleNext();
                  }}
                >
                  <Chrome className="w-5 h-5 ml-2" />
                  متابعة مع Google
                </button>
              </div>
            </div>
          );
        }
        break;
      
      case 7:
      case 8:
      case 9:
        if (isForeignLanguageChoiceStep()) {
          return (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">اختر اللغة الأجنبية الثالثة</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(EDUCATION_LEVELS.secondary.foreignLanguageChoices).map(([value, name]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, foreignLanguageChoice: value as ForeignLanguageChoice }))}
                    className={`p-6 rounded-xl border-2 transition-all text-center ${
                      formData.foreignLanguageChoice === value
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                        : 'border-gray-200 dark:border-gray-600 hover:border-primary-200 dark:hover:border-primary-400'
                    }`}
                  >
                    <span className="text-lg font-medium text-gray-800 dark:text-gray-200">{name}</span>
                  </button>
                ))}
              </div>
            </div>
          );
        } else if (isEmailStep() && formData.registrationType === 'email') {
          return (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">أدخل بريدك الإلكتروني</h2>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="input-field pr-10"
                  placeholder="أدخل بريدك الإلكتروني"
                  required
                />
              </div>
            </div>
          );
        } else if (isPhoneStep()) {
          return (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">أدخل رقم هاتفك</h2>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="input-field pr-10"
                  placeholder="0555 123 456"
                  required
                />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                سيتم إرسال رمز التحقق إلى هذا الرقم
              </p>
            </div>
          );
        } else if (isPasswordStep()) {
          return (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">أنشئ كلمة المرور</h2>
              
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">كلمة المرور</label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    className="input-field pr-10"
                    placeholder="أدخل كلمة المرور"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">تأكيد كلمة المرور</label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    className="input-field pr-10"
                    placeholder="أدخل كلمة المرور مرة أخرى"
                    required
                  />
                </div>
              </div>
            </div>
          );
        }
        break;
      
      default:
        return null;
    }
  };
  
  const totalSteps = getTotalSteps();
  
  return (
    <div className="max-w-2xl mx-auto my-12 p-8 card">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">إنشاء حساب جديد</h1>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            الخطوة {currentStep} من {totalSteps}
          </div>
        </div>
        
        <div className="relative">
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-primary-100 dark:bg-primary-900/30">
            <div
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-500 transition-all duration-500"
            />
          </div>
        </div>
      </div>
      
      {error && (
        <div className="bg-error-50 dark:bg-error-900/20 text-error-600 dark:text-error-400 p-3 rounded-lg mb-6">
          {error}
        </div>
      )}
      
      <form onSubmit={currentStep === totalSteps ? handleSubmit : (e) => e.preventDefault()}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentStep}
            custom={currentStep}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
          >
            {renderStepContent(currentStep)}
          </motion.div>
        </AnimatePresence>
        
        <div className="mt-8 flex justify-between">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
            >
              <ChevronRight className="h-5 w-5 ml-1" />
              السابق
            </button>
          )}
          
          {currentStep < totalSteps ? (
            <button
              type="button"
              onClick={handleNext}
              className="btn-primary flex items-center mr-auto"
            >
              التالي
              <ChevronLeft className="h-5 w-5 mr-1" />
            </button>
          ) : (
            <button
              type="submit"
              className="btn-primary flex items-center mr-auto"
              disabled={isLoading}
            >
              {isLoading ? 'جارِ إنشاء الحساب...' : 'إنشاء الحساب'}
            </button>
          )}
        </div>
      </form>
      
      <div className="mt-6 text-center text-gray-600 dark:text-gray-400">
        لديك حساب بالفعل؟{' '}
        <Link to="/login" className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300">
          تسجيل الدخول
        </Link>
      </div>
      
      <div className="mt-8 p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg border border-green-200 dark:border-green-700">
        <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2 flex items-center">
          <span className="w-2 h-2 bg-green-500 rounded-full ml-2"></span>
          تمتع بفترة تجريبية مجانية لمدة 24 ساعة!
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          عند إنشاء حساب جديد، ستحصل تلقائيًا على فترة تجريبية مجانية لمدة 24 ساعة للوصول إلى جميع محتويات المنصة.
          {formData.registrationType === 'google' && (
            <span className="block mt-1 text-blue-600 dark:text-blue-400">
              التسجيل بـ Google سريع وآمن!
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;