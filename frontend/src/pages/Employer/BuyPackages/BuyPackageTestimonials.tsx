import { Briefcase, MapPin, UserPlus, Users } from 'lucide-react';
import React, { useEffect, useRef } from 'react';

const stats = [
  { icon: <Users className="w-8 h-8 text-[#fbb040]" />, value: '5 Crore+', label: 'Candidates use OJK jobs' },
  { icon: <UserPlus className="w-8 h-8 text-[#fbb040]" />, value: '5 Lakhs+', label: 'New candidates every month' },
  { icon: <Briefcase className="w-8 h-8 text-[#fbb040]" />, value: '7 Lakhs+', label: 'Employers already at OJK jobs' },
  { icon: <MapPin className="w-8 h-8 text-[#fbb040]" />, value: '960+', label: 'Available cities' },
];

const logos = [
  'allianz', 'flipkart', 'bigbasket', 'hdfc', 'nizams', 'uber', 'urban'
];

const buytestimonials = [
  {
    logo: 'tata',
    text: 'We are closely working with OJK jobs for talent discovery and hiring across job families. Their quickest turn-around time is enabling us to uninterruptedly continue our daily functions and services, especially during the present times.',
    name: 'Dr Varun',
    title: 'SVP, Medical Affairs',
  },
  {
    logo: 'shadowfax',
    text: 'Team OJK jobs has provided us with great support. 75% of our job fulfillment for delivery personnel has been through OJK jobs. I love the skill tag feature as we don’t have to manually type requirements.',
    name: 'Neeraj Gupta',
    title: 'City Head of Supply, Mumbai',
  },
  {
    logo: 'nizams',
    text: 'Before hearing about OJK jobs from a friend, I had doubts about tech solutions, but it proved to be beneficial to me. I added a listing, received 30-40 candidates, and was able to hire 3 people. These folks will now be trained and ramp up!',
    name: 'Kabir Chugh',
    title: 'Restaurateur, Owner Nizams, 150k followers',
  },
];

const BuyPackageTestimonials: React.FC = () => {
  return (
    <div className="bg-[#fff7e0] w-full">
      {/* Help section in card */}
      <div className="max-w-4xl mx-auto mt-6 mb-8">
        <div className="bg-white/90 border border-[#fbb040]/30 rounded-2xl shadow-lg flex flex-col md:flex-row items-center justify-between p-4 md:p-6">
          <div>
            <div className="font-semibold text-base md:text-lg mb-1 text-[#fbb040]">Have more questions? We're here to help</div>
            <div className="text-xs md:text-sm text-gray-600">Tell us more about your hiring needs so we can help you pick the right solution.</div>
          </div>
          <button className="mt-3 md:mt-0 bg-[#fbb040] hover:bg-[#ffd77a] text-white font-semibold rounded-xl px-5 py-2 shadow transition-all duration-200">Contact Us</button>
        </div>
      </div>

      {/* Stats in card */}
      <div className="max-w-5xl mx-auto px-2">
        <div className="bg-white/90 border border-[#fbb040]/30 rounded-2xl shadow-lg grid grid-cols-2 md:grid-cols-4 gap-6 text-center py-8 px-2 sm:px-6">
          {stats.map((stat, idx) => (
            <div key={idx}>
              <div className="flex justify-center mb-2">{stat.icon}</div>
              <div className="font-bold text-xl mb-1 text-[#fbb040]">{stat.value}</div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Logos Carousel in card */}
      <div className="max-w-5xl mx-auto text-center mb-8 px-2 mt-6">
        <div className="bg-white/90 border border-[#fbb040]/30 rounded-2xl shadow-lg p-4">
          <div className="font-semibold text-lg mb-2 text-[#fbb040]">Trusted by companies from all sizes</div>
          <div className="text-gray-600 text-sm mb-4">Businesses across industries and around the India have built better customer relationships with OJK jobs.</div>
          <div className="relative overflow-hidden w-full">
            <LogoCarousel />
          </div>
        </div>
      </div>


      {/* Testimonials in card */}
      <div className="w-full py-12 px-2 bg-transparent">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white/90 border border-[#fbb040]/30 rounded-2xl shadow-lg p-6 md:p-10">
            <div className="text-[#fbb040] text-2xl font-bold text-center mb-2">Recruiters Recommend OJK jobs</div>
            <div className="text-[#b97a13] text-center mb-8">Teams like you are closing their company hirings faster with OJK jobs</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {buytestimonials.map((t, idx) => (
                <div key={idx} className="bg-[#fff7e0] border border-[#fbb040]/20 rounded-xl p-6 shadow flex flex-col h-full">
                  <div className="mb-2 flex justify-center">
                    <img src={`/assets/brands/${t.logo}.png`} alt={t.name} className="h-8 mb-2" />
                  </div>
                  <div className="text-gray-800 text-sm mb-4 flex-1">{t.text}</div>
                  <div className="font-bold text-[#fbb040] text-sm">{t.name}</div>
                  <div className="text-gray-500 text-xs">{t.title}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyPackageTestimonials;




const LogoCarousel: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    let scrollAmount = 0;
    let req: number;
    const scrollStep = () => {
      if (!carousel) return;
      scrollAmount += 1;
      if (scrollAmount >= carousel.scrollWidth / 2) {
        scrollAmount = 0;
      }
      carousel.scrollLeft = scrollAmount;
      req = requestAnimationFrame(scrollStep);
    };
    req = requestAnimationFrame(scrollStep);
    return () => cancelAnimationFrame(req);
  }, []);
  // Duplicate logos for seamless infinite effect
  const allLogos = [...logos, ...logos];
  return (
    <div
      ref={carouselRef}
      className="flex gap-12 items-center h-16 overflow-x-auto whitespace-nowrap scrollbar-hide"
      style={{scrollBehavior:'auto'}}
    >
      {allLogos.map((logo, idx) => (
        <img key={idx} src={`/assets/brands/${logo}.png`} alt={logo} className="h-10 inline-block select-none pointer-events-none bg-[#fff7e0] border border-[#fbb040]/30 rounded-lg p-1" draggable={false} />
      ))}
    </div>

  );
};
