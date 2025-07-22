import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import StudentLayout from './components/student/StudentLayout';
import AdminLayout from './components/admin/AdminLayout';
import TeacherLayout from './components/teacher/TeacherLayout';
import AdminRoute from './components/admin/AdminRoute';
import TeacherRoute from './components/teacher/TeacherRoute';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import SubjectPage from './pages/SubjectPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SubscriptionPage from './pages/SubscriptionPage';
import ProfilePage from './pages/ProfilePage';
import ProgressPage from './pages/ProgressPage';
import SavedLessonsPage from './pages/SavedLessonsPage';
import SummariesPage from './pages/student/SummariesPage';
import TestsPage from './pages/student/TestsPage';
import AssignmentsPage from './pages/student/AssignmentsPage';
import ChatbotPage from './pages/student/ChatbotPage';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminCreateLessonPage from './pages/admin/CreateLessonPage';
import TeacherManagement from './pages/admin/TeacherManagement';
import TeacherLoginPage from './pages/teacher/TeacherLoginPage';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import TeacherCreateLessonPage from './pages/teacher/CreateLessonPage';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <Routes>
      {/* Regular User Routes */}
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>

      {/* Student Interface Routes */}
      <Route path="/" element={
        <ProtectedRoute>
          <StudentLayout />
        </ProtectedRoute>
      }>
        <Route 
          path="dashboard" 
          element={<Dashboard />} 
        />
        <Route 
          path="semester/:semesterId/subject/:subjectId" 
          element={<SubjectPage />} 
        />
        <Route 
          path="subscription" 
          element={<SubscriptionPage />} 
        />
        <Route 
          path="profile" 
          element={<ProfilePage />} 
        />
        <Route 
          path="progress" 
          element={<ProgressPage />} 
        />
        <Route 
          path="saved-lessons" 
          element={<SavedLessonsPage />} 
        />
        <Route 
          path="summaries" 
          element={<SummariesPage />} 
        />
        <Route 
          path="tests" 
          element={<TestsPage />} 
        />
        <Route 
          path="assignments" 
          element={<AssignmentsPage />} 
        />
        <Route 
          path="chatbot" 
          element={<ChatbotPage />} 
        />
      </Route>

      {/* Teacher Routes */}
      <Route path="/teacher/login" element={<TeacherLoginPage />} />
      <Route path="/teacher" element={
        <TeacherRoute>
          <TeacherLayout />
        </TeacherRoute>
      }>
        <Route path="dashboard" element={<TeacherDashboard />} />
        <Route path="create-lesson" element={<TeacherCreateLessonPage />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/admin" element={
        <AdminRoute>
          <AdminLayout />
        </AdminRoute>
      }>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="teachers" element={<TeacherManagement />} />
      </Route>
    </Routes>
  );
}

export default App;