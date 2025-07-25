import { Plus, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { loadPlans, savePlans } from '../../utils/planStorage';

type PlanType = 'boost' | 'credit';
export interface Plan {
  id: string;
  planType: PlanType;
  title: string;
  badge: string;
  badgeColor: string;
  price: string;
  priceDescription: string;
  subtitle: string;
  features: string[];
  popular: boolean;
  savings: string | null;
  status: 'active' | 'inactive';
}

const defaultPlans: Plan[] = [
  // Boosting/PublishJob plans
  {
    id: 'boost-premium',
    planType: 'boost',
    title: 'Premium Job + AI Calling Agent',
    badge: 'RECOMMENDED',
    badgeColor: 'bg-yellow-100 text-yellow-700',
    price: '2999',
    priceDescription: 'per job post',
    subtitle: 'Higher visibility, AI Calling Agent, and more',
    features: [
      'Job will be active for 15 days',
      'Higher visibility',
      'Whatsapp notifications to top candidates',
      "Featured with 'Urgently hiring' tag",
      'AI Calling Agent',
    ],
    popular: true,
    savings: 'Save 25%',
    status: 'active',
  },
  {
    id: 'boost-classic',
    planType: 'boost',
    title: 'Classic Job',
    badge: '',
    badgeColor: '',
    price: '649',
    priceDescription: 'per job post',
    subtitle: 'Basic visibility, AI Calling Agent',
    features: [
      'Job will be active for 15 days',
      'Basic visibility',
      'AI Calling Agent',
    ],
    popular: false,
    savings: '',
    status: 'active',
  },
  // Credit/BuyPackageSelection plans
  {
    id: 'credit-bundle-3',
    planType: 'credit',
    title: 'Bundle Plan (3 Months)',
    badge: 'POPULAR',
    badgeColor: 'bg-purple-100 text-purple-600',
    price: '3399',
    priceDescription: 'for 3 months',
    subtitle: '6 Job credits + 150 Database credits',
    features: [
      'Use these credits in 90 days',
      'Job will be active for 15 days',
      'AI driven matching algorithm',
      'AI-assisted Search',
      'Area wise filter',
    ],
    popular: true,
    savings: '45% OFF',
    status: 'active',
  },
  {
    id: 'credit-job-1',
    planType: 'credit',
    title: 'Job Posting Plan (1 Month)',
    badge: '',
    badgeColor: '',
    price: '1799',
    priceDescription: 'for 1 month',
    subtitle: '3 Job credits',
    features: [
      'Use these credits in 30 days',
      'Job will be active for 15 days',
      'AI driven matching algorithm',
      '15+ Advanced filters',
      'Whatsapp & Call based lead management',
    ],
    popular: false,
    savings: '7% OFF',
    status: 'active',
  },
];

const AdminSubscriptionPlan: React.FC = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPlan, setNewPlan] = useState<Plan>({
    id: '',
    planType: 'boost',
    title: '',
    badge: '',
    badgeColor: '',
    price: '',
    priceDescription: '',
    subtitle: '',
    features: [''],
    popular: false,
    savings: '',
    status: 'inactive',
  });

  // Load plans from storage on mount
  useEffect(() => {
    const stored = loadPlans();
    if (stored && stored.length > 0) setPlans(stored);
    else setPlans(defaultPlans);
  }, []);

  // Save plans to storage on change
  useEffect(() => {
    savePlans(plans);
  }, [plans]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, field: keyof Plan, isNew = false) => {
    const value = e.target.value;
    if (isNew) {
      setNewPlan(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleFeatureChange = (idx: number, value: string, isNew = false) => {
    if (isNew) {
      setNewPlan(prev => {
        const features = [...prev.features];
        features[idx] = value;
        return { ...prev, features };
      });
    }
  };

  const removeFeature = (idx: number, isNew = false) => {
    if (isNew) {
      setNewPlan(prev => {
        const features = prev.features.filter((_, i) => i !== idx);
        return { ...prev, features: features.length ? features : [''] };
      });
    }
  };

  const handleStatusChange = (status: 'active' | 'inactive', isNew = false) => {
    if (isNew) {
      setNewPlan({ ...newPlan, status });
    }
  };

  const handleAddPlan = () => {
    if (!newPlan.title || !newPlan.price) return;
    setPlans([...plans, { ...newPlan, id: `${newPlan.title.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}` }]);
    setNewPlan({
      id: '',
      planType: 'boost',
      title: '',
      badge: '',
      badgeColor: '',
      price: '',
      priceDescription: '',
      subtitle: '',
      features: [''],
      popular: false,
      savings: '',
      status: 'inactive',
    });
    setShowAddForm(false);
  };

  const FormField = ({ label, value, onChange, placeholder, type = 'text', className = '' }: {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    type?: string;
    className?: string;
  }) => (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700">{label}</label>
      <input
        type={type}
        className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${className}`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );

  const TextAreaField = ({ label, value, onChange, placeholder }: {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder: string;
  }) => (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700">{label}</label>
      <textarea
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={2}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Subscription Plans</h1>
            <p className="text-gray-600 mt-2">Manage and configure your subscription plans</p>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all shadow-lg font-medium"
          >
            <Plus size={20} />
            Add New Plan
          </button>
        </div>

        {/* Add New Plan Form */}
        {showAddForm && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Create New Plan</h3>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Plan Type</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={newPlan.planType}
                  onChange={e => handleChange(e, 'planType', true)}
                >
                  <option value="boost">Job Boosting (PublishJob)</option>
                  <option value="credit">Credit/Database/Bundle (BuyPackageSelection)</option>
                </select>
              </div>
              <FormField
                label="Plan Title"
                value={newPlan.title}
                onChange={e => handleChange(e, 'title', true)}
                placeholder="e.g., Premium Plan"
              />
              <FormField
                label="Badge Text"
                value={newPlan.badge}
                onChange={e => handleChange(e, 'badge', true)}
                placeholder="e.g., RECOMMENDED"
              />
              <FormField
                label="Badge Color"
                value={newPlan.badgeColor}
                onChange={e => handleChange(e, 'badgeColor', true)}
                placeholder="e.g., bg-yellow-100 text-yellow-700"
              />
              <FormField
                label="Price"
                value={newPlan.price}
                onChange={e => handleChange(e, 'price', true)}
                placeholder="e.g., ₹999"
              />
              <FormField
                label="Price Description"
                value={newPlan.priceDescription}
                onChange={e => handleChange(e, 'priceDescription', true)}
                placeholder="e.g., per month"
              />
              <FormField
                label="Savings Text"
                value={newPlan.savings || ''}
                onChange={e => handleChange(e, 'savings', true)}
                placeholder="e.g., Save 20%"
              />
            </div>
            <div className="mt-6">
              <TextAreaField
                label="Subtitle"
                value={newPlan.subtitle}
                onChange={e => handleChange(e, 'subtitle', true)}
                placeholder="Brief description of the plan"
              />
            </div>
            <div className="mt-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">Features</label>
              <div className="space-y-3">
                {newPlan.features.map((feature, fidx) => (
                  <div key={`feature-input-${fidx}`} className="flex gap-2">
                    <input
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      value={feature}
                      onChange={e => handleFeatureChange(fidx, e.target.value, true)}
                      placeholder={`Feature ${fidx + 1}`}
                    />
                    {newPlan.features.length > 1 && (
                      <button
                        onClick={() => removeFeature(fidx, true)}
                        className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button
                onClick={() => setNewPlan(prev => ({ ...prev, features: [...prev.features, ''] }))}
                className="mt-3 text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
              >
                <Plus size={16} />
                Add Feature
              </button>
            </div>
            <div className="mt-6 flex items-center gap-4">
              <label className="text-sm font-semibold text-gray-700">Status:</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="newStatus"
                    value="active"
                    checked={newPlan.status === 'active'}
                    onChange={() => handleStatusChange('active', true)}
                    className="text-blue-600"
                  />
                  <span className="text-sm">Active</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="newStatus"
                    value="inactive"
                    checked={newPlan.status === 'inactive'}
                    onChange={() => handleStatusChange('inactive', true)}
                    className="text-blue-600"
                  />
                  <span className="text-sm">Inactive</span>
                </label>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={() => setShowAddForm(false)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleAddPlan}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium shadow-lg"
              >
                Create Plan
              </button>
            </div>
          </div>
        )}

        {/* Boosting Plans Section */}
        <h2 className="text-2xl font-bold text-blue-700 mt-10 mb-4">Job Boosting Plans (PublishJob)</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
          {plans.filter(p => p.planType === 'boost').map((plan) => (
            <div key={plan.id} className={`bg-white rounded-xl shadow-lg overflow-hidden border-2 transition-all hover:shadow-xl ${plan.status === 'inactive' ? 'opacity-60' : ''} ${plan.popular ? 'border-purple-200' : 'border-gray-200'}`}>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{plan.title}</h3>
                    <div className="flex gap-2 mt-1">
                      {plan.badge && <span className={`px-2 py-1 rounded-full text-xs font-semibold ${plan.badgeColor}`}>{plan.badge}</span>}
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${plan.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-600'}`}>{plan.status}</span>
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="text-3xl font-bold text-gray-900 mb-1">₹{plan.price}<span className="text-base font-normal text-gray-600 ml-1">{plan.priceDescription}</span></div>
                  <p className="text-gray-600 text-sm">{plan.subtitle}</p>
                </div>
                {plan.savings && <div className="mb-4 p-2 bg-green-50 rounded-lg"><span className="text-green-700 font-semibold text-sm">{plan.savings}</span></div>}
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900 text-sm">Features:</h4>
                  <ul className="space-y-1">
                    {plan.features.map((feature, fidx) => (
                      <li key={fidx} className="text-sm text-gray-600 flex items-start gap-2">
                        <div className="w-1 h-1 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Credit/Database/Bundle Plans Section */}
        <h2 className="text-2xl font-bold text-purple-700 mt-10 mb-4">Credit/Database/Bundle Plans (BuyPackageSelection)</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {plans.filter(p => p.planType === 'credit').map((plan) => (
            <div key={plan.id} className={`bg-white rounded-xl shadow-lg overflow-hidden border-2 transition-all hover:shadow-xl ${plan.status === 'inactive' ? 'opacity-60' : ''} ${plan.popular ? 'border-purple-200' : 'border-gray-200'}`}>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{plan.title}</h3>
                    <div className="flex gap-2 mt-1">
                      {plan.badge && <span className={`px-2 py-1 rounded-full text-xs font-semibold ${plan.badgeColor}`}>{plan.badge}</span>}
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${plan.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-600'}`}>{plan.status}</span>
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="text-3xl font-bold text-gray-900 mb-1">₹{plan.price}<span className="text-base font-normal text-gray-600 ml-1">{plan.priceDescription}</span></div>
                  <p className="text-gray-600 text-sm">{plan.subtitle}</p>
                </div>
                {plan.savings && <div className="mb-4 p-2 bg-green-50 rounded-lg"><span className="text-green-700 font-semibold text-sm">{plan.savings}</span></div>}
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900 text-sm">Features:</h4>
                  <ul className="space-y-1">
                    {plan.features.map((feature, fidx) => (
                      <li key={fidx} className="text-sm text-gray-600 flex items-start gap-2">
                        <div className="w-1 h-1 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminSubscriptionPlan;
