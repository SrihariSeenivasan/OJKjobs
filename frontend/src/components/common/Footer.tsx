import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  MapPinIcon, 
  PhoneIcon, 
  EnvelopeIcon 
} from '@heroicons/react/24/outline';
import OjkLogo from './OjkLogo';
import { FaFacebookF, FaXTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa6';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  const socialLinks = [
    {
      name: 'Facebook',
      icon: <FaFacebookF className="h-6 w-6" />,
      href: '#'
    },
    {
      name: 'Twitter',
      icon: <FaXTwitter className="h-6 w-6" />,
      href: '#'
    },
    {
      name: 'Instagram',
      icon: <FaInstagram className="h-6 w-6" />,
      href: '#'
    },
    {
      name: 'LinkedIn',
      icon: <FaLinkedinIn className="h-6 w-6" />,
      href: '#'
    },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <OjkLogo className="h-10 w-16 drop-shadow-2xl" />
          
            </div>
            <p className="text-gray-400 text-sm">
              {t('hero.subtitle')}
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/terms-and-conditions" className="text-gray-400 hover:text-white transition-colors">
                  {t('footer.terms')}
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">
                  {t('footer.privacy')}
                </Link>
              </li>
              <li>
                <Link to="/refund-policy" className="text-gray-400 hover:text-white transition-colors">
                  {t('footer.refund')}
                </Link>
              </li>
              <li>
                <Link to="/contactus" className="text-gray-400 hover:text-white transition-colors">
                  {t('footer.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/browse-jobs" className="text-gray-400 hover:text-white transition-colors">
                  {t('jobs.browseJobs')}
                </Link>
              </li>
              <li>
                <Link to="/post-job" className="text-gray-400 hover:text-white transition-colors">
                  {t('jobs.postJob')}
                </Link>
              </li>
              <li>
                <Link to="/1-day-job" className="text-gray-400 hover:text-white transition-colors">
                  {t('nav.oneDayJob')}
                </Link>
              </li>
              <li>
                <Link to="/employer-login" className="text-gray-400 hover:text-white transition-colors">
                  {t('nav.forEmployers')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t('footer.contact')}</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <MapPinIcon className="h-4 w-4 text-blue-400 flex-shrink-0" />
                <span className="text-gray-400">
                  123 Main Street, Kongu Nadu, India
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <PhoneIcon className="h-4 w-4 text-blue-400 flex-shrink-0" />
                <span className="text-gray-400">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3">
                <EnvelopeIcon className="h-4 w-4 text-blue-400 flex-shrink-0" />
                <span className="text-gray-400">info@ojkjobs.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} OJK Jobs. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;