import React, { useState, useMemo } from 'react';
import { Page } from '../../App';
import CalculatorWrapper from './common/CalculatorWrapper';
import SliderInput from './common/SliderInput';
import Chart from './common/Chart';

const HomeEquityCalculator: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => {
  const [homeValue, setHomeValue] = useState(400000);
  const [mortgageBalance, setMortgageBalance] = useState(250000);
  const [ltvRatio, setLtvRatio] = useState(85);

  const { totalEquity, availableEquity, maxLoanAmount } = useMemo(() => {
    const equity = homeValue - mortgageBalance;
    const maxLoan = homeValue * (ltvRatio / 100);
    const available = maxLoan - mortgageBalance;
    return {
      totalEquity: equity > 0 ? equity : 0,
      availableEquity: available > 0 ? available : 0,
      maxLoanAmount: maxLoan
    };
  }, [homeValue, mortgageBalance, ltvRatio]);

  const chartData = [
    { name: 'Home Value', 'Mortgage Balance': mortgageBalance, 'Total Equity': totalEquity > 0 ? totalEquity : 0 }
  ];

  return (
    <CalculatorWrapper
      title="Home Equity Calculator"
      description="Estimate your available home equity and potential borrowing amount based on your home's value and current mortgage balance."
      onNavigate={onNavigate}
    >
      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Input Section */}
        <div className="space-y-6">
          <SliderInput label="Current Home Value" value={homeValue} min={50000} max={2000000} step={10000} onChange={setHomeValue} format={v => `$${v.toLocaleString()}`} />
          <SliderInput label="Current Mortgage Balance" value={mortgageBalance} min={0} max={homeValue} step={5000} onChange={setMortgageBalance} format={v => `$${v.toLocaleString()}`} />
          <SliderInput label="Lender's LTV Ratio" value={ltvRatio} min={70} max={100} step={1} onChange={setLtvRatio} format={v => `${v}%`} />
        </div>

        {/* Results Section */}
        <div className="bg-light-bg p-6 rounded-lg">
          <h3 className="text-xl font-bold text-dark-navy mb-4">Your Estimated Equity</h3>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-md shadow-sm">
              <p className="text-sm text-gray-500">Total Home Equity</p>
              <p className="text-3xl font-bold text-brand-purple">${totalEquity.toLocaleString()}</p>
            </div>
            <div className="bg-white p-4 rounded-md shadow-sm">
              <p className="text-sm text-gray-500">Estimated Available Equity for Loan</p>
              <p className="text-3xl font-bold text-green-600">${availableEquity.toLocaleString()}</p>
            </div>
          </div>
           <div className="mt-6">
             <h4 className="font-semibold text-dark-navy mb-2">Equity Breakdown</h4>
             <Chart
                type="bar"
                data={chartData}
                config={{
                    layout: 'horizontal',
                    keys: ['Mortgage Balance', 'Total Equity'],
                    colors: ['#A78BFA', '#34D399']
                }}
             />
           </div>
        </div>
      </div>
       <div className="mt-16 max-w-4xl mx-auto p-8 rounded-lg bg-gray-50 border">
        <h3 className="text-2xl font-bold text-dark-navy mb-4">What is Home Equity?</h3>
        <div className="space-y-4 text-gray-700">
          <p>
            Home equity is the difference between the current market value of your home and the amount you still owe on your mortgage. It's the portion of your home that you truly "own." As you pay down your mortgage and as your home's value appreciates, your equity grows.
          </p>
          <p>
            This calculator helps you estimate how much of that equity you might be able to borrow against using a home equity loan or a home equity line of credit (HELOC).
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Current Home Value:</strong> An estimate of what your home is worth today. You can get a rough idea from online tools or a more accurate one from a professional appraiser.</li>
            <li><strong>Mortgage Balance:</strong> The remaining amount you owe on your mortgage.</li>
            <li><strong>Loan-to-Value (LTV) Ratio:</strong> This is a key metric for lenders. They typically allow you to borrow up to a certain percentage of your home's value. A common maximum LTV is 85%, meaning the total of your existing mortgage and the new equity loan cannot exceed 85% of your home's value.</li>
          </ul>
          <p>
            Tapping into your home's equity can be a cost-effective way to finance major expenses like home renovations, education, or debt consolidation, as these loans often have lower interest rates than unsecured personal loans.
          </p>
        </div>
      </div>
    </CalculatorWrapper>
  );
};

export default HomeEquityCalculator;
