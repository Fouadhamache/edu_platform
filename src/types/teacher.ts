export interface Teacher {
  id: string;
  name: string;
  email: string;
  password: string;
  phone?: string;
  bio?: string;
  avatar?: string;
  specialization: string;
  experience: number;
  assignedSubjects: AssignedSubject[];
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

export interface AssignedSubject {
  id: string;
  level: 'primary' | 'middle' | 'secondary';
  year: number;
  stream?: string;
  subjectId: string;
  subjectName: string;
  canCreateLessons: boolean;
  canEditLessons: boolean;
  canDeleteLessons: boolean;
  canManageExercises: boolean;
  canManageFlashcards: boolean;
}

export interface TeacherLesson {
  id: string;
  title: string;
  description: string;
  videoUrl?: string;
  documentContent: string;
  duration: number;
  level: string;
  year: number;
  stream?: string;
  subjectId: string;
  subjectName: string;
  teacherId: string;
  teacherName: string;
  exercises: Exercise[];
  flashcards: Flashcard[];
  isPublished: boolean;
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
  points: number;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}