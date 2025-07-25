import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/solid';
import React, { useState, useEffect } from 'react';

const Chatbot: React.FC = () => {
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{ sender: string; message: string }>>([
    { sender: 'ai', message: 'Hello! How can I help you today?' }
  ]);
  const [chatOpen, setChatOpen] = useState(false);
  // Responsive check for chatbot (hide on small screens)
  const [isDesktop, setIsDesktop] = useState(true);
  useEffect(() => {
    const checkScreen = () => setIsDesktop(window.innerWidth >= 768);
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  // Simple mock AI chatbot response
  const handleChatSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setChatHistory(prev => [...prev, { sender: 'user', message: chatInput }]);
    setTimeout(() => {
      setChatHistory(prev => [...prev, { sender: 'ai', message: 'Thank you for your message. Our support desk will get back to you soon!' }]);
    }, 800);
    setChatInput('');
  };

  return (
    <>
      {isDesktop && (
        <button
          className="fixed bottom-8 right-8 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg p-4 flex items-center justify-center focus:outline-none"
          onClick={() => setChatOpen(true)}
          aria-label="Open Chatbot"
          style={{ display: chatOpen ? 'none' : 'flex' }}
        >
          <ChatBubbleLeftRightIcon className="h-7 w-7" />
        </button>
      )}
      {chatOpen && isDesktop && (
        <div className="fixed bottom-8 right-8 z-50 w-80 max-w-full bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <span className="font-bold text-blue-600">OJK Support Chat</span>
            <button className="text-gray-400 hover:text-gray-700" onClick={() => setChatOpen(false)} aria-label="Close Chat">&times;</button>
          </div>
          <div className="p-4 h-64 overflow-y-auto bg-gray-50">
            {chatHistory.map((msg, idx) => (
              <div key={idx} className={`mb-2 text-sm ${msg.sender === 'ai' ? 'text-gray-700' : 'text-blue-700 text-right'}`}>{msg.message}</div>
            ))}
          </div>
          <form className="flex gap-2 p-4 border-t" onSubmit={handleChatSend}>
            <input
              type="text"
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-blue-500"
              placeholder="Type your message..."
            />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Send</button>
          </form>
        </div>
      )}
    </>
  );
};

export default Chatbot;
