import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Teacher, AssignedSubject, TeacherLesson, Exercise, Flashcard } from '../types/teacher';
import { EDUCATION_LEVELS, SUBJECTS_BY_LEVEL } from '../types/education';

interface TeacherContextType {
  // Teacher Management
  teachers: Teacher[];
  currentTeacher: Teacher | null;
  isTeacherAuthenticated: boolean;
  createTeacher: (teacherData: Omit<Teacher, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateTeacher: (id: string, teacherData: Partial<Teacher>) => Promise<void>;
  deleteTeacher: (id: string) => Promise<void>;
  teacherLogin: (email: string, password: string) => Promise<void>;
  teacherLogout: () => void;
  
  // Subject Assignment
  assignSubjectToTeacher: (teacherId: string, subject: AssignedSubject) => Promise<void>;
  removeSubjectFromTeacher: (teacherId: string, subjectId: string) => Promise<void>;
  getTeacherSubjects: (teacherId: string) => AssignedSubject[];
  
  // Lesson Management
  teacherLessons: TeacherLesson[];
  createLesson: (lessonData: Omit<TeacherLesson, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateLesson: (id: string, lessonData: Partial<TeacherLesson>) => Promise<void>;
  deleteLesson: (id: string) => Promise<void>;
  publishLesson: (id: string) => Promise<void>;
  unpublishLesson: (id: string) => Promise<void>;
  getTeacherLessons: (teacherId: string) => TeacherLesson[];
  getAllPublishedLessons: () => TeacherLesson[];
  
  // Content Generation
  generateExercisesFromContent: (content: string) => Exercise[];
  generateFlashcardsFromContent: (content: string) => Flashcard[];
  
  isLoading: boolean;
}

const TeacherContext = createContext<TeacherContextType | undefined>(undefined);

export const useTeacher = () => {
  const context = useContext(TeacherContext);
  if (!context) {
    throw new Error('useTeacher must be used within a TeacherProvider');
  }
  return context;
};

export const TeacherProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [currentTeacher, setCurrentTeacher] = useState<Teacher | null>(null);
  const [teacherLessons, setTeacherLessons] = useState<TeacherLesson[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load data on mount
  useEffect(() => {
    loadTeachersData();
    loadTeacherAuth();
  }, []);

  const loadTeachersData = () => {
    const savedTeachers = localStorage.getItem('teachers');
    const savedLessons = localStorage.getItem('teacherLessons');
    
    if (savedTeachers) {
      try {
        const parsedTeachers = JSON.parse(savedTeachers);
        setTeachers(parsedTeachers.map((teacher: any) => ({
          ...teacher,
          createdAt: new Date(teacher.createdAt),
          updatedAt: new Date(teacher.updatedAt)
        })));
      } catch (error) {
        console.error('Error loading teachers:', error);
        // Initialize with demo teacher
        const demoTeacher: Teacher = {
          id: 'teacher-1',
          name: 'أحمد محمد',
          email: 'teacher@platform.com',
          password: 'teacher123',
          phone: '+213 555 123 456',
          bio: 'معلم رياضيات متخصص مع خبرة 10 سنوات',
          specialization: 'mathematics',
          experience: 10,
          assignedSubjects: [
            {
              id: 'secondary-3-mathematics-mathematics',
              level: 'secondary',
              year: 3,
              stream: 'mathematics',
              subjectId: 'mathematics',
              subjectName: 'الرياضيات المتقدمة',
              canCreateLessons: true,
              canEditLessons: true,
              canDeleteLessons: true,
              canManageExercises: true,
              canManageFlashcards: true
            }
          ],
          createdAt: new Date(),
          updatedAt: new Date(),
          isActive: true
        };
        setTeachers([demoTeacher]);
        localStorage.setItem('teachers', JSON.stringify([demoTeacher]));
      }
    }
    
    if (savedLessons) {
      try {
        const parsedLessons = JSON.parse(savedLessons);
        setTeacherLessons(parsedLessons.map((lesson: any) => ({
          ...lesson,
          createdAt: new Date(lesson.createdAt),
          updatedAt: new Date(lesson.updatedAt)
        })));
      } catch (error) {
        console.error('Error loading teacher lessons:', error);
      }
    }
  };

  const loadTeacherAuth = () => {
    const savedTeacher = localStorage.getItem('currentTeacher');
    if (savedTeacher) {
      try {
        const parsedTeacher = JSON.parse(savedTeacher);
        setCurrentTeacher({
          ...parsedTeacher,
          createdAt: new Date(parsedTeacher.createdAt),
          updatedAt: new Date(parsedTeacher.updatedAt)
        });
      } catch (error) {
        console.error('Error loading teacher auth:', error);
        localStorage.removeItem('currentTeacher');
      }
    }
  };

  const saveTeachers = (updatedTeachers: Teacher[]) => {
    setTeachers(updatedTeachers);
    localStorage.setItem('teachers', JSON.stringify(updatedTeachers));
  };

  const saveLessons = (updatedLessons: TeacherLesson[]) => {
    setTeacherLessons(updatedLessons);
    localStorage.setItem('teacherLessons', JSON.stringify(updatedLessons));
  };

  const createTeacher = async (teacherData: Omit<Teacher, 'id' | 'createdAt' | 'updatedAt'>) => {
    setIsLoading(true);
    
    const newTeacher: Teacher = {
      ...teacherData,
      id: `teacher-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    const updatedTeachers = [...teachers, newTeacher];
    saveTeachers(updatedTeachers);
    
    setIsLoading(false);
  };

  const updateTeacher = async (id: string, teacherData: Partial<Teacher>) => {
    setIsLoading(true);
    
    const updatedTeachers = teachers.map(teacher =>
      teacher.id === id
        ? { ...teacher, ...teacherData, updatedAt: new Date() }
        : teacher
    );
    
    saveTeachers(updatedTeachers);
    
    // Update current teacher if it's the one being updated
    if (currentTeacher?.id === id) {
      const updatedCurrentTeacher = updatedTeachers.find(t => t.id === id);
      if (updatedCurrentTeacher) {
        setCurrentTeacher(updatedCurrentTeacher);
        localStorage.setItem('currentTeacher', JSON.stringify(updatedCurrentTeacher));
      }
    }
    
    setIsLoading(false);
  };

  const deleteTeacher = async (id: string) => {
    setIsLoading(true);
    
    const updatedTeachers = teachers.filter(teacher => teacher.id !== id);
    saveTeachers(updatedTeachers);
    
    // Remove lessons by this teacher
    const updatedLessons = teacherLessons.filter(lesson => lesson.teacherId !== id);
    saveLessons(updatedLessons);
    
    // Logout if current teacher is deleted
    if (currentTeacher?.id === id) {
      teacherLogout();
    }
    
    setIsLoading(false);
  };

  const teacherLogin = async (email: string, password: string) => {
    setIsLoading(true);
    
    const teacher = teachers.find(t => t.email === email && t.password === password && t.isActive);
    
    if (!teacher) {
      setIsLoading(false);
      throw new Error('بيانات تسجيل الدخول غير صحيحة أو الحساب غير مفعل');
    }
    
    setCurrentTeacher(teacher);
    localStorage.setItem('currentTeacher', JSON.stringify(teacher));
    
    setIsLoading(false);
  };

  const teacherLogout = () => {
    setCurrentTeacher(null);
    localStorage.removeItem('currentTeacher');
  };

  const assignSubjectToTeacher = async (teacherId: string, subject: AssignedSubject) => {
    const updatedTeachers = teachers.map(teacher => {
      if (teacher.id === teacherId) {
        const existingSubjects = teacher.assignedSubjects.filter(s => s.id !== subject.id);
        return {
          ...teacher,
          assignedSubjects: [...existingSubjects, subject],
          updatedAt: new Date()
        };
      }
      return teacher;
    });
    
    saveTeachers(updatedTeachers);
    
    // Update current teacher if needed
    if (currentTeacher?.id === teacherId) {
      const updatedCurrentTeacher = updatedTeachers.find(t => t.id === teacherId);
      if (updatedCurrentTeacher) {
        setCurrentTeacher(updatedCurrentTeacher);
        localStorage.setItem('currentTeacher', JSON.stringify(updatedCurrentTeacher));
      }
    }
  };

  const removeSubjectFromTeacher = async (teacherId: string, subjectId: string) => {
    const updatedTeachers = teachers.map(teacher => {
      if (teacher.id === teacherId) {
        return {
          ...teacher,
          assignedSubjects: teacher.assignedSubjects.filter(s => s.id !== subjectId),
          updatedAt: new Date()
        };
      }
      return teacher;
    });
    
    saveTeachers(updatedTeachers);
    
    // Update current teacher if needed
    if (currentTeacher?.id === teacherId) {
      const updatedCurrentTeacher = updatedTeachers.find(t => t.id === teacherId);
      if (updatedCurrentTeacher) {
        setCurrentTeacher(updatedCurrentTeacher);
        localStorage.setItem('currentTeacher', JSON.stringify(updatedCurrentTeacher));
      }
    }
  };

  const getTeacherSubjects = (teacherId: string): AssignedSubject[] => {
    const teacher = teachers.find(t => t.id === teacherId);
    return teacher?.assignedSubjects || [];
  };

  const createLesson = async (lessonData: Omit<TeacherLesson, 'id' | 'createdAt' | 'updatedAt'>) => {
    setIsLoading(true);
    
    const newLesson: TeacherLesson = {
      ...lessonData,
      id: `lesson-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    const updatedLessons = [...teacherLessons, newLesson];
    saveLessons(updatedLessons);
    
    setIsLoading(false);
  };

  const updateLesson = async (id: string, lessonData: Partial<TeacherLesson>) => {
    setIsLoading(true);
    
    const updatedLessons = teacherLessons.map(lesson =>
      lesson.id === id
        ? { ...lesson, ...lessonData, updatedAt: new Date() }
        : lesson
    );
    
    saveLessons(updatedLessons);
    setIsLoading(false);
  };

  const deleteLesson = async (id: string) => {
    const updatedLessons = teacherLessons.filter(lesson => lesson.id !== id);
    saveLessons(updatedLessons);
  };

  const publishLesson = async (id: string) => {
    await updateLesson(id, { isPublished: true });
  };

  const unpublishLesson = async (id: string) => {
    await updateLesson(id, { isPublished: false });
  };

  const getTeacherLessons = (teacherId: string): TeacherLesson[] => {
    return teacherLessons.filter(lesson => lesson.teacherId === teacherId);
  };

  const getAllPublishedLessons = (): TeacherLesson[] => {
    return teacherLessons.filter(lesson => lesson.isPublished);
  };

  const generateExercisesFromContent = (content: string): Exercise[] => {
    // AI-powered exercise generation simulation
    const exercises: Exercise[] = [
      {
        id: `exercise-${Date.now()}`,
        type: 'multiple-choice',
        question: 'ما هو الموضوع الرئيسي في هذا الدرس؟',
        options: [
          'المفهوم الأساسي',
          'التطبيقات العملية',
          'النظريات المتقدمة',
          'جميع ما سبق'
        ],
        correctAnswer: 'جميع ما سبق',
        explanation: 'الدرس يغطي جميع هذه الجوانب بشكل شامل',
        difficulty: 'medium',
        points: 10
      },
      {
        id: `exercise-${Date.now() + 1}`,
        type: 'fill-blank',
        question: 'أكمل الجملة: المفهوم الأساسي في هذا الدرس هو _____',
        correctAnswer: 'المفهوم الأساسي',
        difficulty: 'easy',
        points: 5
      }
    ];
    
    return exercises;
  };

  const generateFlashcardsFromContent = (content: string): Flashcard[] => {
    const flashcards: Flashcard[] = [
      {
        id: `flashcard-${Date.now()}`,
        front: 'ما هو المفهوم الأساسي؟',
        back: 'المفهوم الأساسي هو الفكرة الرئيسية التي يقوم عليها الدرس',
        category: 'مفاهيم أساسية',
        difficulty: 'easy'
      },
      {
        id: `flashcard-${Date.now() + 1}`,
        front: 'كيف نطبق هذا المفهوم؟',
        back: 'يمكن تطبيق المفهوم من خلال الأمثلة العملية والتمارين',
        category: 'تطبيقات',
        difficulty: 'medium'
      }
    ];
    
    return flashcards;
  };

  const value = {
    teachers,
    currentTeacher,
    isTeacherAuthenticated: !!currentTeacher,
    createTeacher,
    updateTeacher,
    deleteTeacher,
    teacherLogin,
    teacherLogout,
    assignSubjectToTeacher,
    removeSubjectFromTeacher,
    getTeacherSubjects,
    teacherLessons,
    createLesson,
    updateLesson,
    deleteLesson,
    publishLesson,
    unpublishLesson,
    getTeacherLessons,
    getAllPublishedLessons,
    generateExercisesFromContent,
    generateFlashcardsFromContent,
    isLoading,
  };

  return <TeacherContext.Provider value={value}>{children}</TeacherContext.Provider>;
};