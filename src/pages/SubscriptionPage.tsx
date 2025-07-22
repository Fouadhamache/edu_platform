import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CreditCard, CheckCircle, Shield } from 'lucide-react';
import { useTrial } from '../contexts/TrialContext';

const SubscriptionPage: React.FC = () => {
  const [selectedSemester, setSelectedSemester] = useState('1');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const { purchaseSubscription } = useTrial();
  const navigate = useNavigate();
  
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    purchaseSubscription(selectedSemester);
    navigate('/dashboard');
  };
  
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        className="text-center mb-12"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <h1 className="text-3xl font-bold text-primary-900 mb-4">اشترك الآن</h1>
        <p className="text-xl text-gray-600">
          اختر الفصل الدراسي واستمتع بالوصول الكامل إلى جميع المواد والأدوات التفاعلية
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div 
          className="md:col-span-1"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-primary-800 mb-4">ملخص الاشتراك</h2>
            
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">اختر الفصل الدراسي</label>
              <select
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
                className="input-field"
              >
                <option value="1">الفصل الأول</option>
                <option value="2">الفصل الثاني</option>
                <option value="3">الفصل الثالث</option>
              </select>
            </div>
            
            <div className="border-t border-gray-200 pt-4 pb-2">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">سعر الاشتراك</span>
                <span className="font-semibold">1000 دج</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">المدة</span>
                <span className="font-semibold">فصل دراسي كامل</span>
              </div>
            </div>
            
            <div className="border-t border-gray-200 mt-4 pt-4">
              <div className="flex justify-between text-lg font-bold">
                <span>المجموع</span>
                <span className="text-primary-700">1000 دج</span>
              </div>
            </div>
            
            <div className="mt-6 bg-primary-50 p-4 rounded-lg">
              <h3 className="font-semibold text-primary-800 mb-2">ماذا تحصل؟</h3>
              <ul className="space-y-2">
                {[
                  'وصول كامل إلى جميع المواد في الفصل المختار',
                  'جميع الفيديوهات والوثائق التعليمية',
                  'تمارين وأدوات تفاعلية متنوعة',
                  'تحديثات مستمرة للمحتوى',
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-success-500 ml-2 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="md:col-span-2"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-primary-800 mb-6">معلومات الدفع</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="card-number" className="block text-gray-700 mb-2">رقم البطاقة</label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <CreditCard className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="card-number"
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="input-field pr-10"
                    placeholder="XXXX XXXX XXXX XXXX"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div>
                  <label htmlFor="expiry-date" className="block text-gray-700 mb-2">تاريخ الانتهاء</label>
                  <input
                    id="expiry-date"
                    type="text"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="input-field"
                    placeholder="MM/YY"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="cvv" className="block text-gray-700 mb-2">رمز الأمان (CVV)</label>
                  <input
                    id="cvv"
                    type="text"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    className="input-field"
                    placeholder="XXX"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-8">
                <label htmlFor="card-name" className="block text-gray-700 mb-2">الاسم على البطاقة</label>
                <input
                  id="card-name"
                  type="text"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  className="input-field"
                  placeholder="أدخل الاسم كما هو على البطاقة"
                  required
                />
              </div>
              
              <div className="flex items-center mb-6 text-gray-600 bg-gray-50 p-3 rounded-lg">
                <Shield className="h-5 w-5 ml-2 text-gray-500" />
                <span className="text-sm">جميع معلومات الدفع آمنة ومشفرة. نحن لا نخزن بيانات بطاقتك.</span>
              </div>
              
              <button 
                type="submit" 
                className="btn-primary w-full py-3"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center">
                    <span className="spinner w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin ml-2"></span>
                    جاري معالجة الدفع...
                  </span>
                ) : (
                  'إتمام الدفع وبدء الاشتراك'
                )}
              </button>
              
              <p className="text-center text-gray-500 text-sm mt-4">
                بالضغط على "إتمام الدفع"، أنت توافق على شروط الاستخدام وسياسة الخصوصية.
              </p>
            </form>
          </div>
          
          <div className="mt-6 text-center text-gray-500 text-sm">
            <p>ملاحظة: هذا نموذج للعرض فقط. لا تدخل بيانات بطاقة حقيقية.</p>
            <p>اضغط على "إتمام الدفع" لمحاكاة الاشتراك.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SubscriptionPage;