import React, { useState, useMemo } from 'react';
import { Page } from '../../App';
import CalculatorWrapper from './common/CalculatorWrapper';
import SliderInput from './common/SliderInput';
import Chart from './common/Chart';

const InvestmentCalculator: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => {
  const [initialInvestment, setInitialInvestment] = useState(10000);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [timePeriod, setTimePeriod] = useState(20);
  const [annualReturn, setAnnualReturn] = useState(8);

  const {
    futureValue,
    totalContributions,
    totalInterest,
    chartData
  } = useMemo(() => {
    let balance = initialInvestment;
    let contributions = initialInvestment;
    const monthlyRate = annualReturn / 100 / 12;
    const numberOfMonths = timePeriod * 12;
    const points = [{ x: 0, 'Total Contributions': contributions, 'Total Value': balance }];

    for (let i = 1; i <= numberOfMonths; i++) {
      balance *= (1 + monthlyRate);
      balance += monthlyContribution;
      contributions += monthlyContribution;
      
      if (i % 12 === 0 || i === numberOfMonths) {
        points.push({ x: i, 'Total Contributions': contributions, 'Total Value': balance });
      }
    }
    
    const interest = balance - contributions;

    return {
      futureValue: balance,
      totalContributions: contributions,
      totalInterest: interest,
      chartData: points
    };
  }, [initialInvestment, monthlyContribution, timePeriod, annualReturn]);

  return (
    <CalculatorWrapper
      title="Investment Calculator (Compound Interest)"
      description="Project the future value of your investments. See how your initial investment and regular contributions can grow over time with the power of compound interest."
      onNavigate={onNavigate}
    >
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="space-y-6">
          <SliderInput label="Initial Investment" value={initialInvestment} min={0} max={100000} step={1000} onChange={setInitialInvestment} format={v => `$${v.toLocaleString()}`} />
          <SliderInput label="Monthly Contribution" value={monthlyContribution} min={0} max={5000} step={50} onChange={setMonthlyContribution} format={v => `$${v.toLocaleString()}`} />
          <SliderInput label="Time Period (Years)" value={timePeriod} min={1} max={50} step={1} onChange={setTimePeriod} format={v => `${v} years`} />
          <SliderInput label="Estimated Annual Return" value={annualReturn} min={0} max={20} step={0.1} onChange={setAnnualReturn} format={v => `${v.toFixed(1)}%`} />
        </div>

        <div className="bg-light-bg p-6 rounded-lg sticky top-28">
          <h3 className="text-xl font-bold text-dark-navy mb-4">Investment Projection</h3>
          <div className="bg-white p-4 rounded-md shadow-sm text-center">
            <p className="text-sm text-gray-500">Projected Value in {timePeriod} years</p>
            <p className="text-4xl font-extrabold text-brand-purple">${futureValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="bg-white p-3 rounded-md shadow-sm text-center">
                <p className="text-sm text-gray-500">Total Contributions</p>
                <p className="text-xl font-bold text-dark-navy">${totalContributions.toLocaleString()}</p>
            </div>
             <div className="bg-white p-3 rounded-md shadow-sm text-center">
                <p className="text-sm text-gray-500">Total Interest Earned</p>
                <p className="text-xl font-bold text-green-600">${totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
            </div>
          </div>
          <div className="mt-4">
            <Chart 
              type="line"
              data={chartData}
              config={{
                xAxis: { label: "Month" },
                yAxis: { label: "Amount" },
                keys: ['Total Value', 'Total Contributions'],
                colors: ['#4A80FF', '#6EE7B7']
              }}
            />
          </div>
        </div>
      </div>
      <div className="mt-16 max-w-4xl mx-auto p-8 rounded-lg bg-gray-50 border">
        <h3 className="text-2xl font-bold text-dark-navy mb-4">The Power of Compound Interest</h3>
        <div className="space-y-4 text-gray-700">
          <p>
            Compound interest is often called the eighth wonder of the world, and for good reason. It's the process where you earn returns not only on your initial investment (the principal) but also on the accumulated interest from previous periods. This "interest on interest" effect can lead to exponential growth over the long term.
          </p>
          <p>
            This calculator visualizes this powerful concept. The key takeaways are:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Time is Your Greatest Asset:</strong> The chart clearly shows that the growth of your investment accelerates dramatically in the later years. The longer your money stays invested, the more time compounding has to work its magic. This is why it's so beneficial to start investing as early as possible.</li>
            <li><strong>Consistency Pays Off:</strong> Making regular monthly contributions is a powerful habit. It not only increases your total investment but also takes advantage of dollar-cost averaging, smoothing out market volatility.</li>
            <li><strong>Interest Can Outpace Contributions:</strong> For long-term investments, you'll often reach a tipping point where the interest you earn each year is greater than the total amount you contribute. This is where your money truly starts working for you.</li>
          </ul>
          <p>
            Use this tool to motivate yourself. See how small, consistent investments today can grow into a substantial sum in the future, helping you achieve your long-term financial goals.
          </p>
        </div>
      </div>
    </CalculatorWrapper>
  );
};

export default InvestmentCalculator;
