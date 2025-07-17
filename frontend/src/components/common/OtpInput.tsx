import React from 'react';

type Props = {
  value: string;
  onChange: (value: string) => void;
  numInputs?: number;
  isInputNum?: boolean;
  inputStyle?: string;
};

const OtpInput: React.FC<Props> = ({ value, onChange, numInputs = 6, isInputNum = true, inputStyle = '' }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    let val = e.target.value;
    if (isInputNum) val = val.replace(/\D/g, '');
    if (val.length > 1) val = val.slice(-1);
    const otpArr = value.split('');
    otpArr[idx] = val;
    const newOtp = otpArr.join('').padEnd(numInputs, '');
    onChange(newOtp);
    // Move focus
    if (val && e.target.nextElementSibling) {
      (e.target.nextElementSibling as HTMLInputElement).focus();
    }
  };

  return (
    <div className="flex justify-center">
      {Array.from({ length: numInputs }).map((_, idx) => (
        <input
          key={idx}
          type={isInputNum ? 'tel' : 'text'}
          inputMode={isInputNum ? 'numeric' : 'text'}
          maxLength={1}
          value={value[idx] || ''}
          onChange={e => handleChange(e, idx)}
          className={inputStyle + ' focus:ring-2 focus:ring-blue-500'}
        />
      ))}
    </div>
  );
};

export default OtpInput;
