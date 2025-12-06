import React, { useState, useRef, useEffect } from 'react';
import { chatWithGuide } from '../services/geminiService';
import { ChatMessage } from '../types';
import { MessageCircle, Send, User, Bot } from 'lucide-react';

const CultureChat: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Annyeong! 👋 I'm Cookie, your guide. Ask me anything about Hangeul, Korean snacks, or travel tips!" }
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      // Convert internal message format to Gemini API format
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const responseText = await chatWithGuide(history, userMsg);
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I'm having trouble connecting to the bakery. Try again later!", isError: true }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 bg-white border-t border-gray-100">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          <div className="lg:w-1/3 space-y-6">
            <h2 className="text-4xl font-bold text-gray-900">Ask Cookie! 🍪</h2>
            <p className="text-lg text-gray-600">
              Curious about why Korean chopsticks are metal? Or how to say "Delicious" in Korean?
              Our AI mascot is here to help you navigate K-Culture.
            </p>
            <div className="bg-orange-50 p-6 rounded-2xl">
              <h4 className="font-bold text-orange-800 mb-3">Try asking:</h4>
              <ul className="space-y-2 text-orange-700">
                <li className="cursor-pointer hover:underline" onClick={() => setInput("Why was Hangeul invented?")}>• Why was Hangeul invented?</li>
                <li className="cursor-pointer hover:underline" onClick={() => setInput("What are some popular Korean snacks?")}>• What are some popular Korean snacks?</li>
                <li className="cursor-pointer hover:underline" onClick={() => setInput("How do I say 'Thank you'?")}>• How do I say 'Thank you'?</li>
              </ul>
            </div>
          </div>

          <div className="lg:w-2/3 w-full bg-gray-50 rounded-3xl shadow-xl overflow-hidden border border-gray-200 flex flex-col h-[600px]">
            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-gray-200' : 'bg-orange-500 text-white'}`}>
                    {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
                  </div>
                  <div className={`max-w-[80%] p-4 rounded-2xl text-sm md:text-base leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-gray-800 text-white rounded-tr-none' 
                      : 'bg-white text-gray-800 border border-gray-200 shadow-sm rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex items-start gap-3">
                   <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center">
                    <Bot size={20} />
                  </div>
                  <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-gray-200 shadow-sm">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"></span>
                      <span className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                      <span className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-200">
              <form onSubmit={handleSend} className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your question about Korea..."
                  className="flex-1 px-6 py-3 bg-gray-50 rounded-full border border-gray-200 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
                <button 
                  type="submit" 
                  disabled={loading || !input.trim()}
                  className="p-3 bg-orange-600 text-white rounded-full hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send size={20} />
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CultureChat;