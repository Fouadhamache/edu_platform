import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Search, Filter, Download, Eye, BookOpen, Clock, Star } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { SUBJECTS_BY_LEVEL } from '../../types/education';

const SummariesPage: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  // Generate mock summaries based on user's education level
  const generateSummaries = () => {
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
      Array.from({ length: 3 }, (_, i) => ({
        id: `${subject.id}-summary-${i + 1}`,
        title: `ملخص ${subject.name} - الوحدة ${i + 1}`,
        subject: subject.name,
        subjectId: subject.id,
        description: `ملخص شامل للوحدة ${i + 1} في مادة ${subject.name}`,
        pages: Math.floor(Math.random() * 10) + 5,
        downloadCount: Math.floor(Math.random() * 500) + 50,
        rating: (4 + Math.random()).toFixed(1),
        createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
        type: ['pdf', 'doc', 'ppt'][Math.floor(Math.random() * 3)]
      }))
    );
  };

  const summaries = generateSummaries();
  const filteredSummaries = summaries.filter(summary => {
    const matchesSearch = summary.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         summary.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || summary.subjectId === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  const subjects = [...new Set(summaries.map(s => ({ id: s.subjectId, name: s.subject })))];

  return (
    <div className="p-3 lg:p-6">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            الملخصات الدراسية
          </h1>
          <p className="text-sm lg:text-base text-gray-600 dark:text-gray-300">
            ملخصات شاملة لجميع المواد الدراسية لمساعدتك في المراجعة
          </p>
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
                placeholder="البحث في الملخصات..."
              />
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Filter className="h-5 w-5 text-gray-400" />
              </div>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="input-field pr-10 appearance-none min-w-[200px]"
              >
                <option value="all">جميع المواد</option>
                {subjects.map(subject => (
                  <option key={subject.id} value={subject.id}>{subject.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Summaries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSummaries.map((summary) => (
            <motion.div
              key={summary.id}
              className="card hover:shadow-luxury-hover transition-all duration-300 group"
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              whileHover={{ y: -4 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                    {summary.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    {summary.description}
                  </p>
                </div>
                <div className={`p-2 rounded-lg ${
                  summary.type === 'pdf' ? 'bg-red-100 dark:bg-red-900/30' :
                  summary.type === 'doc' ? 'bg-blue-100 dark:bg-blue-900/30' :
                  'bg-orange-100 dark:bg-orange-900/30'
                }`}>
                  <FileText className={`w-5 h-5 ${
                    summary.type === 'pdf' ? 'text-red-600 dark:text-red-400' :
                    summary.type === 'doc' ? 'text-blue-600 dark:text-blue-400' :
                    'text-orange-600 dark:text-orange-400'
                  }`} />
                </div>
              </div>

              <div className="mb-4">
                <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm rounded-full">
                  {summary.subject}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                <div className="flex items-center">
                  <BookOpen className="w-4 h-4 ml-1" />
                  {summary.pages} صفحة
                </div>
                <div className="flex items-center">
                  <Download className="w-4 h-4 ml-1" />
                  {summary.downloadCount} تحميل
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 ml-1 text-yellow-500" />
                  {summary.rating}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-600">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <button className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
                
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {summary.createdAt.toLocaleDateString('ar-DZ')}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredSummaries.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              لا توجد ملخصات
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {searchTerm || selectedSubject !== 'all' 
                ? 'لم يتم العثور على ملخصات تطابق البحث'
                : 'لا توجد ملخصات متاحة حالياً'
              }
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default SummariesPage;