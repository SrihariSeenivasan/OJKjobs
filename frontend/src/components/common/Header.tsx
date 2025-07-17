import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { logout } from '../../store/slices/authSlice';
import { setLanguage, toggleMobileMenu } from '../../store/slices/uiSlice';
import { 
  Bars3Icon, 
  XMarkIcon, 
  UserIcon, 
  ChevronDownIcon,
  BriefcaseIcon,
  ArrowLeftOnRectangleIcon,
  CogIcon
} from '@heroicons/react/24/outline';

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { language, isMobileMenuOpen } = useSelector((state: RootState) => state.ui);
  
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);

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
            <BriefcaseIcon className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">OJK Jobs</span>
          </span>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              {t('nav.home')}
            </Link>
            <Link to="/browse-jobs" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              {t('nav.forWorkers')}
            </Link>
            <Link to="/1-day-job" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              {t('nav.oneDayJob')}
            </Link>
            <Link to="/contact-us" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              {t('nav.contactUs')}
            </Link>
          </nav>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
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

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <UserIcon className="h-5 w-5" />
                  <span className="hidden sm:inline">{user?.name}</span>
                  <ChevronDownIcon className="h-4 w-4" />
                </button>
                
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      <UserIcon className="h-4 w-4" />
                      <span>{t('nav.profile')}</span>
                    </Link>
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      <CogIcon className="h-4 w-4" />
                      <span>{t('nav.dashboard')}</span>
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
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  {t('nav.login')}
                </Link>
                <Link
                  to="/auth"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors"
                >
                  {t('auth.register')}
                </Link>
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