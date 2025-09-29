import React, { useState, useMemo } from 'react';
import { Page } from '../../App';
import CalculatorWrapper from './common/CalculatorWrapper';
import SliderInput from './common/SliderInput';
import Chart from './common/Chart';

const AmortizationCalculator: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => {
  const [loanAmount, setLoanAmount] = useState(250000);
  const [interestRate, setInterestRate] = useState(5);
  const [loanTerm, setLoanTerm] = useState(30);

  const {
    monthlyPayment,
    totalInterest,
    totalPayment,
    schedule,
    chartData
  } = useMemo(() => {
    const principal = loanAmount;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    if (principal <= 0 || monthlyRate <= 0) {
      return { monthlyPayment: 0, totalInterest: 0, totalPayment: 0, schedule: [], chartData: [] };
    }

    const pmt = (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numberOfPayments));
    
    let balance = principal;
    const amortSchedule = [];
    const pointsForChart = [];
    
    for (let i = 1; i <= numberOfPayments; i++) {
      const interestForMonth = balance * monthlyRate;
      const principalForMonth = pmt - interestForMonth;
      balance -= principalForMonth;
      
      amortSchedule.push({
        month: i,
        principal: principalForMonth,
        interest: interestForMonth,
        balance: Math.max(0, balance)
      });
      
      if (i % 12 === 0 || i === 1 || i === numberOfPayments) {
          pointsForChart.push({ x: i, 'Remaining Balance': Math.max(0, balance), 'Equity': principal - Math.max(0, balance) });
      }
    }
    
    const totalPmt = pmt * numberOfPayments;
    const totalInt = totalPmt - principal;

    return {
      monthlyPayment: pmt,
      totalInterest: totalInt,
      totalPayment: totalPmt,
      schedule: amortSchedule,
      chartData: pointsForChart
    };
  }, [loanAmount, interestRate, loanTerm]);

  return (
    <CalculatorWrapper
      title="Amortization Calculator"
      description="Generate a detailed, payment-by-payment schedule for your loan to see how your payments break down into principal and interest over time."
      onNavigate={onNavigate}
    >
        <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
                 <SliderInput label="Loan Amount" value={loanAmount} min={10000} max={1000000} step={10000} onChange={setLoanAmount} format={v => `$${v.toLocaleString()}`} />
                 <SliderInput label="Interest Rate (APR)" value={interestRate} min={2} max={15} step={0.125} onChange={setInterestRate} format={v => `${v.toFixed(3)}%`} />
                 <SliderInput label="Loan Term (Years)" value={loanTerm} min={5} max={40} step={1} onChange={setLoanTerm} format={v => `${v} years`} />
            </div>
            <div className="grid md:grid-cols-3 gap-6 text-center">
                 <div className="bg-light-bg p-4 rounded-lg"><p className="text-sm text-gray-500">Monthly Payment</p><p className="text-2xl font-bold text-brand-purple">${monthlyPayment.toFixed(2)}</p></div>
                 <div className="bg-light-bg p-4 rounded-lg"><p className="text-sm text-gray-500">Total Principal</p><p className="text-2xl font-bold text-dark-navy">${loanAmount.toLocaleString()}</p></div>
                 <div className="bg-light-bg p-4 rounded-lg"><p className="text-sm text-gray-500">Total Interest</p><p className="text-2xl font-bold text-red-500">${totalInterest.toFixed(2)}</p></div>
            </div>
             <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h4 className="font-bold text-gray-800 mb-3">Loan Balance vs. Equity Over Time</h4>
                <Chart 
                    type="line"
                    data={chartData}
                    config={{
                        xAxis: {label: "Month"},
                        yAxis: {label: "Amount"},
                        keys: ['Remaining Balance', 'Equity'],
                        colors: ['#EF4444', '#22C55E']
                    }}
                />
            </div>
            <div className="mt-8">
                 <h3 className="text-xl font-bold text-dark-navy mb-4">Payment Schedule</h3>
                 <div className="max-h-96 overflow-y-auto border rounded-lg">
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
                            {schedule.map((row) => (
                                <tr key={row.month} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">{row.month}</td>
                                    <td className="px-6 py-4 text-green-600">${row.principal.toFixed(2)}</td>
                                    <td className="px-6 py-4 text-red-600">${row.interest.toFixed(2)}</td>
                                    <td className="px-6 py-4 font-bold text-gray-800">${row.balance.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                 </div>
            </div>
        </div>
        <div className="mt-16 max-w-4xl mx-auto p-8 rounded-lg bg-gray-50 border">
            <h3 className="text-2xl font-bold text-dark-navy mb-4">Understanding Amortization</h3>
            <div className="space-y-4 text-gray-700">
            <p>
                Amortization is the process of paying off a loan over time with regular, fixed payments. Each payment you make is split into two parts: a portion that covers the interest for that period, and a portion that pays down your principal loan balance.
            </p>
            <p>
                An interesting aspect of amortization is how this split changes over time:
            </p>
            <ul className="list-disc list-inside space-y-2">
                <li><strong>Early in the loan:</strong> A larger portion of your payment goes toward interest because your loan balance is high.</li>
                <li><strong>Later in the loan:</strong> As your balance decreases, less interest accrues each month. Therefore, a larger portion of your payment goes toward paying down the principal.</li>
            </ul>
            <p>
                This calculator provides a full amortization schedule, showing you this breakdown for every single payment. The chart visually demonstrates this process, plotting how your loan balance steadily decreases while your equity (the portion of the principal you've paid off) steadily increases until you own the asset outright.
            </p>
            </div>
      </div>
    </CalculatorWrapper>
  );
};

export default AmortizationCalculator;
