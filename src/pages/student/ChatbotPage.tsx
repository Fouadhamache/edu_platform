import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Bot, 
  User, 
  Send, 
  Loader2, 
  Trash2, 
  BookOpen, 
  Target, 
  Clock,
  MessageCircle,
  Sparkles
} from 'lucide-react';
import { useChatbot } from '../../contexts/ChatbotContext';
import { useAuth } from '../../contexts/AuthContext';

const ChatbotPage: React.FC = () => {
  const { 
    messages, 
    isTyping, 
    sendMessage, 
    clearChat, 
    getStudyRecommendations 
  } = useChatbot();
  const { user } = useAuth();
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    await sendMessage(inputMessage);
    setInputMessage('');
  };

  const recommendations = getStudyRecommendations();

  const quickQuestions = [
    'كيف يمكنني تحسين درجاتي في الرياضيات؟',
    'أحتاج خطة دراسية للاستعداد للامتحان',
    'ما هي أفضل طريقة لحفظ المعلومات؟',
    'كيف أنظم وقتي للدراسة؟'
  ];

  return (
    <div className="p-3 lg:p-6 h-full">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="h-full flex flex-col"
      >
        <div className="mb-6">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
            <Bot className="w-6 h-6 lg:w-8 lg:h-8 ml-3 text-blue-600 dark:text-blue-400" />
            المساعد الذكي
          </h1>
          <p className="text-sm lg:text-base text-gray-600 dark:text-gray-300">
            مساعدك الشخصي في التعلم - اسأل أي سؤال أكاديمي وسأساعدك!
          </p>
        </div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Chat Area */}
          <div className="lg:col-span-3 card flex flex-col h-[500px] lg:h-[600px]">
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mr-3">
                  <Bot className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">مساعد التعلم</h3>
                  <p className="text-sm text-green-600 dark:text-green-400">متصل الآن</p>
                </div>
              </div>
              <button
                onClick={clearChat}
                className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                title="مسح المحادثة"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 lg:p-4 space-y-3 lg:space-y-4">
              {messages.length === 0 && (
                <div className="text-center py-8">
                  <Bot className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    مرحباً {user?.name}!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    أنا مساعدك الذكي في التعلم. يمكنني مساعدتك في دراستك وإجابة أسئلتك الأكاديمية.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {quickQuestions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => setInputMessage(question)}
                        className="p-2 lg:p-3 text-xs lg:text-sm bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors text-right"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start max-w-[80%] ${
                    message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.sender === 'user' 
                        ? 'bg-gray-900 dark:bg-white mr-3' 
                        : 'bg-blue-100 dark:bg-blue-900/30 ml-3'
                    }`}>
                      {message.sender === 'user' ? (
                        <User className="w-4 h-4 text-white dark:text-gray-900" />
                      ) : (
                        <Bot className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      )}
                    </div>
                    <div className={`rounded-2xl px-4 py-3 ${
                      message.sender === 'user'
                        ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                    }`}>
                      <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                      <p className="text-xs opacity-60 mt-2">
                        {message.timestamp.toLocaleTimeString('ar-DZ', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center ml-3">
                      <Bot className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl px-4 py-3">
                      <div className="flex items-center space-x-2">
                        <Loader2 className="w-4 h-4 animate-spin text-gray-600 dark:text-gray-300" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">يكتب...</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSendMessage} className="p-3 lg:p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3 space-x-reverse">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="اكتب سؤالك هنا..."
                  className="flex-1 px-3 lg:px-4 py-2 lg:py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm lg:text-base"
                  disabled={isTyping}
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim() || isTyping}
                  className="p-2 lg:p-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-4 h-4 lg:w-5 lg:h-5" />
                </button>
              </div>
            </form>
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block space-y-6">
            {/* Study Recommendations */}
            {recommendations.length > 0 && (
              <div className="card">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Sparkles className="w-5 h-5 ml-2 text-yellow-500" />
                  توصيات دراسية
                </h3>
                <div className="space-y-3">
                  {recommendations.map((rec, index) => (
                    <div key={index} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-start">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${
                          rec.type === 'lesson' ? 'bg-green-100 dark:bg-green-900/30' :
                          rec.type === 'exercise' ? 'bg-orange-100 dark:bg-orange-900/30' :
                          'bg-purple-100 dark:bg-purple-900/30'
                        }`}>
                          {rec.type === 'lesson' ? (
                            <BookOpen className="w-3 h-3 text-green-600 dark:text-green-400" />
                          ) : rec.type === 'exercise' ? (
                            <Target className="w-3 h-3 text-orange-600 dark:text-orange-400" />
                          ) : (
                            <Clock className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{rec.title}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">{rec.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="card">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <MessageCircle className="w-5 h-5 ml-2 text-blue-500" />
                أسئلة سريعة
              </h3>
              <div className="space-y-2">
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => setInputMessage(question)}
                    className="w-full p-3 text-sm bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors text-right"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Stats */}
            <div className="card">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                إحصائيات المحادثة
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-300">الرسائل:</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{messages.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-300">المساعدات:</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {messages.filter(m => m.sender === 'bot').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-300">التوصيات:</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{recommendations.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ChatbotPage;