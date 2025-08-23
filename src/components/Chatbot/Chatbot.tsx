import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Bot, User, AlertTriangle, Brain, ArrowRight } from 'lucide-react';
import { useAppContext } from '../../contexts/AppContext';

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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { translations } = useAppContext();

  const initialMessage: Message = {
    id: 'initial',
    type: 'bot',
    content: `Hello! I'm the SASSA Help Hub assistant. I can help you with:

• SASSA payment dates and schedules
• Grant application information
• Eligibility requirements
• Scam protection and awareness
• Finding SASSA offices

How can I help you today?

**Important:** This is an unofficial service. Always verify information at www.sassa.gov.za or call 0800 60 10 11.`,
    timestamp: new Date(),
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([initialMessage]);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const generateBotResponse = async (userMessage: string): Promise<string> => {
    // Simulate API call with delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    const lowerMessage = userMessage.toLowerCase();

    // Payment-related queries
    if (lowerMessage.includes('payment') || lowerMessage.includes('date') || lowerMessage.includes('when')) {
      return `**SASSA Payment Information:**

SASSA payments are typically made according to this monthly schedule:

• **Old Age Grants:** 1st-2nd of each month
• **Disability Grants:** 3rd-4th of each month  
• **Child Support Grants:** Throughout the month, usually starting from the 3rd
• **Foster Care & Care Dependency:** Mid-month

**Important Notes:**
- Dates may change due to weekends or public holidays
- Check our Payment Calendar page for exact dates
- Always verify on www.sassa.gov.za

Would you like information about a specific grant type?`;
    }

    // Application queries
    if (lowerMessage.includes('apply') || lowerMessage.includes('application')) {
      return `**How to Apply for SASSA Grants:**

1. **Visit your nearest SASSA office** (use our Resources page to find locations)
2. **Bring required documents:**
   - South African ID document
   - Proof of income (if any)
   - Bank statements (3 months)
   - Medical reports (for disability grants)
   - Birth certificates (for child grants)

3. **Complete application form** with SASSA staff assistance
4. **Submit and get receipt**
5. **Wait for processing** (30-90 days depending on grant type)

**Remember:** Applications are FREE! Never pay anyone for SASSA applications.

Need help finding your nearest SASSA office?`;
    }

    // Scam-related queries
    if (lowerMessage.includes('scam') || lowerMessage.includes('fraud') || lowerMessage.includes('fake')) {
      return `**🚨 SASSA Scam Protection:**

**Common SASSA Scams to Watch For:**
• People claiming to be SASSA officials asking for money
• SMS/emails requesting banking details
• Promises to "speed up" applications for a fee
• Fake websites mimicking SASSA

**Protection Tips:**
• SASSA services are always FREE
• Never share banking details via SMS/email
• Only use official SASSA channels
• Report suspicious activity to 0800 60 10 11

**If You Encounter a Scam:**
1. Don't pay any money
2. Report to SASSA fraud hotline
3. Report to police if money was lost
4. Check our Scam Alert page for more info

Have you encountered a specific scam you'd like to report?`;
    }

    // Eligibility queries
    if (lowerMessage.includes('eligible') || lowerMessage.includes('qualify') || lowerMessage.includes('requirements')) {
      return `**SASSA Grant Eligibility Overview:**

**Child Support Grant (R510/month):**
- Child under 18 years old
- Primary caregiver income under R4,800/month (single) or R9,600/month (married)

**Old Age Grant (R2,090/month):**
- 60 years or older
- South African citizen/permanent resident
- Pass means test (income under R7,920/month single)

**Disability Grant (R2,090/month):**
- 18+ years old
- Medical confirmation of disability preventing work
- Pass means test

**General Requirements for All Grants:**
- South African citizen or permanent resident
- Live in South Africa
- Meet specific income requirements

Would you like detailed information about a specific grant?`;
    }

    // Office/location queries
    if (lowerMessage.includes('office') || lowerMessage.includes('location') || lowerMessage.includes('address')) {
      return `**Finding SASSA Offices:**

You can find your nearest SASSA office by:

1. **Using our Resources page** - Interactive map with all locations
2. **Visiting www.sassa.gov.za** - Official office locator
3. **Calling SASSA:** 0800 60 10 11

**What to Bring to SASSA Office:**
- South African ID document
- All relevant documents for your query
- Patience (offices can be busy!)

**Office Hours:** Generally Monday-Friday, 8:00 AM - 4:00 PM
*Hours may vary by location - call ahead to confirm*

Would you like me to help you prepare for a specific type of visit?`;
    }

    // Status check queries
    if (lowerMessage.includes('status') || lowerMessage.includes('check') || lowerMessage.includes('track')) {
      return `**How to Check Your SASSA Application Status:**

**Online:** Visit www.sassa.gov.za
- Click "Grant Status Check"
- Enter your ID number and reference number

**SMS:** Send your ID number to 32148 (R1 cost)

**Phone:** Call 0800 60 10 11
- Have your ID and reference number ready

**In Person:** Visit the SASSA office where you applied
- Bring your ID and application receipt

**Processing Times:**
- Child Support Grant: 30-60 days
- Old Age Grant: 30-90 days  
- Disability Grant: 60-120 days

Keep your application reference number safe - you'll need it for all status checks!`;
    }

    // Card issues
    if (lowerMessage.includes('card') || lowerMessage.includes('lost') || lowerMessage.includes('stolen')) {
      return `**Lost or Stolen SASSA Card:**

**Immediate Actions:**
1. **Call SASSA immediately:** 0800 60 10 11 to block the card
2. **Report to police** (get case number if stolen)
3. **Visit SASSA office** for replacement

**What to Bring:**
- South African ID document
- Police case number (if stolen)
- Affidavit explaining loss/theft

**Replacement Process:**
- Complete declaration form
- Wait 10-15 working days for new card
- Your grants continue - collect with ID until new card arrives

**Card Security Tips:**
- Keep your PIN secret
- Never let others use your card
- Check your balance regularly
- Report unauthorized transactions immediately

Need help with any specific card issues?`;
    }

    // Default response with helpful suggestions
    return `I understand you're asking about "${userMessage}". 

Here are some common topics I can help with:

**💰 Payment Information**
- "When are payments made?"
- "Payment dates for February 2025"

**📝 Applications** 
- "How to apply for child support grant"
- "What documents do I need?"

**🛡️ Scam Protection**
- "How to avoid SASSA scams"
- "Report fraud"

**📍 Find Help**
- "SASSA office near me"
- "Contact information"

**❓ Check Status**
- "Track my application"
- "Grant status"

Try asking about any of these topics, or rephrase your question for more specific help.

**Remember:** Always verify information at www.sassa.gov.za or call 0800 60 10 11.`;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      type: 'user',
      content: inputMessage.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setHasError(false);

    try {
      const botResponse = await generateBotResponse(userMessage.content);
      
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        type: 'bot',
        content: botResponse,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      setHasError(true);
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        type: 'bot',
        content: `I apologize, but I'm having trouble responding right now. Please try again in a moment, or contact SASSA directly at 0800 60 10 11 for immediate assistance.`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
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

  const formatMessage = (content: string) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br />');
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 bg-primary-gold text-primary-black p-4 rounded-full shadow-lg hover:bg-primary-gold transition-all duration-200 transform hover:scale-110 z-50 ${className}`}
        aria-label="Open chat assistant"
      >
        <MessageCircle className="w-6 h-6" />
        <div className="absolute -top-1 -left-1 w-3 h-3 bg-green-600 rounded-full animate-pulse"></div>
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 w-96 h-96 bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col z-50 ${className}`}>
      {/* Header */}
      <div className="bg-primary-black text-white p-4 rounded-t-lg flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary-gold rounded-full flex items-center justify-center">
            <Bot className="w-5 h-5 text-primary-black" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">SASSA Assistant</h3>
            <p className="text-xs text-gray-300">Unofficial helper</p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-300 hover:text-white transition-colors duration-200"
          aria-label="Close chat"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start space-x-2`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.type === 'user' ? 'bg-primary-gold' : 'bg-primary-dark'
              }`}>
                {message.type === 'user' ? (
                  <User className="w-3 h-3 text-primary-black" />
                ) : (
                  <Brain className="w-3 h-3 text-white" />
                )}
              </div>
              <div className={`p-3 rounded-lg text-sm ${
                message.type === 'user' 
                  ? 'bg-primary-gold text-primary-black ml-2' 
                  : 'bg-white text-gray-800 border border-gray-200 mr-2'
              }`}>
                <div 
                  dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }}
                  className="prose prose-sm max-w-none"
                />
                <div className={`text-xs mt-1 ${
                  message.type === 'user' ? 'text-primary-black opacity-70' : 'text-gray-500'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
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
              <div className="bg-white border border-gray-200 p-3 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
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
      <div className="p-3 border-t border-gray-200 bg-white rounded-b-lg">
        <div className="flex space-x-2">
          <input
            ref={inputRef}
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about SASSA services..."
            disabled={isLoading}
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-gold focus:border-transparent text-sm disabled:opacity-50"
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !inputMessage.trim()}
            className="bg-primary-gold text-primary-black p-2 rounded-lg hover:bg-primary-gold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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