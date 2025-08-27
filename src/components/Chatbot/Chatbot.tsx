// Chatbot.tsx
import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  MessageCircle,
  X,
  Bot,
  User,
  AlertTriangle,
  Brain,
  ArrowRight,
} from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

interface ChatbotProps {
  className?: string;
}

const Chatbot: React.FC<ChatbotProps> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [systemPrompt, setSystemPrompt] = useState('');
  const [isPromptLoading, setIsPromptLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /* ----------  Daily usage guard  ---------- */
  const DAILY_LIMIT = 200;
  const incDailyCount = () => {
    const c = Number(localStorage.getItem('chatCount') || 0) + 1;
    localStorage.setItem('chatCount', String(c));
    return c;
  };
  const dailyCount = () => Number(localStorage.getItem('chatCount') || 0);

  const initialMessage = useMemo((): Message => ({
    id: 'initial',
    type: 'bot',
    content: `Hello! I'm the SASSA Help Hub assistant. I can help you with:

• SASSA payment dates and schedules
• Grant application information
• Eligibility requirements
• Scam protection and awareness
• Finding SASSA offices

How can I help you today?`,
    timestamp: new Date(),
  }), []);

  /* ----------  Side-effects  ---------- */
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([initialMessage]);
    }

    const fetchPrompt = async () => {
      if (!isOpen) return;
      setIsPromptLoading(true);
      try {
        const response = await fetch('https://api.jsonbin.io/v3/b/68a9e74243b1c97be92696b3/latest');
        if (!response.ok) throw new Error('Failed to load system prompt');
        const json = await response.json();
        setSystemPrompt(json.record.prompt);
      } catch (error) {
        console.error("Failed to fetch system prompt:", error);
        setHasError(true);
        setMessages((prev) => [
          ...prev,
          {
            id: `err-prompt-${Date.now()}`,
            type: 'bot',
            content: 'Error: Could not load chatbot configuration. Please try again later.',
            timestamp: new Date(),
          },
        ]);
      } finally {
        setIsPromptLoading(false);
      }
    };

    fetchPrompt();
  }, [isOpen, messages.length, initialMessage]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  /* ----------  Helpers  ---------- */
  const sanitize = (str: string) =>
    str.replace(/<script[^>]*>.*?<\/script>/gi, '').trim();

  const formatMessage = (content: string) =>
    content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br />');

  /* ----------  API call  ---------- */
  const generateBotResponse = async (userMessage: string): Promise<string> => {
  setIsLoading(true);
  setHasError(false);

  const prompt = systemPrompt.slice(0, 3000) + '\n\nUser: ' + userMessage.slice(0, 500);

  const res = await fetch('/api/gemini', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  });

  if (!res.ok) throw new Error('API error');
  const json = await res.json();
  return json.text;
};

  /* ----------  Send handler  ---------- */
  const handleSendMessage = async (retries = 1) => {
    if (!inputMessage.trim() || isLoading || isPromptLoading) return;
    if (dailyCount() >= DAILY_LIMIT) {
      setHasError(true);
      setMessages((prev) => [
        ...prev,
        {
          id: `limit-${Date.now()}`,
          type: 'bot',
          content:
            'Daily message limit reached. Please try again tomorrow or call 0800 60 10 11.',
          timestamp: new Date(),
        },
      ]);
      return;
    }

    const cleaned = sanitize(inputMessage);
    const userMsg: Message = {
      id: `u-${Date.now()}`,
      type: 'user',
      content: cleaned,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);
    setHasError(false);

    try {
      const reply = await generateBotResponse(cleaned);
      const botMsg: Message = {
        id: `b-${Date.now()}`,
        type: 'bot',
        content: reply,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
      incDailyCount();
    } catch (err: unknown) {
      const isRateLimitError = err instanceof Error && /rate|quota/i.test(err.message);
      if (retries > 0 && isRateLimitError) {
        await new Promise((r) => setTimeout(r, 60000));
        return handleSendMessage(retries - 1);
      }
      setHasError(true);
      const errorMsg: Message = {
        id: `e-${Date.now()}`,
        type: 'bot',
        content:
          'I can’t respond right now. Please try again later or call 0800 60 10 11.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  /* ----------  Closed state  ---------- */
  if (!isOpen)
    return (
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 bg-primary-gold text-primary-black p-4 rounded-full shadow-lg hover:bg-primary-gold transition-all duration-200 transform hover:scale-110 z-50 ${className}`}
        aria-label="Open chat assistant"
      >
        <MessageCircle className="w-6 h-6" />
        <div className="absolute -top-1 -left-1 w-3 h-3 bg-green-600 rounded-full animate-pulse" />
      </button>
    );

  /* ----------  Open state  ---------- */
  return (
    <div
      className={`fixed bottom-6 right-6 w-96 h-96 bg-white rounded-lg shadow-2xl border border-black/50 flex flex-col z-50 ${className}`}
    >
      {/* Header */}
      <div className="bg-primary-black text-white p-4 rounded-t-lg flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary-gold rounded-full flex items-center justify-center">
            <Bot className="w-5 h-5 text-primary-black" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">SASSA Assistant</h3>
            <p className="text-xs text-gray-300">Informative helper powered by Google Gemini</p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-300 hover:text-white transition-colors"
          aria-label="Close chat"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`flex max-w-[80%] ${
                msg.type === 'user' ? 'flex-row-reverse' : 'flex-row'
              } items-start space-x-2`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                  msg.type === 'user' ? 'bg-primary-gold' : 'bg-primary-dark'
                }`}
              >
                {msg.type === 'user' ? (
                  <User className="w-3 h-3 text-primary-black" />
                ) : (
                  <Brain className="w-3 h-3 text-white" />
                )}
              </div>
              <div
                className={`p-3 rounded-lg text-sm ${
                  msg.type === 'user'
                    ? 'bg-primary-gold text-primary-black ml-2'
                    : 'bg-white text-gray-800 border border-black/50 mr-2'
                }`}
              >
                <div
                  dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }}
                />
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-2">
              <div className="w-6 h-6 bg-primary-dark rounded-full flex items-center justify-center flex-shrink-0">
                <Brain className="w-3 h-3 text-white" />
              </div>
              <div className="bg-white border border-black/50 p-3 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: '0.1s' }}
                  />
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: '0.2s' }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {hasError && (
          <div className="flex justify-center">
            <div className="bg-red-50 border border-red-200 text-red-700 p-2 rounded-lg text-xs flex items-center space-x-1">
              <AlertTriangle className="w-4 h-4" />
              <span>Connection issue. Please try again.</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t border-black/50 bg-white rounded-b-lg">
        <div className="flex space-x-2">
          <input
            ref={inputRef}
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={isPromptLoading ? 'Initializing chat...' : 'Ask about SASSA services...'}
            disabled={isLoading || isPromptLoading}
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-gold focus:border-transparent text-sm disabled:opacity-50"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={isLoading || isPromptLoading || !inputMessage.trim()}
            className="bg-primary-gold text-primary-black p-2 rounded-lg hover:bg-primary-gold transition-colors disabled:opacity-50"
            aria-label="Send message"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-1 text-center">
          This bot is not affiliated with SASSA • Always verify at www.sassa.gov.za
        </p>
      </div>
    </div>
  );
};

export default Chatbot;