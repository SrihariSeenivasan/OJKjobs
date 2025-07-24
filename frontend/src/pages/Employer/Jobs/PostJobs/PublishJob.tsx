import React, { useState } from "react";
import Stepper from "../../Common/Stepper";
import PostJobHeader from "./PostJobHeader";

const plans = [
	{
		key: "premium_ai",
		title: "Premium Job + AI Calling Agent",
		price: 2999,
		oldPrice: 3999,
		discount: "25% OFF",
		recommended: true,
		features: [
			"Job will be active for 15 days",
			"Higher visibility",
			"Whatsapp notifications to top candidates",
			"Featured with 'Urgently hiring' tag",
			"AI Calling Agent",
		],
		demo: true,
		posted: "3200 recruiters posted in last 1 month.",
	},
	{
		key: "premium",
		title: "Premium Job",
		price: 1299,
		features: [
			"Job will be active for 15 days",
			"Higher visibility",
			"Whatsapp notifications to top candidates",
			"Featured with 'Urgently hiring' tag",
		],
		ai: false,
	},
	{
		key: "classic",
		title: "Classic Job",
		price: 649,
		features: [
			"Job will be active for 15 days",
			"Basic visibility",
			"AI Calling Agent",
		],
		ai: false,
	},
];

const PublishJob: React.FC = () => {
	const [selectedPlan, setSelectedPlan] = useState("premium_ai");
	const [couponApplied, setCouponApplied] = useState(true);
	const [showCouponModal, setShowCouponModal] = useState(false);
	// Dynamic values based on selected plan
	const planObj = plans.find((p) => p.key === selectedPlan);
	const basePrice = planObj?.oldPrice || planObj?.price || 0;
	const discount =
		couponApplied && planObj?.oldPrice ? planObj.oldPrice - planObj.price : 0;
	const subTotal = planObj?.price || 0;
	const gst = Math.round(subTotal * 0.18);
	const total = subTotal + gst;

	return (
		<div className="bg-[#FAFAFA] min-h-screen w-full flex flex-col items-center">
			{/* Header bar */}
			<PostJobHeader />
			{/* Stepper at top */}
			<div className="w-full max-w-4xl bg-white  rounded-3xl border-2 shadow-xl p-4 sm:p-10 mt-8 mb-8">
				<Stepper
					steps={[
						"Job Details",
						"Candidate Requirements",
						"Interviewer information",
						"Review & Post",
					]}
					activeStep={4}
				/>
			

			<div className="w-full max-w-4xl mx-auto px-2 md:px-0 mt-2 mb-8">
				<h2 className="text-center text-2xl md:text-3xl font-bold mb-6 text-[#253858]">
					Choose a job basis your hiring needs
				</h2>
				<div className="flex flex-col md:flex-row gap-4 md:gap-6 mb-6">
					{plans.map((plan) => (
						<div
							key={plan.key}
							className={`flex-1 bg-white rounded-2xl border ${
								selectedPlan === plan.key
									? "border-[#fbb040] shadow-xl"
									: "border-[#E5E7EB]"
							} p-4 md:p-6 relative transition-all cursor-pointer hover:shadow-lg group`}
							onClick={() => setSelectedPlan(plan.key)}
						>
							{plan.recommended && (
								<div className="absolute -top-4 left-4 bg-[#fbb040] text-white text-xs px-3 py-1 rounded-t-xl shadow font-bold">
									Recommended for busy professionals
								</div>
							)}
							<div className="flex items-center justify-between mb-2">
								<div className="font-bold text-lg md:text-xl text-[#253858] group-hover:text-[#fbb040] transition-colors">
									{plan.title}
								</div>
								{plan.discount && (
									<span className="bg-[#FFF7E0] text-[#fbb040] text-xs font-bold px-2 py-1 rounded">
										{plan.discount}
									</span>
								)}
							</div>
							<div className="text-2xl md:text-3xl font-bold text-[#253858] mb-2 group-hover:text-[#fbb040] transition-colors">
								₹{plan.price}{" "}
								{plan.oldPrice && (
									<span className="text-[#A0AEC0] line-through text-base ml-2">
										₹{plan.oldPrice}
									</span>
								)}
							</div>
							<ul className="mb-2 text-sm">
								{plan.features.map((f, i) => (
									<li key={i} className="flex items-center gap-2 mb-1">
										<span
											className={`inline-block w-4 h-4 rounded-full text-xs flex items-center justify-center ${
												selectedPlan === plan.key
													? "bg-[#fbb040] text-white"
													: "bg-[#FFF7E0] text-[#fbb040]"
											}`}
										>
											✓
										</span>
										<span className="text-[#253858]">{f}</span>
									</li>
								))}
							</ul>
							{plan.demo && (
								<div className="bg-[#FFF7E0] rounded p-2 mt-2 flex items-center gap-2">
									<span className="font-semibold text-xs text-[#253858]">
										Listen to demo
									</span>
									<div className="flex gap-1">
										<span className="bg-[#FFF7E0] px-2 py-1 rounded text-xs text-[#fbb040] border border-[#fbb040]">
											Agent
										</span>
										<span className="bg-[#FFF7E0] px-2 py-1 rounded text-xs text-[#fbb040] border border-[#fbb040]">
											Employer
										</span>
										<span className="bg-[#FFF7E0] px-2 py-1 rounded text-xs text-[#fbb040] border border-[#fbb040]">
											Candidate
										</span>
									</div>
								</div>
							)}
							{plan.posted && (
								<div className="text-xs text-[#fbb040] mt-2 font-semibold">
									{plan.posted}
								</div>
							)}
							<input
								type="radio"
								checked={selectedPlan === plan.key}
								readOnly
								className="absolute top-4 right-4"
							/>
						</div>
					))}
				</div>
				<div className="text-xs text-[#A0AEC0] mb-6">
					*All prices are excluding taxes.
				</div>

				{/* Checkout Section */}
				<div className="bg-white rounded-xl border border-[#fbb040] shadow p-6 mb-6">
					<h3 className="font-bold text-lg text-[#253858] mb-4">Checkout</h3>
					<div className="mb-4">
						<div className="flex items-center justify-between mb-2">
							<span className="font-semibold text-sm text-[#253858]">Coupon</span>
							<button
								className="text-[#fbb040] underline text-xs font-medium"
								onClick={() => setShowCouponModal(true)}
							>
								{couponApplied ? "Change" : "Apply"}
							</button>
						</div>
						{couponApplied ? (
							<div className="bg-[#FFF7E0] rounded p-3 text-xs text-[#253858] flex items-center gap-2 border border-[#fbb040]">
								<span className="font-semibold text-[#fbb040]">
									LAUNCH_25 applied 🎉
								</span>
								<span>
									You are saving{" "}
									<span className="font-bold">₹{discount}</span> with this coupon
								</span>
							</div>
						) : (
							<div className="bg-[#FFF7E0] rounded p-3 text-xs text-[#253858] flex items-center gap-2 border border-[#fbb040]">
								<span className="font-semibold text-[#fbb040]">
									No coupon applied
								</span>
								<span>Apply a coupon to save more!</span>
							</div>
						)}
						{/* Coupon Modal Popup */}
						{showCouponModal && (
							<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
								<div className="bg-white rounded-2xl shadow-2xl border border-[#fbb040] w-[400px] max-w-full p-8 relative animate-fade-in">
									{/* Header */}
									<div className="flex items-center justify-between mb-6">
										<span className="font-bold text-xl text-[#253858] flex items-center gap-2">
											<svg
												width="22"
												height="22"
												fill="none"
												viewBox="0 0 24 24"
											>
												<rect
													x="2"
													y="6"
													width="20"
													height="12"
													rx="3"
													fill="#FFF7E0"
												/>
												<path
													d="M6 10h.01M6 14h.01M12 10h.01M12 14h.01M18 10h.01M18 14h.01"
													stroke="#fbb040"
													strokeWidth="2"
													strokeLinecap="round"
												/>
											</svg>
											Add coupon
										</span>
										<button
											className="text-[#253858] text-2xl font-bold hover:bg-[#FFF7E0] rounded-full w-8 h-8 flex items-center justify-center"
											type="button"
											aria-label="Close"
											onClick={() => setShowCouponModal(false)}
										>
											&times;
										</button>
									</div>
									{/* Coupon input */}
									<div className="mb-4">
										<label className="block text-sm font-semibold text-[#253858] mb-2">
											Enter coupon code
										</label>
										<div className="flex gap-2">
											<input
												type="text"
												className="border rounded-lg px-3 py-2 w-full text-sm focus:border-[#fbb040]"
												placeholder="e.g. LAUNCH_25"
												value={couponApplied ? "LAUNCH_25" : ""}
												readOnly
											/>
											<button
												className={`bg-[#fbb040] text-white font-semibold px-4 py-2 rounded-lg text-sm ${
													couponApplied
														? "opacity-50 cursor-not-allowed"
														: ""
												}`}
												disabled={couponApplied}
												onClick={() => {
													setCouponApplied(true);
													setShowCouponModal(false);
												}}
											>
												Apply
											</button>
										</div>
									</div>
									{/* Available coupons */}
									<div className="font-semibold text-sm text-[#253858] mb-2 mt-4">
										Available coupons
									</div>
									<div
										className={`bg-[#FFF7E0] rounded-xl p-4 text-sm text-[#253858] flex items-center gap-3 border ${
											couponApplied ? "border-[#fbb040]" : "border-[#A0AEC0]"
										} cursor-pointer mb-2 transition-all duration-200`}
										onClick={() => {
											setCouponApplied(true);
										}}
									>
										<span className="inline-block w-6 h-6 bg-[#fbb040] rounded-full text-white text-base flex items-center justify-center mr-2">
											&#10003;
										</span>
										<div>
											<span className="font-semibold text-[#fbb040]">
												LAUNCH_25 applied 🎉
											</span>
											<br />
											<span>
												You are saving{" "}
												<span className="font-bold">₹{discount}</span> with this
												coupon
											</span>
										</div>
									</div>
									{/* Info box */}
									<div className="bg-[#FFF7E0] rounded-lg p-3 text-xs text-[#fbb040] mt-2 flex items-center gap-2">
										<svg
											width="16"
											height="16"
											fill="none"
											viewBox="0 0 24 24"
										>
											<circle
												cx="12"
												cy="12"
												r="10"
												stroke="#fbb040"
												strokeWidth="2"
											/>
											<path
												d="M12 16v-4"
												stroke="#fbb040"
												strokeWidth="2"
											/>
											<circle cx="12" cy="8" r="1" fill="#fbb040" />
										</svg>
										Only one coupon can be applied per purchase. Coupon is
										auto-applied if eligible.
									</div>
								</div>
							</div>
						)}
					</div>
					<div className="mb-4">
						<h4 className="font-bold text-sm text-[#253858] mb-2">
							Purchase Summary
						</h4>
						<div className="flex justify-between text-sm mb-1">
							<span>{planObj?.title || "Job"}</span>
							<span>₹{basePrice}</span>
						</div>
						<div className="flex justify-between text-sm mb-1">
							<span>Job discount</span>
							<span className="text-[#fbb040]">- ₹{discount}</span>
						</div>
						<div className="flex justify-between text-sm mb-1">
							<span>Sub total</span>
							<span>₹{subTotal}</span>
						</div>
						<div className="flex justify-between text-sm mb-1">
							<span>
								GST (18%){" "}
								<span className="text-xs underline cursor-pointer">
									GSTIN: 27AAMC8479M1ZI
								</span>
							</span>
							<span>₹{gst}</span>
						</div>
						<div className="flex justify-between text-base font-bold mt-2">
							<span>Total (inc tax)</span>
							<span>₹{total}</span>
						</div>
					</div>
					<div className="bg-[#FFF7E0] rounded p-2 text-xs text-[#fbb040] font-semibold mb-2">
						🎉 Yay! You're saving ₹{discount} on this purchase
					</div>
					<div className="text-[10px] text-[#A0AEC0]">
						We ensure fair use and privacy. Policy violations or fraud may result
						in suspension and loss of fees. KYC verification is mandatory for
						unregistered users to activate subscriptions.
					</div>
				</div>

				{/* Trusted logos */}
				<div className="flex flex-wrap gap-4 items-center justify-center mb-6">
					{["Paytm", "Zomato", "Urban Company", "Uber", "Swiggy", "HDFC BANK"].map(
						(logo, i) => (
							<div
								key={i}
								className="bg-white border border-[#fbb040] rounded px-4 py-2 text-xs text-[#253858] font-semibold flex items-center gap-2"
							>
								<span>{logo}</span>
							</div>
						)
					)}
                    {/* Payment bar */}
			<div className="fixed bottom-0 left-0 w-full bg-[#FFF7E0] border-t border-[#fbb040] py-4 px-4 flex flex-col sm:flex-row items-center justify-between z-10 gap-2">
				<span className="text-[#fbb040] font-semibold text-sm text-center sm:text-left">
					Yay! You're saving ₹{discount} on the {planObj?.title}
				</span>
				<button className="bg-[#fbb040] hover:bg-[#e6a900] text-white font-bold px-6 py-2 rounded shadow transition-colors w-full sm:w-auto">
					Proceed to pay ₹{total}
				</button>
			</div>
				</div>
			</div>

			
		</div>
        </div>
	);
};

export default PublishJob;
