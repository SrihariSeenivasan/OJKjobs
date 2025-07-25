
import { useState } from "react";

const mockCredits = {
  job: 0,
  database: 0,
};

const mockTransactions = [
  { detail: "Credits Expired", desc: "Due to expiry of validity period", credits: "-30 Database credits", date: "10 May 2025 4:00:26 AM" },
  { detail: "Credits Expired", desc: "Due to expiry of validity period", credits: "-7 Database credits", date: "01 May 2025 4:00:17 AM" },
  { detail: "Credits Added", desc: "Complimentary from Apna", credits: "+20 Database credits", date: "27 Apr 2025 10:25:31 AM" },
  { detail: "Credits Spent", desc: "Viewed phone number", credits: "-1 Database credits", date: "24 Apr 2025 3:49:49 PM" },
  { detail: "Credits Added", desc: "Complimentary from Apna", credits: "+10 Database credits", date: "24 Apr 2025 10:25:31 AM" },
  { detail: "Credits Spent", desc: "Viewed phone number", credits: "-1 Database credits", date: "17 Apr 2025 12:47:15 PM" },
  { detail: "Credits Expired", desc: "Due to expiry of validity period", credits: "-26 Database credits", date: "17 Apr 2025 4:00:17 AM" },
];

const RESULTS_PER_PAGE = 7;


// Mock data for previous coins
const mockCoinsTransactions = [
  { detail: "Coins Spent", desc: "Posted Job #427707043", coins: "- 599", status: "Success", date: "23 Apr 2024 12:55:59 PM", action: "Download Invoice", jobId: "427707043" },
  { detail: "Coins Added", desc: "Purchased", coins: "+ 599", status: "Success", date: "23 Apr 2024 12:44:04 PM", action: "", jobId: null },
  { detail: "Coins Spent", desc: "Posted Job #408669497", coins: "- 500", status: "Success", date: "09 Dec 2023 12:47:20 PM", action: "Download Invoice", jobId: "408669497" },
  { detail: "Coins Added", desc: "Purchased", coins: "+ 500", status: "Success", date: "09 Dec 2023 12:46:09 PM", action: "", jobId: null },
  { detail: "Coins Spent", desc: "Posted Job #440973093", coins: "- 500", status: "Success", date: "18 Nov 2023 6:25:32 PM", action: "Download Invoice", jobId: "440973093" },
  { detail: "Coins Added", desc: "Purchased", coins: "+ 500", status: "Success", date: "18 Nov 2023 6:25:22 PM", action: "", jobId: null },
  { detail: "Coins Spent", desc: "Posted Job #345853881", coins: "- 500", status: "Success", date: "25 Sep 2023 5:45:58 PM", action: "Download Invoice", jobId: "345853881" },
  { detail: "Coins Added", desc: "Purchased", coins: "+ 500", status: "Success", date: "25 Sep 2023 5:47:04 PM", action: "", jobId: null },
  { detail: "Coins Spent", desc: "Posted Job #395631952", coins: "- 500", status: "Success", date: "09 Sep 2023 7:39:58 PM", action: "Download Invoice", jobId: "395631952" },
  { detail: "Coins Added", desc: "Purchased", coins: "+ 500", status: "Success", date: "09 Sep 2023 7:39:58 PM", action: "", jobId: null },
];
const COINS_RESULTS_PER_PAGE = 10;


const creditFilters = [
  { label: "All", value: "all" },
  { label: "Credits added", value: "added" },
  { label: "Credits spent", value: "spent" },
  { label: "Credits returned", value: "returned" },
];
const coinsFilters = [
  { label: "All", value: "all" },
  { label: "Coins added", value: "added" },
  { label: "Coins spent", value: "spent" },
  { label: "Coins returned", value: "returned" },
  { label: "Invoices", value: "invoices" },
  { label: "Failed transactions", value: "failed" },
  { label: "Pending transactions", value: "pending" },
];

const CreditsAndUsage = () => {
  const [tab, setTab] = useState<'credits' | 'coins'>('credits');
  const [page, setPage] = useState(1);
  const [coinsPage, setCoinsPage] = useState(1);
  const [creditFilter, setCreditFilter] = useState('all');
  const [coinsFilter, setCoinsFilter] = useState('all');

  // Filtering logic for credits
  const filteredTransactions = mockTransactions.filter(t => {
    if (creditFilter === 'all') return true;
    if (creditFilter === 'added') return t.detail.toLowerCase().includes('added');
    if (creditFilter === 'spent') return t.detail.toLowerCase().includes('spent');
    if (creditFilter === 'returned') return t.detail.toLowerCase().includes('returned');
    return true;
  });
  const totalResults = filteredTransactions.length;
  const totalPages = Math.ceil(totalResults / RESULTS_PER_PAGE);
  const paginatedTransactions = filteredTransactions.slice((page - 1) * RESULTS_PER_PAGE, page * RESULTS_PER_PAGE);

  // Filtering logic for coins
  const filteredCoins = mockCoinsTransactions.filter(t => {
    if (coinsFilter === 'all') return true;
    if (coinsFilter === 'added') return t.detail.toLowerCase().includes('added');
    if (coinsFilter === 'spent') return t.detail.toLowerCase().includes('spent');
    if (coinsFilter === 'returned') return t.detail.toLowerCase().includes('returned');
    if (coinsFilter === 'invoices') return t.action && t.action.toLowerCase().includes('invoice');
    if (coinsFilter === 'failed') return t.status && t.status.toLowerCase().includes('failed');
    if (coinsFilter === 'pending') return t.status && t.status.toLowerCase().includes('pending');
    return true;
  });
  const coinsTotalResults = filteredCoins.length;
  const coinsTotalPages = Math.ceil(coinsTotalResults / COINS_RESULTS_PER_PAGE);
  const paginatedCoins = filteredCoins.slice((coinsPage - 1) * COINS_RESULTS_PER_PAGE, coinsPage * COINS_RESULTS_PER_PAGE);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) setPage(newPage);
  };
  const handleCoinsPageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= coinsTotalPages) setCoinsPage(newPage);
  };

  return (
    <div className="bg-[#FFF7E0] min-h-screen py-6 px-2 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-xl sm:text-2xl font-bold mb-2 text-[#253858]">Credits & Usage</h1>
        <div className="bg-[#FFF7E0] border border-[#fbb040] rounded-2xl flex flex-col md:flex-row items-center justify-between px-4 py-4 mb-4 shadow-sm">
          <div className="flex items-center gap-2 text-[#b97a13] text-sm">
            <span className="text-lg">⚠️</span>
            Evangelin, You’ve run out of credits <span className="font-bold">😔</span>
            <span className="hidden sm:inline">Your credit balance is exhausted. But no sweat – we’ve got a deal you cannot overlook! <span className="font-semibold text-[#fbb040]">Upgrade now to save upto ₹7800</span></span>
          </div>
          <button className="bg-[#fbb040] hover:bg-orange-500 text-white rounded-lg px-5 py-2 text-sm font-semibold ml-2 shadow transition-all duration-200">Buy Now</button>
        </div>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1 flex gap-4">
            <div className="bg-white rounded-2xl border border-[#fbb040]/20 shadow-lg flex-1 flex flex-col items-center py-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-[#FFF7E0] text-[#fbb040] rounded-full px-2 py-1 text-xs font-semibold border border-[#fbb040]/30">Job Credits</span>
              </div>
              <div className="text-2xl font-bold mb-1 text-[#253858]">{mockCredits.job} <span className="text-base font-normal text-gray-500">credits</span></div>
            </div>
            <div className="bg-white rounded-2xl border border-[#fbb040]/20 shadow-lg flex-1 flex flex-col items-center py-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-[#FFF7E0] text-[#fbb040] rounded-full px-2 py-1 text-xs font-semibold border border-[#fbb040]/30">Database Credits</span>
              </div>
              <div className="text-2xl font-bold mb-1 text-[#253858]">{mockCredits.database} <span className="text-base font-normal text-gray-500">credits</span></div>
            </div>
          </div>
          <div className="flex items-center bg-[#FFF7E0] border border-[#fbb040]/40 rounded-2xl px-4 py-3 flex-shrink-0 w-full md:w-96 shadow-sm">
            <svg width="32" height="32" fill="none" viewBox="0 0 32 32" className="mr-3"><rect width="32" height="32" rx="8" fill="#FFF7E0"/><path d="M10 16h12M16 10v12" stroke="#fbb040" strokeWidth="2" strokeLinecap="round"/></svg>
            <div className="text-[#b97a13] text-sm">New Update!<br />The Transaction history is now cleaner with all credit and debit related transactions from your apna account. To view your future payment related information and invoices, go to <a href="#" className="text-[#fbb040] underline">billing</a> section.</div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-[#fbb040]/20 shadow-lg p-4">
          <div className="flex gap-2 mb-4">
            <button onClick={() => setTab('credits')} className={`px-4 py-1 rounded-xl font-semibold text-sm border transition-all duration-200 ${tab === 'credits' ? 'bg-[#fbb040] text-white border-[#fbb040]' : 'bg-[#FFF7E0] text-gray-700 border-[#fbb040]/20 hover:bg-[#fbb040]/10'}`}>Credits</button>
            <button onClick={() => setTab('coins')} className={`px-4 py-1 rounded-xl font-semibold text-sm border transition-all duration-200 ${tab === 'coins' ? 'bg-[#fbb040] text-white border-[#fbb040]' : 'bg-[#FFF7E0] text-gray-700 border-[#fbb040]/20 hover:bg-[#fbb040]/10'}`}>Previous coins</button>
          </div>
          {tab === 'credits' && (
            <div>
              <div className="font-semibold mb-2">Transaction History</div>
              <div className="flex gap-2 mb-2">
                {creditFilters.map(f => (
                  <button
                    key={f.value}
                    className={`px-3 py-1 rounded-xl text-xs border font-semibold transition-all duration-200 ${creditFilter === f.value ? 'bg-[#fbb040] text-white border-[#fbb040]' : 'bg-[#FFF7E0] text-gray-700 border-[#fbb040]/20 hover:bg-[#fbb040]/10'}`}
                    onClick={() => { setCreditFilter(f.value); setPage(1); }}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-xs">
                  <thead>
                    <tr className="bg-[#FFF7E0] text-[#b97a13] font-semibold">
                      <th className="py-2 px-2 text-left">Transaction details</th>
                      <th className="py-2 px-2 text-left">Credits</th>
                      <th className="py-2 px-2 text-left">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedTransactions.map((t, i) => (
                      <tr key={i} className="border-b last:border-b-0">
                        <td className="py-2 px-2">
                          <div className="font-semibold text-[#253858]">{t.detail}</div>
                          <div className="text-gray-500">{t.desc}</div>
                        </td>
                        <td className="py-2 px-2 font-semibold text-[#fbb040]">{t.credits}</td>
                        <td className="py-2 px-2 text-gray-500">{t.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="text-xs text-gray-500">
                  Showing {((page - 1) * RESULTS_PER_PAGE) + 1}-{Math.min(page * RESULTS_PER_PAGE, totalResults)} of {totalResults} results
                </div>
                <div className="flex gap-1">
                  <button
                    className={`px-2 py-1 rounded-xl border text-xs font-semibold transition-all duration-200 ${page === 1 ? 'bg-[#FFF7E0] text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 border-[#fbb040]/20 hover:bg-[#fbb040]/10'}`}
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                  >
                    Prev
                  </button>
                  {Array.from({ length: totalPages }, (_, idx) => (
                    <button
                      key={idx}
                    className={`px-2 py-1 rounded-xl border text-xs font-semibold transition-all duration-200 ${page === idx + 1 ? 'bg-[#fbb040] text-white border-[#fbb040]' : 'bg-white text-gray-700 border-[#fbb040]/20 hover:bg-[#fbb040]/10'}`}
                      onClick={() => handlePageChange(idx + 1)}
                    >
                      {idx + 1}
                    </button>
                  ))}
                  <button
                    className={`px-2 py-1 rounded-xl border text-xs font-semibold transition-all duration-200 ${page === totalPages ? 'bg-[#FFF7E0] text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 border-[#fbb040]/20 hover:bg-[#fbb040]/10'}`}
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
          {tab === 'coins' && (
            <div>
              <div className="flex gap-2 mb-4">
                {coinsFilters.map(f => (
                  <button
                    key={f.value}
                    className={`px-3 py-1 rounded-xl text-xs border font-semibold transition-all duration-200 ${coinsFilter === f.value ? 'bg-[#fbb040] text-white border-[#fbb040]' : 'bg-[#FFF7E0] text-gray-700 border-[#fbb040]/20 hover:bg-[#fbb040]/10'}`}
                    onClick={() => { setCoinsFilter(f.value); setCoinsPage(1); }}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-xs">
                  <thead>
                    <tr className="bg-[#FFF7E0] text-[#b97a13] font-semibold">
                      <th className="py-2 px-2 text-left">Transaction details</th>
                      <th className="py-2 px-2 text-left">Coins</th>
                      <th className="py-2 px-2 text-left">Status</th>
                      <th className="py-2 px-2 text-left">Date</th>
                      <th className="py-2 px-2 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedCoins.map((t, i) => (
                      <tr key={i} className="border-b last:border-b-0">
                        <td className="py-2 px-2">
                          <div className="font-semibold text-[#253858]">{t.detail}</div>
                          <div className="text-[#fbb040] underline">
                            {t.jobId ? <a href={`#job${t.jobId}`}>{t.desc}</a> : t.desc}
                          </div>
                        </td>
                        <td className="py-2 px-2 font-semibold text-[#fbb040]">{t.coins}</td>
                        <td className="py-2 px-2">
                          <span className="bg-[#FFF7E0] text-[#fbb040] px-2 py-1 rounded-xl text-xs font-semibold border border-[#fbb040]/30">{t.status}</span>
                        </td>
                        <td className="py-2 px-2 text-gray-500">{t.date}</td>
                        <td className="py-2 px-2">
                          {t.action ? <a href="#" className="text-[#fbb040] underline text-xs">{t.action}</a> : ""}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="text-xs text-gray-500">
                  Showing {((coinsPage - 1) * COINS_RESULTS_PER_PAGE) + 1}-{Math.min(coinsPage * COINS_RESULTS_PER_PAGE, coinsTotalResults)} of {coinsTotalResults} results
                </div>
                <div className="flex gap-1">
                  <button
                    className={`px-2 py-1 rounded-xl border text-xs font-semibold transition-all duration-200 ${coinsPage === 1 ? 'bg-[#FFF7E0] text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 border-[#fbb040]/20 hover:bg-[#fbb040]/10'}`}
                    onClick={() => handleCoinsPageChange(coinsPage - 1)}
                    disabled={coinsPage === 1}
                  >
                    &lt;
                  </button>
                  {Array.from({ length: coinsTotalPages }, (_, idx) => (
                    <button
                      key={idx}
                    className={`px-2 py-1 rounded-xl border text-xs font-semibold transition-all duration-200 ${coinsPage === idx + 1 ? 'bg-[#fbb040] text-white border-[#fbb040]' : 'bg-white text-gray-700 border-[#fbb040]/20 hover:bg-[#fbb040]/10'}`}
                      onClick={() => handleCoinsPageChange(idx + 1)}
                    >
                      {idx + 1}
                    </button>
                  ))}
                  <button
                    className={`px-2 py-1 rounded-xl border text-xs font-semibold transition-all duration-200 ${coinsPage === coinsTotalPages ? 'bg-[#FFF7E0] text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 border-[#fbb040]/20 hover:bg-[#fbb040]/10'}`}
                    onClick={() => handleCoinsPageChange(coinsPage + 1)}
                    disabled={coinsPage === coinsTotalPages}
                  >
                    &gt;
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreditsAndUsage;
