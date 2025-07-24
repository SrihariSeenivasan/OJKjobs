// Component for slow auto-incrementing openings
const TrendingRoleCard: React.FC<{ role: string }> = ({ role }) => {
  const [openings, setOpenings] = React.useState(Math.floor(Math.random() * 4000) + 10);
  React.useEffect(() => {
    const interval = setInterval(() => {
      setOpenings(prev => prev + Math.floor(Math.random() * 3)); // Increase by 0-2 every 1.5s
    }, 1500);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="group bg-white rounded-2xl border border-gray-200 hover:border-blue-400 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-center px-2 py-2 min-h-[70px] max-w-[180px] w-full cursor-pointer mx-auto">
      <div className="flex items-center gap-3 w-full">
        {/* Icon placeholder (replace with real icons as needed) */}
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-xl">
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="none" /><path d="M12 8v4l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between w-full">
            <div className="font-semibold text-gray-900 text-base truncate">{role}</div>
            <span className="ml-2 text-gray-400 flex-shrink-0">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </span>
          </div>
          <div className="text-sm text-gray-500 mt-1">{openings} openings</div>
        </div>
      </div>
    </div>
  );
};





import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Scroll-to-top button logic
const ScrollToTopButton: React.FC = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <motion.button
      initial={{ opacity: 0, y: 40 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.4 }}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-8 right-8 z-50 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      style={{ pointerEvents: visible ? 'auto' : 'none' }}
      aria-label="Scroll to top"
    >
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" /></svg>
    </motion.button>
  );
};


const Home: React.FC = () => {
  const { t } = useTranslation();

// Features with translation keys
const features = [
  {
    icon: () => <svg className="h-12 w-12 text-green-600 mx-auto mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2l4 -4" /></svg>,
    title: t('features.verified.title'),
    description: t('features.verified.description')
  },
  {
    icon: () => <svg className="h-12 w-12 text-blue-600 mx-auto mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" /></svg>,
    title: t('features.fast.title'),
    description: t('features.fast.description')
  },
  {
    icon: () => <svg className="h-12 w-12 text-purple-600 mx-auto mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 12.414a2 2 0 0 0-2.828 0l-4.243 4.243" /></svg>,
    title: t('features.local.title'),
    description: t('features.local.description')
  }
];


const industries = [
  { name: 'Textile', image: 'https://images.unsplash.com/photo-1559703248-dcaaec9fab78?w=400&h=300&fit=crop' },
  { name: 'Hospitality', image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop' },
  { name: 'Retail', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop' },
  { name: 'Construction', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop' },
  { name: 'Manufacturing', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop' },
  { name: 'Services', image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=300&fit=crop' },
  { name: 'Healthcare', image: 'https://images.unsplash.com/photo-1519494080410-f9aa8f52f165?w=400&h=300&fit=crop' },
  { name: 'Education', image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?w=400&h=300&fit=crop' },
  { name: 'Logistics', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop' },
  { name: 'IT/Software', image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=400&h=300&fit=crop' },
];

// Industries train effect state
const industriesToShow = 4;
const trainRef = useRef<HTMLDivElement>(null);
const [trainX, setTrainX] = useState(0);
const industryCardWidth = 260 + 24; // card width + gap (px)
// (removed unused totalCards)

useEffect(() => {
  let frame: number;
  const animate = () => {
    setTrainX(prev => {
      const next = prev - 1.1; // speed px/frame
      // Reset to 0 when scrolled a full set
      if (Math.abs(next) >= industries.length * industryCardWidth) {
        return 0;
      }
      return next;
    });
    frame = requestAnimationFrame(animate);
  };
  frame = requestAnimationFrame(animate);
  return () => cancelAnimationFrame(frame);
}, [industries.length, industryCardWidth]);

// Animated background text logic hooks
const bgTextRefs = useRef<(HTMLSpanElement | null)[]>([]);
const [bgTextWidths, setBgTextWidths] = useState<number[]>([]);
useEffect(() => {
  setBgTextWidths(
    bgTextRefs.current.map(ref => ref ? ref.offsetWidth : 0)
  );
}, []);

// Card data for popular job searches (only 4 cards)
const cardData = [
  {
    trending: 'TRENDING AT #1',
    title: 'Jobs for Freshers',
    img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=320&fit=crop', // Young professionals in office
    link: '#',
    color: 'green',
    border: 'border-green-600',
    bg: 'bg-white',
    hover: 'group-hover:bg-green-600 group-hover:border-green-600',
    text: 'group-hover:text-white',
    btn: 'text-green-700 border-green-600 font-bold',
    btnHover: 'group-hover:bg-green-600 group-hover:text-white',
  },
  {
    trending: 'TRENDING AT #2',
    title: 'Work from home Jobs',
    img: 'https://images.unsplash.com/photo-1519241047957-be31d7379a5d?w=400&h=320&fit=crop', // Home office setup
    link: '#',
    color: 'yellow',
    border: 'border-yellow-500',
    bg: 'bg-white',
    hover: 'group-hover:bg-yellow-400 group-hover:border-yellow-500',
    text: 'group-hover:text-white',
    btn: 'text-yellow-600 border-yellow-500 font-bold',
    btnHover: 'group-hover:bg-yellow-400 group-hover:text-white',
  },
  {
    trending: 'TRENDING AT #3',
    title: 'Part time Jobs',
    img: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=320&fit=crop', // Teamwork in office
    link: '#',
    color: 'orange',
    border: 'border-orange-500',
    bg: 'bg-white',
    hover: 'group-hover:bg-orange-500 group-hover:border-orange-500',
    text: 'group-hover:text-white',
    btn: 'text-orange-600 border-orange-500 font-bold',
    btnHover: 'group-hover:bg-orange-500 group-hover:text-white',
  },
  {
    trending: 'TRENDING AT #4',
    title: 'Jobs for Women',
    img: 'https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?w=400&h=320&fit=crop', // Women in corporate office
    link: '#',
    color: 'teal',
    border: 'border-teal-600',
    bg: 'bg-white',
    hover: 'group-hover:bg-teal-600 group-hover:border-teal-600',
    text: 'group-hover:text-white',
    btn: 'text-teal-700 border-teal-600 font-bold',
    btnHover: 'group-hover:bg-teal-600 group-hover:text-white',
  }
];

// Testimonial modal/notification state and handlers
const [showTestimonialModal, setShowTestimonialModal] = useState(false);
const [testimonialName, setTestimonialName] = useState("");
const [testimonialText, setTestimonialText] = useState("");
const [showTestimonialNotification, setShowTestimonialNotification] = useState(false);

function handleTestimonialSubmit(e: React.FormEvent) {
  e.preventDefault();
  setShowTestimonialModal(false);
  setTestimonialName("");
  setTestimonialText("");
  setShowTestimonialNotification(true);
}

// Hero carousel images
// Trending job roles carousel logic
const trendingRoles = [
  "Telecalling/BPO",
  "Field Sales",
  "Accounts/Finance",
  "Delivery Person",
  "Business Development",
  "HR Executive",
  "Data Entry",
  "Security Guard",
  "Hardware & Network",
];
const heroImages = [
  // Corporate/office themed hero images
  'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&h=600&fit=crop', // Team in meeting
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=600&fit=crop', // Young professionals in office
  'https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?w=1200&h=600&fit=crop', // Women in corporate office
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=600&fit=crop', // Teamwork in office
  'https://images.unsplash.com/photo-1519241047957-be31d7379a5d?w=1200&h=600&fit=crop', // Home office setup
];
const [heroIndex, setHeroIndex] = useState(0);
useEffect(() => {
  const interval = setInterval(() => {
    setHeroIndex(idx => (idx + 1) % heroImages.length);
  }, 5000);
  return () => clearInterval(interval);
}, [heroImages.length]);

// Card list for popular job searches
const cardList = cardData.map((item, i) => (
  <motion.div
    key={i}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.7, delay: i * 0.1 }}
    className={`relative ${item.bg} rounded-2xl border ${item.border} p-8 flex flex-col justify-end min-h-[280px] group transition overflow-hidden ${item.hover}`}
  >
    {/* Large faded background text */}
    <span className="absolute left-6 top-16 text-[2.5rem] md:text-[3.5rem] font-extrabold text-gray-900/5 select-none pointer-events-none whitespace-nowrap z-0">
      <motion.span
        ref={el => (bgTextRefs.current[i] = el)}
        className={`block relative text-[2.5rem] md:text-[3.5rem] font-extrabold text-gray-900/5 select-none pointer-events-none whitespace-nowrap z-0 ${item.text}`}
        initial={{ x: 80 }}
        whileInView={{ x: 0 }}
        whileHover={{ x: bgTextWidths[i] ? Math.min(-60, -(bgTextWidths[i] - 320)) : -60 }}
        transition={{ type: 'spring', stiffness: 120, damping: 14 }}
      >
        {item.title}
      </motion.span>
    </span>
    {/* Card content */}
    <div className="relative z-10 flex flex-col h-full justify-between">
      <div>
        <div className={`text-xs text-gray-500 font-semibold mb-2 transition-colors`}>{item.trending}</div>
        <div className={`text-2xl font-extrabold text-gray-900 mb-4 transition-colors`}>{item.title}</div>
      </div>
      <div className="flex justify-start w-full">
        <Link
          to={item.link}
          className={`inline-block mt-4 mb-0 px-4 py-2 rounded-lg border transition-all duration-200 text-base bg-white font-bold ${item.btn} ${item.btnHover} group-hover:scale-105 group-hover:shadow-lg`}
        >
          View all <span className="ml-1">&#8594;</span>
        </Link>
      </div>
    </div>
    {/* Card image bottom right, Unsplash PNG with transparent bg */}
    <img
      src={item.img}
      alt={item.title}
      className="absolute bottom-4 right-6 w-28 h-32 object-contain select-none pointer-events-none z-10"
      style={{objectFit:'contain', background: 'none'}}
    />
  </motion.div>
));

return (
  <div className="min-h-screen bg-gray-50">
      <ScrollToTopButton />
      {/* HERO SECTION */}
      <motion.section 
        className="w-full bg-white py-12 md:py-20 relative"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 px-4">
          {/* Left */}
          <motion.div 
            className="flex-1 space-y-6 md:space-y-8"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}>
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight">{t('hero.title')}</h1>
            <div className="flex items-center gap-2 mt-2 mb-4">
              <span className="text-blue-700 text-base md:text-xl font-semibold tracking-wide">{t('hero.instantly')}</span>
              <span className="text-gray-400 text-lg md:text-2xl font-bold">|</span>
              <span className="text-blue-700 text-base md:text-xl font-semibold tracking-wide">{t('hero.reliably')}</span>
              <span className="text-gray-400 text-lg md:text-2xl font-bold">|</span>
              <span className="text-blue-700 text-base md:text-xl font-semibold tracking-wide">{t('hero.locally')}</span>
            </div>
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 shadow-sm">
              <p className="text-base md:text-lg text-blue-900 font-semibold mb-2">{t('hero.subtitle')}</p>
            </div>
            {/* Modern Segmented Search Bar */}
            <div className="w-full flex flex-col items-center mt-2">
              <div className="w-full max-w-3xl flex bg-white rounded-2xl shadow border border-gray-200 overflow-hidden">
                {/* Search by job/company */}
                <div className="flex items-center px-4 py-3 flex-1 min-w-0">
                  <svg className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  <input type="text" placeholder="Search jobs by 'company, title, skill'" className="bg-transparent outline-none border-none text-gray-500 placeholder-gray-400 flex-1 min-w-0" />
                </div>
                {/* Divider */}
                <div className="w-px bg-gray-200 my-2" />
                {/* Experience dropdown */}
                <div className="flex items-center px-4 py-3 min-w-[180px]">
                  <svg className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4" /><path d="M8 12h8" strokeLinecap="round" /></svg>
                  <select className="bg-transparent outline-none border-none text-gray-500 font-medium w-full">
                    <option>Your Experience</option>
                    <option>Fresher</option>
                    <option>1-2 years</option>
                    <option>3-5 years</option>
                    <option>5+ years</option>
                  </select>
                </div>
                {/* Divider */}
                <div className="w-px bg-gray-200 my-2" />
                {/* Location */}
                <div className="flex items-center px-4 py-3 flex-1 min-w-0">
                  <svg className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 21c4.97-4.97 8-8.03 8-11A8 8 0 1 0 4 10c0 2.97 3.03 6.03 8 11z" /><circle cx="12" cy="10" r="3" /></svg>
                  <input type="text" placeholder="Search for an area or city" className="bg-transparent outline-none border-none text-gray-500 placeholder-gray-400 flex-1 min-w-0" />
                </div>
                {/* Search button */}
                <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-3 m-2 rounded-lg transition-all whitespace-nowrap">Search jobs</button>
              </div>
            </div>
          </motion.div>
          {/* Right: Hero Carousel */}
          <motion.div 
            className="flex-1 flex justify-center items-center relative min-h-[400px]"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}>
            <button
              aria-label="Previous slide"
              onClick={() => setHeroIndex((heroIndex - 1 + heroImages.length) % heroImages.length)}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 text-gray-700 p-2 transition"
              style={{outline: 'none', border: 'none', background: 'none'}}
            >
              <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <motion.div
              key={heroIndex}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.7 }}
              className="w-full flex justify-center items-center"
            >
              <div className="relative w-full flex flex-col items-center">
                <div className="w-full max-w-4xl h-[320px] md:h-[420px] lg:h-[480px] rounded-2xl shadow-2xl object-cover border border-gray-200 overflow-hidden relative" style={{ minHeight: 320, maxHeight: 480 }}>
                  <motion.div
                    key={heroIndex}
                    initial={{ x: 400 }}
                    animate={{ x: 0 }}
                    exit={{ x: -400 }}
                    transition={{ type: 'spring', stiffness: 80, damping: 18 }}
                    className="absolute top-0 left-0 w-full h-full"
                    style={{ zIndex: 2 }}
                  >
                    <img
                      src={heroImages[heroIndex]}
                      alt="App showcase"
                      className="w-full h-full object-cover rounded-2xl"
                      style={{ minHeight: 320, maxHeight: 480 }}
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>
            <button
              aria-label="Next slide"
              onClick={() => setHeroIndex((heroIndex + 1) % heroImages.length)}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 text-gray-700 p-2 transition"
              style={{outline: 'none', border: 'none', background: 'none'}}
            >
              <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </button>
          </motion.div>

        </div>
        {/* Wavy divider to next section */}
        <div className="absolute left-0 right-0 bottom-0 w-full overflow-hidden leading-none pointer-events-none" style={{height: 60}}>
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#f8fafc" />
          </svg>
        </div>
      </motion.section>






      {/* POPULAR JOB SEARCHES (apna style) with left carousel */}
      <motion.section 
        className="w-full bg-gray-50 py-16 relative"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8 items-stretch">
            {/* Left: Carousel */}
            <div className="md:w-[38%] w-full flex flex-col items-center justify-center">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">Top Search on OJK</h2>
              <div className="w-full flex justify-center items-center relative h-[340px] md:h-[420px] lg:h-[440px]">
                <button
                  aria-label="Previous slide"
                  onClick={() => setHeroIndex((heroIndex - 1 + heroImages.length) % heroImages.length)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-20 text-gray-700 p-2 transition"
                  style={{outline: 'none', border: 'none', background: 'none'}}
                >
                  <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                </button>
                <motion.div
                  key={heroIndex + '-featured'}
                  initial={{ opacity: 0, x: 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -60 }}
                  transition={{ duration: 0.7 }}
                  className="w-full flex justify-center items-center h-full"
                >
                  <div className="relative w-full flex flex-col items-center h-full">
                    <div className="w-full h-full rounded-2xl shadow-2xl object-cover border border-gray-200 overflow-hidden relative">
                      <motion.div
                        key={heroIndex + '-featured-img'}
                        initial={{ x: 400 }}
                        animate={{ x: 0 }}
                        exit={{ x: -400 }}
                        transition={{ type: 'spring', stiffness: 80, damping: 18 }}
                        className="absolute top-0 left-0 w-full h-full"
                        style={{ zIndex: 2 }}
                      >
                        <img
                          src={heroImages[heroIndex]}
                          alt="Featured opportunity"
                          className="w-full h-full object-cover rounded-2xl"
                          style={{ minHeight: 200, maxHeight: 440 }}
                        />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
                <button
                  aria-label="Next slide"
                  onClick={() => setHeroIndex((heroIndex + 1) % heroImages.length)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-20 text-gray-700 p-2 transition"
                  style={{outline: 'none', border: 'none', background: 'none'}}
                >
                  <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>
            </div>
            {/* Right: Cards */}
            <div className="md:w-[62%] w-full grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch">
              {/* Heading for mobile only */}
              <div className="block md:hidden col-span-full mb-4">
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight text-center">
                  Popular<br />Searches on OJK
                </h2>
              </div>
              {cardList}
            </div>
          </div>
        </div>
        {/* Angled divider to next section */}
        <div className="absolute left-0 right-0 bottom-0 w-full overflow-hidden leading-none pointer-events-none" style={{height: 60}}>
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <polygon points="0,0 1440,60 1440,60 0,60" fill="#fff" />
          </svg>
        </div>
      </motion.section>


      {/* PLATFORM FEATURES SECTION (moved up) */}
      <motion.section 
        className="py-20 bg-white relative"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Platform Features
            </motion.h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: index * 0.2 }} className="text-center p-6 rounded-lg hover:shadow-2xl transition-shadow duration-200 bg-gradient-to-br from-gray-50 to-white">
                {feature.icon()}
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
        {/* Wavy divider to next section */}
        <div className="absolute left-0 right-0 bottom-0 w-full overflow-hidden leading-none pointer-events-none" style={{height: 60}}>
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path d="M0,30 C360,0 1080,60 1440,30 L1440,60 L0,60 Z" fill="#f0fdf4" />
          </svg>
        </div>
      </motion.section>

      {/* TRENDING JOB ROLES SECTION - Static Grid */}
      <motion.section 
        className="w-full bg-gradient-to-br from-blue-50 to-green-50 py-16 relative"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10 text-center">Trending Job Roles on OJK</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {trendingRoles.slice(0, 8).map((role, i) => (
              <TrendingRoleCard key={i + '-' + role} role={role} />
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg shadow transition-all text-base">View all roles</button>
          </div>
        </div>
        {/* Angled divider to next section */}
        <div className="absolute left-0 right-0 bottom-0 w-full overflow-hidden leading-none pointer-events-none" style={{height: 60}}>
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <polygon points="0,0 1440,60 1440,60 0,60" fill="#f0fdf4" />
          </svg>
        </div>
      </motion.section>

      {/* TESTIMONIALS SECTION - Modern with Add Testimonial */}
      <motion.section 
        className="w-full bg-green-50 py-16 relative"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Hear from our happy job seekers</h2>
            <button
              onClick={() => setShowTestimonialModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow transition-all text-base"
            >
              Add your testimonial
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Example testimonials (static) */}
            <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-3 border border-green-100 relative">
              <div className="flex items-center gap-4 mb-2">
                <img src="https://images.unsplash.com/photo-1519340333755-c1aa5571fd46?w=80&h=80&fit=crop" alt="User" className="h-14 w-14 rounded-full object-cover border-2 border-green-200" />
                <div>
                  <div className="font-semibold text-gray-900 text-lg">Shivangi Singh</div>
                  <div className="flex items-center gap-1 text-yellow-400 text-base">{'★★★★★'}</div>
                </div>
              </div>
              <div className="text-gray-700 italic text-base">"Thanks OJK, finding a corporate job is so smooth now. Highly recommended!"</div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-3 border border-green-100 relative">
              <div className="flex items-center gap-4 mb-2">
                <img src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=80&h=80&fit=crop" alt="User" className="h-14 w-14 rounded-full object-cover border-2 border-green-200" />
                <div>
                  <div className="font-semibold text-gray-900 text-lg">Rahul Kumar</div>
                  <div className="flex items-center gap-1 text-yellow-400 text-base">{'★★★★★'}</div>
                </div>
              </div>
              <div className="text-gray-700 italic text-base">"OJK helped me get a job in my city within days. The process was easy and fast!"</div>
            </div>
          </div>

          {/* Modal for Add Testimonial */}
          {showTestimonialModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
              <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative animate-fadeIn">
                <button
                  className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold"
                  onClick={() => setShowTestimonialModal(false)}
                  aria-label="Close"
                >
                  &times;
                </button>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Add your testimonial</h3>
                <form onSubmit={handleTestimonialSubmit} className="flex flex-col gap-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-200"
                    value={testimonialName}
                    onChange={e => setTestimonialName(e.target.value)}
                    required
                  />
                  <textarea
                    placeholder="Your Testimonial"
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-200 min-h-[80px]"
                    value={testimonialText}
                    onChange={e => setTestimonialText(e.target.value)}
                    required
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition-all text-base"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Notification */}
          {showTestimonialNotification && (
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg animate-fadeIn">
              Your testimonial is submitted. Thanks for your valuable time!
            </div>
          )}
        </div>
        {/* Wavy divider to next section */}
        <div className="absolute left-0 right-0 bottom-0 w-full overflow-hidden leading-none pointer-events-none" style={{height: 60}}>
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#dcfce7" />
          </svg>
        </div>
      </motion.section>





      {/* EMPLOYER CTA SECTION */}

      <motion.section 
        className="w-full bg-gradient-to-br from-green-100 via-blue-50 to-white py-14 relative overflow-hidden"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        {/* Decorative background icon */}
        <div className="absolute -top-10 -right-10 opacity-10 pointer-events-none select-none z-0">
          <svg width="220" height="220" viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="110" cy="110" r="110" fill="#22d3ee" />
            <circle cx="110" cy="110" r="80" fill="#bbf7d0" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-10 relative z-10">
          <div className="flex-1 flex flex-col justify-center items-start">
            <div className="flex items-center gap-3 mb-2">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600">
                <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /></svg>
              </span>
              <span className="text-green-700 font-bold text-xs uppercase tracking-wider">OJK FOR EMPLOYERS</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 leading-tight">
              Ready to hire top talent?
            </h2>
            <div className="text-lg text-gray-700 mb-5 max-w-xl">
              <span className="font-semibold text-blue-700">Post your job for free</span> and connect instantly with <span className="font-bold text-green-700">5 crore+</span> active job seekers across Kongu Nadu and beyond. Find the right fit, faster.
            </div>
            <ul className="mb-6 space-y-2 text-gray-600 text-base pl-1">
              <li className="flex items-center gap-2"><span className="text-green-500">&#10003;</span> 100% verified candidates</li>
              <li className="flex items-center gap-2"><span className="text-green-500">&#10003;</span> Fast, easy posting process</li>
              <li className="flex items-center gap-2"><span className="text-green-500">&#10003;</span> Dedicated employer support</li>
            </ul>
            <button className="bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white px-8 py-3 rounded-lg font-bold shadow-lg transition-all text-lg flex items-center gap-2">
              <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
              Post a Job Now
            </button>
            <div className="text-xs text-gray-400 mt-2">No hidden charges. Start hiring today!</div>
          </div>
          <div className="flex-1 flex justify-center items-center">
            <div className="relative w-72 h-[420px] md:w-[420px] md:h-[540px] lg:w-[500px] lg:h-[650px] flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1463453091185-61582044d556?w=500&h=700&fit=crop" 
                alt="Professionals" 
                className="w-full h-full rounded-2xl shadow-2xl object-cover border-4 border-white transition-all duration-300" 
                style={{maxWidth:'100%', maxHeight:'100%'}}
              />
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-white rounded-xl shadow px-6 py-3 flex items-center gap-2 border border-green-100">
                <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                <span className="text-green-700 font-semibold text-base">Trusted by 10,000+ employers</span>
              </div>
            </div>
          </div>
        </div>
        {/* Angled divider to next section */}
        <div className="absolute left-0 right-0 bottom-0 w-full overflow-hidden leading-none pointer-events-none" style={{height: 60}}>
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <polygon points="0,0 1440,60 1440,60 0,60" fill="#f8fafc" />
          </svg>
        </div>
      </motion.section>




      {/* INDUSTRIES SECTION - Train Effect */}
      <motion.section 
        className="py-20 bg-gray-50"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Industries We Serve
            </motion.h2>
          </div>
          <div className="relative flex items-center justify-center">
            <div className="w-full overflow-hidden">
              <motion.div
                ref={trainRef}
                className="flex gap-6"
                style={{ transform: `translateX(${trainX}px)`, willChange: 'transform' }}
                animate={false}
              >
                {[...industries, ...industries].map((industry, i) => (
                  <motion.div
                    key={industry.name + '-' + i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, delay: (i % industriesToShow) * 0.1 }}
                    className="group cursor-pointer min-w-[220px] max-w-[260px] flex-1"
                  >
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
                        <h3 className="text-base font-semibold text-gray-900 text-center">
                          {industry.name}
                        </h3>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
   
  );
};
export default Home;