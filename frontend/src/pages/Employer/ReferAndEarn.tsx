import { useRef, useState } from "react";

// In a real app, get employerId from auth/user context
const employerId = "EMP123456"; // mock unique employer id
const referralLink = `https://employer.OJK Jobs.co/referrals.html?ref=${employerId}`;

const ReferAndEarn = () => {
  const [email, setEmail] = useState("");
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);


  const handleCopy = () => {
    if (inputRef.current) {
      inputRef.current.select();
      document.execCommand("copy");
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  // Social share handlers
  const handleShare = (platform: 'whatsapp' | 'facebook' | 'linkedin') => {
    const text = encodeURIComponent('Join OJK Jobs and get free database credits! Use my referral link: ' + referralLink);
    let url = '';
    if (platform === 'whatsapp') {
      url = `https://wa.me/?text=${text}`;
    } else if (platform === 'facebook') {
      url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`;
    } else if (platform === 'linkedin') {
      url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(referralLink)}`;
    }
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleSend = () => {
    if (email) {
      alert("Invitation sent to: " + email);
      setEmail("");
    }
  };

  return (
    <div className="bg-[#FFF7E0] min-h-screen py-8 px-2 sm:px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-900">Earn up to 2500 Database credits for FREE</h1>
        <div className="text-gray-700 mb-6">Invite your friends and get <b>100 Database credits</b> for free on each successful referral. Your friend will also get <b>50 Database credits</b> for free on the first job activation.</div>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left: Referral actions */}
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-md border border-[#fbb040]/30 p-6 mb-6">
              <div className="font-semibold mb-2">Share your referral invite link</div>
              <div className="flex gap-2 mb-4 flex-wrap">
                <input ref={inputRef} type="text" value={referralLink} readOnly className="border rounded px-3 py-2 flex-1 min-w-[220px]" />
                <button className={`bg-[#fbb040] hover:bg-[#fbb040]/90 text-white rounded px-4 py-2 font-semibold flex items-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-[#fbb040] focus:ring-opacity-50 ${copied ? 'bg-[#fbb040]/80' : ''}`} onClick={handleCopy}>
                  {copied ? 'Copied!' : 'Copy link'}
                </button>
                <button className="bg-[#FFF7E0] border border-[#fbb040] text-[#fbb040] rounded px-2 py-2 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[#fbb040] focus:ring-opacity-50 hover:bg-[#fbb040]/10" title="Share on WhatsApp" onClick={() => handleShare('whatsapp')}>
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.447-.52.151-.174.2-.298.3-.497.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.571-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.099 3.2 5.077 4.363.71.306 1.263.489 1.694.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.288.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 5.421h-.001a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.987c-.003 5.451-4.437 9.885-9.888 9.885m8.413-18.297A11.815 11.815 0 0 0 12.004 0C5.383 0 .009 5.373.004 11.995c0 2.117.553 4.187 1.601 6.006L0 24l6.118-1.601a11.94 11.94 0 0 0 5.877 1.504h.005c6.621 0 11.995-5.373 12-11.994a11.92 11.92 0 0 0-3.504-8.486"/></svg>
                </button>
                <button className="bg-[#FFF7E0] border border-[#fbb040] text-[#fbb040] rounded px-2 py-2 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[#fbb040] focus:ring-opacity-50 hover:bg-[#fbb040]/10" title="Share on Facebook" onClick={() => handleShare('facebook')}>
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.326 24H12.82v-9.294H9.692v-3.622h3.127V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.324-.592 1.324-1.326V1.326C24 .592 23.405 0 22.675 0"/></svg>
                </button>
                <button className="bg-[#FFF7E0] border border-[#fbb040] text-[#fbb040] rounded px-2 py-2 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[#fbb040] focus:ring-opacity-50 hover:bg-[#fbb040]/10" title="Share on LinkedIn" onClick={() => handleShare('linkedin')}>
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.327-.027-3.037-1.849-3.037-1.851 0-2.132 1.445-2.132 2.939v5.667H9.358V9h3.414v1.561h.049c.476-.899 1.637-1.849 3.37-1.849 3.602 0 4.267 2.369 4.267 5.455v6.285zM5.337 7.433c-1.144 0-2.069-.926-2.069-2.068 0-1.143.925-2.069 2.069-2.069 1.143 0 2.068.926 2.068 2.069 0 1.142-.925 2.068-2.068 2.068zm1.777 13.019H3.56V9h3.554v11.452zM22.225 0H1.771C.792 0 0 .771 0 1.723v20.549C0 23.229.792 24 1.771 24h20.451C23.2 24 24 23.229 24 22.271V1.723C24 .771 23.2 0 22.225 0z"/></svg>
                </button>
              </div>
              <div className="font-semibold mb-2">Or invite friends through email</div>
              <div className="flex gap-2 mb-2 flex-wrap">
                <input type="email" className="border rounded px-3 py-2 flex-1 min-w-[220px]" placeholder="Add email address" value={email} onChange={e => setEmail(e.target.value)} />
                <button className="bg-[#FFF7E0] border border-[#fbb040] text-[#fbb040] rounded px-4 py-2 font-semibold flex items-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-[#fbb040] focus:ring-opacity-50 hover:bg-[#fbb040]/10" onClick={handleSend}>
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 2L11 13"/><path d="M22 2L15 22l-4-9-9-4 20-7z"/></svg>
                  Send
                </button>
              </div>
              <div className="text-xs text-gray-500 mb-2">Separate emails with commas</div>
              <hr className="my-4" />
              <div className="mb-1 text-sm text-gray-700 font-semibold">Total Database credits earned</div>
              <div className="flex items-center gap-2 mb-1">
                <svg width="24" height="24" fill="none" stroke="#6b7280" strokeWidth="2" viewBox="0 0 24 24"><ellipse cx="12" cy="12" rx="10" ry="10" fill="#e5e7eb"/><ellipse cx="12" cy="12" rx="8" ry="8" fill="#fff"/><path d="M8 15c.5-1 1.5-2 4-2s3.5 1 4 2" stroke="#6b7280" strokeWidth="1.5"/><circle cx="9.5" cy="10" r="1" fill="#6b7280"/><circle cx="14.5" cy="10" r="1" fill="#6b7280"/></svg>
                <span className="text-2xl font-bold text-gray-900">0</span>
                <span className="text-gray-700 font-semibold">of 2500</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                from 0 referrals
                <svg width="16" height="16" fill="none" stroke="#6b7280" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><circle cx="12" cy="8" r="1"/></svg>
              </div>
            </div>
            {/* Referrals table */}
            <div className="bg-white rounded-xl shadow-md border border-[#fbb040]/30 p-6 mt-6">
              <div className="font-semibold mb-2">Your Referrals (0)</div>
              <div className="grid grid-cols-3 gap-2 text-gray-500 text-xs font-semibold mb-2">
                <div>Referral name</div>
                <div>Status</div>
                <div>Updated on</div>
              </div>
              <div className="flex flex-col items-center justify-center py-8">
                <div className="flex gap-2 mb-2">
                  <span className="inline-block w-10 h-10 rounded-full bg-[#FFF7E0] border border-[#fbb040]/30" />
                  <span className="inline-block w-10 h-10 rounded-full bg-[#FFF7E0] border border-[#fbb040]/30" />
                  <span className="inline-block w-10 h-10 rounded-full bg-[#FFF7E0] border border-[#fbb040]/30" />
                </div>
                <div className="font-semibold text-gray-700">No Referrals</div>
                <div className="text-gray-500 text-sm text-center">You do not have any referrals yet. Track your referrals here after they sign up.</div>
              </div>
            </div>
          </div>
          {/* Right: Info box */}
          <div className="w-full md:w-80 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-md border border-[#fbb040]/30 p-6 mb-4">
              <div className="font-semibold mb-2 text-[#fbb040]">It is easy to earn with referrals</div>
              <ul className="text-gray-700 text-sm mb-2 space-y-2">
                <li className="flex items-center gap-2"><svg width="18" height="18" fill="none" stroke="#fbb040" strokeWidth="2" viewBox="0 0 24 24"><circle cx="9" cy="7" r="4"/><path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/></svg> Invite your friends from other companies with a unique referral link</li>
                <li className="flex items-center gap-2"><svg width="18" height="18" fill="none" stroke="#fbb040" strokeWidth="2" viewBox="0 0 24 24"><circle cx="9" cy="7" r="4"/><path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/></svg> When your friends join OJK Jobs, they'll get <b className='text-[#fbb040]'>50 Database credits</b> on their first job activation.</li>
                <li className="flex items-center gap-2"><svg width="18" height="18" fill="none" stroke="#fbb040" strokeWidth="2" viewBox="0 0 24 24"><circle cx="9" cy="7" r="4"/><path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/></svg> Once your friend's first job is activated, you'll earn <b className='text-[#fbb040]'>100 Database credits</b> for free</li>
              </ul>
              <a href="#" className="text-[#fbb040] underline text-xs font-semibold hover:text-[#fbb040]/80 transition-colors">Terms & conditions apply</a>
            </div>
            <img src="/assets/ojk-logo.png" alt="Refer" className="w-40 h-40 mx-auto mt-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferAndEarn;
