import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Sparkles, Loader2, Bot } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { ASSET_LINKS } from '../constants/assets';
import { cn } from '../lib/utils';

const logo1 = ASSET_LINKS.logo1Svg;

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
    { role: 'model', text: "Hi! I'm A.T. Intelligence, Abdulrahman's personal assistant. How can I help you explore his projects, workflows, or services?" }
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
          Keep responses concise and engaging.`,
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
    <>
      {/* Floating Bottom AI Intelligence Widget */}
      <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-[100]">
        <button
          id="docked-at-ai-widget-btn"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "relative w-12 h-12 rounded-full bg-[#0a0a0e]/95 hover:bg-[#15151f] backdrop-blur-2xl border border-white/15 hover:border-white/30 text-white shadow-[0_8px_32px_rgba(0,0,0,0.7)] flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 group cursor-pointer",
            isOpen ? "bg-white/20 border-white/40 ring-2 ring-white/15 scale-105" : ""
          )}
          title="AI Intelligence Assistant"
        >
          {/* AI Neural / Sparkles Icon */}
          <Sparkles 
            size={18} 
            strokeWidth={1.35} 
            className="text-white/90 group-hover:text-white group-hover:rotate-6 transition-all duration-200" 
          />
          {/* Active Status Pulse Indicator */}
          <span className="absolute top-1 right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 border border-[#0a0a0e]" />
          </span>
        </button>
      </div>

      {/* Floating Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
            className="fixed bottom-22 right-6 sm:right-8 w-[calc(100vw-3rem)] sm:w-[380px] h-[520px] max-h-[80vh] bg-[#09090d]/95 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] border border-white/10 flex flex-col overflow-hidden backdrop-blur-2xl z-[110]"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/[0.08] bg-white/[0.02] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center p-1.5">
                  <Sparkles size={16} strokeWidth={1.35} className="text-white/90" />
                </div>
                <div>
                  <h3 className="font-semibold text-xs text-white tracking-tight">AI Intelligence</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span className="text-[9px] text-white/40 font-mono uppercase tracking-wider">Assistant Active</span>
                  </div>
                </div>
              </div>
              <button 
                id="close-chat-assistant-btn"
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-full bg-white/[0.04] hover:bg-white/[0.1] flex items-center justify-center text-white/60 hover:text-white transition-colors border border-white/10 cursor-pointer"
                title="Close Assistant"
              >
                <X size={14} strokeWidth={1.35} />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-3.5 no-scrollbar"
            >
              {messages.map((m, i) => (
                <div 
                  key={i}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] p-3 rounded-xl text-xs leading-relaxed ${
                    m.role === 'user' 
                      ? 'bg-white text-black font-medium' 
                      : 'bg-white/[0.05] text-white/80 border border-white/[0.08]'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/[0.05] p-3 rounded-xl border border-white/[0.08] flex items-center gap-2">
                    <Loader2 size={13} className="animate-spin text-white/60" />
                    <span className="text-xs text-white/40 font-mono">Thinking...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-3 bg-white/[0.02] border-t border-white/[0.08]">
              <div className="relative flex items-center">
                <input 
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about projects, workflows, or contact..."
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl py-2.5 pl-3 pr-10 text-xs text-white placeholder:text-white/35 focus:outline-none focus:border-white/30 transition-colors"
                />
                <button 
                  id="send-chat-message-btn"
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-1.5 p-1.5 rounded-lg bg-white text-black hover:bg-neutral-200 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                >
                  <Send size={12} strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

