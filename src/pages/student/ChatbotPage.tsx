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
    <div className="h-full bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto p-4 lg:p-8 h-full">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="h-full flex flex-col"
        >
          <div className="mb-6">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
              <Bot className="w-8 h-8 mr-3 text-blue-600 dark:text-blue-400" />
              المساعد الذكي
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              مساعدك الشخصي في التعلم - اسأل أي سؤال أكاديمي وسأساعدك!
            </p>
          </div>

          <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-0">
            {/* Chat Area */}
            <div className="lg:col-span-3 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 flex flex-col h-full">
              {/* Chat Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl flex items-center justify-center mr-4">
                    <Bot className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">مساعد التعلم</h3>
                    <p className="text-sm text-green-600 dark:text-green-400">متصل الآن</p>
                  </div>
                </div>
                <button
                  onClick={clearChat}
                  className="p-3 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
                  title="مسح المحادثة"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 min-h-0">
                {messages.length === 0 && (
                  <div className="text-center py-12">
                    <Bot className="w-20 h-20 text-gray-400 mx-auto mb-6" />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                      مرحباً {user?.name}!
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
                      أنا مساعدك الذكي في التعلم. يمكنني مساعدتك في دراستك وإجابة أسئلتك الأكاديمية.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
                      {quickQuestions.map((question, index) => (
                        <button
                          key={index}
                          onClick={() => setInputMessage(question)}
                          className="p-4 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-xl transition-colors text-sm text-right"
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
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                        message.sender === 'user' 
                          ? 'bg-gradient-to-br from-blue-600 to-purple-600 mr-3' 
                          : 'bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 ml-3'
                      }`}>
                        {message.sender === 'user' ? (
                          <User className="w-5 h-5 text-white" />
                        ) : (
                          <Bot className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        )}
                      </div>
                      <div className={`rounded-2xl px-6 py-4 ${
                        message.sender === 'user'
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                      }`}>
                        <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
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
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 flex items-center justify-center ml-3">
                        <Bot className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <Loader2 className="w-4 h-4 animate-spin text-gray-600 dark:text-gray-300" />
                          <span className="text-gray-600 dark:text-gray-300">يكتب...</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <form onSubmit={handleSendMessage} className="p-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="اكتب سؤالك هنا..."
                    className="flex-1 px-6 py-4 border border-gray-300 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    disabled={isTyping}
                  />
                  <button
                    type="submit"
                    disabled={!inputMessage.trim() || isTyping}
                    className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </div>

            {/* Sidebar */}
            <div className="hidden lg:block space-y-6">
              {/* Study Recommendations */}
              {recommendations.length > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <Sparkles className="w-5 h-5 mr-2 text-yellow-500" />
                    توصيات دراسية
                  </h3>
                  <div className="space-y-3">
                    {recommendations.map((rec, index) => (
                      <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                        <div className="flex items-start">
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center mr-3 ${
                            rec.type === 'lesson' ? 'bg-green-100 dark:bg-green-900/30' :
                            rec.type === 'exercise' ? 'bg-orange-100 dark:bg-orange-900/30' :
                            'bg-purple-100 dark:bg-purple-900/30'
                          }`}>
                            {rec.type === 'lesson' ? (
                              <BookOpen className="w-4 h-4 text-green-600 dark:text-green-400" />
                            ) : rec.type === 'exercise' ? (
                              <Target className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                            ) : (
                              <Clock className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900 dark:text-white">{rec.title}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{rec.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Actions */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <MessageCircle className="w-5 h-5 mr-2 text-blue-500" />
                  أسئلة سريعة
                </h3>
                <div className="space-y-3">
                  {quickQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => setInputMessage(question)}
                      className="w-full p-4 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-xl transition-colors text-right text-sm"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Stats */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                  إحصائيات المحادثة
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">الرسائل:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{messages.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">المساعدات:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {messages.filter(m => m.sender === 'bot').length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">التوصيات:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{recommendations.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ChatbotPage;