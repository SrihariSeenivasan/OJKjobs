
import { CheckCircle2, X } from "lucide-react";
import React from "react";

interface PopupProps {
  open: boolean;
  onClose: () => void;
}

const ContactPopup: React.FC<PopupProps> = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-6 sm:p-8 max-w-md w-full border border-[#fbb040]/30 relative">
        <button
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center border border-[#fbb040] rounded-full bg-[#FFF7E0] text-xl text-[#b97a13] hover:bg-[#fbb040] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#fbb040] transition-all duration-200"
          onClick={onClose}
          aria-label="Close"
        >
          <X size={22} stroke="currentColor" strokeWidth={2} />
        </button>
        <div className="flex flex-col items-center">
          <div className="bg-[#FFF7E0] rounded-full p-3 mb-4 border border-[#fbb040]/40 flex items-center justify-center">
            <CheckCircle2 size={40} stroke="#fbb040" strokeWidth={2.5} fill="#fbb040" className="drop-shadow" />
          </div>
          <div className="text-2xl font-bold text-[#253858] mb-2 text-center">Thank you for showing interest</div>
          <div className="text-gray-700 text-center mb-6">Someone from our sales team will connect with you shortly to help you with your requirements.</div>
          <button
            className="bg-[#fbb040] hover:bg-orange-500 text-white rounded-xl px-8 py-3 font-semibold text-lg w-full shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#fbb040]"
            onClick={onClose}
          >
            Okay, got it
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactPopup;
