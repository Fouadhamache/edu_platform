import React, { createContext, useState, useContext, useEffect } from 'react';
import type { AdminUser, Lesson, ClassStructure, PlatformUser } from '../types/admin';

interface AdminContextType {
  adminUser: AdminUser | null;
  isAdminAuthenticated: boolean;
  adminLogin: (email: string, password: string) => Promise<void>;
  adminLogout: () => void;
  lessons: Lesson[];
  platformUsers: PlatformUser[];
  createLesson: (lesson: Omit<Lesson, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateLesson: (id: string, lesson: Partial<Lesson>) => Promise<void>;
  deleteLesson: (id: string) => Promise<void>;
  generateExercisesFromContent: (content: string) => Exercise[];
  generateFlashcardsFromContent: (content: string) => Flashcard[];
  forceTrialExpiry: (userId: string) => void;
  isLoading: boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [platformUsers, setPlatformUsers] = useState<PlatformUser[]>([]);

  useEffect(() => {
    // Check for saved admin user in localStorage
    const savedAdmin = localStorage.getItem('adminUser');
    if (savedAdmin) {
      try {
        const parsedAdmin = JSON.parse(savedAdmin);
        setAdminUser(parsedAdmin);
      } catch (error) {
        console.error('Error parsing saved admin user:', error);
        localStorage.removeItem('adminUser');
      }
    }
    
    // Load mock data
    loadMockData();
    setIsLoading(false);
  }, []);

  const loadMockData = () => {
    // Mock lessons data
    const mockLessons: Lesson[] = [
      {
        id: '1',
        title: 'المعادلات التفاضلية',
        description: 'مقدمة في المعادلات التفاضلية وطرق حلها',
        duration: 45,
        subjectId: 'mathematics',
        semesterId: '1',
        level: 'secondary',
        stream: 'mathematics',
        exercises: [],
        flashcards: [],
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    // Mock platform users
    const mockUsers: PlatformUser[] = [
      {
        id: '1',
        name: 'أحمد محمد',
        email: 'ahmed@example.com',
        education: { level: 'secondary', year: 3, stream: 'mathematics' },
        hasTrialExpired: false,
        hasSubscription: false,
        createdAt: new Date(),
        lastLogin: new Date()
      },
      {
        id: '2',
        name: 'فاطمة علي',
        email: 'fatima@example.com',
        education: { level: 'secondary', year: 2, stream: 'experimental-sciences' },
        hasTrialExpired: true,
        hasSubscription: false,
        createdAt: new Date(),
        lastLogin: new Date()
      }
    ];

    setLessons(mockLessons);
    setPlatformUsers(mockUsers);
  };

  const adminLogin = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock admin credentials
    if (email === 'admin@platform.com' && password === 'admin123') {
      const admin: AdminUser = {
        id: 'admin-1',
        name: 'مدير المنصة',
        email,
        role: 'admin',
        createdAt: new Date(),
      };
      
      setAdminUser(admin);
      localStorage.setItem('adminUser', JSON.stringify(admin));
    } else {
      throw new Error('بيانات تسجيل الدخول غير صحيحة');
    }
    
    setIsLoading(false);
  };

  const adminLogout = () => {
    setAdminUser(null);
    localStorage.removeItem('adminUser');
  };

  const createLesson = async (lessonData: Omit<Lesson, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newLesson: Lesson = {
      ...lessonData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    setLessons(prev => [...prev, newLesson]);
  };

  const updateLesson = async (id: string, lessonData: Partial<Lesson>) => {
    setLessons(prev => prev.map(lesson => 
      lesson.id === id 
        ? { ...lesson, ...lessonData, updatedAt: new Date() }
        : lesson
    ));
  };

  const deleteLesson = async (id: string) => {
    setLessons(prev => prev.filter(lesson => lesson.id !== id));
  };

  const generateExercisesFromContent = (content: string): Exercise[] => {
    // AI-powered exercise generation simulation
    const exercises: Exercise[] = [
      {
        id: Date.now().toString(),
        type: 'multiple-choice',
        question: 'ما هو تعريف المعادلة التفاضلية؟',
        options: [
          'معادلة تحتوي على مشتقات',
          'معادلة جبرية بسيطة',
          'معادلة لا تحتوي على متغيرات',
          'معادلة هندسية'
        ],
        correctAnswer: 'معادلة تحتوي على مشتقات',
        explanation: 'المعادلة التفاضلية هي معادلة رياضية تحتوي على مشتقات دالة أو أكثر',
        difficulty: 'easy'
      },
      {
        id: (Date.now() + 1).toString(),
        type: 'fill-blank',
        question: 'المعادلة التفاضلية من الدرجة الأولى تحتوي على مشتقة من الدرجة _____',
        correctAnswer: 'الأولى',
        difficulty: 'medium'
      }
    ];
    
    return exercises;
  };

  const generateFlashcardsFromContent = (content: string): Flashcard[] => {
    const flashcards: Flashcard[] = [
      {
        id: Date.now().toString(),
        front: 'ما هي المعادلة التفاضلية؟',
        back: 'معادلة رياضية تحتوي على مشتقات دالة أو أكثر',
        category: 'تعاريف'
      },
      {
        id: (Date.now() + 1).toString(),
        front: 'أنواع المعادلات التفاضلية',
        back: 'عادية وجزئية، خطية وغير خطية، متجانسة وغير متجانسة',
        category: 'تصنيفات'
      }
    ];
    
    return flashcards;
  };

  const forceTrialExpiry = (userId: string) => {
    setPlatformUsers(prev => prev.map(user => 
      user.id === userId 
        ? { ...user, hasTrialExpired: true }
        : user
    ));
  };

  const value = {
    adminUser,
    isAdminAuthenticated: !!adminUser,
    adminLogin,
    adminLogout,
    lessons,
    platformUsers,
    createLesson,
    updateLesson,
    deleteLesson,
    generateExercisesFromContent,
    generateFlashcardsFromContent,
    forceTrialExpiry,
    isLoading,
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};