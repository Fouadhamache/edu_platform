import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Users,
  BarChart3,
  Clock,
  CheckCircle,
  XCircle,
  Play,
  FileText,
  Target
} from 'lucide-react';
import { useTeacher } from '../../contexts/TeacherContext';
import { useNavigate } from 'react-router-dom';

const TeacherDashboard: React.FC = () => {
  const { 
    currentTeacher, 
    getTeacherLessons, 
    deleteLesson, 
    publishLesson, 
    unpublishLesson 
  } = useTeacher();
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState('all');

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  if (!currentTeacher) {
    return <div>جاري التحميل...</div>;
  }

  const teacherLessons = getTeacherLessons(currentTeacher.id);
  const filteredLessons = selectedSubject === 'all' 
    ? teacherLessons 
    : teacherLessons.filter(lesson => lesson.subjectId === selectedSubject);

  const publishedLessons = teacherLessons.filter(l => l.isPublished).length;
  const draftLessons = teacherLessons.filter(l => !l.isPublished).length;
  const totalStudents = 150; // Mock data
  const totalViews = teacherLessons.reduce((sum, lesson) => sum + Math.floor(Math.random() * 100), 0);

  const handleDeleteLesson = async (lessonId: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الدرس؟')) {
      await deleteLesson(lessonId);
    }
  };

  const handleTogglePublish = async (lesson: any) => {
    if (lesson.isPublished) {
      await unpublishLesson(lesson.id);
    } else {
      await publishLesson(lesson.id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            مرحباً، {currentTeacher.name}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            تخصص: {currentTeacher.specialization} • {currentTeacher.experience} سنوات خبرة
          </p>
        </div>

        {/* Statistics Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          variants={staggerChildren}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="card text-center" variants={fadeIn}>
            <div className="flex justify-center mb-4">
              <BookOpen className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {teacherLessons.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">إجمالي الدروس</div>
          </motion.div>

          <motion.div className="card text-center" variants={fadeIn}>
            <div className="flex justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {publishedLessons}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">دروس منشورة</div>
          </motion.div>

          <motion.div className="card text-center" variants={fadeIn}>
            <div className="flex justify-center mb-4">
              <Users className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {totalStudents}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">طلاب يتابعون</div>
          </motion.div>

          <motion.div className="card text-center" variants={fadeIn}>
            <div className="flex justify-center mb-4">
              <BarChart3 className="w-8 h-8 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {totalViews}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">مشاهدات</div>
          </motion.div>
        </motion.div>

        {/* Assigned Subjects */}
        <div className="card mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            المواد المعينة لك
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentTeacher.assignedSubjects.map((subject) => (
              <div 
                key={subject.id}
                className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-blue-300 dark:hover:border-blue-500 transition-colors"
              >
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                  {subject.subjectName}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  {subject.level === 'primary' ? 'الابتدائي' : 
                   subject.level === 'middle' ? 'المتوسط' : 'الثانوي'} - السنة {subject.year}
                  {subject.stream && ` - ${subject.stream}`}
                </p>
                <div className="flex flex-wrap gap-1">
                  {subject.canCreateLessons && (
                    <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded">
                      إنشاء
                    </span>
                  )}
                  {subject.canEditLessons && (
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded">
                      تعديل
                    </span>
                  )}
                  {subject.canDeleteLessons && (
                    <span className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-xs rounded">
                      حذف
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lessons Management */}
        <div className="card">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 md:mb-0">
              إدارة الدروس
            </h2>
            <div className="flex flex-col md:flex-row gap-4">
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="input-field min-w-[200px]"
              >
                <option value="all">جميع المواد</option>
                {currentTeacher.assignedSubjects.map((subject) => (
                  <option key={subject.id} value={subject.subjectId}>
                    {subject.subjectName}
                  </option>
                ))}
              </select>
              <button 
                onClick={() => navigate('/teacher/create-lesson')}
                className="btn-primary flex items-center"
              >
                <Plus className="w-4 h-4 ml-2" />
                إنشاء درس جديد
              </button>
            </div>
          </div>

          {filteredLessons.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLessons.map((lesson) => (
                <motion.div
                  key={lesson.id}
                  className="border border-gray-200 dark:border-gray-600 rounded-2xl p-6 hover:shadow-luxury-hover transition-all duration-300"
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {lesson.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                        {lesson.description}
                      </p>
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 space-x-4 space-x-reverse">
                        <span className="flex items-center">
                          <Clock className="w-3 h-3 ml-1" />
                          {lesson.duration} دقيقة
                        </span>
                        <span className="flex items-center">
                          <Target className="w-3 h-3 ml-1" />
                          {lesson.exercises.length} تمرين
                        </span>
                        <span className="flex items-center">
                          <FileText className="w-3 h-3 ml-1" />
                          {lesson.flashcards.length} بطاقة
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {lesson.isPublished ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <XCircle className="w-5 h-5 text-orange-500" />
                      )}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded">
                      {lesson.subjectName}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-600">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleTogglePublish(lesson)}
                        className={`p-2 rounded-lg transition-colors ${
                          lesson.isPublished 
                            ? 'text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20' 
                            : 'text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20'
                        }`}
                        title={lesson.isPublished ? 'إلغاء النشر' : 'نشر'}
                      >
                        {lesson.isPublished ? <XCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                      </button>
                      <button 
                        onClick={() => handleDeleteLesson(lesson.id)}
                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(lesson.createdAt).toLocaleDateString('ar-DZ')}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                لا توجد دروس
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {selectedSubject !== 'all' 
                  ? 'لا توجد دروس في هذه المادة'
                  : 'لم تقم بإنشاء أي دروس بعد'
                }
              </p>
              <button 
                onClick={() => navigate('/teacher/create-lesson')}
                className="btn-primary"
              >
                إنشاء أول درس
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default TeacherDashboard;