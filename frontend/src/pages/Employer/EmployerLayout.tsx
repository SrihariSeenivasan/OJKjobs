import type { FC, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from "react-router-dom";
import { setLanguage } from '../../store/slices/uiSlice';
import AvailableCredits from "./BuyPackages/AvailableCredits";
import EmployerSideNav from "./EmployerSideNav";
import ProfilePopup from "./Profiles/ProfilePopup";
import {ChevronDownIcon} from '@heroicons/react/24/outline';

const EmployerLayout: FC<{ children?: ReactNode }> = ({ children }) => {
  const [selected, setSelected] = useState<string | number>(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showCreditsPopup, setShowCreditsPopup] = useState(false);
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const creditsBtnRef = useRef<HTMLDivElement>(null);

  // Language selector logic
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const language = useSelector((state: { ui: { language: string } }) => state.ui.language);
  // Define languages inside the component so t() updates on language change
 const languages = [
     { code: 'en', name: 'English', flag: '🇬🇧' },
     { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
     { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
     { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
     { code: 'ml', name: 'മലയാളം', flag: '🇮🇳' },
     { code: 'kn', name: 'ಕನ್ನಡ', flag: '🇮🇳' },
   ];
 
   const handleLanguageChange = (langCode: string) => {
     i18n.changeLanguage(langCode);
     dispatch(setLanguage(langCode));
     setIsLanguageMenuOpen(false);
   };
  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];
  // Handle responsive behavior
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 1024; // Changed to lg breakpoint
      setIsMobile(mobile);
      
      // Auto-open sidebar on desktop, auto-close on mobile/tablet
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-[#fbb040] px-4 py-3 flex items-center justify-between sticky top-0 z-40 w-full shadow-sm">
        {/* Left: Hamburger + Logo */}
        <div className="flex items-center gap-3">
          <button 
            className="p-2 -ml-2 hover:bg-[#fbb040]/10 rounded-lg transition-colors lg:hidden focus:outline-none focus:ring-2 focus:ring-[#fbb040] focus:ring-opacity-50" 
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            <svg width="24" height="24" fill="none" stroke="#fbb040" strokeWidth="2" viewBox="0 0 24 24">
              <line x1="4" y1="7" x2="20" y2="7"/>
              <line x1="4" y1="12" x2="20" y2="12"/>
              <line x1="4" y1="17" x2="20" y2="17"/>
            </svg>
          </button>
          {/* Desktop hamburger - always visible */}
          <button 
            className="hidden lg:block p-2 -ml-2 hover:bg-[#fbb040]/10 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#fbb040] focus:ring-opacity-50" 
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            <svg width="24" height="24" fill="none" stroke="#fbb040" strokeWidth="2" viewBox="0 0 24 24">
              <line x1="4" y1="7" x2="20" y2="7"/>
              <line x1="4" y1="12" x2="20" y2="12"/>
              <line x1="4" y1="17" x2="20" y2="17"/>
            </svg>
          </button>
          <span className="text-xl sm:text-2xl font-bold text-[#fbb040]">
            {t('brand.ojk', 'OJK')}<span className="text-gray-900">{t('brand.hire', 'Hire')}</span>
          </span>
        </div>
        {/* Right: Available Credits + User icon */}
        <div className="flex items-center gap-4">
           {/* Language Selector */}
                      <div className="relative">
                        <button
                          onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                          className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
                        >
                          <span>{currentLanguage.flag}</span>
                          <span className="hidden sm:inline">{currentLanguage.name}</span>
                          <ChevronDownIcon className="h-4 w-4" />
                        </button>
                        {isLanguageMenuOpen && (
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                            {languages.map((lang) => (
                              <button
                                key={lang.code}
                                onClick={() => handleLanguageChange(lang.code)}
                                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center space-x-2 ${
                                  language === lang.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                                }`}
                              >
                                <span>{lang.flag}</span>
                                <span>{lang.name}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
          {/* Available Credits */}
          <div
            ref={creditsBtnRef}
            className="hidden md:flex items-center gap-2 cursor-pointer relative"
            onClick={() => setShowCreditsPopup((v) => !v)}
          >
            <svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="14" cy="21" rx="10" ry="4" fill="#FFF7E0" stroke="#fbb040" strokeWidth="1.5"/>
              <ellipse cx="14" cy="9" rx="10" ry="4" fill="#FFF7E0" stroke="#fbb040" strokeWidth="1.5"/>
              <path d="M4 9v8c0 2.21 4.477 4 10 4s10-1.79 10-4V9" stroke="#fbb040" strokeWidth="1.5" fill="none"/>
            </svg>
          <span className="text-sm lg:text-base font-semibold text-[#fbb040]">{t('employer.availableCredits', 'Available Credits')}</span>
            {showCreditsPopup && (
              <div
                style={{ position: 'fixed', top: '60px', right: '40px', zIndex: 100, minWidth: '360px' }}
                className="drop-shadow-xl"
              >
                {/* Pointer arrow */}
                <div style={{ position: 'absolute', top: '-10px', right: '32px', width: '0', height: '0', borderLeft: '10px solid transparent', borderRight: '10px solid transparent', borderBottom: '10px solid #FFF7E0', zIndex: 101 }} />
                <AvailableCredits open={true} onClose={() => setShowCreditsPopup(false)} />
              </div>
            )}
          </div>
          {/* Profile Icon */}
          <div
            className="bg-[#fbb040] rounded-full w-8 h-8 flex items-center justify-center font-bold text-white cursor-pointer shadow-md border-2 border-white"
            onClick={() => setShowProfilePopup(true)}
          >
            E
          </div>
          {showProfilePopup && (
            <div
              style={{ position: 'fixed', top: '60px', right: '40px', zIndex: 101, minWidth: '320px' }}
              className="drop-shadow-xl"
            >
              
              <ProfilePopup
                open={true}
                onClose={() => setShowProfilePopup(false)}
                name="Evangelin Gladin"
                phone="9619905777"
                onViewProfile={() => {}}
                onCompanyProfile={() => {}}
                onSignOut={() => {}}
              />
              
            </div>
          )}
        </div>
      </header>
      {/* Main layout container */}
      <div className="flex flex-1 min-h-0 relative">
        {/* Mobile overlay */}
        {isMobile && sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
            onClick={closeSidebar}
            aria-label="Close sidebar overlay"
          />
        )}
        {/* Sidebar */}
        <aside className={`
          ${isMobile 
            ? `fixed left-0 top-0 h-full w-80 z-30 transform transition-transform duration-300 ease-in-out ${
                sidebarOpen ? 'translate-x-0' : '-translate-x-full'
              }`
            : `relative z-10 transition-all duration-300 ease-in-out ${
                sidebarOpen ? 'w-80' : 'w-16'
              }`
          }
          bg-[#FFF7E0] border-r border-[#fbb040] shadow-lg lg:shadow-none
        `}>
          <div className={`
            h-full overflow-hidden
            opacity-100
            transition-opacity duration-300
          `}>
            <EmployerSideNav
              selected={selected}
              setSelected={setSelected}
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
              isMobile={isMobile}
            />
          </div>
        </aside>
        {/* Main content */}
        <main className={`
          flex-1 min-h-0 bg-[#FFF7E0] overflow-auto
          ${!isMobile && !sidebarOpen ? 'ml-0' : ''}
          transition-all duration-300 ease-in-out
        `}>
          <div className="p-2 sm:p-4 lg:p-8">
            <div className="max-w-7xl mx-auto grid gap-4 sm:gap-6 lg:gap-8">
              {/* Card wrapper for children and Outlet */}
              <div className="bg-white rounded-xl shadow-md border border-[#fbb040]/30 p-4 sm:p-6 lg:p-8 w-full">
                {children}
                <Outlet />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EmployerLayout;