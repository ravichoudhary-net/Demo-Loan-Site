import React, { useState, useMemo } from 'react';
import { Page } from '../../App';
import CalculatorWrapper from './common/CalculatorWrapper';
import SliderInput from './common/SliderInput';

const APRCalculator: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => {
  const [loanAmount, setLoanAmount] = useState(15000);
  const [interestRate, setInterestRate] = useState(10);
  const [loanTerm, setLoanTerm] = useState(5);
  const [fees, setFees] = useState(300);

  const apr = useMemo(() => {
    if (loanAmount <= 0) return interestRate;
    
    // Approximation using the Uniform-Series Present-Worth formula.
    // This is a complex calculation often solved iteratively. We use an approximation.
    const financedAmount = loanAmount - fees;
    const monthlyRate = interestRate / 100 / 12;
    const n = loanTerm * 12;
    
    const monthlyPayment = (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -n));
    
    // Approximation for the effective rate
    let low = 0, high = 100;
    for(let i=0; i<50; i++) { // Iterative search for APR
        let mid = (low + high) / 2;
        let aprMonthlyRate = mid / 100 / 12;
        let calculatedPayment = (financedAmount * aprMonthlyRate) / (1 - Math.pow(1 + aprMonthlyRate, -n));
        if(calculatedPayment > monthlyPayment) high = mid;
        else low = mid;
    }
    return low;
    
  }, [loanAmount, interestRate, loanTerm, fees]);

  return (
    <CalculatorWrapper
      title="APR Calculator"
      description="Calculate the Annual Percentage Rate (APR) to understand the true cost of a loan, including interest and fees."
      onNavigate={onNavigate}
    >
        <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
                <SliderInput label="Loan Amount" value={loanAmount} min={1000} max={100000} step={500} onChange={setLoanAmount} format={v => `$${v.toLocaleString()}`} />
                <SliderInput label="Interest Rate" value={interestRate} min={2} max={36} step={0.25} onChange={setInterestRate} format={v => `${v.toFixed(2)}%`} />
                <SliderInput label="Loan Term (Years)" value={loanTerm} min={1} max={10} step={1} onChange={setLoanTerm} format={v => `${v} years`} />
                <div>
                    <label className="font-semibold text-gray-700">Loan Fees (Origination, etc.)</label>
                    <div className="relative mt-2">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                        <input type="number" value={fees} onChange={e => setFees(Number(e.target.value))} className="w-full pl-7 pr-4 py-2 rounded-md border-gray-300 shadow-sm" />
                    </div>
                </div>
            </div>

            <div className="bg-light-bg p-6 rounded-lg text-center">
                <p className="text-sm text-gray-500">Estimated Annual Percentage Rate (APR)</p>
                <p className="text-6xl font-extrabold text-brand-purple my-4">{apr.toFixed(3)}%</p>
                 <div className="grid grid-cols-2 gap-4 text-sm">
                     <div className="bg-white p-3 rounded-md shadow-sm">
                        <p className="font-semibold text-gray-500">Nominal Rate</p>
                        <p className="text-lg font-bold text-dark-navy">{interestRate.toFixed(2)}%</p>
                     </div>
                     <div className="bg-white p-3 rounded-md shadow-sm">
                        <p className="font-semibold text-gray-500">Total Fees</p>
                        <p className="text-lg font-bold text-dark-navy">${fees.toLocaleString()}</p>
                     </div>
                 </div>
                 <p className="text-xs text-gray-500 mt-4">APR gives you a more complete picture of your loan's cost.</p>
            </div>
        </div>
         <div className="mt-16 max-w-4xl mx-auto p-8 rounded-lg bg-gray-50 border">
            <h3 className="text-2xl font-bold text-dark-navy mb-4">APR vs. Interest Rate: What's the Difference?</h3>
            <div className="space-y-4 text-gray-700">
            <p>
                It's easy to confuse a loan's interest rate with its Annual Percentage Rate (APR), but they represent different things. Understanding the difference is key to making an informed borrowing decision.
            </p>
            <ul className="list-disc list-inside space-y-2">
                <li><strong>Interest Rate:</strong> This is simply the cost of borrowing the principal loan amount, expressed as a percentage. It does not include any fees or other charges associated with the loan.</li>
                <li><strong>Annual Percentage Rate (APR):</strong> This is a broader measure of a loan's cost. The APR includes the interest rate PLUS any additional fees, such as origination fees, closing costs, or other charges. Because it includes these costs, the APR is almost always higher than the nominal interest rate.</li>
            </ul>
            <p>
                Why is APR important? It provides a more accurate, "apples-to-apples" comparison between different loan offers. A loan with a lower interest rate but high fees could have a higher APR than a loan with a slightly higher interest rate but no fees. Always compare loans based on their APR to understand the true cost over the life of the loan.
            </p>
            </div>
      </div>
    </CalculatorWrapper>
  );
};

export default APRCalculator;
