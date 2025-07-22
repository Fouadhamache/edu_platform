import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  UserPlus,
  BookOpen,
  Settings,
  Mail,
  Phone,
  GraduationCap,
  Award,
  Users,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { useTeacher } from '../../contexts/TeacherContext';
import { EDUCATION_LEVELS, SUBJECTS_BY_LEVEL } from '../../types/education';
import type { Teacher, AssignedSubject } from '../../types/teacher';

const TeacherManagement: React.FC = () => {
  const { 
    teachers, 
    createTeacher, 
    updateTeacher, 
    deleteTeacher,
    assignSubjectToTeacher,
    removeSubjectFromTeacher,
    getTeacherSubjects,
    isLoading 
  } = useTeacher();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    bio: '',
    specialization: '',
    experience: 0,
    isActive: true
  });

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialization = selectedSpecialization === 'all' || 
                                 teacher.specialization === selectedSpecialization;
    return matchesSearch && matchesSpecialization;
  });

  const handleCreateTeacher = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await createTeacher({
        ...formData,
        assignedSubjects: []
      });
      
      setShowCreateModal(false);
      setFormData({
        name: '',
        email: '',
        password: '',
        phone: '',
        bio: '',
        specialization: '',
        experience: 0,
        isActive: true
      });
      alert('تم إنشاء المعلم بنجاح');
    } catch (error) {
      console.error('Error creating teacher:', error);
      alert('حدث خطأ أثناء إنشاء المعلم');
    }
  };

  const handleDeleteTeacher = async (teacherId: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المعلم؟')) {
      await deleteTeacher(teacherId);
    }
  };

  const handleToggleTeacherStatus = async (teacher: Teacher) => {
    await updateTeacher(teacher.id, { isActive: !teacher.isActive });
  };

  const CreateTeacherModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          إضافة معلم جديد
        </h2>
        
        <form onSubmit={handleCreateTeacher} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">
                الاسم الكامل
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="input-field"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">
                البريد الإلكتروني
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="input-field"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">
                كلمة المرور
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                className="input-field"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">
                رقم الهاتف
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="input-field"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">
                التخصص
              </label>
              <select
                value={formData.specialization}
                onChange={(e) => setFormData(prev => ({ ...prev, specialization: e.target.value }))}
                className="input-field"
                required
              >
                <option value="">اختر التخصص</option>
                <option value="mathematics">الرياضيات</option>
                <option value="physics">الفيزياء</option>
                <option value="chemistry">الكيمياء</option>
                <option value="arabic">اللغة العربية</option>
                <option value="french">اللغة الفرنسية</option>
                <option value="english">اللغة الإنجليزية</option>
                <option value="history">التاريخ</option>
                <option value="geography">الجغرافيا</option>
                <option value="islamic">العلوم الإسلامية</option>
                <option value="philosophy">الفلسفة</option>
              </select>
            </div>
            
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">
                سنوات الخبرة
              </label>
              <input
                type="number"
                value={formData.experience}
                onChange={(e) => setFormData(prev => ({ ...prev, experience: parseInt(e.target.value) }))}
                className="input-field"
                min="0"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              نبذة شخصية
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
              className="input-field"
              rows={3}
              placeholder="نبذة مختصرة عن المعلم..."
            />
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
              className="mr-2"
            />
            <label htmlFor="isActive" className="text-gray-700 dark:text-gray-300">
              تفعيل الحساب
            </label>
          </div>
          
          <div className="flex justify-end space-x-4 space-x-reverse pt-4">
            <button
              type="button"
              onClick={() => setShowCreateModal(false)}
              className="btn-secondary"
            >
              إلغاء
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary"
            >
              {isLoading ? 'جاري الإنشاء...' : 'إنشاء المعلم'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );

  const SubjectAssignmentModal = () => {
    const [assignmentData, setAssignmentData] = useState({
      level: 'secondary',
      year: 1,
      stream: 'cst',
      subjectId: '',
      canCreateLessons: true,
      canEditLessons: true,
      canDeleteLessons: false,
      canManageExercises: true,
      canManageFlashcards: true
    });

    const getAvailableSubjects = () => {
      const { level, year, stream } = assignmentData;
      
      if (level === 'secondary') {
        return SUBJECTS_BY_LEVEL.secondary[stream as keyof typeof SUBJECTS_BY_LEVEL.secondary] || [];
      } else if (level === 'primary') {
        return SUBJECTS_BY_LEVEL.primary[year as keyof typeof SUBJECTS_BY_LEVEL.primary] || [];
      } else if (level === 'middle') {
        return SUBJECTS_BY_LEVEL.middle[year as keyof typeof SUBJECTS_BY_LEVEL.middle] || [];
      }
      
      return [];
    };

    const handleAssignSubject = async (e: React.FormEvent) => {
      e.preventDefault();
      
      if (!selectedTeacher || !assignmentData.subjectId) return;
      
      const selectedSubject = getAvailableSubjects().find(s => s.id === assignmentData.subjectId);
      if (!selectedSubject) return;
      
      const assignment: AssignedSubject = {
        id: `${assignmentData.level}-${assignmentData.year}-${assignmentData.stream || 'default'}-${assignmentData.subjectId}`,
        level: assignmentData.level as any,
        year: assignmentData.year,
        stream: assignmentData.stream,
        subjectId: assignmentData.subjectId,
        subjectName: selectedSubject.name,
        canCreateLessons: assignmentData.canCreateLessons,
        canEditLessons: assignmentData.canEditLessons,
        canDeleteLessons: assignmentData.canDeleteLessons,
        canManageExercises: assignmentData.canManageExercises,
        canManageFlashcards: assignmentData.canManageFlashcards
      };
      
      await assignSubjectToTeacher(selectedTeacher.id, assignment);
      setShowAssignModal(false);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-2xl"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            تعيين مادة للمعلم: {selectedTeacher?.name}
          </h2>
          
          <form onSubmit={handleAssignSubject} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">
                  المستوى التعليمي
                </label>
                <select
                  value={assignmentData.level}
                  onChange={(e) => setAssignmentData(prev => ({ 
                    ...prev, 
                    level: e.target.value,
                    year: 1,
                    stream: 'cst',
                    subjectId: ''
                  }))}
                  className="input-field"
                >
                  {Object.entries(EDUCATION_LEVELS).map(([value, { name }]) => (
                    <option key={value} value={value}>{name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">
                  السنة
                </label>
                <select
                  value={assignmentData.year}
                  onChange={(e) => setAssignmentData(prev => ({ 
                    ...prev, 
                    year: parseInt(e.target.value),
                    subjectId: ''
                  }))}
                  className="input-field"
                >
                  {Array.from({ length: EDUCATION_LEVELS[assignmentData.level as keyof typeof EDUCATION_LEVELS].years }, (_, i) => (
                    <option key={i + 1} value={i + 1}>السنة {i + 1}</option>
                  ))}
                </select>
              </div>
              
              {assignmentData.level === 'secondary' && (
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">
                    الشعبة
                  </label>
                  <select
                    value={assignmentData.stream}
                    onChange={(e) => setAssignmentData(prev => ({ 
                      ...prev, 
                      stream: e.target.value,
                      subjectId: ''
                    }))}
                    className="input-field"
                  >
                    {assignmentData.year === 1 ? (
                      <>
                        <option value="cst">جذع مشترك علوم وتكنولوجيا</option>
                        <option value="cah">جذع مشترك آداب وإنسانيات</option>
                      </>
                    ) : (
                      Object.entries(EDUCATION_LEVELS.secondary.streams)
                        .filter(([key]) => !['cst', 'cah'].includes(key))
                        .map(([value, name]) => (
                          <option key={value} value={value}>{name}</option>
                        ))
                    )}
                  </select>
                </div>
              )}
            </div>
            
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">
                المادة الدراسية
              </label>
              <select
                value={assignmentData.subjectId}
                onChange={(e) => setAssignmentData(prev => ({ ...prev, subjectId: e.target.value }))}
                className="input-field"
                required
              >
                <option value="">اختر المادة</option>
                {getAvailableSubjects().map((subject) => (
                  <option key={subject.id} value={subject.id}>{subject.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                الصلاحيات
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={assignmentData.canCreateLessons}
                    onChange={(e) => setAssignmentData(prev => ({ ...prev, canCreateLessons: e.target.checked }))}
                    className="mr-2"
                  />
                  <span className="text-gray-700 dark:text-gray-300">إنشاء دروس</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={assignmentData.canEditLessons}
                    onChange={(e) => setAssignmentData(prev => ({ ...prev, canEditLessons: e.target.checked }))}
                    className="mr-2"
                  />
                  <span className="text-gray-700 dark:text-gray-300">تعديل دروس</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={assignmentData.canDeleteLessons}
                    onChange={(e) => setAssignmentData(prev => ({ ...prev, canDeleteLessons: e.target.checked }))}
                    className="mr-2"
                  />
                  <span className="text-gray-700 dark:text-gray-300">حذف دروس</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={assignmentData.canManageExercises}
                    onChange={(e) => setAssignmentData(prev => ({ ...prev, canManageExercises: e.target.checked }))}
                    className="mr-2"
                  />
                  <span className="text-gray-700 dark:text-gray-300">إدارة التمارين</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={assignmentData.canManageFlashcards}
                    onChange={(e) => setAssignmentData(prev => ({ ...prev, canManageFlashcards: e.target.checked }))}
                    className="mr-2"
                  />
                  <span className="text-gray-700 dark:text-gray-300">إدارة البطاقات</span>
                </label>
              </div>
            </div>
            
            <div className="flex justify-end space-x-4 space-x-reverse pt-4">
              <button
                type="button"
                onClick={() => setShowAssignModal(false)}
                className="btn-secondary"
              >
                إلغاء
              </button>
              <button
                type="submit"
                className="btn-primary"
              >
                تعيين المادة
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            إدارة المعلمين
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            إنشاء وإدارة حسابات المعلمين وتعيين المواد الدراسية
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card text-center">
            <div className="flex justify-center mb-4">
              <Users className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {teachers.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">إجمالي المعلمين</div>
          </div>

          <div className="card text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {teachers.filter(t => t.isActive).length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">معلمين نشطين</div>
          </div>

          <div className="card text-center">
            <div className="flex justify-center mb-4">
              <BookOpen className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {teachers.reduce((sum, t) => sum + t.assignedSubjects.length, 0)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">مواد معينة</div>
          </div>

          <div className="card text-center">
            <div className="flex justify-center mb-4">
              <Award className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {Math.round(teachers.reduce((sum, t) => sum + t.experience, 0) / (teachers.length || 1))}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">متوسط سنوات الخبرة</div>
          </div>
        </div>

        {/* Controls */}
        <div className="card mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4 flex-1">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pr-10"
                  placeholder="البحث في المعلمين..."
                />
              </div>
              
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Filter className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  value={selectedSpecialization}
                  onChange={(e) => setSelectedSpecialization(e.target.value)}
                  className="input-field pr-10 appearance-none min-w-[200px]"
                >
                  <option value="all">جميع التخصصات</option>
                  <option value="mathematics">الرياضيات</option>
                  <option value="physics">الفيزياء</option>
                  <option value="chemistry">الكيمياء</option>
                  <option value="arabic">اللغة العربية</option>
                  <option value="french">اللغة الفرنسية</option>
                  <option value="english">اللغة الإنجليزية</option>
                </select>
              </div>
            </div>
            
            <button 
              onClick={() => setShowCreateModal(true)}
              className="btn-primary flex items-center"
            >
              <Plus className="w-4 h-4 ml-2" />
              إضافة معلم جديد
            </button>
          </div>
        </div>

        {/* Teachers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeachers.map((teacher) => (
            <motion.div
              key={teacher.id}
              className="card hover:shadow-luxury-hover transition-all duration-300"
              variants={fadeIn}
              initial="hidden"
              animate="visible"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mr-3">
                    <GraduationCap className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {teacher.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {teacher.specialization}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  {teacher.isActive ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <Mail className="w-4 h-4 ml-2" />
                  {teacher.email}
                </div>
                {teacher.phone && (
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <Phone className="w-4 h-4 ml-2" />
                    {teacher.phone}
                  </div>
                )}
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <Award className="w-4 h-4 ml-2" />
                  {teacher.experience} سنوات خبرة
                </div>
              </div>
              
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                  المواد المعينة ({teacher.assignedSubjects.length})
                </h4>
                <div className="flex flex-wrap gap-1">
                  {teacher.assignedSubjects.slice(0, 3).map((subject) => (
                    <span 
                      key={subject.id}
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded"
                    >
                      {subject.subjectName}
                    </span>
                  ))}
                  {teacher.assignedSubjects.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded">
                      +{teacher.assignedSubjects.length - 3}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-600">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <button 
                    onClick={() => {
                      setSelectedTeacher(teacher);
                      setShowAssignModal(true);
                    }}
                    className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                    title="تعيين مادة"
                  >
                    <UserPlus className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleToggleTeacherStatus(teacher)}
                    className={`p-2 rounded-lg transition-colors ${
                      teacher.isActive 
                        ? 'text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20' 
                        : 'text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20'
                    }`}
                    title={teacher.isActive ? 'إلغاء التفعيل' : 'تفعيل'}
                  >
                    {teacher.isActive ? <XCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                  </button>
                  <button 
                    onClick={() => handleDeleteTeacher(teacher.id)}
                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(teacher.createdAt).toLocaleDateString('ar-DZ')}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredTeachers.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              لا يوجد معلمين
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {searchTerm || selectedSpecialization !== 'all' 
                ? 'لم يتم العثور على معلمين يطابقون البحث'
                : 'لم يتم إنشاء أي معلمين بعد'
              }
            </p>
            {(!searchTerm && selectedSpecialization === 'all') && (
              <button 
                onClick={() => setShowCreateModal(true)}
                className="btn-primary"
              >
                إضافة أول معلم
              </button>
            )}
          </div>
        )}

        {/* Modals */}
        {showCreateModal && <CreateTeacherModal />}
        {showAssignModal && selectedTeacher && <SubjectAssignmentModal />}
      </motion.div>
    </div>
  );
};

export default TeacherManagement;