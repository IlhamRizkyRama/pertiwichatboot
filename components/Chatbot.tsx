import React, { useState, useRef, useEffect } from 'react';
import { FAQItem, ChatMessage, AIModel } from '../types';
import { generateResponse } from '../services/geminiService';
import { Send, Bot, User, Trash2, Zap, Sparkles, Loader2 } from 'lucide-react';

interface ChatbotProps {
  faqs: FAQItem[];
}

const Chatbot: React.FC<ChatbotProps> = ({ faqs }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: 'Halo! Saya asisten virtual SMK Pertiwi Ciasem. Ada yang bisa saya bantu terkait informasi sekolah, pendaftaran, atau jurusan?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [modelType, setModelType] = useState<AIModel>(AIModel.FLASH_LITE);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Prepare history for API
      const history = messages
        .filter(m => m.id !== 'welcome') // exclude welcome message if you want strict context
        .map(m => ({ role: m.role, text: m.text }));

      // Append current user message
      // Note: In a real app we might pass the updated history differently
      
      const responseText = await generateResponse(
        userMessage.text,
        history,
        faqs,
        modelType
      );

      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: 'Maaf, terjadi kesalahan saat menghubungi server. Silakan coba lagi nanti.',
        timestamp: new Date(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([{
      id: 'welcome',
      role: 'model',
      text: 'Halo! Saya asisten virtual SMK Pertiwi Ciasem. Ada yang bisa saya bantu terkait informasi sekolah, pendaftaran, atau jurusan?',
      timestamp: new Date()
    }]);
  };

  return (
    <div className="h-full flex flex-col bg-slate-50 relative overflow-hidden rounded-tl-2xl">
      {/* Chat Header */}
      <div className="bg-white p-4 border-b border-slate-200 flex justify-between items-center shadow-sm z-10">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-full">
            <Bot size={24} className="text-white" />
          </div>
          <div>
            <h2 className="font-bold text-slate-800">Asisten SMK Pertiwi</h2>
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <p className="text-xs text-slate-500">Online</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Model Toggle */}
          <div className="bg-slate-100 p-1 rounded-lg flex items-center text-xs font-medium">
            <button
              onClick={() => setModelType(AIModel.FLASH_LITE)}
              className={`px-3 py-1.5 rounded-md flex items-center gap-1 transition-colors ${
                modelType === AIModel.FLASH_LITE ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
              title="Fast responses (Gemini Flash Lite)"
            >
              <Zap size={14} />
              <span className="hidden sm:inline">Cepat</span>
            </button>
            <button
              onClick={() => setModelType(AIModel.PRO)}
              className={`px-3 py-1.5 rounded-md flex items-center gap-1 transition-colors ${
                modelType === AIModel.PRO ? 'bg-white text-purple-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
              title="Advanced reasoning (Gemini Pro)"
            >
              <Sparkles size={14} />
              <span className="hidden sm:inline">Pintar</span>
            </button>
          </div>

          <button 
            onClick={clearChat}
            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            title="Hapus Chat"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide bg-slate-50/50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-[85%] md:max-w-[70%] gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1
                ${msg.role === 'user' ? 'bg-slate-800 text-white' : 'bg-blue-600 text-white'}
              `}>
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              
              <div className={`
                p-4 rounded-2xl text-sm leading-relaxed shadow-sm
                ${msg.role === 'user' 
                  ? 'bg-slate-800 text-white rounded-tr-none' 
                  : msg.isError 
                    ? 'bg-red-50 text-red-600 border border-red-100 rounded-tl-none'
                    : 'bg-white text-slate-800 border border-slate-100 rounded-tl-none'}
              `}>
                 <div className="whitespace-pre-wrap">{msg.text}</div>
                 <div className={`text-[10px] mt-2 opacity-60 ${msg.role === 'user' ? 'text-slate-300' : 'text-slate-400'}`}>
                   {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                 </div>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start w-full">
             <div className="flex max-w-[85%] gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot size={16} />
                </div>
                <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm flex items-center gap-2">
                  <span className="text-sm text-slate-500">Sedang mengetik...</span>
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto relative flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Tulis pertanyaan Anda..."
            className="flex-1 bg-slate-100 text-slate-800 border-0 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-slate-400"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className={`
              p-3 rounded-xl flex items-center justify-center transition-all
              ${!input.trim() || isLoading 
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30'}
            `}
          >
            {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
          </button>
        </div>
        <p className="text-center text-xs text-slate-400 mt-2">
          AI dapat membuat kesalahan. Mohon verifikasi informasi penting.
        </p>
      </div>
    </div>
  );
};

export default Chatbot;