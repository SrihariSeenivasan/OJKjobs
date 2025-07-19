import { ArrowRight, CheckCircle, Clock, Shield, Star, Users, X, Zap } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface PlanPopupProps {
  isOpen?: boolean;
  onClose?: () => void;
  onPlanSelect?: (planType: 'free-trial' | 'subscription' | 'yearly') => void;
}

const PlanPopup: React.FC<PlanPopupProps> = ({
  isOpen = true,
  onClose = () => {},
  onPlanSelect = () => {}
}) => {
  const [selectedPlan, setSelectedPlan] = useState<'free-trial' | 'subscription' | 'yearly' | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  // Removed unused showTooltip state

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePlanSelect = (planType: 'free-trial' | 'subscription' | 'yearly') => {
    setSelectedPlan(planType);
    onPlanSelect(planType);
  };

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(onClose, 200);
  };

  const plans = [
    {
      id: 'free-trial',
      title: 'Starter Plan',
      badge: 'FREE TRIAL',
      badgeColor: 'bg-green-100 text-green-600',
      price: '₹0',
      priceDescription: 'for your first job post',
      subtitle: 'Then ₹99 for each additional job post',
      icon: Zap,
      iconColor: 'text-yellow-500',
      borderColor: 'blue',
      features: [
        'Perfect for testing our platform',
        'No upfront commitment',
        'Pay-as-you-go after first post',
        'Basic candidate filtering'
      ],
      popular: false,
      savings: null
    },
    {
      id: 'subscription',
      title: 'Continuous Plan',
      badge: 'RECOMMENDED',
      badgeColor: 'bg-purple-100 text-purple-600',
      price: '₹99',
      priceDescription: 'per job post',
      subtitle: 'Consistent pricing from the start for all job posts',
      icon: Users,
      iconColor: 'text-purple-500',
      borderColor: 'purple',
      features: [
        'Predictable pricing structure',
        'Ideal for regular hiring',
        'No surprises in billing',
        'Advanced candidate analytics',
        'Email support'
      ],
      popular: true,
      savings: null
    },
    {
      id: 'yearly',
      title: 'Yearly Plan',
      badge: 'BEST VALUE',
      badgeColor: 'bg-yellow-100 text-yellow-700',
      price: '₹999',
      priceDescription: 'per year',
      subtitle: 'Unlimited job posts for 1 year',
      icon: Star,
      iconColor: 'text-yellow-500',
      borderColor: 'yellow',
      features: [
        'Best value for high volume hiring',
        'Unlimited posts for 12 months',
        'Priority support',
        'Advanced analytics dashboard',
        'Custom branding options',
        'Dedicated account manager'
      ],
      popular: false,
      savings: 'Save up to 75% vs per-post pricing'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className={`bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-xs sm:max-w-sm md:max-w-4xl lg:max-w-5xl xl:max-w-6xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto transition-all duration-300 ${
        isAnimating ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
      }`}>
        
        {/* Header */}
        <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white p-4 sm:p-6 rounded-t-xl sm:rounded-t-2xl">
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 text-white hover:text-gray-200 transition-colors p-1"
            aria-label="Close popup"
          >
            <X size={20} className="sm:w-6 sm:h-6" />
          </button>
          
          <div className="text-center sm:text-left">
            <h2 className="text-lg sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2 pr-8 sm:pr-0">
              Choose Your Job Posting Plan
            </h2>
            <p className="text-xs sm:text-base text-blue-100 opacity-90">
              Select the plan that works best for your hiring needs
            </p>
          </div>
          
          {/* Trust indicators */}
          <div className="mt-3 sm:mt-4 flex flex-wrap justify-center sm:justify-start gap-3 sm:gap-4 text-xs sm:text-sm text-blue-100">
            <div className="flex items-center gap-1">
              <Shield size={14} className="sm:w-4 sm:h-4" />
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={14} className="sm:w-4 sm:h-4" />
              <span>Cancel Anytime</span>
            </div>
          </div>
        </div>

        {/* Plans Container */}
        <div className="p-3 sm:p-6">
          {/* Mobile: Stacked Layout, Desktop: Horizontal Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {plans.map((plan) => {
              const Icon = plan.icon;
              const isSelected = selectedPlan === plan.id;
              
              return (
                <div
                  key={plan.id}
                  onClick={() => handlePlanSelect(plan.id as 'free-trial' | 'subscription' | 'yearly')}
                  className={`relative border-2 rounded-lg sm:rounded-xl p-4 sm:p-6 transition-all duration-300 cursor-pointer group ${
                    isSelected
                      ? `border-${plan.borderColor}-500 bg-${plan.borderColor}-50 shadow-lg scale-105`
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                  } ${plan.popular ? 'ring-2 ring-purple-200' : ''}`}
                >
                  {/* Popular badge for mobile */}
                  {plan.popular && (
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      Most Popular
                    </div>
                  )}

                  {/* Plan Header */}
                  <div className="flex items-start justify-between mb-3 sm:mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <div className={`${plan.badgeColor} px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold`}>
                          {plan.badge}
                        </div>
                        <Icon className={`${plan.iconColor} w-4 h-4 sm:w-5 sm:h-5`} />
                      </div>
                      <h3 className="text-base sm:text-xl font-bold text-gray-800 leading-tight">
                        {plan.title}
                      </h3>
                    </div>
                    {isSelected && (
                      <CheckCircle className={`text-${plan.borderColor}-500 w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0`} />
                    )}
                  </div>

                  {/* Pricing */}
                  <div className="mb-4 sm:mb-6">
                    <div className="flex items-baseline gap-2 sm:gap-3 mb-2 flex-wrap">
                      <div className="text-2xl sm:text-3xl font-bold text-gray-800">
                        {plan.price}
                      </div>
                      <div className="text-sm sm:text-base text-gray-600">
                        {plan.priceDescription}
                      </div>
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {plan.subtitle}
                    </div>
                    {plan.savings && (
                      <div className="mt-2 text-xs sm:text-sm text-green-600 font-semibold">
                        {plan.savings}
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  <div className="space-y-2 mb-4 sm:mb-6">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-2 text-xs sm:text-sm text-gray-700">
                        <CheckCircle className="text-green-500 w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button at bottom */}
                  <div className="absolute left-0 bottom-0 w-full p-4">
                    <button
                      onClick={() => handlePlanSelect(plan.id as 'free-trial' | 'subscription' | 'yearly')}
                      className={`w-full bg-gradient-to-r from-${plan.borderColor}-500 to-${plan.borderColor}-600 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold hover:from-${plan.borderColor}-600 hover:to-${plan.borderColor}-700 transition-all duration-200 transform hover:scale-105 text-sm sm:text-base flex items-center justify-center gap-2 group-hover:shadow-lg`}
                    >
                      <span>
                        {plan.id === 'free-trial' ? 'Start Free Trial' : 
                         plan.id === 'subscription' ? 'Choose Plan' : 
                         'Get Best Value'}
                      </span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Additional Info Section */}
          <div className="mt-6 sm:mt-8 bg-gray-50 rounded-lg p-4 sm:p-6">
            <div className="text-center">
              <h4 className="text-sm sm:text-base font-semibold text-gray-800 mb-2">
                All plans include:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <CheckCircle className="text-green-500 w-3 h-3 sm:w-4 sm:h-4" />
                  <span>Full platform access</span>
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <CheckCircle className="text-green-500 w-3 h-3 sm:w-4 sm:h-4" />
                  <span>Candidate management</span>
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <CheckCircle className="text-green-500 w-3 h-3 sm:w-4 sm:h-4" />
                  <span>Application tracking</span>
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <CheckCircle className="text-green-500 w-3 h-3 sm:w-4 sm:h-4" />
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>
          </div>

          {/* Money-back guarantee */}
          <div className="mt-4 text-center">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm text-gray-600 bg-green-50 px-3 sm:px-4 py-2 rounded-full">
              <Shield className="text-green-600 w-3 h-3 sm:w-4 sm:h-4" />
              <span>30-day money-back guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanPopup;