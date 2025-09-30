import React, { useState, useMemo } from 'react';

const CompactHomeEquityLoanCalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState(50000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTerm, setLoanTerm] = useState(10);

  const monthlyPayment = useMemo(() => {
    if (loanAmount <= 0 || interestRate <= 0) return 0;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    const payment = (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numberOfPayments));
    return payment;
  }, [loanAmount, interestRate, loanTerm]);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
      <h3 className="text-lg font-bold text-dark-navy border-b pb-2 mb-3">Estimate Your Payment</h3>
      <div className="space-y-4 text-sm">
        <div>
          <label className="font-semibold text-gray-700">Loan Amount: <span className="font-bold text-brand-purple">${loanAmount.toLocaleString()}</span></label>
          <input type="range" min="10000" max="250000" step="5000" value={loanAmount} onChange={e => setLoanAmount(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-purple" />
        </div>
        <div>
          <label className="font-semibold text-gray-700">Interest Rate: <span className="font-bold text-brand-purple">{interestRate.toFixed(2)}%</span></label>
          <input type="range" min="5" max="15" step="0.25" value={interestRate} onChange={e => setInterestRate(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-purple" />
        </div>
        <div>
          <label className="font-semibold text-gray-700">Loan Term: <span className="font-bold text-brand-purple">{loanTerm} years</span></label>
          <input type="range" min="5" max="20" step="1" value={loanTerm} onChange={e => setLoanTerm(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-purple" />
        </div>
      </div>
      <div className="mt-4 bg-light-bg p-3 rounded-lg text-center">
        <p className="text-sm font-semibold text-gray-700">Estimated Monthly Payment</p>
        <p className="text-2xl font-bold text-dark-navy">${monthlyPayment.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default CompactHomeEquityLoanCalculator;
