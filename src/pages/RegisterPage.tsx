import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Eye, EyeOff, ArrowLeft, ArrowRight, Check } from 'lucide-react';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    userType: '',
    studentName: '',
    guardianName: '',
    registrationMethod: '',
    educationLevel: '',
    year: '',
    stream: '',
    technicalSpecialization: '',
    foreignLanguage: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    // Basic validation for each step
    if (currentStep === 1 && !formData.userType) {
      alert('Please select who will use the platform');
      return;
    }
    if (currentStep === 2 && !formData.studentName) {
      alert('Please enter the student\'s name');
      return;
    }
    if (currentStep === 3 && !formData.registrationMethod) {
      alert('Please choose a registration method');
      return;
    }
    
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle registration logic here
    console.log('Registration data:', formData);
    navigate('/dashboard');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 text-center">Who will use the platform?</h2>
            <div className="space-y-4">
              <button
                type="button"
                onClick={() => handleInputChange('userType', 'student')}
                className={`w-full p-4 border-2 rounded-lg text-left transition-colors ${
                  formData.userType === 'student'
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <User className="w-6 h-6 text-indigo-600" />
                  <div>
                    <h3 className="font-semibold">Student</h3>
                    <p className="text-sm text-gray-600">I am a student registering for myself</p>
                  </div>
                </div>
              </button>
              <button
                type="button"
                onClick={() => handleInputChange('userType', 'guardian')}
                className={`w-full p-4 border-2 rounded-lg text-left transition-colors ${
                  formData.userType === 'guardian'
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <User className="w-6 h-6 text-indigo-600" />
                  <div>
                    <h3 className="font-semibold">Guardian</h3>
                    <p className="text-sm text-gray-600">I am registering for my child</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 text-center">Enter Names</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Student's Full Name *
                </label>
                <input
                  type="text"
                  value={formData.studentName}
                  onChange={(e) => handleInputChange('studentName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter student's full name"
                />
              </div>
              {formData.userType === 'guardian' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Guardian's Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.guardianName}
                    onChange={(e) => handleInputChange('guardianName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Enter guardian's full name"
                  />
                </div>
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 text-center">Choose Registration Method</h2>
            <div className="space-y-4">
              <button
                type="button"
                onClick={() => handleInputChange('registrationMethod', 'email')}
                className={`w-full p-4 border-2 rounded-lg text-left transition-colors ${
                  formData.registrationMethod === 'email'
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Mail className="w-6 h-6 text-indigo-600" />
                  <div>
                    <h3 className="font-semibold">Email Address</h3>
                    <p className="text-sm text-gray-600">Register using email and password</p>
                  </div>
                </div>
              </button>
              <button
                type="button"
                onClick={() => handleInputChange('registrationMethod', 'google')}
                className={`w-full p-4 border-2 rounded-lg text-left transition-colors ${
                  formData.registrationMethod === 'google'
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    G
                  </div>
                  <div>
                    <h3 className="font-semibold">Google Account</h3>
                    <p className="text-sm text-gray-600">Quick registration with Google</p>
                  </div>
                </div>
              </button>
              <button
                type="button"
                onClick={() => handleInputChange('registrationMethod', 'phone')}
                className={`w-full p-4 border-2 rounded-lg text-left transition-colors ${
                  formData.registrationMethod === 'phone'
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Phone className="w-6 h-6 text-indigo-600" />
                  <div>
                    <h3 className="font-semibold">Phone Number</h3>
                    <p className="text-sm text-gray-600">Register using phone number</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Registration Complete!</h2>
            <p className="text-gray-600 mb-6">Your account has been created successfully.</p>
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Go to Dashboard
            </button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
            <p className="text-gray-600">Step {currentStep} of 3</p>
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    step <= currentStep
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {step < currentStep ? <Check className="w-4 h-4" /> : step}
                </div>
              ))}
            </div>
            <div className="mt-2 h-2 bg-gray-200 rounded-full">
              <div
                className="h-full bg-indigo-600 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 3) * 100}%` }}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {renderStep()}

            <div className="flex justify-between mt-8">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
              )}
              
              <div className="ml-auto">
                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex items-center space-x-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    <span>Next</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Create Account
                  </button>
                )}
              </div>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-indigo-600 hover:text-indigo-700 font-semibold">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;