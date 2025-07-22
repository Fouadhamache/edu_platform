import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'lesson-suggestion' | 'quiz-result' | 'study-plan';
  metadata?: any;
}

export interface StudyRecommendation {
  type: 'lesson' | 'exercise' | 'review';
  title: string;
  description: string;
  subjectId: string;
  lessonId?: string;
  priority: 'high' | 'medium' | 'low';
}

interface ChatbotContextType {
  messages: ChatMessage[];
  isTyping: boolean;
  sendMessage: (content: string) => Promise<void>;
  clearChat: () => void;
  getStudyRecommendations: () => StudyRecommendation[];
  isOpen: boolean;
  toggleChat: () => void;
}

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined);

export const useChatbot = () => {
  const context = useContext(ChatbotContext);
  if (!context) {
    throw new Error('useChatbot must be used within a ChatbotProvider');
  }
  return context;
};

export const ChatbotProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Load chat history
  useEffect(() => {
    if (user) {
      const savedMessages = localStorage.getItem(`chat_${user.id}`);
      if (savedMessages) {
        try {
          const parsed = JSON.parse(savedMessages);
          setMessages(parsed.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          })));
        } catch (error) {
          console.error('Error loading chat history:', error);
        }
      } else {
        // Welcome message for new users
        const welcomeMessage: ChatMessage = {
          id: 'welcome',
          content: `مرحباً ${user.name}! أنا مساعدك الذكي في التعلم. يمكنني مساعدتك في:\n\n• شرح المفاهيم الصعبة\n• اقتراح دروس مناسبة لمستواك\n• إنشاء خطة دراسية شخصية\n• الإجابة على أسئلتك الأكاديمية\n\nكيف يمكنني مساعدتك اليوم؟`,
          sender: 'bot',
          timestamp: new Date(),
          type: 'text'
        };
        setMessages([welcomeMessage]);
      }
    }
  }, [user]);

  // Save messages to localStorage
  useEffect(() => {
    if (user && messages.length > 0) {
      localStorage.setItem(`chat_${user.id}`, JSON.stringify(messages));
    }
  }, [user, messages]);

  const generateBotResponse = async (userMessage: string): Promise<ChatMessage> => {
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    const lowerMessage = userMessage.toLowerCase();
    let response = '';
    let type: ChatMessage['type'] = 'text';
    let metadata: any = undefined;

    // Simple AI logic based on keywords and user context
    if (lowerMessage.includes('رياضيات') || lowerMessage.includes('معادلة') || lowerMessage.includes('حساب')) {
      response = `بناءً على مستواك في ${user?.education.level === 'secondary' ? 'الثانوي' : user?.education.level === 'middle' ? 'المتوسط' : 'الابتدائي'}، أنصحك بالتركيز على:\n\n• فهم المفاهيم الأساسية أولاً\n• حل التمارين التطبيقية\n• مراجعة الأمثلة المحلولة\n\nهل تريد مني اقتراح دروس محددة في الرياضيات؟`;
    } else if (lowerMessage.includes('فيزياء') || lowerMessage.includes('كيمياء') || lowerMessage.includes('علوم')) {
      response = `العلوم تحتاج إلى فهم عملي! أنصحك بـ:\n\n• ربط النظرية بالتطبيق العملي\n• مشاهدة التجارب العملية\n• حل المسائل خطوة بخطوة\n• استخدام الرسوم البيانية والمخططات\n\nأي موضوع في العلوم تجد صعوبة فيه؟`;
    } else if (lowerMessage.includes('صعب') || lowerMessage.includes('لا أفهم') || lowerMessage.includes('مشكلة')) {
      response = `أفهم شعورك! التعلم يحتاج صبر ووقت. إليك بعض النصائح:\n\n• قسم المادة إلى أجزاء صغيرة\n• ادرس في أوقات تركيزك العالي\n• لا تتردد في إعادة مشاهدة الدروس\n• اطلب المساعدة عند الحاجة\n\nما هو الموضوع المحدد الذي تجد صعوبة فيه؟`;
    } else if (lowerMessage.includes('خطة') || lowerMessage.includes('جدول') || lowerMessage.includes('تنظيم')) {
      response = `سأساعدك في إنشاء خطة دراسية مناسبة لك:\n\n📅 **خطة دراسية مقترحة:**\n• الصباح: المواد التي تحتاج تركيز عالي\n• بعد الظهر: المراجعة والتمارين\n• المساء: القراءة الخفيفة\n\n⏰ **نصائح للتنظيم:**\n• خذ استراحة كل 45 دقيقة\n• راجع ما تعلمته قبل النوم\n• اجعل هناك يوم للمراجعة العامة\n\nهل تريد خطة مخصصة لمادة معينة؟`;
      type = 'study-plan';
    } else if (lowerMessage.includes('اختبار') || lowerMessage.includes('امتحان') || lowerMessage.includes('تقييم')) {
      response = `الاستعداد للاختبارات مهم جداً! إليك استراتيجية فعالة:\n\n📝 **قبل الاختبار:**\n• راجع الملاحظات الرئيسية\n• حل اختبارات تجريبية\n• نم جيداً قبل الاختبار\n\n✅ **أثناء الاختبار:**\n• اقرأ الأسئلة بعناية\n• ابدأ بالأسئلة السهلة\n• راجع إجاباتك قبل التسليم\n\nهل تريد اختبار تجريبي في مادة معينة؟`;
    } else if (lowerMessage.includes('شكر') || lowerMessage.includes('ممتاز') || lowerMessage.includes('جيد')) {
      response = `أسعدني أن أساعدك! 😊\n\nأنا هنا دائماً لمساعدتك في رحلتك التعليمية. لا تتردد في سؤالي عن أي شيء يخص دراستك.\n\nهل هناك شيء آخر يمكنني مساعدتك فيه؟`;
    } else {
      // General response with personalized touch
      const educationLevel = user?.education.level === 'secondary' ? 'الثانوي' : 
                           user?.education.level === 'middle' ? 'المتوسط' : 'الابتدائي';
      
      response = `شكراً لسؤالك! كطالب في ${educationLevel}، يمكنني مساعدتك في:\n\n📚 **المواد الدراسية:**\n• شرح المفاهيم الصعبة\n• حل التمارين والمسائل\n• تقديم أمثلة عملية\n\n📈 **التطوير الأكاديمي:**\n• تحسين طرق الدراسة\n• إدارة الوقت\n• الاستعداد للاختبارات\n\nحدد لي بالضبط ما تحتاج مساعدة فيه وسأقدم لك إجابة مفصلة!`;
    }

    return {
      id: Date.now().toString(),
      content: response,
      sender: 'bot',
      timestamp: new Date(),
      type,
      metadata
    };
  };

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: content.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      // Generate bot response
      const botResponse = await generateBotResponse(content);
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error generating response:', error);
      const errorMessage: ChatMessage = {
        id: Date.now().toString(),
        content: 'عذراً، حدث خطأ. يرجى المحاولة مرة أخرى.',
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    if (user) {
      localStorage.removeItem(`chat_${user.id}`);
    }
  };

  const getStudyRecommendations = (): StudyRecommendation[] => {
    if (!user) return [];

    // Generate personalized recommendations based on user's education level
    const recommendations: StudyRecommendation[] = [];

    if (user.education.level === 'secondary') {
      recommendations.push(
        {
          type: 'lesson',
          title: 'مراجعة المعادلات التفاضلية',
          description: 'درس مهم لفهم الرياضيات المتقدمة',
          subjectId: 'mathematics',
          lessonId: '1',
          priority: 'high'
        },
        {
          type: 'exercise',
          title: 'تمارين الفيزياء النووية',
          description: 'تطبيقات عملية على المفاهيم النظرية',
          subjectId: 'physics',
          priority: 'medium'
        }
      );
    }

    return recommendations;
  };

  const toggleChat = () => {
    setIsOpen(prev => !prev);
  };

  const value = {
    messages,
    isTyping,
    sendMessage,
    clearChat,
    getStudyRecommendations,
    isOpen,
    toggleChat
  };

  return <ChatbotContext.Provider value={value}>{children}</ChatbotContext.Provider>;
};