import React, { useState, useMemo } from 'react';
import { Page } from '../../App';
import CalculatorWrapper from './common/CalculatorWrapper';
import SliderInput from './common/SliderInput';
import Chart from './common/Chart';

const SimpleInterestCalculator: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => {
  const [principal, setPrincipal] = useState(10000);
  const [rate, setRate] = useState(5);
  const [term, setTerm] = useState(5);

  const {
    simpleInterest,
    totalRepaymentSimple,
    compoundInterest,
    totalRepaymentCompound
  } = useMemo(() => {
    const P = principal;
    const R = rate / 100;
    const T = term;

    const si = P * R * T;
    const totalSi = P + si;

    const totalCo = P * Math.pow((1 + R), T);
    const ci = totalCo - P;
    
    return {
      simpleInterest: si,
      totalRepaymentSimple: totalSi,
      compoundInterest: ci,
      totalRepaymentCompound: totalCo
    };
  }, [principal, rate, term]);

  const chartData = [
      { name: 'Simple Interest', 'Total Interest': simpleInterest, 'Principal': principal },
      { name: 'Compound Interest', 'Total Interest': compoundInterest, 'Principal': principal },
  ];

  return (
    <CalculatorWrapper
      title="Simple Interest Calculator"
      description="Calculate the interest on a loan without compounding and compare it to annually compounded interest to see the difference."
      onNavigate={onNavigate}
    >
      <div className="space-y-6">
        <div className="grid md:grid-cols-3 gap-6">
          <SliderInput label="Principal Amount" value={principal} min={100} max={100000} step={100} onChange={setPrincipal} format={v => `$${v.toLocaleString()}`} />
          <SliderInput label="Annual Interest Rate" value={rate} min={1} max={25} step={0.1} onChange={setRate} format={v => `${v.toFixed(1)}%`} />
          <SliderInput label="Term (Years)" value={term} min={1} max={30} step={1} onChange={setTerm} format={v => `${v} years`} />
        </div>
        <div className="bg-light-bg p-6 rounded-lg grid md:grid-cols-2 gap-6 text-center">
            <div>
                <h3 className="font-bold text-dark-navy">Simple Interest Results</h3>
                <p className="text-sm text-gray-500 mt-2">Total Interest</p>
                <p className="text-3xl font-bold text-brand-purple">${simpleInterest.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                <p className="text-sm text-gray-500 mt-2">Total Repayment</p>
                <p className="text-xl font-semibold text-dark-navy">${totalRepaymentSimple.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
            </div>
             <div>
                <h3 className="font-bold text-dark-navy">Comparison: Compound Interest</h3>
                <p className="text-sm text-gray-500 mt-2">Total Interest</p>
                <p className="text-3xl font-bold text-green-600">${compoundInterest.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                <p className="text-sm text-gray-500 mt-2">Total Repayment</p>
                <p className="text-xl font-semibold text-dark-navy">${totalRepaymentCompound.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
            </div>
        </div>
         <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <h4 className="font-bold text-gray-800 mb-3">Simple vs. Compound Interest Growth</h4>
            <Chart 
                type="bar"
                data={chartData}
                config={{
                    keys: ['Principal', 'Total Interest'],
                    colors: ['#4A80FF', '#FBBF24'],
                }}
            />
        </div>
      </div>
      <div className="mt-16 max-w-4xl mx-auto p-8 rounded-lg bg-gray-50 border">
        <h3 className="text-2xl font-bold text-dark-navy mb-4">Understanding Simple Interest</h3>
        <div className="space-y-4 text-gray-700">
          <p>
            Simple interest is a straightforward way of calculating the interest charge on a loan. It is determined by multiplying the daily interest rate by the principal by the number of days that elapse between payments. The key feature of simple interest is that it does not compound.
          </p>
          <p>
            The formula is: <strong>Interest = Principal × Rate × Time</strong>
          </p>
          <p>
            In contrast, <strong>compound interest</strong> is "interest on interest." The interest is calculated on the initial principal and also on the accumulated interest from previous periods. Over time, this causes the total amount to grow much faster than it would with simple interest.
          </p>
           <p>
            This calculator provides a powerful comparison. While some loans, like very short-term payday loans, might use a model closer to simple interest, most modern financial products (savings accounts, credit cards, mortgages) use compound interest. Seeing the two side-by-side clearly illustrates the powerful effect of compounding over time.
          </p>
        </div>
      </div>
    </CalculatorWrapper>
  );
};

export default SimpleInterestCalculator;
