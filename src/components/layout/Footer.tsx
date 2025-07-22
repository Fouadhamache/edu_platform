import React from 'react';
import { GraduationCap, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary-900 text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <GraduationCap className="h-8 w-8 text-white" />
              <span className="mr-2 text-xl font-bold">منصة التعليم العربي</span>
            </div>
            <p className="text-primary-100 mb-6">
              منصة تعليمية رائدة مصممة خصيصًا للطلاب العرب لتوفير تجربة تعليمية فريدة وسهلة الاستخدام.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-primary-100 hover:text-white transition-colors">الرئيسية</a></li>
              <li><a href="/login" className="text-primary-100 hover:text-white transition-colors">تسجيل الدخول</a></li>
              <li><a href="/register" className="text-primary-100 hover:text-white transition-colors">إنشاء حساب</a></li>
              <li><a href="#" className="text-primary-100 hover:text-white transition-colors">الأسئلة الشائعة</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">المواد الدراسية</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-primary-100 hover:text-white transition-colors">الرياضيات</a></li>
              <li><a href="#" className="text-primary-100 hover:text-white transition-colors">الفيزياء</a></li>
              <li><a href="#" className="text-primary-100 hover:text-white transition-colors">اللغة العربية</a></li>
              <li><a href="#" className="text-primary-100 hover:text-white transition-colors">العلوم الطبيعية</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">تواصل معنا</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <Mail className="h-5 w-5 ml-2 text-primary-200" />
                <span className="text-primary-100">info@arab-education.com</span>
              </div>
              <div className="flex items-start">
                <Phone className="h-5 w-5 ml-2 text-primary-200" />
                <span className="text-primary-100">+213 123 456 789</span>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 ml-2 text-primary-200" />
                <span className="text-primary-100">الجزائر، الجزائر العاصمة</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-primary-800 text-center text-primary-200 text-sm">
          <p>© 2025 منصة التعليم العربي. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;