import React from 'react';

interface SliderInputProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  format?: (value: number) => string;
  valueDisplay?: React.ReactElement;
}

const SliderInput: React.FC<SliderInputProps> = ({ label, value, min, max, step, onChange, format, valueDisplay }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        {valueDisplay ? valueDisplay : <span className="text-sm font-bold text-dark-navy">{format ? format(value) : value}</span>}
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-purple"
      />
    </div>
  );
};

export default SliderInput;
