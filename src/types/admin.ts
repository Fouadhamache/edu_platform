export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'admin';
  createdAt: Date;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  videoUrl?: string;
  documentContent?: string;
  duration: number;
  subjectId: string;
  semesterId: string;
  level: string;
  stream?: string;
  exercises: Exercise[];
  flashcards: Flashcard[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Exercise {
  id: string;
  type: 'multiple-choice' | 'fill-blank' | 'true-false' | 'matching';
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

export interface ClassStructure {
  level: string;
  year: number;
  stream?: string;
  subjects: Subject[];
}

export interface Subject {
  id: string;
  name: string;
  lessons: Lesson[];
}

export interface PlatformUser {
  id: string;
  name: string;
  email: string;
  education: any;
  hasTrialExpired: boolean;
  hasSubscription: boolean;
  createdAt: Date;
  lastLogin?: Date;
}