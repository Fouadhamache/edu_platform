import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('فشل تسجيل الدخول. يرجى التحقق من بريدك الإلكتروني وكلمة المرور.');
    }
  };
  
  return (
    <div className="max-w-md mx-auto my-12 p-8 card">
      <h1 className="text-2xl font-bold text-primary-800 mb-6 text-center">تسجيل الدخول</h1>
      
      {error && (
        <div className="bg-error-50 text-error-600 p-3 rounded-lg mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-2">البريد الإلكتروني</label>
          <div className="relative">
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field pr-10"
              placeholder="أدخل بريدك الإلكتروني"
              required
            />
          </div>
        </div>
        
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 mb-2">كلمة المرور</label>
          <div className="relative">
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field pr-10"
              placeholder="أدخل كلمة المرور"
              required
            />
          </div>
        </div>
        
        <button 
          type="submit" 
          className="btn-primary w-full mb-4"
          disabled={isLoading}
        >
          {isLoading ? 'جارِ تسجيل الدخول...' : 'تسجيل الدخول'}
        </button>
        
        <p className="text-center text-gray-600">
          ليس لديك حساب؟{' '}
          <Link to="/register" className="text-primary-600 hover:text-primary-700">
            إنشاء حساب جديد
          </Link>
        </p>
      </form>
      
      <div className="mt-8 pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-500 text-center">
          ملاحظة: هذا نموذج للعرض فقط. يمكنك استخدام أي بريد إلكتروني وكلمة مرور للدخول.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;