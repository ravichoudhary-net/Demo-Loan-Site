import React, { useState, useMemo } from 'react';
import { Page } from '../../App';
import CalculatorWrapper from './common/CalculatorWrapper';
import SliderInput from './common/SliderInput';
import Chart from './common/Chart';

const RetirementCalculator: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => {
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(65);
  const [currentSavings, setCurrentSavings] = useState(50000);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [employerMatch, setEmployerMatch] = useState(4);
  const [annualReturn, setAnnualReturn] = useState(7);

  const { estimatedNestEgg, chartData } = useMemo(() => {
    let balance = currentSavings;
    const monthlyRate = annualReturn / 100 / 12;
    const yearsToGrow = retirementAge - currentAge;
    const numberOfMonths = yearsToGrow * 12;
    const points = [{ x: currentAge, 'Nest Egg': balance }];

    const totalMonthlyContribution = monthlyContribution + (monthlyContribution * (employerMatch / 100));

    for (let i = 1; i <= numberOfMonths; i++) {
      balance += totalMonthlyContribution;
      balance *= (1 + monthlyRate);
      
      const age = currentAge + i / 12;
      if (i % 12 === 0 || i === numberOfMonths) {
          points.push({ x: age, 'Nest Egg': balance });
      }
    }
    
    return {
      estimatedNestEgg: balance > 0 ? balance : 0,
      chartData: points
    };
  }, [currentAge, retirementAge, currentSavings, monthlyContribution, employerMatch, annualReturn]);

  return (
    <CalculatorWrapper
      title="Retirement Calculator (401k)"
      description="Are you on track for retirement? Project your estimated savings and see how your contributions will grow over time."
      onNavigate={onNavigate}
    >
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="space-y-6">
          <SliderInput label="Current Age" value={currentAge} min={18} max={retirementAge - 1} step={1} onChange={setCurrentAge} format={v => `${v} years old`} />
          <SliderInput label="Retirement Age" value={retirementAge} min={currentAge + 1} max={80} step={1} onChange={setRetirementAge} format={v => `${v} years old`} />
          <SliderInput label="Current Retirement Savings" value={currentSavings} min={0} max={1000000} step={1000} onChange={setCurrentSavings} format={v => `$${v.toLocaleString()}`} />
          <SliderInput label="Monthly Contribution" value={monthlyContribution} min={0} max={5000} step={50} onChange={setMonthlyContribution} format={v => `$${v.toLocaleString()}`} />
          <SliderInput label="Employer Match (%)" value={employerMatch} min={0} max={15} step={0.5} onChange={setEmployerMatch} format={v => `${v.toFixed(1)}%`} />
          <SliderInput label="Estimated Annual Return" value={annualReturn} min={0} max={15} step={0.1} onChange={setAnnualReturn} format={v => `${v.toFixed(1)}%`} />
        </div>

        <div className="bg-light-bg p-6 rounded-lg sticky top-28">
          <h3 className="text-xl font-bold text-dark-navy mb-4">Retirement Projection</h3>
          <div className="bg-white p-4 rounded-md shadow-sm text-center">
            <p className="text-sm text-gray-500">Estimated Nest Egg at Age {retirementAge}</p>
            <p className="text-4xl font-extrabold text-brand-purple">${estimatedNestEgg.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
          </div>
          <div className="mt-4">
             <h4 className="font-semibold text-dark-navy mb-2 text-center">Growth Over Time</h4>
            <Chart 
              type="line"
              data={chartData}
              config={{
                xAxis: { label: "Age" },
                yAxis: { label: "Savings" },
                keys: ['Nest Egg'],
                colors: ['#4A80FF']
              }}
            />
          </div>
        </div>
      </div>
      <div className="mt-16 max-w-4xl mx-auto p-8 rounded-lg bg-gray-50 border">
        <h3 className="text-2xl font-bold text-dark-navy mb-4">About the Retirement Calculator</h3>
        <div className="space-y-4 text-gray-700">
          <p>
            Saving for retirement is one of the most important financial goals, and starting early is key. This calculator is designed to give you an estimate of how much your retirement savings, like a 401(k) or an IRA, could grow by the time you're ready to retire.
          </p>
          <p>
            Key factors in this calculation include:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Monthly Contribution:</strong> The amount you regularly save from your paycheck. Consistency is crucial for long-term growth.</li>
            <li><strong>Employer Match:</strong> This is often referred to as "free money." Many employers will match your contributions up to a certain percentage of your salary. It's one of the best ways to accelerate your savings, and you should aim to contribute at least enough to get the full match.</li>
            <li><strong>Estimated Annual Return:</strong> This is the average annual growth you expect from your investments. Historically, diversified stock market investments have returned around 7-10% annually over the long term, though past performance is not a guarantee of future results.</li>
            <li><strong>Time:</strong> The longer your money is invested, the more time it has to benefit from compound growth. The chart clearly visualizes how your nest egg can grow exponentially in the later years.</li>
          </ul>
          <p>
            Use this tool as a guide to see if you are on track to meet your retirement goals. Adjust the variables to see how changes in your savings habits can have a dramatic impact on your future.
          </p>
        </div>
      </div>
    </CalculatorWrapper>
  );
};

export default RetirementCalculator;
