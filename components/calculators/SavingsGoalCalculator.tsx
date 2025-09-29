import React, { useState, useMemo } from 'react';
import { Page } from '../../App';
import CalculatorWrapper from './common/CalculatorWrapper';
import SliderInput from './common/SliderInput';
import Chart from './common/Chart';

const SavingsGoalCalculator: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => {
  const [savingsGoal, setSavingsGoal] = useState(50000);
  const [initialDeposit, setInitialDeposit] = useState(5000);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [timeframe, setTimeframe] = useState(5);
  const [annualRate, setAnnualRate] = useState(4);

  const { projectedSavings, isGoalMet, chartData } = useMemo(() => {
    let balance = initialDeposit;
    const monthlyRate = annualRate / 100 / 12;
    const numberOfMonths = timeframe * 12;
    const points = [{ x: 0, 'Projected Savings': balance, 'Goal': savingsGoal }];

    for (let i = 1; i <= numberOfMonths; i++) {
      balance += monthlyContribution;
      balance *= (1 + monthlyRate);
      if (i % 12 === 0 || i === 1 || i === numberOfMonths) {
        points.push({ x: i, 'Projected Savings': balance, 'Goal': savingsGoal });
      }
    }
    
    return {
      projectedSavings: balance,
      isGoalMet: balance >= savingsGoal,
      chartData: points
    };
  }, [savingsGoal, initialDeposit, monthlyContribution, timeframe, annualRate]);

  return (
    <CalculatorWrapper
      title="Savings Goal Calculator"
      description="Plan how to reach your savings target. See how your initial deposit, monthly contributions, and interest compound over time."
      onNavigate={onNavigate}
    >
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="space-y-6">
          <SliderInput label="Savings Goal" value={savingsGoal} min={1000} max={1000000} step={1000} onChange={setSavingsGoal} format={v => `$${v.toLocaleString()}`} />
          <SliderInput label="Initial Deposit" value={initialDeposit} min={0} max={savingsGoal} step={100} onChange={setInitialDeposit} format={v => `$${v.toLocaleString()}`} />
          <SliderInput label="Monthly Contribution" value={monthlyContribution} min={0} max={5000} step={50} onChange={setMonthlyContribution} format={v => `$${v.toLocaleString()}`} />
          <SliderInput label="Timeframe (Years)" value={timeframe} min={1} max={30} step={1} onChange={setTimeframe} format={v => `${v} years`} />
          <SliderInput label="Estimated Annual Return" value={annualRate} min={0} max={15} step={0.1} onChange={setAnnualRate} format={v => `${v.toFixed(1)}%`} />
        </div>

        <div className="bg-light-bg p-6 rounded-lg sticky top-28">
          <h3 className="text-xl font-bold text-dark-navy mb-4">Savings Projection</h3>
          <div className="bg-white p-4 rounded-md shadow-sm text-center">
            <p className="text-sm text-gray-500">Projected Savings in {timeframe} years</p>
            <p className="text-3xl font-bold text-brand-purple">${projectedSavings.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
          </div>
          <div className={`mt-4 p-4 rounded-md shadow-sm text-center ${isGoalMet ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            <p className="font-bold text-lg">
              {isGoalMet 
                ? `Congratulations! You've reached your goal!`
                : `You are short of your goal by $${(savingsGoal - projectedSavings).toLocaleString(undefined, { maximumFractionDigits: 2 })}`
              }
            </p>
          </div>
          <div className="mt-4">
            <Chart 
              type="line"
              data={chartData}
              config={{
                xAxis: { label: "Month" },
                yAxis: { label: "Amount" },
                keys: ['Projected Savings', 'Goal'],
                colors: ['#4A80FF', '#10B981']
              }}
            />
          </div>
        </div>
      </div>
      <div className="mt-16 max-w-4xl mx-auto p-8 rounded-lg bg-gray-50 border">
        <h3 className="text-2xl font-bold text-dark-navy mb-4">About the Savings Goal Calculator</h3>
        <div className="space-y-4 text-gray-700">
          <p>
            Setting a financial goal is the first step toward achieving it. This calculator is a powerful tool designed to help you create a clear plan to reach your savings targets, whether it's for a down payment on a house, a new car, a vacation, or building an emergency fund.
          </p>
          <p>
            The calculator demonstrates the power of two key principles in building wealth:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Consistent Contributions:</strong> Making regular monthly deposits is the foundation of any successful savings plan. It creates momentum and discipline.</li>
            <li><strong>Compound Interest:</strong> This is where your money starts working for you. The "Estimated Annual Return" represents the interest or investment gains you earn not just on your initial deposit and contributions, but also on the accumulated interest itself. Over time, this effect can dramatically accelerate your savings growth.</li>
          </ul>
          <p>
            Use this tool to experiment with different scenarios. See how increasing your monthly contribution or finding an account with a higher annual return can help you reach your goal faster.
          </p>
        </div>
      </div>
    </CalculatorWrapper>
  );
};

export default SavingsGoalCalculator;
