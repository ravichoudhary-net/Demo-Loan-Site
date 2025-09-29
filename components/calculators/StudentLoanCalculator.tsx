import React, { useState, useMemo } from 'react';
import { Page } from '../../App';
import CalculatorWrapper from './common/CalculatorWrapper';
import SliderInput from './common/SliderInput';

const StudentLoanCalculator: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => {
  const [loanAmount, setLoanAmount] = useState(30000);
  const [interestRate, setInterestRate] = useState(6);
  const [loanTerm, setLoanTerm] = useState(10);
  const [extraPayment, setExtraPayment] = useState(0);

  const {
    monthlyPayment,
    totalInterest,
    totalPayment,
    payoffTime,
    interestSaved,
    amortization
  } = useMemo(() => {
    const principal = loanAmount;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    if (principal <= 0 || monthlyRate <= 0) {
      return { monthlyPayment: 0, totalInterest: 0, totalPayment: 0, payoffTime: 'N/A', interestSaved: 0, amortization: [] };
    }

    const standardMonthlyPayment = (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numberOfPayments));
    const totalMonthlyPayment = standardMonthlyPayment + extraPayment;

    let balance = principal;
    let totalInterestPaid = 0;
    const amortSchedule = [];
    let months = 0;

    while (balance > 0 && months < numberOfPayments * 2) {
      months++;
      const interestForMonth = balance * monthlyRate;
      const principalForMonth = totalMonthlyPayment - interestForMonth;
      
      if(balance < totalMonthlyPayment){
          totalInterestPaid += interestForMonth;
          amortSchedule.push({ month: months, balance: '0.00' });
          balance = 0;
      } else {
          balance -= principalForMonth;
          totalInterestPaid += interestForMonth;
          amortSchedule.push({ month: months, balance: balance.toFixed(2) });
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
      payoffTime: payoffString,
      interestSaved: standardTotalInterest - totalInterestPaid,
      amortization: amortSchedule
    };
  }, [loanAmount, interestRate, loanTerm, extraPayment]);

  return (
    <CalculatorWrapper
      title="Student Loan Calculator"
      description="Estimate your monthly student loan payments and see how extra payments can help you save money and pay off your loans faster."
      onNavigate={onNavigate}
    >
        <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
                <SliderInput label="Total Loan Amount" value={loanAmount} min={1000} max={200000} step={1000} onChange={setLoanAmount} format={v => `$${v.toLocaleString()}`} />
                <SliderInput label="Interest Rate (APR)" value={interestRate} min={2} max={12} step={0.1} onChange={setInterestRate} format={v => `${v.toFixed(2)}%`} />
                <SliderInput label="Loan Term (Years)" value={loanTerm} min={5} max={25} step={1} onChange={setLoanTerm} format={v => `${v} years`} />
                <div>
                    <label className="font-semibold text-gray-700">Extra Monthly Payment</label>
                    <div className="relative mt-2">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                        <input type="number" value={extraPayment} onChange={e => setExtraPayment(Number(e.target.value))} className="w-full pl-7 pr-4 py-2 rounded-md border-gray-300 shadow-sm" />
                    </div>
                </div>
            </div>

            <div className="bg-light-bg p-6 rounded-lg">
                <h3 className="text-xl font-bold text-dark-navy mb-4">Payment Summary</h3>
                <div className="space-y-4">
                    <div className="bg-white p-4 rounded-md shadow-sm text-center">
                        <p className="text-sm text-gray-500">Standard Monthly Payment</p>
                        <p className="text-3xl font-bold text-brand-purple">${monthlyPayment > 0 ? monthlyPayment.toFixed(2) : '0.00'}</p>
                    </div>
                    {extraPayment > 0 && (
                        <div className="bg-green-100 p-4 rounded-md shadow-sm text-center">
                            <p className="text-sm font-semibold text-green-800">With Extra Payments</p>
                            <div className="mt-2 grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs text-green-700">New Payoff Time</p>
                                    <p className="text-lg font-bold text-green-900">{payoffTime}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-green-700">Interest Saved</p>
                                    <p className="text-lg font-bold text-green-900">${interestSaved.toFixed(2)}</p>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="bg-white p-4 rounded-md shadow-sm text-center">
                        <p className="text-sm text-gray-500">Total Interest Paid</p>
                        <p className="text-2xl font-bold text-dark-navy">${totalInterest.toFixed(2)}</p>
                    </div>
                </div>
            </div>
        </div>
         <div className="mt-16 max-w-4xl mx-auto p-8 rounded-lg bg-gray-50 border">
            <h3 className="text-2xl font-bold text-dark-navy mb-4">Navigating Your Student Loans</h3>
            <div className="space-y-4 text-gray-700">
            <p>
                Student loans are a common tool for financing higher education, but it's important to have a clear plan for paying them back. This calculator helps you understand your standard monthly payment based on a typical repayment plan.
            </p>
            <p>
                However, the most powerful feature of this tool is the "Extra Monthly Payment" option. By adding even a small amount to your payment each month, you can:
            </p>
            <ul className="list-disc list-inside space-y-2">
                <li><strong>Pay Off Your Loan Faster:</strong> Every extra dollar goes directly toward your principal balance, which accelerates your repayment timeline. This calculator shows you exactly how much sooner you can be debt-free.</li>
                <li><strong>Save on Total Interest:</strong> By paying down the principal faster, you reduce the amount of interest that accrues over the life of the loan. This can lead to thousands of dollars in savings.</li>
            </ul>
            <p>
                Experiment with different extra payment amounts to see how it impacts your financial future. It's a great way to visualize the long-term benefits of being proactive with your student loan debt.
            </p>
            </div>
      </div>
    </CalculatorWrapper>
  );
};

export default StudentLoanCalculator;
