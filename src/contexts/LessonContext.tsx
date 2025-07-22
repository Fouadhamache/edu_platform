import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useTeacher } from './TeacherContext';

export interface LessonProgress {
  lessonId: string;
  subjectId: string;
  semesterId: string;
  progress: number;
  completed: boolean;
  timeSpent: number;
  lastAccessed: Date;
  quizScores: number[];
  exerciseScores: number[];
}

export interface LessonContent {
  id: string;
  title: string;
  description: string;
  subjectId: string;
  semesterId: string;
  videoUrl?: string;
  documentContent: string;
  duration: number;
  exercises: Exercise[];
  flashcards: Flashcard[];
  quiz?: Quiz;
}

export interface Exercise {
  id: string;
  type: 'multiple-choice' | 'fill-blank' | 'true-false';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation?: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  category: string;
}

export interface Quiz {
  id: string;
  title: string;
  questions: Exercise[];
  timeLimit?: number;
  passingScore: number;
}

interface LessonContextType {
  lessons: LessonContent[];
  userProgress: LessonProgress[];
  currentLesson: LessonContent | null;
  loadLesson: (lessonId: string) => Promise<void>;
  updateProgress: (lessonId: string, progress: number, timeSpent: number) => void;
  completeLesson: (lessonId: string) => void;
  submitQuiz: (lessonId: string, answers: any[], score: number) => void;
  submitExercise: (lessonId: string, exerciseId: string, score: number) => void;
  getLessonProgress: (lessonId: string) => LessonProgress | null;
  getSubjectProgress: (subjectId: string) => number;
  isLoading: boolean;
}

const LessonContext = createContext<LessonContextType | undefined>(undefined);

export const useLesson = () => {
  const context = useContext(LessonContext);
  if (!context) {
    throw new Error('useLesson must be used within a LessonProvider');
  }
  return context;
};

export const LessonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const { getAllPublishedLessons } = useTeacher();
  const [lessons, setLessons] = useState<LessonContent[]>([]);
  const [userProgress, setUserProgress] = useState<LessonProgress[]>([]);
  const [currentLesson, setCurrentLesson] = useState<LessonContent | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Load user progress from localStorage
  useEffect(() => {
    if (user) {
      const savedProgress = localStorage.getItem(`progress_${user.id}`);
      if (savedProgress) {
        try {
          setUserProgress(JSON.parse(savedProgress));
        } catch (error) {
          console.error('Error loading progress:', error);
        }
      }
      loadLessonsData();
    }
  }, [user]);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    if (user && userProgress.length > 0) {
      localStorage.setItem(`progress_${user.id}`, JSON.stringify(userProgress));
    }
  }, [user, userProgress]);

  const loadLessonsData = async () => {
    setIsLoading(true);
    
    try {
      // Get published lessons from teachers
      const publishedLessons = getAllPublishedLessons();
      
      // Convert teacher lessons to lesson content format
      const convertedLessons: LessonContent[] = publishedLessons.map(teacherLesson => ({
        id: teacherLesson.id,
        title: teacherLesson.title,
        description: teacherLesson.description,
        subjectId: teacherLesson.subjectId,
        semesterId: '1', // Default to first semester
        videoUrl: teacherLesson.videoUrl,
        documentContent: teacherLesson.documentContent,
        duration: teacherLesson.duration,
        exercises: teacherLesson.exercises.map(ex => ({
          id: ex.id,
          type: ex.type,
          question: ex.question,
          options: ex.options,
          correctAnswer: ex.correctAnswer,
          explanation: ex.explanation,
          difficulty: ex.difficulty
        })),
        flashcards: teacherLesson.flashcards,
        quiz: teacherLesson.exercises.length > 0 ? {
          id: `quiz-${teacherLesson.id}`,
          title: `اختبار ${teacherLesson.title}`,
          questions: teacherLesson.exercises.map(ex => ({
            id: ex.id,
            type: ex.type,
            question: ex.question,
            options: ex.options,
            correctAnswer: ex.correctAnswer,
            difficulty: ex.difficulty
          })),
          timeLimit: 30,
          passingScore: 70
        } : undefined
      }));
      
      setLessons(convertedLessons);
    } catch (error) {
      console.error('Error loading lessons:', error);
      setLessons([]);
    }
    
    setIsLoading(false);
  };

  const loadLesson = async (lessonId: string) => {
    setIsLoading(true);
    const lesson = lessons.find(l => l.id === lessonId);
    if (lesson) {
      setCurrentLesson(lesson);
      // Update last accessed time
      updateProgress(lessonId, getLessonProgress(lessonId)?.progress || 0, 0);
    }
    setIsLoading(false);
  };

  const updateProgress = (lessonId: string, progress: number, timeSpent: number) => {
    setUserProgress(prev => {
      const existingIndex = prev.findIndex(p => p.lessonId === lessonId);
      const lesson = lessons.find(l => l.id === lessonId);
      
      if (!lesson) return prev;
      
      const updatedProgress: LessonProgress = {
        lessonId,
        subjectId: lesson.subjectId,
        semesterId: lesson.semesterId,
        progress: Math.max(progress, existingIndex >= 0 ? prev[existingIndex].progress : 0),
        completed: progress >= 100,
        timeSpent: (existingIndex >= 0 ? prev[existingIndex].timeSpent : 0) + timeSpent,
        lastAccessed: new Date(),
        quizScores: existingIndex >= 0 ? prev[existingIndex].quizScores : [],
        exerciseScores: existingIndex >= 0 ? prev[existingIndex].exerciseScores : []
      };

      if (existingIndex >= 0) {
        const newProgress = [...prev];
        newProgress[existingIndex] = updatedProgress;
        return newProgress;
      } else {
        return [...prev, updatedProgress];
      }
    });
  };

  const completeLesson = (lessonId: string) => {
    updateProgress(lessonId, 100, 0);
  };

  const submitQuiz = (lessonId: string, answers: any[], score: number) => {
    setUserProgress(prev => {
      const existingIndex = prev.findIndex(p => p.lessonId === lessonId);
      if (existingIndex >= 0) {
        const newProgress = [...prev];
        newProgress[existingIndex].quizScores.push(score);
        return newProgress;
      }
      return prev;
    });
  };

  const submitExercise = (lessonId: string, exerciseId: string, score: number) => {
    setUserProgress(prev => {
      const existingIndex = prev.findIndex(p => p.lessonId === lessonId);
      if (existingIndex >= 0) {
        const newProgress = [...prev];
        newProgress[existingIndex].exerciseScores.push(score);
        return newProgress;
      }
      return prev;
    });
  };

  const getLessonProgress = (lessonId: string): LessonProgress | null => {
    return userProgress.find(p => p.lessonId === lessonId) || null;
  };

  const getSubjectProgress = (subjectId: string): number => {
    const subjectLessons = lessons.filter(l => l.subjectId === subjectId);
    const subjectProgress = userProgress.filter(p => p.subjectId === subjectId);
    
    if (subjectLessons.length === 0) return 0;
    
    const totalProgress = subjectProgress.reduce((sum, p) => sum + p.progress, 0);
    return Math.round(totalProgress / subjectLessons.length);
  };

  const value = {
    lessons,
    userProgress,
    currentLesson,
    loadLesson,
    updateProgress,
    completeLesson,
    submitQuiz,
    submitExercise,
    getLessonProgress,
    getSubjectProgress,
    isLoading
  };

  return <LessonContext.Provider value={value}>{children}</LessonContext.Provider>;
};