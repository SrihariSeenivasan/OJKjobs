import {
  ArrowRightIcon,
  CheckCircleIcon,
  ClockIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Testimonials from './Testimonials';

const Home: React.FC = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: CheckCircleIcon,
      title: t('features.verified.title'),
      description: t('features.verified.description'),
      color: 'text-green-600'
    },
    {
      icon: ClockIcon,
      title: t('features.fast.title'),
      description: t('features.fast.description'),
      color: 'text-blue-600'
    },
    {
      icon: MapPinIcon,
      title: t('features.local.title'),
      description: t('features.local.description'),
      color: 'text-purple-600'
    }
  ];

  const industries = [
    { name: t('industries.textile'), image: 'https://images.unsplash.com/photo-1559703248-dcaaec9fab78?w=400&h=300&fit=crop' },
    { name: t('industries.hospitality'), image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop' },
    { name: t('industries.retail'), image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop' },
    { name: t('industries.construction'), image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop' },
    { name: t('industries.manufacturing'), image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop' },
    { name: t('industries.services'), image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=300&fit=crop' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white overflow-hidden">
        <BannerCarousel>
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="text-center">
            <motion.h1 initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 1.2 }} className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">
              {t('hero.title')}
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }} className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto">
              {t('hero.subtitle')}
            </motion.p>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8, duration: 0.8 }} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/employer-login"
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 flex items-center justify-center space-x-2 shadow-lg hover:scale-105 transform-gpu"
              >
                <span>{t('hero.imHiring')}</span>
                <ArrowRightIcon className="h-5 w-5" />
              </Link>
              <Link
                to="/jobseeker-login"
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 flex items-center justify-center space-x-2 shadow-lg hover:scale-105 transform-gpu"
              >
                <span>{t('hero.ineedJob')}</span>
                <ArrowRightIcon className="h-5 w-5" />
              </Link>
              <Link
                to="/1-day-job"
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 flex items-center justify-center space-x-2 shadow-lg hover:scale-105 transform-gpu"
              >
                <span>{t('hero.oneDayWork')}</span>
                <ArrowRightIcon className="h-5 w-5" />
              </Link>
            </motion.div>
          </motion.div>
        </BannerCarousel>
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 0.2, y: 0 }} transition={{ duration: 1.5 }} className="w-full h-96 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 blur-3xl opacity-30"></motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('features.title')}
            </motion.h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: index * 0.2 }} className="text-center p-6 rounded-lg hover:shadow-2xl transition-shadow duration-200 bg-gradient-to-br from-gray-50 to-white">
                <feature.icon className={`h-12 w-12 ${feature.color} mx-auto mb-4`} />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('industries.title')}
            </motion.h2>
          </div>
          
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
            {industries.map((industry, index) => (
              <motion.div key={index} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: index * 0.15 }} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg bg-white shadow-md hover:shadow-2xl transition-shadow duration-200">
                  <motion.img
                    src={industry.image}
                    alt={industry.name}
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-40 object-cover rounded-t-lg"
                  />
                  <div className="p-4">
                    <h3 className="text-sm font-medium text-gray-900 text-center">
                      {industry.name}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <div className='bg-white'>
      <Testimonials />
      </div>
      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.3 }} className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of employers and job seekers who have found success through our platform.
          </motion.p>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.5 }} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/employer-login"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg hover:scale-105 transform-gpu"
            >
              Start Hiring Today
            </Link>
            <Link
              to="/browse-jobs"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors duration-200 shadow-lg hover:scale-105 transform-gpu"
            >
              Find Your Next Job
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

// BannerCarousel component
function BannerCarousel({ children }: { children?: React.ReactNode }) {
  const images = [
    'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=1200&q=80',
    'https://images.unsplash.com/photo-1464983953574-0892a716854b?w=1200&q=80',
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&q=80',
    'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=1200&q=80',
    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&q=80',
  ];
  const [index, setIndex] = React.useState(0);
  React.useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [images.length]);
  return (
    <div className="w-full h-[340px] md:h-[420px] overflow-hidden relative">
      {images.map((img, idx) => (
        <motion.img
          key={img}
          src={img}
          alt={`Job Banner ${idx + 1}`}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: index === idx ? 1 : 0, scale: index === idx ? 1 : 1.05 }}
          transition={{ duration: 0.8 }}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-all duration-700 rounded-none ${index === idx ? 'z-10' : 'z-0'}`}
          style={{ visibility: index === idx ? 'visible' : 'hidden' }}
        />
      ))}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
}

export default Home;