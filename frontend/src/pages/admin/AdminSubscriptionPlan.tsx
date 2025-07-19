import { Edit3, Plus, Save, Star, Users, X, Zap } from 'lucide-react';
import React, { useState } from 'react';

interface Plan {
  id: string;
  title: string;
  badge: string;
  badgeColor: string;
  price: string;
  priceDescription: string;
  subtitle: string;
  icon: string;
  iconColor: string;
  borderColor: string;
  features: string[];
  popular: boolean;
  savings: string | null;
  status: 'active' | 'inactive';
}

const defaultPlans: Plan[] = [
  {
    id: 'free-trial',
    title: 'Starter Plan',
    badge: 'FREE TRIAL',
    badgeColor: 'bg-green-100 text-green-600',
    price: '₹0',
    priceDescription: 'for your first job post',
    subtitle: 'Then ₹99 for each additional job post',
    icon: 'Zap',
    iconColor: 'text-yellow-500',
    borderColor: 'blue',
    features: [
      'Perfect for testing our platform',
      'No upfront commitment',
      'Pay-as-you-go after first post',
      'Basic candidate filtering'
    ],
    popular: false,
    savings: null,
    status: 'active'
  },
  {
    id: 'subscription',
    title: 'Continuous Plan',
    badge: 'RECOMMENDED',
    badgeColor: 'bg-purple-100 text-purple-600',
    price: '₹99',
    priceDescription: 'per job post',
    subtitle: 'Consistent pricing from the start for all job posts',
    icon: 'Users',
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
    savings: null,
    status: 'active'
  },
  {
    id: 'yearly',
    title: 'Yearly Plan',
    badge: 'BEST VALUE',
    badgeColor: 'bg-yellow-100 text-yellow-700',
    price: '₹999',
    priceDescription: 'per year',
    subtitle: 'Unlimited job posts for 1 year',
    icon: 'Star',
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
    savings: 'Save up to 75% vs per-post pricing',
    status: 'active'
  }
];

const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case 'Users': return Users;
    case 'Star': return Star;
    default: return Zap;
  }
};

const AdminSubscriptionPlan: React.FC = () => {
  const [plans, setPlans] = useState<Plan[]>(defaultPlans);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editPlan, setEditPlan] = useState<Plan | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPlan, setNewPlan] = useState<Plan>({
    id: '',
    title: '',
    badge: '',
    badgeColor: '',
    price: '',
    priceDescription: '',
    subtitle: '',
    icon: 'Zap',
    iconColor: '',
    borderColor: '',
    features: [''],
    popular: false,
    savings: '',
    status: 'inactive'
  });

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setEditPlan({ ...plans[index] });
  };

  const handleCancel = () => {
    setEditIndex(null);
    setEditPlan(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof Plan, isNew = false) => {
    const value = e.target.value;
    if (isNew) {
      setNewPlan(prev => ({ ...prev, [field]: value }));
    } else {
      setEditPlan(prev => prev ? { ...prev, [field]: value } : null);
    }
  };

  const handleFeatureChange = (idx: number, value: string, isNew = false) => {
    if (isNew) {
      setNewPlan(prev => {
        const features = [...prev.features];
        features[idx] = value;
        return { ...prev, features };
      });
    } else if (editPlan) {
      setEditPlan(prev => {
        if (!prev) return null;
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
    } else if (editPlan) {
      setEditPlan(prev => {
        if (!prev) return null;
        const features = prev.features.filter((_, i) => i !== idx);
        return { ...prev, features: features.length ? features : [''] };
      });
    }
  };

  const handleStatusChange = (status: 'active' | 'inactive', isNew = false) => {
    if (isNew) {
      setNewPlan({ ...newPlan, status });
    } else if (editPlan) {
      setEditPlan({ ...editPlan, status });
    }
  };

  const handleSave = () => {
    if (editIndex === null || !editPlan) return;
    const updatedPlans = [...plans];
    updatedPlans[editIndex] = editPlan;
    setPlans(updatedPlans);
    setEditIndex(null);
    setEditPlan(null);
  };

  const handleAddPlan = () => {
    if (!newPlan.title || !newPlan.price) return;
    setPlans([...plans, { ...newPlan, id: `${newPlan.title.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}` }]);
    setNewPlan({
      id: '',
      title: '',
      badge: '',
      badgeColor: '',
      price: '',
      priceDescription: '',
      subtitle: '',
      icon: 'Zap',
      iconColor: '',
      borderColor: '',
      features: [''],
      popular: false,
      savings: '',
      status: 'inactive'
    });
    setShowAddForm(false);
  };

  const FormField = ({ label, value, onChange, placeholder, type = "text", className = "" }: {
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
                label="Badge Color Classes"
                value={newPlan.badgeColor}
                onChange={e => handleChange(e, 'badgeColor', true)}
                placeholder="e.g., bg-green-100 text-green-600"
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
                label="Icon Name"
                value={newPlan.icon}
                onChange={e => handleChange(e, 'icon', true)}
                placeholder="Zap, Users, Star"
              />
              <FormField
                label="Icon Color"
                value={newPlan.iconColor}
                onChange={e => handleChange(e, 'iconColor', true)}
                placeholder="e.g., text-yellow-500"
              />
              <FormField
                label="Border Color"
                value={newPlan.borderColor}
                onChange={e => handleChange(e, 'borderColor', true)}
                placeholder="e.g., blue"
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

        {/* Plans List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {plans.map((plan, idx) => {
            const IconComponent = getIconComponent(plan.icon);
            return (
              <div key={plan.id} className={`bg-white rounded-xl shadow-lg overflow-hidden border-2 transition-all hover:shadow-xl ${plan.status === 'inactive' ? 'opacity-60' : ''} ${plan.popular ? 'border-purple-200' : 'border-gray-200'}`}>
                {editIndex === idx && editPlan ? (
                  // Edit Mode
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-lg font-semibold text-gray-900">Edit Plan</h4>
                      <div className="flex gap-2">
                        <button
                          onClick={handleCancel}
                          className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <input
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        value={editPlan.title}
                        onChange={e => handleChange(e, 'title')}
                        placeholder="Title"
                      />
                      <input
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        value={editPlan.badge}
                        onChange={e => handleChange(e, 'badge')}
                        placeholder="Badge"
                      />
                      <input
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        value={editPlan.price}
                        onChange={e => handleChange(e, 'price')}
                        placeholder="Price"
                      />
                      <textarea
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                        value={editPlan.subtitle}
                        onChange={e => handleChange(e, 'subtitle')}
                        placeholder="Subtitle"
                        rows={2}
                      />
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Features</label>
                        <div className="space-y-2">
                          {editPlan.features.map((feature, fidx) => (
                            <div key={fidx} className="flex gap-2">
                              <input
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                value={feature}
                                onChange={e => handleFeatureChange(fidx, e.target.value)}
                                placeholder={`Feature ${fidx + 1}`}
                              />
                              {editPlan.features.length > 1 && (
                                <button
                                  onClick={() => removeFeature(fidx)}
                                  className="px-2 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                  <X size={16} />
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                        <button
                          onClick={() => setEditPlan({ ...editPlan, features: [...editPlan.features, ''] })}
                          className="mt-2 text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                        >
                          <Plus size={14} />
                          Add Feature
                        </button>
                      </div>

                      <div className="flex items-center gap-4">
                        <label className="text-sm font-semibold text-gray-700">Status:</label>
                        <div className="flex gap-4">
                          <label className="flex items-center gap-2">
                            <input
                              type="radio"
                              name={`editStatus-${idx}`}
                              value="active"
                              checked={editPlan.status === 'active'}
                              onChange={() => handleStatusChange('active')}
                              className="text-blue-600"
                            />
                            <span className="text-sm">Active</span>
                          </label>
                          <label className="flex items-center gap-2">
                            <input
                              type="radio"
                              name={`editStatus-${idx}`}
                              value="inactive"
                              checked={editPlan.status === 'inactive'}
                              onChange={() => handleStatusChange('inactive')}
                              className="text-blue-600"
                            />
                            <span className="text-sm">Inactive</span>
                          </label>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleSave}
                      className="w-full mt-6 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all font-medium flex items-center justify-center gap-2"
                    >
                      <Save size={16} />
                      Save Changes
                    </button>
                  </div>
                ) : (
                  // View Mode
                  <>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg bg-gray-100 ${plan.iconColor}`}>
                            <IconComponent size={20} />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">{plan.title}</h3>
                            <div className="flex gap-2 mt-1">
                              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${plan.badgeColor}`}>
                                {plan.badge}
                              </span>
                              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${plan.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-600'}`}>
                                {plan.status}
                              </span>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => handleEdit(idx)}
                          className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                        >
                          <Edit3 size={16} />
                        </button>
                      </div>

                      <div className="mb-4">
                        <div className="text-3xl font-bold text-gray-900 mb-1">
                          {plan.price}
                          <span className="text-base font-normal text-gray-600 ml-1">
                            {plan.priceDescription}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm">{plan.subtitle}</p>
                      </div>

                      {plan.savings && (
                        <div className="mb-4 p-2 bg-green-50 rounded-lg">
                          <span className="text-green-700 font-semibold text-sm">{plan.savings}</span>
                        </div>
                      )}

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
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminSubscriptionPlan;