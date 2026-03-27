import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Bot, User, Sparkles, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface Message {
  role: 'user' | 'model';
  text: string;
}

interface ChatAssistantProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  initialMessage?: string;
  setInitialMessage?: (message: string) => void;
}

export const ChatAssistant = ({ isOpen, setIsOpen, initialMessage, setInitialMessage }: ChatAssistantProps) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Hi! I'm A.T. Intelligence, Abdulrahman's personal AI. How can I help you today? I can tell you about his projects, skills, or help you book a meeting." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialMessage && initialMessage.trim()) {
      handleSend(initialMessage.trim());
      if (setInitialMessage) setInitialMessage('');
    }
  }, [initialMessage]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (overrideInput?: string) => {
    const messageToSend = overrideInput || input.trim();
    if (!messageToSend || isLoading) return;

    if (!overrideInput) setInput('');
    setMessages(prev => [...prev, { role: 'user', text: messageToSend }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ 
        apiKey: process.env.GEMINI_API_KEY || '',
        httpOptions: { fetch: window.fetch.bind(window) } as any
      });
      const model = "gemini-3-flash-preview";

      // Simple history conversion
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const response = await ai.models.generateContent({
        model,
        contents: [
          ...history,
          { role: 'user', parts: [{ text: messageToSend }] }
        ],
        config: {
          systemInstruction: `You are the personal AI assistant for Abdulrahman Toor, a Founder & AI Automation Expert. 
          Your goal is to represent him professionally and helpfully.
          
          Key Info about Abdulrahman:
          - Role: Founder & AI Automation Expert.
          - Expertise: SaaS development, n8n automation, Python, React, Next.js, GenAI.
          - Achievements: 200+ projects delivered, 100+ happy clients.
          - Services: AI Strategy, Custom Automations, Full-stack Development, SaaS Consulting.
          - Contact: abdulrahmant.official@gmail.com or WhatsApp +92 309 4506904.
          - Personality: Innovative, efficient, results-driven, and friendly.
          
          If someone wants to book a meeting, tell them to email him or use the contact form on the 'Connect' tab.
          Keep responses concise and engaging. Use emojis occasionally.`,
        }
      });

      const aiText = response.text || "I'm sorry, I couldn't process that. Please try again!";
      setMessages(prev => [...prev, { role: 'model', text: aiText }]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "I'm having a bit of trouble connecting right now. Feel free to reach out to Abdulrahman directly via the Connect tab!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-20 right-0 w-[350px] sm:w-[400px] h-[500px] glass rounded-[2.5rem] shadow-2xl border border-white/10 flex flex-col overflow-hidden backdrop-blur-2xl"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/5 bg-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 p-2">
                  <img src="/assets/1-logo.svg" alt="A.T. AI" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">A.T. Intelligence</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-[10px] text-white/40 font-medium uppercase tracking-wider">Online</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl hover:bg-white/5 text-white/40 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar"
            >
              {messages.map((m, i) => (
                <div 
                  key={i}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${
                    m.role === 'user' 
                      ? 'bg-indigo-500 text-white rounded-tr-none' 
                      : 'bg-white/5 text-white/80 rounded-tl-none border border-white/5'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/5 flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin text-indigo-400" />
                    <span className="text-xs text-white/40">Thinking...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 bg-white/5 border-t border-white/5">
              <div className="relative">
                <input 
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask me anything..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:border-indigo-500/50 transition-colors"
                />
                <button 
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-indigo-500 text-white hover:bg-indigo-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full bg-[#0a0a0a] border border-white/10 backdrop-blur-xl flex items-center justify-center text-white shadow-[0_0_30px_rgba(99,102,241,0.3)] hover:bg-white/5 transition-all relative group"
      >
        <div className="absolute inset-0 rounded-full bg-indigo-500 animate-ping opacity-20 group-hover:opacity-0 transition-opacity" />
        {isOpen ? (
          <X size={28} />
        ) : (
          <img src="/assets/1-logo.svg" alt="A.T. Intelligence" className="w-8 h-8 object-contain" />
        )}
        {!isOpen && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-indigo-500 rounded-full border-2 border-[#050505] flex items-center justify-center">
            <Sparkles size={10} className="text-white" />
          </div>
        )}
      </motion.button>
    </div>
  );
};
