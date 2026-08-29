const fs = require('fs');

const fileContent = `import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, Bot, User as UserIcon, Mic, Music, MessageSquare } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export default function NovaAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'voice' | 'music'>('chat');
  
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: 'Hi! I am Nova AI. Ask me to find products, compare items, or find something within your budget!' }
  ]);
  const [voiceMessages, setVoiceMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: 'Voice Mode Active! Say something or type below to talk with me in real-time.' }
  ]);
  const [musicMessages, setMusicMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: 'Ready to generate a shopping theme song! What vibe do you want?' }
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, voiceMessages, musicMessages, isOpen, activeTab]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: input };
    
    if (activeTab === 'chat') {
      setMessages(prev => [...prev, userMessage]);
    } else if (activeTab === 'voice') {
      setVoiceMessages(prev => [...prev, userMessage]);
    } else {
      setMusicMessages(prev => [...prev, userMessage]);
    }

    const currentInput = input;
    setInput('');
    setLoading(true);

    try {
      let endpoint = '/api/ai/chat';
      if (activeTab === 'voice') endpoint = '/api/ai/voice';
      if (activeTab === 'music') endpoint = '/api/ai/music';

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: currentInput, prompt: currentInput })
      });
      const data = await res.json();
      
      const responseContent = activeTab === 'music' ? data.message : data.response;
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseContent || "Sorry, I didn't get that."
      };

      if (activeTab === 'chat') {
        setMessages(prev => [...prev, assistantMessage]);
      } else if (activeTab === 'voice') {
        setVoiceMessages(prev => [...prev, assistantMessage]);
      } else {
        setMusicMessages(prev => [...prev, assistantMessage]);
      }
    } catch (err) {
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm sorry, I encountered an error connecting to my brain."
      };
      if (activeTab === 'chat') setMessages(prev => [...prev, errorMsg]);
      else if (activeTab === 'voice') setVoiceMessages(prev => [...prev, errorMsg]);
      else setMusicMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const currentMessages = activeTab === 'chat' ? messages : activeTab === 'voice' ? voiceMessages : musicMessages;

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={\`fixed bottom-6 right-6 z-40 w-16 h-16 bg-gradient-to-br from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 rounded-full shadow-lg shadow-purple-500/30 text-white flex items-center justify-center hover:scale-110 hover:shadow-purple-500/50 transition-all duration-300 \${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}\`}
      >
        <Sparkles className="w-8 h-8" />
      </button>

      {/* Chat Window */}
      <div 
        className={\`fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 w-[calc(100vw-3rem)] sm:w-[400px] bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col transition-all duration-500 origin-bottom-right \${isOpen ? 'scale-100 opacity-100 h-[600px] max-h-[80vh]' : 'scale-0 opacity-0 h-0'}\`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-red-500 via-yellow-500 to-purple-600 p-4 flex flex-col shrink-0">
          <div className="flex items-center justify-between mb-4">
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
          
          {/* Tabs */}
          <div className="flex bg-white/10 p-1 rounded-xl">
            <button 
              onClick={() => setActiveTab('chat')}
              className={\`flex-1 flex items-center justify-center gap-2 py-1.5 rounded-lg text-sm font-medium transition-all \${activeTab === 'chat' ? 'bg-white text-purple-600 shadow' : 'text-white/80 hover:text-white'}\`}
            >
              <MessageSquare className="w-4 h-4" /> Chat
            </button>
            <button 
              onClick={() => setActiveTab('voice')}
              className={\`flex-1 flex items-center justify-center gap-2 py-1.5 rounded-lg text-sm font-medium transition-all \${activeTab === 'voice' ? 'bg-white text-purple-600 shadow' : 'text-white/80 hover:text-white'}\`}
            >
              <Mic className="w-4 h-4" /> Voice
            </button>
            <button 
              onClick={() => setActiveTab('music')}
              className={\`flex-1 flex items-center justify-center gap-2 py-1.5 rounded-lg text-sm font-medium transition-all \${activeTab === 'music' ? 'bg-white text-purple-600 shadow' : 'text-white/80 hover:text-white'}\`}
            >
              <Music className="w-4 h-4" /> Music
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
          {currentMessages.map(msg => (
            <div key={msg.id} className={\`flex gap-3 \${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}\`}>
              <div className={\`w-8 h-8 shrink-0 rounded-full flex items-center justify-center mt-1 \${
                msg.role === 'assistant' ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-200 text-slate-600'
              }\`}>
                {msg.role === 'assistant' ? <Bot className="w-5 h-5" /> : <UserIcon className="w-5 h-5" />}
              </div>
              <div className={\`p-3 rounded-2xl max-w-[75%] text-sm \${
                msg.role === 'user' 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-tr-none' 
                  : 'bg-white border border-slate-100 text-slate-700 rounded-tl-none shadow-sm prose prose-sm prose-indigo'
              }\`}>
                <div dangerouslySetInnerHTML={{ __html: msg.content.replace(/\\n/g, '<br />') }} />
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
          <form onSubmit={handleSend} className="relative flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder={activeTab === 'music' ? "Ask for a song..." : "Ask Nova anything..."}
                className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
              />
              {activeTab === 'voice' && (
                <button
                  type="button"
                  onClick={() => setIsRecording(!isRecording)}
                  className={\`absolute right-2 top-1.5 bottom-1.5 w-10 flex items-center justify-center rounded-xl transition-colors \${isRecording ? 'bg-red-100 text-red-500 animate-pulse' : 'text-slate-400 hover:bg-slate-200'}\`}
                >
                  <Mic className="w-4 h-4" />
                </button>
              )}
            </div>
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="w-12 shrink-0 flex items-center justify-center bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 disabled:opacity-50 disabled:hover:bg-indigo-600 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
`;
fs.writeFileSync('src/components/NovaAssistant.tsx', fileContent);
