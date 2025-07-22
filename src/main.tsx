import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { AuthProvider } from './contexts/AuthContext';
import { TrialProvider } from './contexts/TrialContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { AdminProvider } from './contexts/AdminContext';
import { LessonProvider } from './contexts/LessonContext';
import { ChatbotProvider } from './contexts/ChatbotContext';
import { TeacherProvider } from './contexts/TeacherContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <TrialProvider>
          <ThemeProvider>
            <AdminProvider>
              <TeacherProvider>
                <LessonProvider>
                  <ChatbotProvider>
                    <App />
                  </ChatbotProvider>
                </LessonProvider>
              </TeacherProvider>
            </AdminProvider>
          </ThemeProvider>
        </TrialProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);