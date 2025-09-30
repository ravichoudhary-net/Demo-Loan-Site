import React, { useState, useMemo } from 'react';

const CompactAutoLoanCalculator: React.FC = () => {
  const [vehiclePrice, setVehiclePrice] = useState(30000);
  const [downPayment, setDownPayment] = useState(5000);
  const [interestRate, setInterestRate] = useState(7.5);
  const [loanTerm, setLoanTerm] = useState(5);

  const monthlyPayment = useMemo(() => {
    const loanAmount = vehiclePrice - downPayment;
    if (loanAmount <= 0 || interestRate <= 0) return 0;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    const payment = (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numberOfPayments));
    return payment;
  }, [vehiclePrice, downPayment, interestRate, loanTerm]);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
      <h3 className="text-lg font-bold text-dark-navy border-b pb-2 mb-3">Estimate Your Payment</h3>
      <div className="space-y-4 text-sm">
        <div>
          <label className="font-semibold text-gray-700">Vehicle Price: <span className="font-bold text-brand-purple">${vehiclePrice.toLocaleString()}</span></label>
          <input type="range" min="5000" max="80000" step="1000" value={vehiclePrice} onChange={e => setVehiclePrice(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-purple" />
        </div>
        <div>
          <label className="font-semibold text-gray-700">Down Payment: <span className="font-bold text-brand-purple">${downPayment.toLocaleString()}</span></label>
          <input type="range" min="0" max={vehiclePrice * 0.5} step="500" value={downPayment} onChange={e => setDownPayment(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-purple" />
        </div>
        <div>
          <label className="font-semibold text-gray-700">Interest Rate: <span className="font-bold text-brand-purple">{interestRate.toFixed(2)}%</span></label>
          <input type="range" min="3" max="25" step="0.25" value={interestRate} onChange={e => setInterestRate(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-purple" />
        </div>
         <div>
          <label className="font-semibold text-gray-700">Loan Term: <span className="font-bold text-brand-purple">{loanTerm} years</span></label>
          <input type="range" min="3" max="7" step="1" value={loanTerm} onChange={e => setLoanTerm(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-purple" />
        </div>
      </div>
      <div className="mt-4 bg-light-bg p-3 rounded-lg text-center">
        <p className="text-sm font-semibold text-gray-700">Estimated Monthly Payment</p>
        <p className="text-2xl font-bold text-dark-navy">${monthlyPayment.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default CompactAutoLoanCalculator;