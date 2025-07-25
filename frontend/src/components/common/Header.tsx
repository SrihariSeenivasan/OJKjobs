import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { logout } from '../../store/slices/authSlice';
import { setLanguage, toggleMobileMenu } from '../../store/slices/uiSlice';
import NotificationComponent from './Notification';
import OjkLogo from './OjkLogo';
import {
  ArrowLeftOnRectangleIcon,
  Bars3Icon,
  BellIcon,
  ChevronDownIcon,
  UserIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated, profile } = useSelector((state: RootState) => state.auth);
  const { language, isMobileMenuOpen } = useSelector((state: RootState) => state.ui);
  
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isJobMenuOpen, setIsJobMenuOpen] = useState(false);
  const jobMenuRef = useRef<HTMLDivElement>(null);

  // Close job menu on outside click
  useEffect(() => {
    if (!isJobMenuOpen) return;
    function handleClick(e: MouseEvent) {
      if (jobMenuRef.current && !jobMenuRef.current.contains(e.target as Node)) {
        setIsJobMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isJobMenuOpen]);

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

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    setIsProfileMenuOpen(false);
  };

  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <span
            className="flex items-center space-x-2 cursor-pointer select-none"
            onClick={e => {
              if (e.altKey) {
                navigate('/admin');
              } else {
                navigate('/');
              }
            }}
            title="Alt+Click for Admin Panel"
          >
            <OjkLogo className="h-10 w-16 drop-shadow-2xl" />
          </span>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Home
            </Link>
            <Link to="/blog" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Blog
            </Link>
            {/* Login button removed as per request */}
            {/* Show full nav only after login */}
            {isAuthenticated && (
              <>
                <div
                  className="relative"
                  ref={jobMenuRef}
                  onMouseEnter={() => setIsJobMenuOpen(true)}
                  onMouseLeave={() => setIsJobMenuOpen(false)}
                >
                  <Link
                    to="/browse-jobs"
                    className={`text-gray-700 hover:text-blue-600 font-medium transition-colors flex items-center gap-1 focus:outline-none ${isJobMenuOpen ? 'text-blue-600' : ''}`}
                    onClick={() => setIsJobMenuOpen(false)}
                    aria-haspopup="true"
                    aria-expanded={isJobMenuOpen}
                  >
                    Job
                    <ChevronDownIcon className="h-4 w-4" />
                  </Link>
                  {isJobMenuOpen && (
                    <div className="absolute left-0 mt-3 w-[480px] bg-white rounded-xl shadow-2xl border border-gray-100 flex z-30 animate-fadeIn" style={{minHeight: '220px'}}>
                      <div className="w-1/2 py-4 px-6 flex flex-col gap-2">
                        <Link to="/jobs/work-from-home" className="text-gray-500 hover:bg-blue-50 hover:text-blue-700 py-1 px-2 rounded transition-colors" onClick={()=>setIsJobMenuOpen(false)}>Work From Home Jobs</Link>
                        <Link to="/jobs/part-time" className="text-gray-500 hover:bg-blue-50 hover:text-blue-700 py-1 px-2 rounded transition-colors" onClick={()=>setIsJobMenuOpen(false)}>Part Time Jobs</Link>
                        <Link to="/jobs/freshers" className="text-gray-500 hover:bg-blue-50 hover:text-blue-700 py-1 px-2 rounded transition-colors" onClick={()=>setIsJobMenuOpen(false)}>Freshers Jobs</Link>
                        <Link to="/jobs/women" className="text-gray-500 hover:bg-blue-50 hover:text-blue-700 py-1 px-2 rounded transition-colors" onClick={()=>setIsJobMenuOpen(false)}>Jobs for women</Link>
                        <Link to="/jobs/full-time" className="text-gray-500 hover:bg-blue-50 hover:text-blue-700 py-1 px-2 rounded transition-colors" onClick={()=>setIsJobMenuOpen(false)}>Full Time Jobs</Link>
                        <Link to="/jobs/night-shift" className="text-gray-500 hover:bg-blue-50 hover:text-blue-700 py-1 px-2 rounded transition-colors" onClick={()=>setIsJobMenuOpen(false)}>Night Shift Jobs</Link>
                      </div>
                      <div className="w-1/2 py-4 px-6 flex flex-col gap-2 border-l border-gray-100">
                        <Link to="/jobs/city" className="text-gray-500 hover:bg-green-50 hover:text-green-700 py-1 px-2 rounded flex items-center justify-between transition-colors" onClick={()=>setIsJobMenuOpen(false)}>Jobs By City <ChevronDownIcon className="h-4 w-4 text-green-600" /></Link>
                        <Link to="/jobs/department" className="text-gray-500 hover:bg-green-50 hover:text-green-700 py-1 px-2 rounded flex items-center justify-between transition-colors" onClick={()=>setIsJobMenuOpen(false)}>Jobs By Department <ChevronDownIcon className="h-4 w-4 text-green-600" /></Link>
                        <Link to="/jobs/company" className="text-gray-500 hover:bg-green-50 hover:text-green-700 py-1 px-2 rounded flex items-center justify-between transition-colors" onClick={()=>setIsJobMenuOpen(false)}>Jobs By Company <ChevronDownIcon className="h-4 w-4 text-green-600" /></Link>
                        <Link to="/jobs/qualification" className="text-gray-500 hover:bg-green-50 hover:text-green-700 py-1 px-2 rounded flex items-center justify-between transition-colors" onClick={()=>setIsJobMenuOpen(false)}>Jobs By Qualification <ChevronDownIcon className="h-4 w-4 text-green-600" /></Link>
                        <Link to="/jobs/others" className="text-gray-500 hover:bg-green-50 hover:text-green-700 py-1 px-2 rounded flex items-center justify-between transition-colors" onClick={()=>setIsJobMenuOpen(false)}>Others <ChevronDownIcon className="h-4 w-4 text-green-600" /></Link>
                      </div>
                    </div>
                  )}
                </div>
                <Link to="/learning" className="text-gray-700 hover:text-blue-600 font-medium transition-colors flex items-center gap-1">
                  Learning
                  <span className="ml-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-gradient-to-r from-pink-500 to-yellow-400 text-white animate-pulse">Trending</span>
                </Link>
                <Link to="/resume-builder" className="text-gray-700 hover:text-blue-600 font-medium transition-colors flex items-center gap-1">
                  Resume Builder
                  <span className="ml-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-gradient-to-r from-pink-500 to-yellow-400 text-white animate-pulse">Trending</span>
                </Link>
              </>
            )}
          </nav>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {user?.role === 'employer' && (
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors"
                onClick={() => navigate('/post-job')}
              >
                Post Job
              </button>
            )}
            {/* Notification Icon (moved left of language selector) */}
            {isAuthenticated && (
              <div className="relative">
                <button
                  className="relative text-gray-700 hover:text-blue-600 transition-colors"
                  onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                  aria-label="Notifications"
                >
                  <BellIcon className="h-6 w-6" />
                </button>
                {isNotificationOpen && (
                  <div className="absolute right-0 mt-10 w-64 z-20">
                    <NotificationComponent
                      type={user?.role === 'employer' ? 'employer' : 'jobseeker'}
                      notifications={[
                        {
                          id: '1',
                          message: 'Welcome to OJK Jobs!',
                          read: false,
                          timestamp: new Date(),
                          priority: 'low',
                          category: 'system'
                        },
                        {
                          id: '2',
                          message: 'Your profile is 80% complete.',
                          read: true,
                          timestamp: new Date(Date.now() - 60 * 60 * 1000),
                          priority: 'medium',
                          category: 'system'
                        },
                        {
                          id: '3',
                          message: user?.role === 'employer' ? 'You have 2 new job applications.' : 'New jobs posted in your area!',
                          read: false,
                          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
                          priority: user?.role === 'employer' ? 'high' : 'medium',
                          category: user?.role === 'employer' ? 'application' : 'promotion'
                        }
                      ]}
                    />
                  </div>
                )}
              </div>
            )}
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
            {/* Auth Buttons & Profile */}
            {profile && profile.name ? (
              <div className="relative flex items-center space-x-2">
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <UserIcon className="h-5 w-5" />
                  <span className="hidden sm:inline">{profile.name}</span>
                  <ChevronDownIcon className="h-4 w-4" />
                </button>
                {isProfileMenuOpen && (
                  <div className="absolute right-0 top-full mt-4 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      <UserIcon className="h-4 w-4" />
                      <span>{t('nav.profile')}</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                    >
                      <ArrowLeftOnRectangleIcon className="h-4 w-4" />
                      <span>{t('nav.logout')}</span>
                    </button>
                  </div>
                )}
              </div>
            ) : isAuthenticated ? (
              <div className="relative flex items-center space-x-2">
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <UserIcon className="h-5 w-5" />
                  <span className="hidden sm:inline">{user?.name}</span>
                  <ChevronDownIcon className="h-4 w-4" />
                </button>
                {isProfileMenuOpen && (
                  <div className="absolute right-0 top-full mt-4 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      <UserIcon className="h-4 w-4" />
                      <span>{t('nav.profile')}</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                    >
                      <ArrowLeftOnRectangleIcon className="h-4 w-4" />
                      <span>{t('nav.logout')}</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  className="bg-[#39b54a] text-white px-4 py-2 rounded-md font-medium hover:bg-green-700 transition-colors"
                  onClick={() => navigate('/JobseekerLogin')}
                >
                  Candidate Login
                </button>
                <button
                  className="bg-[#fbb040] text-white px-4 py-2 rounded-md font-medium hover:bg-yellow-500 transition-colors"
                  onClick={() => navigate('/EmployeeLogin')}
                >
                  Employer Login
                </button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => dispatch(toggleMobileMenu())}
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                onClick={() => dispatch(toggleMobileMenu())}
              >
                {t('nav.home')}
              </Link>
              <Link
                to="/employer-login"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                onClick={() => dispatch(toggleMobileMenu())}
              >
                {t('nav.forEmployers')}
              </Link>
              <Link
                to="/browse-jobs"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                onClick={() => dispatch(toggleMobileMenu())}
              >
                {t('nav.forWorkers')}
              </Link>
              <Link
                to="/1-day-job"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                onClick={() => dispatch(toggleMobileMenu())}
              >
                {t('nav.oneDayJob')}
              </Link>
              <Link
                to="/contact-us"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                onClick={() => dispatch(toggleMobileMenu())}
              >
                {t('nav.contactUs')}
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;