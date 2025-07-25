import { Info, X } from 'lucide-react';
import React from 'react';

interface StepperBarProps {
  onShowCredits: () => void;
  onShowOffer: () => void;
}

const StepperBar: React.FC<StepperBarProps> = ({ onShowCredits, onShowOffer }) => (
  <div className="w-full border-b bg-white sticky top-0 z-30">
    <div className="max-w-7xl mx-auto px-2 sm:px-4 py-3 sm:py-4">
      {/* Mobile Layout */}
      <div className="flex sm:hidden items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src="/assets/ojk-logo.png" alt="OJK Jobs" className="h-8 w-8 rounded" />
        </div>
        
        {/* Mobile Stepper - Compact */}
        <div className="flex items-center gap-2 flex-1 justify-center">
          <div className="flex flex-col items-center">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#fbb040] text-white font-bold text-sm">1</span>
            <span className="text-xs text-[#fbb040] font-semibold mt-0.5 hidden xs:block">Plan</span>
          </div>
          <div className="w-6 h-0.5 bg-[#fbb040]" />
          <div className="flex flex-col items-center">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#FFF7E0] text-[#b97a13] font-bold text-sm border border-[#fbb040]">2</span>
            <span className="text-xs text-[#b97a13] font-semibold mt-0.5 hidden xs:block">Checkout</span>
          </div>
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-1">
          <button 
            className="flex items-center gap-1 text-[#b97a13] font-medium text-sm px-2 py-1 rounded hover:bg-[#FFF7E0] border border-[#fbb040]/30 transition-all duration-200" 
            onClick={onShowCredits}
          >
            <Info size={16} stroke="#fbb040" />
            <span className="hidden xs:inline">Credits</span>
          </button>
          <button 
            className="p-1.5 rounded hover:bg-[#FFF7E0] transition-all duration-200" 
            aria-label="Close" 
            onClick={onShowOffer}
          >
            <X size={18} stroke="#b97a13" />
          </button>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden sm:flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 min-w-[48px]">
          <img src="/assets/ojk-logo.png" alt="OJK Jobs" className="h-10 w-10 rounded" />
        </div>
        
        {/* Desktop Stepper */}
        <div className="flex items-center justify-center gap-4 flex-1">
          <div className="flex flex-col items-center">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#fbb040] text-white font-bold text-lg">1</span>
            <span className="text-xs text-[#fbb040] font-semibold mt-1">Select a plan</span>
          </div>
          <div className="w-10 h-0.5 bg-[#fbb040] mx-2" />
          <div className="flex flex-col items-center">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#FFF7E0] text-[#b97a13] font-bold text-lg border border-[#fbb040]">2</span>
            <span className="text-xs text-[#b97a13] font-semibold mt-1">Checkout</span>
          </div>
        </div>
        
        {/* Desktop Actions */}
        <div className="flex items-center gap-2 min-w-[180px] justify-end">
          <button 
            className="flex items-center gap-2 text-[#b97a13] font-semibold text-base px-3 py-1 rounded hover:bg-[#FFF7E0] border border-[#fbb040]/30 transition-all duration-200" 
            onClick={onShowCredits}
          >
            <Info size={22} stroke="#fbb040" />
            Available Credits
          </button>
          <button 
            className="ml-2 p-2 rounded hover:bg-[#FFF7E0] transition-all duration-200" 
            aria-label="Close" 
            onClick={onShowOffer}
          >
            <X size={22} stroke="#b97a13" />
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default StepperBar;