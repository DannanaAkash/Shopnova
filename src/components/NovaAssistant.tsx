import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, Bot, User as UserIcon } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export default function NovaAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: 'Hi! I am Nova AI. Ask me to find products, compare items, or find something within your budget!' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: userMessage.content })
      });
      const data = await res.json();
      
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response
      }]);
    } catch (err) {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm sorry, I encountered an error connecting to my brain."
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 w-16 h-16 bg-gradient-to-br from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 rounded-full shadow-lg shadow-purple-500/30 text-white flex items-center justify-center hover:scale-110 hover:shadow-purple-500/50 transition-all duration-300 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
      >
        <Sparkles className="w-8 h-8" />
      </button>

      {/* Chat Window */}
      <div 
        className={`fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 w-[calc(100vw-3rem)] sm:w-[400px] bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col transition-all duration-500 origin-bottom-right ${isOpen ? 'scale-100 opacity-100 h-[600px] max-h-[80vh]' : 'scale-0 opacity-0 h-0'}`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-red-500 via-yellow-500 to-purple-600 p-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3 text-white">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-lg leading-tight">Nova AI</div>
              <div className="text-indigo-100 text-xs">Smart Shopping Assistant</div>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
          {messages.map(msg => (
            <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center mt-1 ${
                msg.role === 'assistant' ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-200 text-slate-600'
              }`}>
                {msg.role === 'assistant' ? <Bot className="w-5 h-5" /> : <UserIcon className="w-5 h-5" />}
              </div>
              <div className={`p-3 rounded-2xl max-w-[75%] text-sm ${
                msg.role === 'user' 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-tr-none' 
                  : 'bg-white border border-slate-100 text-slate-700 rounded-tl-none shadow-sm prose prose-sm prose-indigo'
              }`}>
                {/* A real app would use react-markdown here for assistant responses */}
                <div dangerouslySetInnerHTML={{ __html: msg.content.replace(/\n/g, '<br />') }} />
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex gap-3 flex-row">
              <div className="w-8 h-8 shrink-0 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mt-1">
                <Bot className="w-5 h-5" />
              </div>
              <div className="p-4 rounded-2xl rounded-tl-none bg-white border border-slate-100 shadow-sm flex items-center gap-2">
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 bg-white border-t border-slate-100 shrink-0">
          <form onSubmit={handleSend} className="relative">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask Nova anything..."
              className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="absolute right-2 top-2 bottom-2 w-10 flex items-center justify-center bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:hover:bg-indigo-600 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
