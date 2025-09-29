
import React from 'react';
import { Page } from '../../../App';

interface CalculatorWrapperProps {
  title: string;
  description: string;
  onNavigate: (page: Page) => void;
  children: React.ReactNode;
}

const CalculatorWrapper: React.FC<CalculatorWrapperProps> = ({ title, description, onNavigate, children }) => {
  return (
    <section className="py-20 bg-light-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <button onClick={() => onNavigate('calculators')} className="flex items-center text-brand-purple font-semibold hover:underline">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Calculators
          </button>
        </div>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-dark-navy">{title}</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">{description}</p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 max-w-4xl mx-auto">
          {children}
        </div>
      </div>
    </section>
  );
};

export default CalculatorWrapper;
