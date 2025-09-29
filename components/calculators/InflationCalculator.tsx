import React, { useState, useMemo } from 'react';
import { Page } from '../../App';
import CalculatorWrapper from './common/CalculatorWrapper';
import SliderInput from './common/SliderInput';

const HISTORICAL_INFLATION_RATE = 3.2; // Average US inflation rate as an example

const InflationCalculator: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => {
  const [initialAmount, setInitialAmount] = useState(100000);
  const [years, setYears] = useState(20);
  const [inflationRate, setInflationRate] = useState(HISTORICAL_INFLATION_RATE);

  const { futureValue, totalLossInValue } = useMemo(() => {
    const future = initialAmount * Math.pow(1 + (inflationRate / 100), years);
    const purchasingPower = (initialAmount / future) * initialAmount;
    return {
      futureValue: purchasingPower,
      totalLossInValue: initialAmount - purchasingPower
    };
  }, [initialAmount, years, inflationRate]);

  return (
    <CalculatorWrapper
      title="Inflation Calculator"
      description="See how the value of your money can change over time due to inflation. Understand the future purchasing power of your savings."
      onNavigate={onNavigate}
    >
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <SliderInput label="Initial Amount" value={initialAmount} min={1000} max={1000000} step={1000} onChange={setInitialAmount} format={v => `$${v.toLocaleString()}`} />
          <SliderInput label="Number of Years" value={years} min={1} max={50} step={1} onChange={setYears} format={v => `${v} years`} />
          <SliderInput label="Annual Inflation Rate" value={inflationRate} min={1} max={10} step={0.1} onChange={setInflationRate} format={v => `${v.toFixed(1)}%`} />
        </div>

        <div className="bg-light-bg p-6 rounded-lg text-center">
          <p className="text-sm text-gray-500">In {years} years, ${initialAmount.toLocaleString()} will have the same buying power as</p>
          <p className="text-5xl font-extrabold text-brand-purple my-4">${futureValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
          <p className="text-sm text-gray-500">today.</p>
          <div className="mt-4 bg-white p-3 rounded-md shadow-sm">
             <p className="font-semibold text-gray-500">Total Loss in Purchasing Power</p>
             <p className="text-2xl font-bold text-red-600">${totalLossInValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
          </div>
        </div>
      </div>
      <div className="mt-16 max-w-4xl mx-auto p-8 rounded-lg bg-gray-50 border">
        <h3 className="text-2xl font-bold text-dark-navy mb-4">About the Inflation Calculator</h3>
        <div className="space-y-4 text-gray-700">
          <p>
            Inflation is the rate at which the general level of prices for goods and services is rising, and subsequently, purchasing power is falling. In simple terms, a dollar today is worth more than a dollar tomorrow. This calculator helps you visualize this important economic concept.
          </p>
          <p>
            Key terms to understand:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Purchasing Power:</strong> This is the value of a currency expressed in terms of the amount of goods or services that one unit of money can buy. Inflation erodes purchasing power.</li>
            <li><strong>Annual Inflation Rate:</strong> The percentage increase in the average price level of goods and services over a year. While it fluctuates, we use a historical average for this calculator's default setting.</li>
          </ul>
          <p>
            Why is this important for your financial planning? If your savings are not growing at a rate that is at least equal to the rate of inflation, you are effectively losing money. For example, if your savings account earns 1% interest but inflation is 3%, your purchasing power is decreasing by 2% each year. This is why investing in assets that have the potential to outperform inflation is crucial for long-term goals like retirement.
          </p>
        </div>
      </div>
    </CalculatorWrapper>
  );
};

export default InflationCalculator;
