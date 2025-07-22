import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ContactPopup from "./Common/ContactPopup";


interface EmployerSideNavProps {
  selected: number | string;
  setSelected: (idx: number | string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  isMobile: boolean;
}

const EmployerSideNav: React.FC<EmployerSideNavProps> = ({ 
  selected, 
  setSelected, 
  sidebarOpen, 
  setSidebarOpen, 
  isMobile 
}) => {
  const navigate = useNavigate();
  const [dbOpen, setDbOpen] = useState<boolean>(true);
  const [helpOpen, setHelpOpen] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);
  

  const sidebarItems = [
  {
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="6" width="20" height="14" rx="2"/><path d="M16 10v4"/><path d="M8 10v4"/></svg>
    ),
    label: "Jobs",
    onClick: (navigate: ReturnType<typeof useNavigate>) => navigate("Jobs"),
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><g><circle cx="12" cy="8" r="4"/><path d="M2 20c0-4 8-6 10-6s10 2 10 6v2H2v-2z"/></g></svg>
    ),
    label: "Database",
    children: [
      {
        label: "Search Candidates",
        onClick: (navigate: ReturnType<typeof useNavigate>) => navigate("SearchCandidates"),
      },
      {
        label: "Saved Searches",
        onClick: (navigate: ReturnType<typeof useNavigate>) => navigate("SavedSearches"),
      },
      {
        label: "Unlocked Candidates",
        onClick: (navigate: ReturnType<typeof useNavigate>) => navigate("UnlockedCandidates"),
      },
    ],
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 21V9"/><path d="M3 9h18"/></svg>
    ),
    label: "Reports",
    onClick: (navigate: ReturnType<typeof useNavigate>) => navigate("Reports"),
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M16 3v4"/><path d="M8 3v4"/></svg>
    ),
    label: "Credits & usage",
    onClick: (navigate: ReturnType<typeof useNavigate>) => navigate("Credits"),
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M16 3v4"/><path d="M8 3v4"/></svg>
    ),
    label: "Billing",
    onClick: (navigate: ReturnType<typeof useNavigate>) => navigate("Billing"),
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M16 3v4"/><path d="M8 3v4"/></svg>
    ),
    label: "Refer & Earn",
    onClick: (navigate: ReturnType<typeof useNavigate>) => navigate("Refer"),
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 21V9"/><path d="M3 9h18"/></svg>
    ),
    label: "Help & Support",
    children: [
      {
        label: "FAQ",
        onClick: (navigate: ReturnType<typeof useNavigate>) => navigate("/faq"),
      },
      {
        label: "Contact us",
        isContact: true,
        children: [
          {
            label: "Chat with us",
            onClick: () => window.open("#chat", "_blank"),
            icon: (
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            ),
          },
          {
            label: "Chat on Whatsapp",
            onClick: () => window.open("https://wa.me/", "_blank"),
            icon: (
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M16.72 15.47c-.29-.15-1.7-.84-1.96-.94-.26-.1-.45-.15-.64.15-.19.29-.74.94-.91 1.13-.17.19-.34.21-.63.07-.29-.15-1.22-.45-2.33-1.43-.86-.77-1.44-1.72-1.61-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.34.43-.51.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.15-.64-1.54-.88-2.11-.23-.56-.47-.48-.64-.49-.17-.01-.36-.01-.56-.01-.19 0-.5.07-.76.36-.26.29-1 1-1 2.43 0 1.43 1.03 2.81 1.18 3.01.15.19 2.03 3.1 4.93 4.22.69.3 1.23.48 1.65.61.69.22 1.32.19 1.81.12.55-.08 1.7-.7 1.94-1.37.24-.67.24-1.25.17-1.37-.07-.12-.26-.19-.55-.34z"/></svg>
            ),
            badge: "Recommended",
            external: true,
          },
          {
            label: "Schedule Training",
            onClick: () => window.open("ScheduleTraining", "_blank"),
            icon: (
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
            ),
            external: true,
          },
          {
            label: "HR Best practices",
            onClick: () => window.open("/WEBINAR%20Best%20Practices%20-%20Faster%20and%20Efficient%20Hiring%20(2).pdf", "_blank"),
            icon: (
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 5v14m7-7H5"/></svg>
            ),
            download: true,
          },
        ],
      },
    ],
  },
  { divider: true },
  {
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 3v18"/><path d="M16 3v18"/></svg>
    ),
    label: "Contact Sales",
    onClick: () => setShowModal(true),
  },
];

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isMobile && sidebarOpen) {
        setSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile, sidebarOpen, setSidebarOpen]);

  // Close sidebar when clicking outside on mobile/tablet
  const handleOverlayClick = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && isMobile && sidebarOpen) {
      setSidebarOpen(false);
    }
  };

  return (
    <>
      <ContactPopup open={showModal} onClose={() => setShowModal(false)} />
      
      {/* Overlay for mobile and tablet */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={handleOverlayClick}
          onKeyDown={handleKeyDown}
          tabIndex={-1}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={`
          ${isMobile ? 'fixed lg:relative' : 'relative'} 
          ${isMobile ? 'h-full lg:h-auto' : 'h-auto'}
          ${sidebarOpen 
            ? (isMobile ? 'w-64 sm:w-72 lg:w-64' : 'w-64') 
            : (isMobile ? '-translate-x-full w-64 sm:w-72 lg:w-16' : 'w-16')
          }
          transition-all duration-300 ease-in-out
          bg-white border-r border-gray-200 flex flex-col py-0 z-30
          ${isMobile ? 'left-0 top-0 shadow-xl lg:shadow-none' : ''}
          min-h-screen lg:min-h-0
        `}
        onKeyDown={handleKeyDown}
      >
        {/* Mobile/Tablet header in sidebar */}
        {isMobile && sidebarOpen && (
          <div className="flex items-center justify-between p-3 sm:p-4 border-b bg-white lg:hidden">
            <span className="text-lg sm:text-xl font-bold text-[#2DC6A8]">
              apna<span className="text-gray-900">Hire</span>
            </span>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#2DC6A8] focus:ring-opacity-50"
              aria-label="Close sidebar"
            >
              <svg width="18" height="18" className="sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        )}
        
        {/* Sidebar navigation */}
        <nav className="flex flex-col gap-0.5 sm:gap-1 w-full px-2 sm:px-3 lg:px-2 mt-3 sm:mt-4 flex-1 overflow-y-auto">
          {sidebarItems.map((item, idx) => {
            if (item.divider) {
              return (
                <hr 
                  key={idx} 
                  className="my-2 sm:my-3 border-gray-200 mx-1 sm:mx-2" 
                />
              );
            }
            
            if (item.label === "Database") {
              return (
                <div key="Database">
                  <button
                    className={`
                      group flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2.5 sm:py-3 rounded-lg w-full
                      ${sidebarOpen ? 'justify-start' : 'justify-center'}
                      text-gray-600 hover:bg-[#E6F4F0] hover:text-[#2DC6A8] transition-all duration-200
                      ${dbOpen && sidebarOpen ? 'bg-[#E6F4F0] text-[#2DC6A8]' : ''}
                      relative font-medium text-sm sm:text-base
                      focus:outline-none focus:ring-2 focus:ring-[#2DC6A8] focus:ring-opacity-50
                    `}
                    onClick={() => setDbOpen((open) => !open)}
                    aria-expanded={dbOpen}
                    aria-label={`${item.label} menu`}
                  >
                    <span className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center flex-shrink-0">
                      {item.icon}
                    </span>
                    {sidebarOpen && (
                      <>
                        <span className="font-medium truncate">
                          {item.label}
                        </span>
                        <svg 
                          className={`ml-auto transition-transform w-4 h-4 flex-shrink-0 ${dbOpen ? '' : '-rotate-90'}`} 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          viewBox="0 0 24 24"
                        >
                          <polyline points="6 9 12 15 18 9"/>
                        </svg>
                      </>
                    )}
                  </button>
                  
                  {/* Submenu */}
                  {dbOpen && sidebarOpen && (
                    <div className="ml-6 sm:ml-8 flex flex-col gap-0.5 sm:gap-1 my-1 sm:my-2">
                      {item.children?.map((sub, subIdx) => (
                        <button
                          key={sub.label}
                          className={`
                            text-left px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg w-full text-xs sm:text-sm font-medium
                            transition-colors duration-200
                            focus:outline-none focus:ring-2 focus:ring-[#2DC6A8] focus:ring-opacity-50
                            ${selected === `database-${subIdx}` 
                              ? 'bg-[#E6F4F0] text-[#2DC6A8] font-semibold' 
                              : 'text-[#17494D] hover:bg-[#E6F4F0] hover:text-[#2DC6A8]'
                            }
                          `}
                          onClick={() => {
                            setSelected(`database-${subIdx}`);
                            if (sub.onClick) sub.onClick(navigate);
                            if (isMobile) setSidebarOpen(false);
                          }}
                        >
                          {sub.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
            
            // Help & Support dropdown
            if (item.label === "Help & Support") {
              return (
                <div key="Help & Support">
                  <button
                    className={`
                      group flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2.5 sm:py-3 rounded-lg w-full
                      ${sidebarOpen ? 'justify-start' : 'justify-center'}
                      text-gray-600 hover:bg-[#E6F4F0] hover:text-[#2DC6A8] transition-all duration-200
                      ${helpOpen && sidebarOpen ? 'bg-[#E6F4F0] text-[#2DC6A8]' : ''}
                      relative font-medium text-sm sm:text-base
                      focus:outline-none focus:ring-2 focus:ring-[#2DC6A8] focus:ring-opacity-50
                    `}
                    onClick={() => setHelpOpen((open) => !open)}
                    aria-expanded={helpOpen}
                    aria-label="Help & Support menu"
                  >
                    <span className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center flex-shrink-0">
                      {item.icon}
                    </span>
                    {sidebarOpen && (
                      <>
                        <span className="font-medium truncate">
                          {item.label}
                        </span>
                        <svg 
                          className={`ml-auto transition-transform w-4 h-4 flex-shrink-0 ${helpOpen ? '' : '-rotate-90'}`} 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          viewBox="0 0 24 24"
                        >
                          <polyline points="6 9 12 15 18 9"/>
                        </svg>
                      </>
                    )}
                  </button>
                  {/* Help & Support Submenu */}
                  {helpOpen && sidebarOpen && (
                    <div className="ml-6 sm:ml-8 flex flex-col gap-0.5 sm:gap-1 my-1 sm:my-2">
                      {/* FAQ */}
                      <button
                        className={`text-left px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg w-full text-xs sm:text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#2DC6A8] focus:ring-opacity-50 text-[#17494D] hover:bg-[#E6F4F0] hover:text-[#2DC6A8]`}
                        onClick={() => {
                          setSelected(`help-faq`);
                          if (item.children?.[0].onClick) item.children[0].onClick(navigate);
                          if (isMobile) setSidebarOpen(false);
                        }}
                      >
                        FAQ
                      </button>
                      {/* Contact us */}
                      <div className="flex flex-col gap-0.5 sm:gap-1 mt-2">
                        <div className="text-xs sm:text-sm font-semibold text-[#17494D] mb-1">Contact us <span className="block font-normal text-[10px] sm:text-xs text-gray-500">( Mon to Sun | 9:00 AM - 7:00 PM )</span></div>
                        {/* Contact sub-options */}
                        {item.children?.[1]?.children?.map((sub, subIdx) => (
                          <button
                            key={sub.label}
                            className={`flex items-center text-left px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg w-full text-xs sm:text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#2DC6A8] focus:ring-opacity-50 text-[#17494D] hover:bg-[#E6F4F0] hover:text-[#2DC6A8] relative`}
                            onClick={() => {
                              setSelected(`help-contact-${subIdx}`);
                              if (sub.onClick) sub.onClick();
                              if (isMobile) setSidebarOpen(false);
                            }}
                          >
                            {sub.icon && <span className="mr-2 flex items-center">{sub.icon}</span>}
                            <span>{sub.label}</span>
                            {sub.badge && (
                              <span className="ml-2 px-1.5 py-0.5 bg-blue-100 text-blue-700 text-[10px] rounded font-semibold">{sub.badge}</span>
                            )}
                            {sub.external && (
                              <svg className="ml-2 w-3 h-3 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                            )}
                            {sub.download && (
                              <svg className="ml-2 w-3 h-3 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 5v14m7-7H5"/></svg>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            }
            // Normal navigation item
            return (
              <button
                key={item.label}
                className={`
                  group flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2.5 sm:py-3 rounded-lg w-full
                  ${sidebarOpen ? 'justify-start' : 'justify-center'}
                  text-gray-600 hover:bg-[#E6F4F0] hover:text-[#2DC6A8] transition-all duration-200
                  ${selected === idx ? 'bg-[#E6F4F0] text-[#2DC6A8]' : ''}
                  relative font-medium text-sm sm:text-base
                  focus:outline-none focus:ring-2 focus:ring-[#2DC6A8] focus:ring-opacity-50
                `}
                onClick={() => {
                  setSelected(idx);
                  if (item.onClick) item.onClick(navigate);
                  if (isMobile) setSidebarOpen(false);
                }}
                aria-label={item.label}
              >
                <span className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center flex-shrink-0">
                  {item.icon}
                </span>
                {sidebarOpen && (
                  <span className="font-medium truncate">
                    {item.label}
                  </span>
                )}
                {selected === idx && sidebarOpen && (
                  <span className="absolute right-2 sm:right-3 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#2DC6A8] rounded-full flex-shrink-0"></span>
                )}
              </button>
            );
          })}
        </nav>
        
        {/* Bottom section */}
        <div className="mt-auto w-full flex flex-col pb-3 sm:pb-4 px-2 sm:px-3 lg:px-2">
          {/* Upgrade notice and discount badge - only when sidebar is open */}
          {sidebarOpen && (
            <>
              {/* Credits warning */}
              <div 
                className="bg-yellow-50 border border-yellow-200 text-yellow-900 text-xs sm:text-sm rounded-lg px-2.5 sm:px-3 py-2.5 sm:py-3 mb-2 sm:mb-3 mx-1 sm:mx-2" 
                style={{boxShadow:'0 1px 2px 0 rgba(16,24,40,.05)'}}
              >
                <div className="flex items-start mb-1 sm:mb-2">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-yellow-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span className="font-semibold leading-tight text-xs sm:text-sm">
                    Oh no! You've run out of credits.
                  </span>
                </div>
                <button className="text-green-700 font-semibold text-xs sm:text-sm hover:text-green-800 transition-colors focus:outline-none focus:underline">
                  Upgrade now →
                </button>
              </div>
              
              {/* Discount badge */}
              <div className="relative flex flex-col items-center mb-2 sm:mb-3">
                <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold rounded-full px-2.5 sm:px-3 py-1 flex items-center gap-1 shadow-sm">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M12 17v-1m0-4v-1m0-4V7m0 10a5 5 0 1 0 0-10 5 5 0 0 0 0 10z"/>
                  </svg>
                  Up to 53% OFF
                </span>
                <span className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-bl-lg rotate-45 absolute left-1/2 -translate-x-1/2 -bottom-0.5"></span>
              </div>
            </>
          )}
          
          {/* Buy credits button */}
          <button className="flex items-center justify-center gap-1.5 sm:gap-2 border border-gray-300 text-gray-800 font-semibold rounded-lg px-2.5 sm:px-3 py-2 sm:py-2.5 mx-1 sm:mx-2 hover:bg-gray-50 transition-colors text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2DC6A8] focus:ring-opacity-50">
            <svg 
              width="16" 
              height="16" 
              className="sm:w-[18px] sm:h-[18px]"
              fill="none" 
              stroke="#2DC6A8" 
              strokeWidth="2" 
              viewBox="0 0 24 24"
            >
              <ellipse cx="12" cy="17" rx="8" ry="3"/>
              <ellipse cx="12" cy="7" rx="8" ry="3"/>
              <path d="M4 7v10c0 1.657 3.582 3 8 3s8-1.343 8-3V7"/>
            </svg>
            {sidebarOpen && <span>Buy credits</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default EmployerSideNav;