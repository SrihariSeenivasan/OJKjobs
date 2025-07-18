import React, { useState } from 'react';
import OjkLogo from '../components/common/OjkLogo';
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/solid';

const ContactUs: React.FC = () => {
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{ sender: string; message: string }>>([
    { sender: 'ai', message: 'Hello! How can I help you today?' }
  ]);
  const [chatOpen, setChatOpen] = useState(false);

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
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-8">
        <div className="flex flex-col items-center mb-8">
          <OjkLogo className="w-20 h-20 mb-2" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Contact Us</h1>
        
        </div>
        <div className="grid grid-cols-1 gap-8 mb-8">
          <div className="bg-gray-50 rounded-xl shadow-sm p-6">
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Your Name</label>
                <input type="text" id="name" name="name" className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-blue-500" required />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Your Email</label>
                <input type="email" id="email" name="email" className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-blue-500" required />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                <textarea id="message" name="message" rows={4} className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-blue-500" required></textarea>
              </div>
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">Send Mail</button>
            </form>
            <p className="text-gray-600 text-center mt-4">Our support team will respond to your query as soon as possible.</p>
          </div>
        </div>
        <div className="bg-gray-50 rounded-xl shadow-sm p-6 flex flex-col items-center mt-8">
          
          <div className="rounded-lg overflow-hidden border border-gray-300 w-full mb-2">
            <iframe
              title="OJK Jobs Location"
              src="https://www.google.com/maps?q=Kongu+Nadu+India&output=embed"
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <p className="text-gray-600 text-center mt-2">Visit us at Kongu Nadu, India. Our team is ready to welcome you!</p>
        </div>
      </div>
      {/* Floating Chatbot Icon */}
      <button
        className="fixed bottom-8 right-8 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg p-4 flex items-center justify-center focus:outline-none"
        onClick={() => setChatOpen(true)}
        aria-label="Open Chatbot"
        style={{ display: chatOpen ? 'none' : 'flex' }}
      >
        <ChatBubbleLeftRightIcon className="h-7 w-7" />
      </button>
      {/* Chatbot Modal */}
      {chatOpen && (
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
    </div>
  );
};

export default ContactUs;
