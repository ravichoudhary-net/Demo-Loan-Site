import React from 'react';
import { Page } from '../../App';
import InfoPageWrapper from './InfoPageWrapper';

const PersonalLoanInfo: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => {
  return (
    <InfoPageWrapper title="About Personal Loans" onNavigate={onNavigate}>
        <p>A personal loan is a type of installment loan that provides borrowers with a lump sum of money, which is then paid back in fixed monthly payments over a predetermined period. Unlike mortgages or auto loans, personal loans are typically unsecured, meaning they don't require collateral.</p>
        
        <h2 className="text-2xl font-bold text-dark-navy mt-8 mb-4">Common Uses for Personal Loans</h2>
        <p>The flexibility of personal loans makes them suitable for a wide range of financial needs, including:</p>
        <ul>
            <li><strong>Debt Consolidation:</strong> Combining multiple high-interest debts (like credit cards) into a single loan with a lower interest rate.</li>
            <li><strong>Home Improvement:</strong> Financing renovations, repairs, or upgrades to your home.</li>
            <li><strong>Major Purchases:</strong> Covering the cost of a significant expense like a wedding, vacation, or major appliance.</li>
            <li><strong>Medical Expenses:</strong> Paying for medical or dental procedures not fully covered by insurance.</li>
            <li><strong>Emergency Funding:</strong> Handling unexpected costs like a major car repair.</li>
        </ul>

        <h2 className="text-2xl font-bold text-dark-navy mt-8 mb-4">Pros and Cons</h2>
        <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-bold text-green-800">Pros</h3>
                <ul className="list-disc list-inside mt-2">
                    <li>Fixed interest rates and predictable monthly payments.</li>
                    <li>Lower interest rates compared to credit cards.</li>
                    <li>No collateral required (for unsecured loans).</li>
                    <li>Can be used for almost any purpose.</li>
                </ul>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
                <h3 className="font-bold text-red-800">Cons</h3>
                <ul className="list-disc list-inside mt-2">
                    <li>Interest rates can be higher than secured loans.</li>
                    <li>May have origination fees.</li>
                    <li>Requires a good credit score for the best rates.</li>
                </ul>
            </div>
        </div>

        <h2 className="text-2xl font-bold text-dark-navy mt-8 mb-4">How to Qualify</h2>
        <p>Lenders typically look at several factors when evaluating a personal loan application:</p>
        <ul>
            <li><strong>Credit Score:</strong> This is one of the most important factors. A higher score indicates lower risk and usually results in a lower interest rate.</li>
            <li><strong>Debt-to-Income (DTI) Ratio:</strong> Lenders want to see that you can comfortably afford the new loan payment alongside your existing debts.</li>
            <li><strong>Income and Employment:</strong> A stable source of income is necessary to show you can repay the loan.</li>
        </ul>
    </InfoPageWrapper>
  );
};

export default PersonalLoanInfo;