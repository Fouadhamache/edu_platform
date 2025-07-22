import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Upload, 
  FileText, 
  Video, 
  Wand2, 
  Save, 
  ArrowLeft,
  Sparkles
} from 'lucide-react';
import { useTeacher } from '../../contexts/TeacherContext';
import { EDUCATION_LEVELS, SUBJECTS_BY_LEVEL } from '../../types/education';
import type { Exercise, Flashcard } from '../../types/teacher';

const CreateLessonPage: React.FC = () => {
  const navigate = useNavigate();
  const { 
    currentTeacher, 
    createLesson, 
    generateExercisesFromContent, 
    generateFlashcardsFromContent 
  } = useTeacher();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subjectId: '',
    duration: 30,
    videoUrl: '',
    documentContent: ''
  });
  
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  if (!currentTeacher) {
    return <div>جاري التحميل...</div>;
  }

  const handleGenerateContent = async () => {
    if (!formData.documentContent.trim()) {
      alert('يرجى إدخال محتوى الدرس أولاً');
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const generatedExercises = generateExercisesFromContent(formData.documentContent);
    const generatedFlashcards = generateFlashcardsFromContent(formData.documentContent);
    
    setExercises(generatedExercises);
    setFlashcards(generatedFlashcards);
    setIsGenerating(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Find the subject assignment to get proper details
      const subjectAssignment = currentTeacher.assignedSubjects.find(
        s => s.subjectId === formData.subjectId
      );

      if (!subjectAssignment) {
        alert('يرجى اختيار مادة من المواد المعينة لك');
        setIsSubmitting(false);
        return;
      }

      await createLesson({
        title: formData.title,
        description: formData.description,
        videoUrl: formData.videoUrl,
        documentContent: formData.documentContent,
        duration: formData.duration,
        level: subjectAssignment.level,
        year: subjectAssignment.year,
        stream: subjectAssignment.stream,
        subjectId: formData.subjectId,
        subjectName: subjectAssignment.subjectName,
        teacherId: currentTeacher.id,
        teacherName: currentTeacher.name,
        exercises,
        flashcards,
        isPublished: false
      });

      navigate('/teacher/dashboard');
    } catch (error) {
      console.error('Error creating lesson:', error);
      alert('حدث خطأ أثناء إنشاء الدرس');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/teacher/dashboard')}
                className="flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 mr-4"
              >
                <ArrowLeft className="w-5 h-5 ml-2" />
                العودة إلى لوحة التحكم
              </button>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                إنشاء درس جديد
              </h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                المعلومات الأساسية
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">
                    عنوان الدرس
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="input-field"
                    placeholder="أدخل عنوان الدرس"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">
                    مدة الدرس (بالدقائق)
                  </label>
                  <input
                    type="number"
                    value={formData.duration}
                    onChange={(e) => setFormData(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                    className="input-field"
                    min="1"
                    required
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">
                    وصف الدرس
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="input-field"
                    rows={3}
                    placeholder="أدخل وصفاً مختصراً للدرس"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Subject Selection */}
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                المادة الدراسية
              </h2>
              
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">
                  اختر المادة من المواد المعينة لك
                </label>
                <select
                  value={formData.subjectId}
                  onChange={(e) => setFormData(prev => ({ ...prev, subjectId: e.target.value }))}
                  className="input-field"
                  required
                >
                  <option value="">اختر المادة</option>
                  {currentTeacher.assignedSubjects.map((subject) => (
                    <option key={subject.id} value={subject.subjectId}>
                      {subject.subjectName} - {EDUCATION_LEVELS[subject.level].name} السنة {subject.year}
                      {subject.stream && ` - ${subject.stream}`}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Content */}
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                محتوى الدرس
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">
                    رابط الفيديو (اختياري)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <Video className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="url"
                      value={formData.videoUrl}
                      onChange={(e) => setFormData(prev => ({ ...prev, videoUrl: e.target.value }))}
                      className="input-field pr-10"
                      placeholder="https://example.com/video.mp4"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">
                    محتوى الدرس النصي
                  </label>
                  <textarea
                    value={formData.documentContent}
                    onChange={(e) => setFormData(prev => ({ ...prev, documentContent: e.target.value }))}
                    className="input-field"
                    rows={10}
                    placeholder="أدخل محتوى الدرس هنا... سيتم استخدام هذا المحتوى لتوليد التمارين والبطاقات التفاعلية تلقائياً"
                    required
                  />
                </div>
                
                <div className="flex items-center justify-between p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                  <div className="flex items-center">
                    <Wand2 className="w-5 h-5 text-primary-600 dark:text-primary-400 ml-2" />
                    <div>
                      <h3 className="font-medium text-primary-800 dark:text-primary-200">
                        توليد المحتوى التفاعلي
                      </h3>
                      <p className="text-sm text-primary-600 dark:text-primary-300">
                        انقر لتوليد تمارين وبطاقات تفاعلية من محتوى الدرس
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleGenerateContent}
                    disabled={isGenerating || !formData.documentContent.trim()}
                    className="btn-primary flex items-center"
                  >
                    {isGenerating ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin ml-2" />
                        جاري التوليد...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 ml-2" />
                        توليد المحتوى
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Generated Content Preview */}
            {(exercises.length > 0 || flashcards.length > 0) && (
              <div className="card">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  المحتوى التفاعلي المولد
                </h2>
                
                {exercises.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                      التمارين ({exercises.length})
                    </h3>
                    <div className="space-y-4">
                      {exercises.slice(0, 3).map((exercise, index) => (
                        <div key={exercise.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                              {exercise.type === 'multiple-choice' ? 'اختيار متعدد' : 
                               exercise.type === 'fill-blank' ? 'ملء الفراغات' : 
                               exercise.type === 'true-false' ? 'صح أم خطأ' : 'مطابقة'}
                            </span>
                            <span className={`px-2 py-1 text-xs rounded ${
                              exercise.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                              exercise.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {exercise.difficulty === 'easy' ? 'سهل' :
                               exercise.difficulty === 'medium' ? 'متوسط' : 'صعب'}
                            </span>
                          </div>
                          <p className="text-gray-900 dark:text-white font-medium mb-2">
                            {exercise.question}
                          </p>
                          {exercise.options && (
                            <div className="grid grid-cols-2 gap-2">
                              {exercise.options.map((option, optIndex) => (
                                <div 
                                  key={optIndex}
                                  className={`p-2 text-sm rounded ${
                                    option === exercise.correctAnswer 
                                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' 
                                      : 'bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                                  }`}
                                >
                                  {option}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                      {exercises.length > 3 && (
                        <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                          و {exercises.length - 3} تمارين أخرى...
                        </p>
                      )}
                    </div>
                  </div>
                )}
                
                {flashcards.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                      البطاقات التعليمية ({flashcards.length})
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {flashcards.slice(0, 4).map((flashcard) => (
                        <div key={flashcard.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <div className="text-sm text-primary-600 dark:text-primary-400 mb-2">
                            {flashcard.category}
                          </div>
                          <div className="font-medium text-gray-900 dark:text-white mb-2">
                            {flashcard.front}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-300">
                            {flashcard.back}
                          </div>
                        </div>
                      ))}
                    </div>
                    {flashcards.length > 4 && (
                      <p className="text-sm text-gray-600 dark:text-gray-300 text-center mt-4">
                        و {flashcards.length - 4} بطاقات أخرى...
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Submit Button */}
            <div className="flex items-center justify-end space-x-4 space-x-reverse">
              <button
                type="button"
                onClick={() => navigate('/teacher/dashboard')}
                className="btn-secondary"
              >
                إلغاء
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary flex items-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin ml-2" />
                    جاري الحفظ...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 ml-2" />
                    حفظ الدرس
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateLessonPage;