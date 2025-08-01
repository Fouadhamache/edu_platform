import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ClipboardList, Search, Filter, Calendar, Clock, CheckCircle, AlertTriangle, Upload, FileText, Download } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { SUBJECTS_BY_LEVEL } from '../../types/education';

const AssignmentsPage: React.FC = () => {
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

  // Generate 10 assignments per subject per semester
  const generateAssignments = () => {
    if (!user) return [];

    const subjects = getSubjectsForUser();
    const assignments = [];

    subjects.forEach(subject => {
      // Generate 10 assignments for the selected semester
      for (let i = 1; i <= 10; i++) {
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + Math.floor(Math.random() * 30) - 15);
        
        const status = Math.random() > 0.7 ? 'submitted' : 
                      Math.random() > 0.5 ? 'pending' : 
                      dueDate < new Date() ? 'overdue' : 'pending';

        assignments.push({
          id: `${subject.id}-${selectedSemester}-assignment-${i}`,
          title: `واجب ${subject.name} - الأسبوع ${i}`,
          subject: subject.name,
          subjectId: subject.id,
          semester: selectedSemester,
          semesterName: semesters.find(s => s.id === selectedSemester)?.name || '',
          description: `واجب منزلي رقم ${i} في مادة ${subject.name} للفصل ${semesters.find(s => s.id === selectedSemester)?.name}`,
          dueDate,
          status,
          grade: status === 'submitted' ? Math.floor(Math.random() * 5) + 15 : null,
          maxGrade: 20,
          submittedAt: status === 'submitted' ? 
            new Date(dueDate.getTime() - Math.random() * 24 * 60 * 60 * 1000) : null,
          createdAt: new Date(Date.now() - Math.random() * 14 * 24 * 60 * 60 * 1000),
          instructions: `تعليمات الواجب ${i} في مادة ${subject.name}`,
          attachments: Math.random() > 0.5 ? [`واجب_${i}.pdf`, 'نموذج_الإجابة.docx'] : []
        });
      }
    });

    return assignments;
  };

  const assignments = generateAssignments();
  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || assignment.subjectId === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  const subjects = getSubjectsForUser();

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'pending':
        return { label: 'معلق', color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-100 dark:bg-yellow-900/30' };
      case 'submitted':
        return { label: 'مُسلم', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-100 dark:bg-blue-900/30' };
      case 'graded':
        return { label: 'مُصحح', color: 'text-green-600 dark:text-green-400', bg: 'bg-green-100 dark:bg-green-900/30' };
      case 'overdue':
        return { label: 'متأخر', color: 'text-red-600 dark:text-red-400', bg: 'bg-red-100 dark:bg-red-900/30' };
      default:
        return { label: 'غير محدد', color: 'text-gray-600 dark:text-gray-400', bg: 'bg-gray-100 dark:bg-gray-700' };
    }
  };

  const isOverdue = (dueDate: Date, status: string) => {
    return new Date() > dueDate && status === 'pending';
  };

  const handleSubmitAssignment = (assignmentId: string) => {
    console.log('Submitting assignment:', assignmentId);
    // Handle assignment submission
  };

  const handleDownloadAssignment = (assignmentId: string) => {
    console.log('Downloading assignment:', assignmentId);
    // Handle assignment download
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
            الواجبات المنزلية
          </h1>
          <p className="text-sm lg:text-base text-gray-600 dark:text-gray-300">
            تتبع واجباتك المنزلية وقم بتسليمها في الوقت المحدد
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
              <ClipboardList className="w-6 h-6 lg:w-8 lg:h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {filteredAssignments.length}
            </div>
            <div className="text-xs lg:text-sm text-gray-600 dark:text-gray-300">إجمالي الواجبات</div>
          </div>

          <div className="card text-center">
            <div className="flex justify-center mb-3">
              <CheckCircle className="w-6 h-6 lg:w-8 lg:h-8 text-green-600 dark:text-green-400" />
            </div>
            <div className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {filteredAssignments.filter(a => a.status === 'submitted').length}
            </div>
            <div className="text-xs lg:text-sm text-gray-600 dark:text-gray-300">واجبات مُسلمة</div>
          </div>

          <div className="card text-center">
            <div className="flex justify-center mb-3">
              <AlertTriangle className="w-6 h-6 lg:w-8 lg:h-8 text-red-600 dark:text-red-400" />
            </div>
            <div className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {filteredAssignments.filter(a => isOverdue(a.dueDate, a.status)).length}
            </div>
            <div className="text-xs lg:text-sm text-gray-600 dark:text-gray-300">واجبات متأخرة</div>
          </div>

          <div className="card text-center">
            <div className="flex justify-center mb-3">
              <Clock className="w-6 h-6 lg:w-8 lg:h-8 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {filteredAssignments.filter(a => a.status === 'pending' && !isOverdue(a.dueDate, a.status)).length}
            </div>
            <div className="text-xs lg:text-sm text-gray-600 dark:text-gray-300">واجبات معلقة</div>
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
                placeholder="البحث في الواجبات..."
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

        {/* Assignments List */}
        <div className="space-y-4">
          {filteredAssignments.map((assignment) => {
            const statusInfo = getStatusInfo(assignment.status);
            const overdue = isOverdue(assignment.dueDate, assignment.status);
            
            return (
              <motion.div
                key={assignment.id}
                className={`card hover:shadow-luxury-hover transition-all duration-300 ${
                  overdue ? 'border-l-4 border-red-500' : ''
                }`}
                variants={fadeIn}
                initial="hidden"
                animate="visible"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          {assignment.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                          {assignment.description}
                        </p>
                        <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-500 dark:text-gray-400">
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 ml-1" />
                            موعد التسليم: {assignment.dueDate.toLocaleDateString('ar-DZ')}
                          </span>
                          {assignment.submittedAt && (
                            <span className="flex items-center">
                              <CheckCircle className="w-4 h-4 ml-1" />
                              سُلم في: {assignment.submittedAt.toLocaleDateString('ar-DZ')}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm rounded-full">
                          {assignment.subject}
                        </span>
                        <span className={`px-2 py-1 text-xs rounded-full ${statusInfo.bg} ${statusInfo.color}`}>
                          {statusInfo.label}
                        </span>
                      </div>
                    </div>

                    {assignment.grade !== null && (
                      <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-green-800 dark:text-green-200">
                            الدرجة المحصل عليها:
                          </span>
                          <span className="text-lg font-bold text-green-600 dark:text-green-400">
                            {assignment.grade}/{assignment.maxGrade}
                          </span>
                        </div>
                      </div>
                    )}

                    {assignment.attachments.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          المرفقات:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {assignment.attachments.map((attachment, index) => (
                            <button
                              key={index}
                              onClick={() => handleDownloadAssignment(assignment.id)}
                              className="flex items-center px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                            >
                              <FileText className="w-3 h-3 ml-1" />
                              {attachment}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="lg:ml-6 mt-4 lg:mt-0">
                    {assignment.status === 'pending' && (
                      <div className="space-y-2">
                        <button
                          onClick={() => handleDownloadAssignment(assignment.id)}
                          className="w-full btn-secondary flex items-center justify-center"
                        >
                          <Download className="w-4 h-4 ml-2" />
                          تحميل الواجب
                        </button>
                        <button
                          onClick={() => handleSubmitAssignment(assignment.id)}
                          className={`w-full btn-primary flex items-center justify-center ${
                            overdue ? 'bg-red-600 hover:bg-red-700' : ''
                          }`}
                        >
                          <Upload className="w-4 h-4 ml-2" />
                          {overdue ? 'تسليم متأخر' : 'تسليم الواجب'}
                        </button>
                      </div>
                    )}
                    {assignment.status === 'submitted' && (
                      <div className="text-center">
                        <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                        <span className="text-sm text-green-600 dark:text-green-400">
                          تم التسليم
                        </span>
                      </div>
                    )}
                    {assignment.grade !== null && (
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
                          {assignment.grade}/{assignment.maxGrade}
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          تم التصحيح
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filteredAssignments.length === 0 && (
          <div className="text-center py-12">
            <ClipboardList className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              لا توجد واجبات
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              لا توجد واجبات في {semesters.find(s => s.id === selectedSemester)?.name} للمواد المحددة
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AssignmentsPage;