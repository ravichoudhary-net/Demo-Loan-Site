import React from 'react';
import { Page } from '../../App';
import InfoPageWrapper from './InfoPageWrapper';

const AutoLoanInfo: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => {
  return (
    <InfoPageWrapper title="About Auto Loans" onNavigate={onNavigate}>
      <p>An auto loan is a secured loan that helps you finance the purchase of a new or used vehicle. Because the vehicle itself serves as collateral, auto loans typically have lower interest rates than unsecured personal loans. The loan is paid back in fixed monthly installments over a set period.</p>
      
      <h2 className="text-2xl font-bold text-dark-navy mt-8 mb-4">Key Factors in an Auto Loan</h2>
      <p>When you're shopping for a car loan, these are the most important elements to consider:</p>
      <ul>
        <li><strong>Loan Amount:</strong> This is the total amount you finance, which includes the vehicle price, taxes, and fees, minus your down payment and any trade-in value.</li>
        <li><strong>APR (Annual Percentage Rate):</strong> The true cost of your loan, including the interest rate and any lender fees. Your credit score is the single biggest factor influencing your APR.</li>
        <li><strong>Loan Term:</strong> The length of time you have to repay the loan, typically ranging from 36 to 84 months. A longer term means lower monthly payments but more total interest paid over the life of the loan.</li>
        <li><strong>Down Payment:</strong> The amount of cash you pay upfront. A larger down payment reduces the amount you need to finance, lowers your monthly payment, and can help you secure a better interest rate.</li>
      </ul>

      <h2 className="text-2xl font-bold text-dark-navy mt-8 mb-4">New vs. Used Car Financing</h2>
      <p>Financing differs slightly depending on whether you're buying a new or used car:</p>
        <ul className="list-disc list-inside space-y-2">
            <li><strong>New Cars:</strong> Often come with lower interest rates and promotional financing deals from the manufacturer. However, they also depreciate in value much faster.</li>
            <li><strong>Used Cars:</strong> May have slightly higher interest rates due to the increased risk for lenders. However, the overall loan amount is typically lower, and the car's value depreciates more slowly.</li>
        </ul>

      <h2 className="text-2xl font-bold text-dark-navy mt-8 mb-4">Getting the Best Deal</h2>
      <p>To ensure you get the best possible auto loan:</p>
      <ol>
        <li><strong>Check Your Credit:</strong> Know your credit score before you start shopping. A higher score will get you better rates.</li>
        <li><strong>Get Pre-Approved:</strong> Get a loan offer from a bank, credit union, or online lender *before* you go to the dealership. This gives you a baseline to compare against and strengthens your negotiating position.</li>
        <li><strong>Keep the Term Short:</strong> Choose the shortest loan term you can comfortably afford to minimize the total interest you pay.</li>
      </ol>
    </InfoPageWrapper>
  );
};

export default AutoLoanInfo;