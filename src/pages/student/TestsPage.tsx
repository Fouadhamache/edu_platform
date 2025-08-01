import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Search, Filter, Play, Clock, Award, CheckCircle, AlertCircle, Calendar } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { SUBJECTS_BY_LEVEL } from '../../types/education';

const TestsPage: React.FC = () => {
  const { user } = useAuth();
  const [selectedSemester, setSelectedSemester] = useState('1');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const semesters = [
    { id: '1', name: 'الفصل الأول' },
    { id: '2', name: 'الفصل الثاني' },
    { id: '3', name: 'الفصل الثالث' },
  ];

  // Get subjects based on user's education level
  const getSubjectsForUser = () => {
    if (!user) return [];
    
    const { level, year, stream } = user.education;
    
    if (level === 'primary' || level === 'middle') {
      return SUBJECTS_BY_LEVEL[level][year as keyof typeof SUBJECTS_BY_LEVEL[typeof level]] || [];
    } else if (level === 'secondary') {
      const streamKey = stream || 'cst';
      return SUBJECTS_BY_LEVEL.secondary[streamKey] || [];
    }
    
    return [];
  };

  // Generate 10 tests per subject per semester
  const generateTests = () => {
    if (!user) return [];

    const subjects = getSubjectsForUser();
    const tests = [];

    subjects.forEach(subject => {
      // Generate 10 tests for the selected semester
      for (let i = 1; i <= 10; i++) {
        const completed = Math.random() > 0.6;
        const attempts = completed ? Math.floor(Math.random() * 3) + 1 : 0;
        
        tests.push({
          id: `${subject.id}-${selectedSemester}-test-${i}`,
          title: `اختبار ${subject.name} - الوحدة ${i}`,
          subject: subject.name,
          subjectId: subject.id,
          semester: selectedSemester,
          semesterName: semesters.find(s => s.id === selectedSemester)?.name || '',
          description: `اختبار شامل للوحدة ${i} في مادة ${subject.name}`,
          questions: Math.floor(Math.random() * 15) + 10,
          duration: Math.floor(Math.random() * 45) + 30,
          difficulty: ['سهل', 'متوسط', 'صعب'][Math.floor(Math.random() * 3)],
          attempts,
          bestScore: completed ? Math.floor(Math.random() * 40) + 60 : 0,
          averageScore: completed ? Math.floor(Math.random() * 30) + 50 : 0,
          completed,
          createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
          timeLimit: Math.floor(Math.random() * 60) + 30,
          passingScore: 70
        });
      }
    });

    return tests;
  };

  const tests = generateTests();
  const filteredTests = tests.filter(test => {
    const matchesSearch = test.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         test.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || test.subjectId === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  const subjects = getSubjectsForUser();

  const handleStartTest = (testId: string) => {
    console.log('Starting test:', testId);
    // Navigate to test taking interface
  };

  return (
    <div className="p-4 lg:p-6">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="mb-6 lg:mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            الاختبارات
          </h1>
          <p className="text-sm lg:text-base text-gray-600 dark:text-gray-300">
            اختبر معلوماتك وقيس مستوى فهمك للمواد الدراسية
          </p>
        </div>

        {/* Semester Selection */}
        <div className="card mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            اختر الفصل الدراسي
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {semesters.map((semester) => (
              <button
                key={semester.id}
                onClick={() => setSelectedSemester(semester.id)}
                className={`p-3 rounded-xl font-medium transition-all ${
                  selectedSemester === semester.id
                    ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-luxury'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {semester.name}
              </button>
            ))}
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="card text-center">
            <div className="flex justify-center mb-3">
              <Target className="w-6 h-6 lg:w-8 lg:h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {filteredTests.length}
            </div>
            <div className="text-xs lg:text-sm text-gray-600 dark:text-gray-300">إجمالي الاختبارات</div>
          </div>

          <div className="card text-center">
            <div className="flex justify-center mb-3">
              <CheckCircle className="w-6 h-6 lg:w-8 lg:h-8 text-green-600 dark:text-green-400" />
            </div>
            <div className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {filteredTests.filter(t => t.completed).length}
            </div>
            <div className="text-xs lg:text-sm text-gray-600 dark:text-gray-300">اختبارات مكتملة</div>
          </div>

          <div className="card text-center">
            <div className="flex justify-center mb-3">
              <Award className="w-6 h-6 lg:w-8 lg:h-8 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {Math.round(filteredTests.reduce((sum, t) => sum + t.bestScore, 0) / (filteredTests.length || 1))}%
            </div>
            <div className="text-xs lg:text-sm text-gray-600 dark:text-gray-300">متوسط الدرجات</div>
          </div>

          <div className="card text-center">
            <div className="flex justify-center mb-3">
              <AlertCircle className="w-6 h-6 lg:w-8 lg:h-8 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {filteredTests.filter(t => !t.completed).length}
            </div>
            <div className="text-xs lg:text-sm text-gray-600 dark:text-gray-300">اختبارات معلقة</div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="card mb-6">
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
          </div>
        </div>

        {/* Tests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
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
              لا توجد اختبارات في {semesters.find(s => s.id === selectedSemester)?.name} للمواد المحددة
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default TestsPage;