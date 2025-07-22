
import React, { useEffect, useState } from "react";

// Demo contest data (replace with real data as needed)
const contest = {
  id: 111442,
  title: "Axis Sales Academy",
  subtitle: "Where Ambition Meets Opportunity",
  banner: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
  logo: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Axis_Bank_logo.svg",
  registrationEnd: new Date(Date.now() + 1000 * 60 * 60 * 5 + 1000 * 60 * 12 + 1000 * 49 + 1000 * 2).toISOString(),
  participants: "4500+",
  deadline: "27th July, 2025",
  jobOffer: "CTC upto INR 2.37L+ Incentives",
};

function useCountdown(targetDateIso: string) {
  const calc = () => {
    const now = new Date();
    const target = new Date(targetDateIso);
    const diff = Math.max(0, target.getTime() - now.getTime());
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return { hours, minutes, seconds, ended: diff === 0 };
  };
  const [time, setTime] = useState(calc());
  useEffect(() => {
    if (time.ended) return;
    const timer = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(timer);
    // eslint-disable-next-line
  }, [targetDateIso, time.ended]);
  return time;
}

function pad(n: number) {
  return n.toString().padStart(2, '0');
}


const navItems = [
  { id: 'description', label: 'Description' },
  { id: 'eligibility', label: 'Eligibility' },
  { id: 'about-apna', label: 'About Apna' },
];

const ContestDetails: React.FC = () => {
  const { hours, minutes, seconds, ended } = useCountdown(contest.registrationEnd);

  // Scroll to section
  const handleNav = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-0 md:p-8">
      {/* Banner at the top */}
      <div className="w-full rounded-2xl overflow-hidden mb-8 relative" style={{height: '220px'}}>
        <img src={contest.banner} alt="Contest Banner" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center pl-8">
          <img src={contest.logo} alt="Logo" className="h-16 w-16 bg-white rounded-full p-2 mr-6 shadow" />
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{contest.title}</h1>
            <div className="inline-block bg-white/80 text-gray-800 px-4 py-1 rounded text-lg font-medium">{contest.subtitle}</div>
          </div>
        </div>
      </div>

      {/* Sticky Nav */}
      <div className="max-w-7xl mx-auto mb-6">
        <nav className="bg-white rounded-2xl shadow flex flex-wrap gap-2 md:gap-6 px-4 py-2 sticky top-0 z-20 border-b border-gray-200">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className="text-base md:text-lg font-medium text-gray-700 hover:text-purple-700 px-2 py-1 border-b-2 border-transparent hover:border-purple-400 transition"
              type="button"
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Main Content (left) */}
        <div className="flex-1">
          {/* Description Section */}
          <section id="description" className="bg-white rounded-2xl shadow p-6 mb-6 scroll-mt-24">
            <h2 className="font-semibold text-lg mb-2">Description</h2>
            <div className="text-gray-800 mb-3">
              Kickstart your career with Axis Sales Academy (ASA), a unique hire-train-deploy program by one of India's leading private sector banks. Designed for ambitious individuals and fresh graduates, ASA fast-tracks your journey in banking and sales through real-world experience and structured growth. Join us to build a career full of purpose, opportunities, and open possibilities — because at Axis, we're Dil Se Open to your aspirations.
            </div>
            <div className="mb-2">
              <span className="font-semibold">Key Highlights:</span>
              <ul className="list-disc pl-6 mt-1 text-gray-700">
                <li><b>Job Role:</b> Officer Sales.</li>
                <li><b>CTC:</b> Up to INR 2.37L+ Incentives up to INR 84,000.</li>
                <li><b>Location:</b> PAN India. <a href="#" className="text-blue-600 underline">Click here</a> for the detailed list.</li>
              </ul>
            </div>
            <div className="mb-2">
              <span className="font-semibold">Training Program Structure:</span>
              <ul className="list-disc pl-6 mt-1 text-gray-700">
                <li>Sessions: 8 hours online virtual training for 6 days.</li>
                <li>Virtual Platform.</li>
                <li>Curriculum: Role Plays and Assessments, which help the candidate to develop a comprehensive understanding of banking.</li>
              </ul>
            </div>
            <div className="mt-2">
              <a href="#" className="text-blue-600 underline">Click here</a> for a detailed job description.
            </div>
          </section>

          {/* Eligibility Section */}
          <section id="eligibility" className="bg-white rounded-2xl shadow p-6 mb-6 scroll-mt-24">
            <h2 className="font-semibold text-lg mb-2">Eligibility</h2>
            <ul className="list-disc pl-6 text-gray-800 mb-2">
              <li><b>Education:</b> Graduates from any passing year are welcome to apply.
                <ul className="list-disc pl-6 mt-1">
                  <li>2025 graduates are also eligible to apply.</li>
                  <li>Final-Year Students: Candidates in their 8th semester may apply and can join after submitting their degree certificate.</li>
                  <li>Post-Graduation and diploma students are not eligible to apply.</li>
                </ul>
              </li>
              <li><b>Experience:</b> 0-9 months of experience.</li>
              <li><b>Age:</b> 19-28 years old.</li>
            </ul>
            <div className="text-gray-800">
              <b>Other Mandatory Requirements:</b> A two-wheeler with a valid driving license is required for the Officer Sales role due to the field-based nature of the job.<br />
              <span className="font-semibold">Exceptions to this requirement include:</span>
              <ul className="list-disc pl-6 mt-1">
                <li><b>Female candidates</b> applying under the Electronics Vehicle Loan category</li>
                <li><b>Candidates (male and female) from Assam and Kolkata</b></li>
              </ul>
            </div>
          </section>

          {/* About Apna Section */}
          <section id="about-apna" className="bg-white rounded-2xl shadow p-6 mb-6 scroll-mt-24">
            <h2 className="font-semibold text-lg mb-2">About Apna</h2>
            <div className="aspect-video rounded overflow-hidden">
              <iframe
                width="100%"
                height="315"
                src="https://www.youtube.com/embed/1Q8fG0TtVAY"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </section>
        </div>

        {/* Right Sidebar (fixed) */}
        <aside className="w-full md:w-[350px] flex-shrink-0">
          <div className="md:sticky md:top-8">
            <div className="bg-blue-50 rounded-2xl shadow p-6 mb-6">
              <div className="flex items-center mb-4">
                <span className="font-medium text-gray-900 mr-2">Registration Ends in</span>
                <span className="flex items-center border border-red-400 bg-white text-red-600 font-mono font-semibold rounded-full px-4 py-1 text-base">
                  <svg className="w-5 h-5 mr-1 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6l4 2" /></svg>
                  {ended ? '00:00:00' : `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`}
                </span>
              </div>
              <button className="w-full bg-purple-700 hover:bg-purple-800 text-white font-semibold py-3 rounded-lg text-lg transition mb-6">Register Now</button>
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 text-gray-800">
                  <span className="text-2xl">🖐</span>
                  <div>
                    <div className="font-bold text-lg">{contest.participants}</div>
                    <div className="text-sm text-gray-600">Registered Participants</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-gray-800">
                  <span className="text-2xl">⏰</span>
                  <div>
                    <div className="font-bold text-lg">{contest.deadline}</div>
                    <div className="text-sm text-gray-600">Registration Deadline</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-gray-800">
                  <span className="text-2xl">🏆</span>
                  <div>
                    <div className="font-bold text-lg">Job Offer</div>
                    <div className="text-sm text-gray-600">{contest.jobOffer}</div>
                  </div>
                </div>
              </div>
              <button className="w-full border-2 border-purple-300 text-purple-700 font-semibold py-2 rounded-lg text-base flex items-center justify-center gap-2 hover:bg-purple-50 transition">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 8a3 3 0 11-6 0 3 3 0 016 0zm6 8a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Share with friends
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ContestDetails;
