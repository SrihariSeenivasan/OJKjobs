import React, { useRef, useEffect } from 'react';
import { Users, UserPlus, Briefcase, MapPin } from 'lucide-react';

const stats = [
  { icon: <Users className="w-8 h-8 text-[#00646e]" />, value: '5 Crore+', label: 'Candidates use apna' },
  { icon: <UserPlus className="w-8 h-8 text-[#00646e]" />, value: '5 Lakhs+', label: 'New candidates every month' },
  { icon: <Briefcase className="w-8 h-8 text-[#00646e]" />, value: '7 Lakhs+', label: 'Employers already at apna' },
  { icon: <MapPin className="w-8 h-8 text-[#00646e]" />, value: '960+', label: 'Available cities' },
];

const logos = [
  'allianz', 'flipkart', 'bigbasket', 'hdfc', 'nizams', 'uber', 'urban'
];

const buytestimonials = [
  {
    logo: 'tata',
    text: 'We are closely working with apna for talent discovery and hiring across job families. Their quickest turn-around time is enabling us to uninterruptedly continue our daily functions and services, especially during the present times.',
    name: 'Dr Varun',
    title: 'SVP, Medical Affairs',
  },
  {
    logo: 'shadowfax',
    text: 'Team apna has provided us with great support. 75% of our job fulfillment for delivery personnel has been through the apna. I love the skill tag feature as we don’t have to manually type requirements.',
    name: 'Neeraj Gupta',
    title: 'City Head of Supply, Mumbai',
  },
  {
    logo: 'nizams',
    text: 'Before hearing about apna from a friend, I had doubts about tech solutions, but it proved to be beneficial to me. I added a listing, received 30-40 candidates, and was able to hire 3 people. These folks will now be trained and ramp up!',
    name: 'Kabir Chugh',
    title: 'Restaurateur, Owner Nizams, 150k followers',
  },
];

const BuyPackageTestimonials: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Help section */}
      <div className="max-w-4xl mx-auto mt-6 mb-8 p-4 bg-blue-50 rounded-lg flex flex-col md:flex-row items-center justify-between">
        <div>
          <div className="font-semibold text-base md:text-lg mb-1">Have more questions? We're here to help</div>
          <div className="text-xs md:text-sm text-gray-600">Tell us more about your hiring needs so we can help you pick the right solution.</div>
        </div>
        <button className="mt-3 md:mt-0 bg-white border border-gray-400 rounded px-4 py-2 font-semibold">Contact Us</button>
      </div>

      {/* Stats */}
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center py-8">
        {stats.map((stat, idx) => (
          <div key={idx}>
            <div className="flex justify-center mb-2">{stat.icon}</div>
            <div className="font-bold text-xl mb-1">{stat.value}</div>
            <div className="text-gray-600 text-sm">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Logos Carousel */}
      <div className="max-w-5xl mx-auto text-center mb-8">
        <div className="font-semibold text-lg mb-2">Trusted by companies from all sizes</div>
        <div className="text-gray-600 text-sm mb-4">Businesses across industries and around the India have built better customer relationships with apna.</div>
        <div className="relative overflow-hidden w-full">
          <LogoCarousel />
        </div>
      </div>


      {/* Testimonials */}
      <div className="bg-[#00646e] py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-white text-2xl font-bold text-center mb-2">Recruiters Recommend Apna</div>
          <div className="text-white text-center mb-8">Teams like you are closing their company hirings faster with apna</div>
          <div className="grid md:grid-cols-3 gap-6">
            {buytestimonials.map((t, idx) => (
              <div key={idx} className="bg-white rounded-lg p-6 shadow flex flex-col h-full">
                <div className="mb-2">
                  <img src={`/assets/brands/${t.logo}.png`} alt={t.name} className="h-6 mb-2" />
                </div>
                <div className="text-gray-800 text-sm mb-4 flex-1">{t.text}</div>
                <div className="font-bold text-gray-900 text-sm">{t.name}</div>
                <div className="text-gray-500 text-xs">{t.title}</div>
              </div>
            ))}
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
        <img key={idx} src={`/assets/brands/${logo}.png`} alt={logo} className="h-8 inline-block select-none pointer-events-none" draggable={false} />
      ))}
    </div>
// Hide scrollbar utility (Tailwind or custom)
// If not using Tailwind's 'scrollbar-hide', add this to your global CSS:
// .scrollbar-hide::-webkit-scrollbar { display: none; }
// .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
   
  );
};
