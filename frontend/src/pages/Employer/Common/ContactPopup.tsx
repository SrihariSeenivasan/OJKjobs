import React from "react";

interface PopupProps {
  open: boolean;
  onClose: () => void;
}

const ContactPopup: React.FC<PopupProps> = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full relative">
        <button className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-gray-600" onClick={onClose}>&times;</button>
        <div className="flex flex-col items-center">
          <div className="bg-green-100 rounded-full p-3 mb-4">
            <svg width="32" height="32" fill="none" stroke="#15803d" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/></svg>
          </div>
          <div className="text-2xl font-semibold text-[#253858] mb-2 text-center">Thank you for showing interest</div>
          <div className="text-gray-700 text-center mb-6">Someone from our sales team will connect with you shortly to help you with your requirements.</div>
          <button className="bg-green-700 hover:bg-green-800 text-white rounded px-8 py-3 font-semibold text-lg w-full" onClick={onClose}>Okay, got it</button>
        </div>
      </div>
    </div>
  );
};

export default ContactPopup;
