import React, { useState, useMemo } from 'react';
import { Page } from '../../App';
import CalculatorWrapper from './common/CalculatorWrapper';
import SliderInput from './common/SliderInput';

const LTVCalculator: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => {
  const [appraisedValue, setAppraisedValue] = useState(400000);
  const [loanAmount, setLoanAmount] = useState(320000);

  const { ltv, risk, pmiRequired } = useMemo(() => {
    if (appraisedValue <= 0) return { ltv: 0, risk: 'N/A', pmiRequired: false };
    
    const ratio = (loanAmount / appraisedValue) * 100;
    let riskLevel = 'Good';
    let pmi = false;
    
    if (ratio > 80) {
      riskLevel = 'High';
      pmi = true;
    }
    if (ratio > 95) {
      riskLevel = 'Very High';
    }

    return { ltv: ratio, risk: riskLevel, pmiRequired: pmi };
  }, [appraisedValue, loanAmount]);

  const getRiskColor = () => {
      if (risk === 'Good') return 'bg-green-500';
      if (risk === 'High') return 'bg-yellow-500';
      if (risk === 'Very High') return 'bg-red-500';
      return 'bg-gray-300';
  }

  return (
    <CalculatorWrapper
      title="Loan-to-Value (LTV) Calculator"
      description="Calculate your Loan-to-Value (LTV) ratio, a key metric used by lenders to assess risk for mortgage and other secured loans."
      onNavigate={onNavigate}
    >
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <SliderInput label="Appraised Property Value" value={appraisedValue} min={50000} max={2000000} step={10000} onChange={setAppraisedValue} format={v => `$${v.toLocaleString()}`} />
          <SliderInput label="Loan Amount" value={loanAmount} min={10000} max={appraisedValue} step={5000} onChange={setLoanAmount} format={v => `$${v.toLocaleString()}`} />
        </div>
        
        <div className="bg-light-bg p-6 rounded-lg text-center">
          <p className="text-sm text-gray-500">Loan-to-Value (LTV) Ratio</p>
          <p className="text-6xl font-extrabold text-brand-purple my-4">{ltv.toFixed(2)}%</p>
          <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
            <div className={`h-4 rounded-full ${getRiskColor()}`} style={{ width: `${Math.min(ltv, 100)}%` }}></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>0%</span>
            <span>80%</span>
            <span>100%</span>
          </div>
           <div className="mt-4 bg-white p-3 rounded-md shadow-sm">
             <p className="font-semibold text-gray-500">Lender Risk Assessment</p>
             <p className={`text-lg font-bold ${risk === 'Good' ? 'text-green-600' : risk === 'High' ? 'text-yellow-600' : 'text-red-600'}`}>{risk}</p>
          </div>
          {pmiRequired && <p className="text-sm text-yellow-700 mt-3 font-semibold">Private Mortgage Insurance (PMI) is likely required.</p>}
        </div>
      </div>
      <div className="mt-16 max-w-4xl mx-auto p-8 rounded-lg bg-gray-50 border">
        <h3 className="text-2xl font-bold text-dark-navy mb-4">Understanding Loan-to-Value (LTV)</h3>
        <div className="space-y-4 text-gray-700">
          <p>
            The Loan-to-Value (LTV) ratio is a financial term used by lenders to express the ratio of a loan to the value of an asset being purchased. In the context of a mortgage, it's the loan amount divided by the appraised value of the property.
          </p>
          <p>
            LTV is a key risk factor that lenders assess when considering a loan application:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Lower LTV (e.g., below 80%):</strong> This indicates a lower risk for the lender. A lower LTV means you have more equity (a larger down payment) in the property, making you a more attractive borrower. You are more likely to get approved and receive a better interest rate.</li>
            <li><strong>Higher LTV (e.g., above 80%):</strong> This represents a higher risk for the lender. If you default on the loan, the lender may have trouble recovering the full loan amount by selling the property. To offset this risk, lenders typically require you to pay for <strong>Private Mortgage Insurance (PMI)</strong> if your LTV is above 80%.</li>
          </ul>
          <p>
            This calculator helps you quickly determine your LTV ratio so you can understand your borrowing position and anticipate potential costs like PMI.
          </p>
        </div>
      </div>
    </CalculatorWrapper>
  );
};

export default LTVCalculator;
