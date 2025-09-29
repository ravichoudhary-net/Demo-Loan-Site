import React, { useState, useMemo } from 'react';
import { Page } from '../../App';
import CalculatorWrapper from './common/CalculatorWrapper';
import SliderInput from './common/SliderInput';

const PersonalLoanCalculator: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => {
  const [loanAmount, setLoanAmount] = useState(10000);
  const [interestRate, setInterestRate] = useState(8);
  const [loanTerm, setLoanTerm] = useState(5);
  const [extraPayment, setExtraPayment] = useState(0);

  const {
    monthlyPayment,
    totalInterest,
    totalPayment,
    amortization,
    payoffTime,
    interestSaved,
  } = useMemo(() => {
    const principal = loanAmount;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    if (principal <= 0 || monthlyRate <= 0) {
      return { monthlyPayment: 0, totalInterest: 0, totalPayment: 0, amortization: [], payoffTime: 'N/A', interestSaved: 0 };
    }

    const standardMonthlyPayment = (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numberOfPayments));
    
    const totalMonthlyPayment = standardMonthlyPayment + extraPayment;

    let balance = principal;
    let totalInterestPaid = 0;
    const amortSchedule = [];
    let months = 0;
    
    while (balance > 0 && months < numberOfPayments * 2) { // Safety break
        months++;
        const interestForMonth = balance * monthlyRate;
        const principalForMonth = totalMonthlyPayment - interestForMonth;
        
        if(balance < totalMonthlyPayment){
            totalInterestPaid += interestForMonth;
            amortSchedule.push({ month: months, principal: balance.toFixed(2), interest: interestForMonth.toFixed(2), balance: '0.00' });
            balance = 0;
        } else {
            balance -= principalForMonth;
            totalInterestPaid += interestForMonth;
            amortSchedule.push({ month: months, principal: principalForMonth.toFixed(2), interest: interestForMonth.toFixed(2), balance: balance.toFixed(2) });
        }
    }
    
    const standardTotalPayment = standardMonthlyPayment * numberOfPayments;
    const standardTotalInterest = standardTotalPayment - principal;

    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    const payoffString = `${years} years, ${remainingMonths} months`;

    return {
      monthlyPayment: standardMonthlyPayment,
      totalInterest: totalInterestPaid,
      totalPayment: principal + totalInterestPaid,
      amortization: amortSchedule,
      payoffTime: payoffString,
      interestSaved: standardTotalInterest - totalInterestPaid,
    };
  }, [loanAmount, interestRate, loanTerm, extraPayment]);

  return (
    <CalculatorWrapper
      title="Personal Loan Calculator"
      description="Estimate your monthly payments for a personal loan. See how different loan terms, interest rates, and extra payments can affect your total cost."
      onNavigate={onNavigate}
    >
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <SliderInput label="Loan Amount" value={loanAmount} min={1000} max={100000} step={500} onChange={setLoanAmount} format={v => `$${v.toLocaleString()}`} />
          <SliderInput label="Interest Rate (APR)" value={interestRate} min={2} max={36} step={0.25} onChange={setInterestRate} format={v => `${v.toFixed(2)}%`} />
          <SliderInput label="Loan Term (Years)" value={loanTerm} min={1} max={10} step={1} onChange={setLoanTerm} format={v => `${v} years`} />
           <div>
              <label className="font-semibold text-gray-700">Extra Monthly Payments</label>
              <div className="relative mt-2">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <input type="number" value={extraPayment} onChange={e => setExtraPayment(Number(e.target.value))} className="w-full pl-7 pr-4 py-2 rounded-md border-gray-300 shadow-sm focus:border-brand-purple focus:ring-brand-purple" />
              </div>
            </div>
        </div>

        <div className="bg-light-bg p-6 rounded-lg">
          <h3 className="text-xl font-bold text-dark-navy mb-4">Your Estimated Results</h3>
          <div className="space-y-4">
             <div className="bg-white p-4 rounded-md shadow-sm text-center">
                <p className="text-sm text-gray-500">Standard Monthly Payment</p>
                <p className="text-3xl font-bold text-brand-purple">${monthlyPayment > 0 ? monthlyPayment.toFixed(2) : '0.00'}</p>
             </div>
             <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-md shadow-sm text-center">
                    <p className="text-sm text-gray-500">Total Interest</p>
                    <p className="text-xl font-bold text-dark-navy">${totalInterest > 0 ? totalInterest.toFixed(2) : '0.00'}</p>
                </div>
                 <div className="bg-white p-4 rounded-md shadow-sm text-center">
                    <p className="text-sm text-gray-500">Total Payment</p>
                    <p className="text-xl font-bold text-dark-navy">${totalPayment > 0 ? totalPayment.toFixed(2) : '0.00'}</p>
                </div>
             </div>
              {extraPayment > 0 && (
                 <div className="bg-green-100 p-4 rounded-md shadow-sm text-center">
                    <p className="text-sm text-green-700">With Extra Payments</p>
                     <div className="grid grid-cols-2 gap-2 mt-2">
                         <p className="text-lg font-bold text-green-900">Payoff Time: <br/> {payoffTime}</p>
                         <p className="text-lg font-bold text-green-900">Interest Saved: <br/> ${interestSaved.toFixed(2)}</p>
                    </div>
                </div>
              )}
          </div>
        </div>
      </div>
      
       <div className="mt-8 pt-8 border-t">
         <h3 className="text-xl font-bold text-dark-navy mb-4">Amortization Schedule</h3>
         <div className="max-h-80 overflow-y-auto border rounded-lg">
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100 sticky top-0">
                    <tr>
                        <th scope="col" className="px-6 py-3">Month</th>
                        <th scope="col" className="px-6 py-3">Principal</th>
                        <th scope="col" className="px-6 py-3">Interest</th>
                        <th scope="col" className="px-6 py-3">Remaining Balance</th>
                    </tr>
                </thead>
                <tbody>
                    {amortization.map((row) => (
                        <tr key={row.month} className="bg-white border-b hover:bg-gray-50">
                            <td className="px-6 py-4 font-medium text-gray-900">{row.month}</td>
                            <td className="px-6 py-4 text-green-600">${row.principal}</td>
                            <td className="px-6 py-4 text-red-600">${row.interest}</td>
                            <td className="px-6 py-4 font-bold text-gray-800">${row.balance}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
         </div>
      </div>
       <div className="mt-16 max-w-4xl mx-auto p-8 rounded-lg bg-gray-50 border">
        <h3 className="text-2xl font-bold text-dark-navy mb-4">About Personal Loans</h3>
        <div className="space-y-4 text-gray-700">
          <p>
            A personal loan is an unsecured loan, meaning it's not backed by collateral like a house or a car. This makes them a flexible option for various needs, such as consolidating high-interest credit card debt, financing a home improvement project, or covering unexpected medical expenses.
          </p>
          <p>
            The key factors that determine your monthly payment are:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Loan Amount:</strong> The total amount of money you borrow.</li>
            <li><strong>Interest Rate (APR):</strong> The annual cost of borrowing, which is heavily influenced by your credit score. A higher credit score typically leads to a lower APR.</li>
            <li><strong>Loan Term:</strong> The period over which you'll repay the loan. Longer terms result in lower monthly payments but higher total interest costs, while shorter terms have higher payments but save you money on interest.</li>
          </ul>
          <p>
            This calculator also demonstrates the power of making extra payments. Even a small additional amount each month can significantly reduce the total interest you pay and help you become debt-free sooner.
          </p>
        </div>
      </div>
    </CalculatorWrapper>
  );
};

export default PersonalLoanCalculator;
