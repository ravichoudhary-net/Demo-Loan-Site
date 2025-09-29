import React, { useState, useMemo } from 'react';
import { Page } from '../../App';
import CalculatorWrapper from './common/CalculatorWrapper';

const LeaseVsBuyCalculator: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => {
  // Buying State
  const [carPrice, setCarPrice] = useState(35000);
  const [buyDownPayment, setBuyDownPayment] = useState(5000);
  const [buyLoanTerm, setBuyLoanTerm] = useState(5);
  const [buyApr, setBuyApr] = useState(6);
  const [salesTax, setSalesTax] = useState(7);
  
  // Leasing State
  const [leaseTerm, setLeaseTerm] = useState(3);
  const [leaseMonthlyPayment, setLeaseMonthlyPayment] = useState(450);
  const [leaseDownPayment, setLeaseDownPayment] = useState(2000);
  
  const [comparisonPeriod, setComparisonPeriod] = useState(3);

  const { totalBuyCost, totalLeaseCost } = useMemo(() => {
    // Calculate total cost of buying over the comparison period
    const taxAmount = carPrice * (salesTax / 100);
    const loanAmount = carPrice + taxAmount - buyDownPayment;
    const monthlyRate = buyApr / 100 / 12;
    const numPayments = buyLoanTerm * 12;
    const monthlyBuyPayment = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments) / (Math.pow(1 + monthlyRate, numPayments) - 1);
    const totalPaymentsInPeriod = monthlyBuyPayment * Math.min(comparisonPeriod * 12, numPayments);
    const buyCost = buyDownPayment + totalPaymentsInPeriod;
    
    // Calculate total cost of leasing over the comparison period
    const numLeaseCycles = Math.ceil((comparisonPeriod * 12) / (leaseTerm * 12));
    const leaseCost = (leaseDownPayment + (leaseMonthlyPayment * leaseTerm * 12)) * numLeaseCycles;

    return { totalBuyCost: buyCost, totalLeaseCost: leaseCost };
  }, [carPrice, buyDownPayment, buyLoanTerm, buyApr, salesTax, leaseTerm, leaseMonthlyPayment, leaseDownPayment, comparisonPeriod]);

  const costDifference = Math.abs(totalBuyCost - totalLeaseCost);
  const cheaperOption = totalBuyCost < totalLeaseCost ? 'Buying' : 'Leasing';

  return (
    <CalculatorWrapper
      title="Lease vs. Buy Calculator"
      description="Compare the long-term costs of leasing a car versus buying one. Make an informed decision based on your financial situation and driving habits."
      onNavigate={onNavigate}
    >
      <div className="grid lg:grid-cols-3 gap-8 items-start">
        {/* Buy Inputs */}
        <div className="lg:col-span-1 space-y-4 p-4 bg-blue-50 rounded-lg">
          <h3 className="text-xl font-bold text-dark-navy">Buying Option</h3>
          <div><label className="text-sm font-semibold">Car Price ($)</label><input type="number" value={carPrice} onChange={e => setCarPrice(Number(e.target.value))} className="w-full mt-1 p-2 border-gray-300 rounded"/></div>
          <div><label className="text-sm font-semibold">Down Payment ($)</label><input type="number" value={buyDownPayment} onChange={e => setBuyDownPayment(Number(e.target.value))} className="w-full mt-1 p-2 border-gray-300 rounded"/></div>
          <div><label className="text-sm font-semibold">Loan Term (Years)</label><input type="number" value={buyLoanTerm} onChange={e => setBuyLoanTerm(Number(e.target.value))} className="w-full mt-1 p-2 border-gray-300 rounded"/></div>
          <div><label className="text-sm font-semibold">Loan APR (%)</label><input type="number" value={buyApr} onChange={e => setBuyApr(Number(e.target.value))} className="w-full mt-1 p-2 border-gray-300 rounded"/></div>
          <div><label className="text-sm font-semibold">Sales Tax (%)</label><input type="number" value={salesTax} onChange={e => setSalesTax(Number(e.target.value))} className="w-full mt-1 p-2 border-gray-300 rounded"/></div>
        </div>

        {/* Lease Inputs */}
        <div className="lg:col-span-1 space-y-4 p-4 bg-purple-50 rounded-lg">
          <h3 className="text-xl font-bold text-dark-navy">Leasing Option</h3>
          <div><label className="text-sm font-semibold">Lease Term (Years)</label><input type="number" value={leaseTerm} onChange={e => setLeaseTerm(Number(e.target.value))} className="w-full mt-1 p-2 border-gray-300 rounded"/></div>
          <div><label className="text-sm font-semibold">Monthly Payment ($)</label><input type="number" value={leaseMonthlyPayment} onChange={e => setLeaseMonthlyPayment(Number(e.target.value))} className="w-full mt-1 p-2 border-gray-300 rounded"/></div>
          <div><label className="text-sm font-semibold">Down Payment ($)</label><input type="number" value={leaseDownPayment} onChange={e => setLeaseDownPayment(Number(e.target.value))} className="w-full mt-1 p-2 border-gray-300 rounded"/></div>
        </div>
        
        {/* Results */}
        <div className="lg:col-span-1 bg-light-bg p-6 rounded-lg sticky top-28">
            <h3 className="text-xl font-bold text-dark-navy mb-4">Cost Comparison</h3>
            <div className="mb-4">
                <label className="text-sm font-semibold">Comparison Period (Years)</label>
                <input type="number" value={comparisonPeriod} onChange={e => setComparisonPeriod(Number(e.target.value))} className="w-full mt-1 p-2 border-gray-300 rounded"/>
            </div>
            <div className="space-y-3">
                <div className="p-3 bg-blue-100 rounded">
                    <p className="text-sm text-blue-800">Total Cost of Buying</p>
                    <p className="font-bold text-lg text-blue-900">${totalBuyCost.toFixed(2)}</p>
                </div>
                <div className="p-3 bg-purple-100 rounded">
                    <p className="text-sm text-purple-800">Total Cost of Leasing</p>
                    <p className="font-bold text-lg text-purple-900">${totalLeaseCost.toFixed(2)}</p>
                </div>
                <div className="p-4 bg-green-100 rounded text-center">
                    <p className="font-bold text-green-800 text-lg">{cheaperOption} is cheaper</p>
                    <p className="text-sm text-green-700">by <span className="font-bold">${costDifference.toFixed(2)}</span> over {comparisonPeriod} years.</p>
                </div>
            </div>
        </div>
      </div>
      <div className="mt-16 max-w-4xl mx-auto p-8 rounded-lg bg-gray-50 border">
        <h3 className="text-2xl font-bold text-dark-navy mb-4">About the Lease vs. Buy Calculator</h3>
        <div className="space-y-4 text-gray-700">
          <p>
            Deciding whether to lease or buy your next vehicle is a major financial decision. There are pros and cons to both options, and the right choice depends on your budget, driving habits, and personal preferences.
          </p>
          <ul className="list-disc list-inside space-y-4">
            <li>
                <strong>Buying a Car:</strong> When you buy a car, you are financing the entire cost of the vehicle. Your monthly payments are typically higher than a lease payment, but at the end of the loan term, you own the car outright. It's an asset you can sell or trade in later. You have no mileage restrictions, and you can customize the vehicle as you wish.
            </li>
            <li>
                <strong>Leasing a Car:</strong> When you lease, you are essentially paying to use the car for a set period (usually 2-4 years). You are only paying for the vehicle's depreciation during that time, which is why monthly payments are often lower. However, at the end of the lease, you don't own the car. Leases also come with mileage limits and penalties for excessive wear and tear. It's a good option if you like driving a new car every few years and prefer lower monthly payments.
            </li>
          </ul>
          <p>
            This calculator helps you look beyond the monthly payment and compare the total out-of-pocket costs for both scenarios over a specific time frame. This allows you to make a more informed financial decision based on the long-term numbers.
          </p>
        </div>
      </div>
    </CalculatorWrapper>
  );
};

export default LeaseVsBuyCalculator;
