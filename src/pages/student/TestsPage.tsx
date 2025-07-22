import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Search, Filter, Play, Clock, Award, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { SUBJECTS_BY_LEVEL } from '../../types/education';

const TestsPage: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  // Generate mock tests based on user's education level
  const generateTests = () => {
    if (!user) return [];

    const { level, year, stream } = user.education;
    let subjects = [];

    if (level === 'secondary') {
      const streamKey = stream || 'cst';
      subjects = SUBJECTS_BY_LEVEL.secondary[streamKey] || [];
    } else if (level === 'primary') {
      subjects = SUBJECTS_BY_LEVEL.primary[year as keyof typeof SUBJECTS_BY_LEVEL.primary] || [];
    } else if (level === 'middle') {
      subjects = SUBJECTS_BY_LEVEL.middle[year as keyof typeof SUBJECTS_BY_LEVEL.middle] || [];
    }

    return subjects.flatMap(subject => 
      Array.from({ length: 4 }, (_, i) => ({
        id: `${subject.id}-test-${i + 1}`,
        title: `اختبار ${subject.name} - الفصل ${i + 1}`,
        subject: subject.name,
        subjectId: subject.id,
        description: `اختبار شامل للفصل ${i + 1} في مادة ${subject.name}`,
        questions: Math.floor(Math.random() * 20) + 10,
        duration: Math.floor(Math.random() * 60) + 30,
        difficulty: ['سهل', 'متوسط', 'صعب'][Math.floor(Math.random() * 3)],
        attempts: Math.floor(Math.random() * 5),
        bestScore: Math.floor(Math.random() * 40) + 60,
        averageScore: Math.floor(Math.random() * 30) + 50,
        completed: Math.random() > 0.5,
        createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
      }))
    );
  };

  const tests = generateTests();
  const filteredTests = tests.filter(test => {
    const matchesSearch = test.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         test.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || test.subjectId === selectedSubject;
    const matchesDifficulty = selectedDifficulty === 'all' || test.difficulty === selectedDifficulty;
    return matchesSearch && matchesSubject && matchesDifficulty;
  });

  const subjects = [...new Set(tests.map(t => ({ id: t.subjectId, name: t.subject })))];

  const handleStartTest = (testId: string) => {
    // Navigate to test taking interface
    console.log('Starting test:', testId);
  };

  return (
    <div className="p-3 lg:p-6">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            الاختبارات
          </h1>
          <p className="text-sm lg:text-base text-gray-600 dark:text-gray-300">
            اختبر معلوماتك وقيس مستوى فهمك للمواد الدراسية
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card text-center">
            <div className="flex justify-center mb-4">
              <Target className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {tests.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">إجمالي الاختبارات</div>
          </div>

          <div className="card text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {tests.filter(t => t.completed).length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">اختبارات مكتملة</div>
          </div>

          <div className="card text-center">
            <div className="flex justify-center mb-4">
              <Award className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {Math.round(tests.reduce((sum, t) => sum + t.bestScore, 0) / tests.length) || 0}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">متوسط الدرجات</div>
          </div>

          <div className="card text-center">
            <div className="flex justify-center mb-4">
              <AlertCircle className="w-8 h-8 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {tests.filter(t => !t.completed).length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">اختبارات معلقة</div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="card mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pr-10"
                placeholder="البحث في الاختبارات..."
              />
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Filter className="h-5 w-5 text-gray-400" />
              </div>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="input-field pr-10 appearance-none min-w-[150px]"
              >
                <option value="all">جميع المواد</option>
                {subjects.map(subject => (
                  <option key={subject.id} value={subject.id}>{subject.name}</option>
                ))}
              </select>
            </div>

            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="input-field appearance-none min-w-[120px]"
            >
              <option value="all">جميع المستويات</option>
              <option value="سهل">سهل</option>
              <option value="متوسط">متوسط</option>
              <option value="صعب">صعب</option>
            </select>
          </div>
        </div>

        {/* Tests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTests.map((test) => (
            <motion.div
              key={test.id}
              className="card hover:shadow-luxury-hover transition-all duration-300 group"
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              whileHover={{ y: -4 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                    {test.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    {test.description}
                  </p>
                </div>
                {test.completed && (
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                )}
              </div>

              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm rounded-full">
                  {test.subject}
                </span>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  test.difficulty === 'سهل' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
                  test.difficulty === 'متوسط' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300' :
                  'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                }`}>
                  {test.difficulty}
                </span>
              </div>

              <div className="space-y-2 mb-4 text-sm text-gray-600 dark:text-gray-300">
                <div className="flex items-center justify-between">
                  <span>عدد الأسئلة:</span>
                  <span className="font-medium">{test.questions} سؤال</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>المدة:</span>
                  <span className="font-medium flex items-center">
                    <Clock className="w-4 h-4 ml-1" />
                    {test.duration} دقيقة
                  </span>
                </div>
                {test.completed && (
                  <>
                    <div className="flex items-center justify-between">
                      <span>أفضل نتيجة:</span>
                      <span className="font-medium text-green-600 dark:text-green-400">
                        {test.bestScore}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>عدد المحاولات:</span>
                      <span className="font-medium">{test.attempts}</span>
                    </div>
                  </>
                )}
              </div>

              <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
                <button
                  onClick={() => handleStartTest(test.id)}
                  className="btn-primary w-full flex items-center justify-center"
                >
                  <Play className="w-4 h-4 ml-2" />
                  {test.completed ? 'إعادة الاختبار' : 'بدء الاختبار'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredTests.length === 0 && (
          <div className="text-center py-12">
            <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              لا توجد اختبارات
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {searchTerm || selectedSubject !== 'all' || selectedDifficulty !== 'all'
                ? 'لم يتم العثور على اختبارات تطابق البحث'
                : 'لا توجد اختبارات متاحة حالياً'
              }
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default TestsPage;