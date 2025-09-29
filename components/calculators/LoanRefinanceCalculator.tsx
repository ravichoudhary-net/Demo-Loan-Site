import React, { useState, useMemo } from 'react';
import { Page } from '../../App';
import CalculatorWrapper from './common/CalculatorWrapper';

const LoanRefinanceCalculator: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => {
  const [currentBalance, setCurrentBalance] = useState(20000);
  const [currentApr, setCurrentApr] = useState(12);
  const [currentPayment, setCurrentPayment] = useState(500);
  
  const [newApr, setNewApr] = useState(7);
  const [newTerm, setNewTerm] = useState(4);
  const [refinanceCost, setRefinanceCost] = useState(500);

  const {
    newMonthlyPayment,
    monthlySavings,
    lifetimeSavings,
    breakevenPoint,
  } = useMemo(() => {
    // Current Loan Calculations
    let remainingMonthsCurrent = 0;
    let balance = currentBalance;
    let totalInterestCurrent = 0;
    const monthlyRateCurrent = currentApr / 100 / 12;

    if (currentPayment > balance * monthlyRateCurrent) {
      while(balance > 0) {
        remainingMonthsCurrent++;
        const interest = balance * monthlyRateCurrent;
        totalInterestCurrent += interest;
        balance -= (currentPayment - interest);
        if (remainingMonthsCurrent > 1200) break; // Safety break
      }
    } else {
      totalInterestCurrent = Infinity;
    }
    const totalPaidCurrent = currentBalance + totalInterestCurrent;

    // New Loan Calculations
    const newLoanAmount = currentBalance + refinanceCost;
    const monthlyRateNew = newApr / 100 / 12;
    const numberOfPaymentsNew = newTerm * 12;
    
    const newPmt = (newLoanAmount * monthlyRateNew) / (1 - Math.pow(1 + monthlyRateNew, -numberOfPaymentsNew));
    const totalPaidNew = newPmt * numberOfPaymentsNew;
    
    const monthlySave = currentPayment - newPmt;
    const lifetimeSave = totalPaidCurrent - totalPaidNew;
    const breakeven = refinanceCost > 0 && monthlySave > 0 ? Math.ceil(refinanceCost / monthlySave) : 0;
    
    return {
      newMonthlyPayment: newPmt,
      monthlySavings: monthlySave,
      lifetimeSavings: lifetimeSave,
      breakevenPoint: breakeven
    };
  }, [currentBalance, currentApr, currentPayment, newApr, newTerm, refinanceCost]);

  return (
    <CalculatorWrapper
      title="Loan Refinance Calculator"
      description="Compare your current loan with a new refinancing offer to see your potential monthly and lifetime savings."
      onNavigate={onNavigate}
    >
        <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Input Section */}
            <div className="space-y-6">
                 <div>
                    <h3 className="text-xl font-bold text-dark-navy mb-4">Your Current Loan</h3>
                    <div className="space-y-4">
                        <div><label className="font-semibold text-gray-700">Remaining Balance ($)</label><input type="number" value={currentBalance} onChange={e => setCurrentBalance(Number(e.target.value))} className="w-full mt-1 p-2 border-gray-300 rounded-md" /></div>
                        <div><label className="font-semibold text-gray-700">Current APR (%)</label><input type="number" value={currentApr} onChange={e => setCurrentApr(Number(e.target.value))} className="w-full mt-1 p-2 border-gray-300 rounded-md" /></div>
                        <div><label className="font-semibold text-gray-700">Current Monthly Payment ($)</label><input type="number" value={currentPayment} onChange={e => setCurrentPayment(Number(e.target.value))} className="w-full mt-1 p-2 border-gray-300 rounded-md" /></div>
                    </div>
                </div>
                 <div>
                    <h3 className="text-xl font-bold text-dark-navy mb-4">New Refinancing Offer</h3>
                     <div className="space-y-4">
                        <div><label className="font-semibold text-gray-700">New APR (%)</label><input type="number" value={newApr} onChange={e => setNewApr(Number(e.target.value))} className="w-full mt-1 p-2 border-gray-300 rounded-md" /></div>
                        <div><label className="font-semibold text-gray-700">New Term (Years)</label><input type="number" value={newTerm} onChange={e => setNewTerm(Number(e.target.value))} className="w-full mt-1 p-2 border-gray-300 rounded-md" /></div>
                        <div><label className="font-semibold text-gray-700">Refinancing Costs ($)</label><input type="number" value={refinanceCost} onChange={e => setRefinanceCost(Number(e.target.value))} className="w-full mt-1 p-2 border-gray-300 rounded-md" /></div>
                    </div>
                </div>
            </div>
            
            {/* Results Section */}
            <div className="bg-light-bg p-6 rounded-lg sticky top-28">
                 <h3 className="text-xl font-bold text-dark-navy mb-4">Refinancing Analysis</h3>
                 <div className="space-y-4">
                    <div className="bg-white p-4 rounded-md shadow-sm text-center">
                        <p className="text-sm text-gray-500">New Monthly Payment</p>
                        <p className="text-3xl font-bold text-brand-purple">${isFinite(newMonthlyPayment) ? newMonthlyPayment.toFixed(2) : '0.00'}</p>
                    </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-md shadow-sm text-center">
                             <p className="text-sm text-gray-500">Monthly Savings</p>
                            <p className={`text-xl font-bold ${monthlySavings > 0 ? 'text-green-600' : 'text-red-600'}`}>${isFinite(monthlySavings) ? monthlySavings.toFixed(2) : '0.00'}</p>
                        </div>
                        <div className="bg-white p-4 rounded-md shadow-sm text-center">
                             <p className="text-sm text-gray-500">Lifetime Savings</p>
                            <p className={`text-xl font-bold ${lifetimeSavings > 0 ? 'text-green-600' : 'text-red-600'}`}>${isFinite(lifetimeSavings) ? lifetimeSavings.toFixed(2) : 'N/A'}</p>
                        </div>
                    </div>
                     <div className="bg-blue-100 p-4 rounded-md shadow-sm text-center">
                        <p className="text-sm font-semibold text-blue-800">Breakeven Point</p>
                        <p className="text-2xl font-extrabold text-blue-900">{breakevenPoint > 0 ? `${breakevenPoint} months` : "No cost to recoup"}</p>
                        <p className="text-xs text-blue-700 mt-1">Time to recover refinancing costs</p>
                    </div>
                 </div>
            </div>
        </div>
        <div className="mt-16 max-w-4xl mx-auto p-8 rounded-lg bg-gray-50 border">
            <h3 className="text-2xl font-bold text-dark-navy mb-4">Understanding Loan Refinancing</h3>
            <div className="space-y-4 text-gray-700">
            <p>
                Refinancing means replacing your existing loan with a new one. People typically refinance to get a lower interest rate, which can reduce their monthly payments and the total amount of interest they pay over the life of the loan. You can refinance almost any type of loan, including mortgages, auto loans, and student loans.
            </p>
            <p>
                Key considerations when refinancing:
            </p>
            <ul className="list-disc list-inside space-y-2">
                <li><strong>Interest Rate Savings:</strong> The primary goal is to secure a new loan with a lower APR than your current one. Even a small reduction can lead to significant savings.</li>
                <li><strong>Loan Term:</strong> You can choose a new term. Extending the term may lower your monthly payment further, but you could pay more interest in the long run. Shortening the term will increase your payment but help you pay off the loan faster and save on interest.</li>
                <li><strong>Refinancing Costs:</strong> There are often fees associated with refinancing, such as origination fees or closing costs. It's crucial to factor these into your decision.</li>
                <li><strong>Breakeven Point:</strong> This is a critical calculation, showing you how long it will take for your monthly savings to cover the upfront costs of refinancing. If you plan to keep the loan longer than the breakeven point, refinancing is likely a good financial move.</li>
            </ul>
            </div>
      </div>
    </CalculatorWrapper>
  );
};

export default LoanRefinanceCalculator;
