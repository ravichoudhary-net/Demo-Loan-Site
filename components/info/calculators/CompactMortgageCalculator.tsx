import React, { useState, useMemo } from 'react';

const CompactMortgageCalculator: React.FC = () => {
  const [homePrice, setHomePrice] = useState(350000);
  const [downPayment, setDownPayment] = useState(70000);
  const [interestRate, setInterestRate] = useState(6.5);
  const loanTerm = 30; // Fixed for simplicity

  const monthlyPayment = useMemo(() => {
    const loanAmount = homePrice - downPayment;
    if (loanAmount <= 0 || interestRate <= 0) return 0;

    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    const payment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    return payment;
  }, [homePrice, downPayment, interestRate, loanTerm]);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
      <h3 className="text-lg font-bold text-dark-navy border-b pb-2 mb-3">Estimate Your Payment</h3>
      <div className="space-y-4 text-sm">
        <div>
          <label className="font-semibold text-gray-700">Home Price: <span className="font-bold text-brand-purple">${homePrice.toLocaleString()}</span></label>
          <input type="range" min="100000" max="1000000" step="10000" value={homePrice} onChange={e => setHomePrice(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-purple" />
        </div>
        <div>
          <label className="font-semibold text-gray-700">Down Payment: <span className="font-bold text-brand-purple">${downPayment.toLocaleString()}</span></label>
          <input type="range" min="0" max={homePrice * 0.5} step="1000" value={downPayment} onChange={e => setDownPayment(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-purple" />
        </div>
        <div>
          <label className="font-semibold text-gray-700">Interest Rate: <span className="font-bold text-brand-purple">{interestRate.toFixed(2)}%</span></label>
          <input type="range" min="3" max="10" step="0.125" value={interestRate} onChange={e => setInterestRate(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-purple" />
        </div>
      </div>
      <div className="mt-4 bg-light-bg p-3 rounded-lg text-center">
        <p className="text-sm font-semibold text-gray-700">Est. Principal & Interest (30-yr fixed)</p>
        <p className="text-2xl font-bold text-dark-navy">${monthlyPayment.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default CompactMortgageCalculator;