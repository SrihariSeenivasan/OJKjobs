import React, { useState } from 'react';

const EmployerProfileSetup: React.FC = () => {
  const [logo, setLogo] = useState<File | null>(null);
  const [description, setDescription] = useState('');
  const [hiringNeeds, setHiringNeeds] = useState<string[]>([]);
  const needsOptions = [
    'Factory Workers',
    'Housekeeping Staff',
    'Cashiers / Sales Staff',
    'Delivery Boys',
    'Kitchen Helpers / Chefs',
    'Others',
  ];

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogo(e.target.files[0]);
    }
  };

  const handleNeedsChange = (need: string) => {
    setHiringNeeds(prev =>
      prev.includes(need) ? prev.filter(n => n !== need) : [...prev, need]
    );
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 max-w-xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Company Profile Setup</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Company Logo (optional)</label>
        <input type="file" accept="image/*" onChange={handleLogoChange} />
        {logo && <div className="mt-2 text-xs text-gray-500">Selected: {logo.name}</div>}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Short Company Description</label>
        <textarea
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          rows={3}
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Describe your company in a few sentences..."
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Hiring Needs</label>
        <div className="flex flex-col gap-2">
          {needsOptions.map(need => (
            <label key={need} className="inline-flex items-center">
              <input
                type="checkbox"
                checked={hiringNeeds.includes(need)}
                onChange={() => handleNeedsChange(need)}
                className="form-checkbox h-4 w-4 text-blue-600"
              />
              <span className="ml-2 text-gray-700">{need}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployerProfileSetup;
