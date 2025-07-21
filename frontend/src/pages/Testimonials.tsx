import { Briefcase, Check, ChevronLeft, ChevronRight, Clock, Plus, Quote, Star, Trash2, User, X } from 'lucide-react';
import React from 'react';

export type Testimonial = {
  id?: number;
  name: string;
  role: string;
  message: string;
  avatar: string;
  date?: string;
  time?: string;
  rating?: number;
};

const Testimonials: React.FC = () => {
  const [testimonials, setTestimonials] = React.useState<Testimonial[]>([
    {
      name: 'Rajesh Kumar',
      role: 'Factory Owner',
      message: 'This platform has revolutionized how we hire workers. The quality of candidates and the ease of process is outstanding. Highly recommended for any business owner.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      rating: 5
    },
    {
      name: 'Priya Sharma',
      role: 'HR Manager',
      message: 'As an HR professional, I appreciate the streamlined workflow and the verification process. It saves us tremendous time in screening candidates.',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b1c5?w=100&h=100&fit=crop&crop=face',
      rating: 4
    },
    {
      name: 'Murugan A',
      role: 'Textile Worker',
      message: 'I found my current job through this platform within a week. The interface is simple and the support team is very helpful. Thank you!',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      rating: 5
    },
    {
      name: 'Lakshmi Devi',
      role: 'Daily Wage Worker',
      message: 'This service helped me connect with reliable employers. I feel more secure about my work opportunities now. Great initiative!',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      rating: 4
    }
  ]);

  const [showTestimonialModal, setShowTestimonialModal] = React.useState(false);
  const [testimonialForm, setTestimonialForm] = React.useState({
    name: '',
    role: '',
    message: '',
    avatar: '',
    rating: 5
  });
  
  const isAdmin = false;
  const [pendingTestimonials, setPendingTestimonials] = React.useState<Testimonial[]>([]);
  const [notification, setNotification] = React.useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);

  // Auto-slide functionality
  React.useEffect(() => {
    if (!isPaused && testimonials.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % testimonials.length);
      }, 4000); // 4 seconds per slide
      return () => clearInterval(interval);
    }
  }, [isPaused, testimonials.length]);

  const handleAddTestimonial = () => {
    setShowTestimonialModal(true);
  };

  const handleTestimonialSubmit = () => {
    if (!testimonialForm.name || !testimonialForm.role || !testimonialForm.message) {
      setNotification('Please fill in all required fields');
      setTimeout(() => setNotification(null), 3000);
      return;
    }
    const now = new Date();
    const date = now.toISOString().slice(0, 10);
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setPendingTestimonials([
      ...pendingTestimonials,
      { ...testimonialForm, id: Date.now(), date, time }
    ]);
    setShowTestimonialModal(false);
    setTestimonialForm({ name: '', role: '', message: '', avatar: '', rating: 5 });
    setNotification('Your testimonial is successfully submitted');
    setTimeout(() => setNotification(null), 3000);
  };

  const handleApprove = (id: number) => {
    const approved = pendingTestimonials.find(t => t.id === id);
    if (approved) {
      setTestimonials([...testimonials, approved]);
      setPendingTestimonials(pendingTestimonials.filter(t => t.id !== id));
      setNotification('Thanks for your valuable message');
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleDelete = (id: number) => {
    setPendingTestimonials(pendingTestimonials.filter(t => t.id !== id));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const StarRating = ({ rating, interactive = false, onRatingChange }: { rating: number, interactive?: boolean, onRatingChange?: (rating: number) => void }) => (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <button
          key={i}
          type="button"
          disabled={!interactive}
          onClick={() => interactive && onRatingChange?.(i + 1)}
          className={`${interactive ? 'hover:scale-110 cursor-pointer' : 'cursor-default'} transition-all duration-200 focus:outline-none`}
        >
          <Star 
            className={`w-4 h-4 ${i < rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'} transition-colors`}
          />
        </button>
      ))}
    </div>
  );

  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full mb-4 sm:mb-6">
            <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-3 sm:mb-4">
            What Our Users Say
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Real experiences from employers and workers who've transformed their careers through our platform
          </p>
        </div>

        {/* Testimonials Slider */}
        <div 
          className="relative mt-12 sm:mt-16 mb-12 sm:mb-16"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="overflow-hidden rounded-3xl">
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-2 sm:px-4">
                  <div className="bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-lg border border-white/50 mx-auto max-w-2xl">
                    {/* Quote decoration */}
                    <div className="absolute -top-3 -left-3 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center opacity-80">
                      <Quote className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </div>
                    
                    {/* Content */}
                    <div className="relative z-10">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 gap-4">
                        <div className="relative flex-shrink-0">
                          <img
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-4 border-white shadow-lg"
                          />
                          <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                            <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                          </div>
                        </div>
                        
                        <div className="flex-1 text-center sm:text-left">
                          <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">{testimonial.name}</h4>
                          <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                            <Briefcase className="w-4 h-4 text-gray-500" />
                            <p className="text-sm text-gray-600 font-medium">{testimonial.role}</p>
                          </div>
                          <div className="flex justify-center sm:justify-start">
                            <StarRating rating={testimonial.rating || 0} />
                          </div>
                        </div>
                      </div>
                      
                      <blockquote className="text-gray-700 leading-relaxed italic text-center sm:text-left text-sm sm:text-base">
                        <span className="text-2xl sm:text-4xl text-blue-200 absolute -top-2 -left-2">"</span>
                        <span className="relative z-10 block px-4 sm:px-0">{testimonial.message}</span>
                        <span className="text-2xl sm:text-4xl text-blue-200 absolute -bottom-4 -right-2">"</span>
                      </blockquote>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-700 hover:text-blue-600 p-2 sm:p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-700 hover:text-blue-600 p-2 sm:p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Slide Indicators */}
          <div className="flex justify-center mt-6 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-blue-600 w-6 sm:w-8' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Add Testimonial Button */}
        <div className="text-center mb-8 sm:mb-12">
          <button
            onClick={handleAddTestimonial}
            className="group inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-sm sm:text-base"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-90 transition-transform duration-300" />
            Share Your Experience
          </button>
        </div>

        {/* Admin Panel */}
        {isAdmin && pendingTestimonials.length > 0 && (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl border border-white/50">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
              <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500" />
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Pending Testimonials</h3>
              <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium self-start sm:self-auto">
                {pendingTestimonials.length} pending
              </span>
            </div>
            
            <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
              {pendingTestimonials.map((t) => (
                <div key={t.id} className="bg-amber-50 border border-amber-200 p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-4 gap-3">
                    <img 
                      src={t.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'} 
                      alt={t.name} 
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white shadow-sm" 
                    />
                    <div className="min-w-0 flex-1">
                      <h4 className="font-bold text-gray-900 text-sm sm:text-base truncate">{t.name}</h4>
                      <p className="text-xs sm:text-sm text-gray-600 truncate">{t.role}</p>
                      <div className="text-xs text-amber-600 mt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">{t.date} at {t.time}</span>
                      </div>
                    </div>
                  </div>
                  
                  <blockquote className="text-gray-700 mb-4 italic text-sm line-clamp-3">"{t.message}"</blockquote>
                  
                  <div className="flex flex-col sm:flex-row gap-2">
                    {typeof t.id === 'number' && (
                      <>
                        <button 
                          onClick={() => handleApprove(t.id!)}
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-sm"
                        >
                          <Check className="w-4 h-4" />
                          Approve
                        </button>
                        <button 
                          onClick={() => handleDelete(t.id!)}
                          className="flex-1 bg-red-600 hover:bg-red-700 text-white px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-sm"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Compact Responsive Modal */}
        {showTestimonialModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto relative transform animate-in">
              <button
                onClick={() => setShowTestimonialModal(false)}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="p-6">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Share Your Experience</h3>
                  <p className="text-gray-600 text-sm">Help others by sharing your story</p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={testimonialForm.name}
                      onChange={e => setTestimonialForm({ ...testimonialForm, name: e.target.value })}
                      required
                      className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 focus:border-blue-500 focus:outline-none transition-colors text-sm"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Role/Position</label>
                    <input
                      type="text"
                      value={testimonialForm.role}
                      onChange={e => setTestimonialForm({ ...testimonialForm, role: e.target.value })}
                      required
                      className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 focus:border-blue-500 focus:outline-none transition-colors text-sm"
                      placeholder="e.g., Factory Worker, HR Manager"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Your Experience</label>
                    <textarea
                      value={testimonialForm.message}
                      onChange={e => setTestimonialForm({ ...testimonialForm, message: e.target.value })}
                      required
                      rows={3}
                      className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 focus:border-blue-500 focus:outline-none transition-colors resize-none text-sm"
                      placeholder="Tell us about your experience..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Profile Picture <span className="text-gray-400 font-normal">(optional)</span>
                    </label>
                    <div className="flex flex-col items-center gap-2">
                      <label htmlFor="avatar-upload" className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 font-medium rounded-lg shadow hover:from-blue-200 hover:to-indigo-200 border border-blue-300 transition-all text-sm">
                        <Plus className="w-4 h-4" />
                        Choose File
                      </label>
                      <input
                        id="avatar-upload"
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={e => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setTestimonialForm({ ...testimonialForm, avatar: reader.result as string });
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                      {testimonialForm.avatar && (
                        <div className="mt-2">
                          <img src={testimonialForm.avatar} alt="Avatar Preview" className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-lg" />
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 text-center">Rate Your Experience</label>
                    <div className="flex justify-center">
                      <StarRating 
                        rating={testimonialForm.rating} 
                        interactive={true} 
                        onRatingChange={(rating) => setTestimonialForm({ ...testimonialForm, rating })}
                      />
                    </div>
                  </div>
                  
                  <button
                    type="button"
                    onClick={handleTestimonialSubmit}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 text-sm"
                  >
                    Submit Testimonial
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Notification */}
        {notification && (
          <div className="fixed top-4 sm:top-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 sm:px-8 py-3 sm:py-4 rounded-xl shadow-2xl z-50 flex items-center gap-2 sm:gap-3 animate-in text-sm sm:text-base max-w-[90%] sm:max-w-none">
            <Check className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
            <span className="font-semibold">{notification}</span>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;