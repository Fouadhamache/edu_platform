import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard } from 'lucide-react';

const SubscriptionRequired: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="max-w-2xl mx-auto my-12 p-8 card text-center">
      <div className="flex justify-center mb-6">
        <CreditCard className="w-16 h-16 text-primary-600" />
      </div>
      <h1 className="text-2xl font-bold mb-4">انتهت فترة التجربة المجانية</h1>
      <p className="mb-6 text-gray-700">
        لقد انتهت فترة التجربة المجانية. للاستمرار في استخدام منصتنا التعليمية واكتشاف جميع المحتويات، يرجى الاشتراك في الخطة المناسبة لك.
      </p>
      <div className="p-6 bg-primary-50 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-2">الاشتراك الفصلي</h2>
        <p className="text-3xl font-bold text-primary-700 mb-2">1000 دينار جزائري</p>
        <p className="text-gray-600 mb-4">لفصل دراسي كامل مع إمكانية الوصول إلى جميع المواد والأدوات التفاعلية</p>
        <button 
          onClick={() => navigate('/subscription')}
          className="btn-primary w-full"
        >
          اشترك الآن
        </button>
      </div>
    </div>
  );
};

export default SubscriptionRequired;