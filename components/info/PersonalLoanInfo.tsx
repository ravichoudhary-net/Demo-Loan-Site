import React from 'react';
import { Page } from '../../App';
import InfoPageWrapper from './InfoPageWrapper';
import { allProvidersData, Provider } from '../AllProviders';
import CompactPersonalLoanCalculator from './calculators/CompactPersonalLoanCalculator';

const ProviderCard: React.FC<{ provider: Provider }> = ({ provider }) => (
    <div className="not-prose bg-gray-50 p-4 rounded-lg border shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
            <div className={`flex-shrink-0 w-12 h-12 rounded-full ${provider.logoBg} flex items-center justify-center text-white font-bold text-xl`}>
                {provider.logoContent}
            </div>
            <div>
                <h4 className="font-bold text-dark-navy">{provider.name}</h4>
                <p className="text-sm text-gray-500">APR: <span className="font-semibold text-brand-purple">{provider.aprRange}</span></p>
            </div>
        </div>
        <a href={provider.website} target="_blank" rel="noopener noreferrer" className="bg-gradient-primary text-white font-semibold py-2 px-4 rounded-lg shadow-sm hover:shadow-md transition-shadow text-sm w-full sm:w-auto text-center">
            Check Rates
        </a>
    </div>
);

const PersonalLoanInfo: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => {
  const personalLoanProviders = allProvidersData
    .filter(p => p.loanTypes.includes('Personal'))
    .sort((a, b) => a.minApr - b.minApr)
    .slice(0, 5);
  
  const sidebarContent = (
    <>
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <h3 className="text-lg font-bold text-dark-navy border-b pb-2 mb-3">Key Takeaways</h3>
            <ul className="space-y-2 text-sm text-gray-600 list-disc list-inside">
                <li>Typically unsecured (no collateral needed).</li>
                <li>Fixed rates provide predictable payments.</li>
                <li>Rates are often lower than credit cards.</li>
                <li>Good credit is key for the best rates.</li>
                <li>Versatile for many uses, like debt consolidation.</li>
            </ul>
        </div>
        <CompactPersonalLoanCalculator />
    </>
  );

  return (
    <InfoPageWrapper title="Guide to Personal Loans" onNavigate={onNavigate} sidebarContent={sidebarContent}>
        <p>A personal loan is a type of installment loan that provides borrowers with a lump sum of money, which is then paid back in fixed monthly payments over a predetermined period. Unlike mortgages or auto loans, personal loans are typically unsecured, meaning they don't require collateral.</p>
        
        <h2 className="text-2xl font-bold text-dark-navy mt-8 mb-4">How Personal Loans Work</h2>
        <p>The process is straightforward. You apply with a lender, who evaluates your creditworthiness. If approved, you receive the full loan amount upfront. You then repay the loan, plus interest, in equal monthly installments until the balance is paid off. The loan term typically ranges from two to seven years.</p>
        
        <h2 className="text-2xl font-bold text-dark-navy mt-8 mb-4">Common Uses for Personal Loans</h2>
        <p>The flexibility of personal loans makes them suitable for a wide range of financial needs, including:</p>
        <ul>
            <li><strong>Debt Consolidation:</strong> Combining multiple high-interest debts (like credit cards) into a single loan with a lower interest rate.</li>
            <li><strong>Home Improvement:</strong> Financing renovations, repairs, or upgrades to your home without needing a home equity loan.</li>
            <li><strong>Major Purchases:</strong> Covering the cost of a significant expense like a wedding, vacation, or major appliance.</li>
            <li><strong>Medical Expenses:</strong> Paying for medical or dental procedures not fully covered by insurance.</li>
            <li><strong>Emergency Funding:</strong> Handling unexpected costs like a major car repair or a sudden job loss.</li>
        </ul>

        <h2 className="text-2xl font-bold text-dark-navy mt-8 mb-4">How to Qualify & Apply</h2>
        <p>Lenders typically look at several factors when evaluating a personal loan application:</p>
        <ol>
            <li><strong>Check Your Credit Score:</strong> This is one of the most important factors. A higher score indicates lower risk and usually results in a lower interest rate.</li>
            <li><strong>Assess Your Debt-to-Income (DTI) Ratio:</strong> Lenders want to see that you can comfortably afford the new loan payment alongside your existing debts.</li>
            <li><strong>Gather Documents:</strong> You'll typically need proof of identity (like a driver's license), proof of income (pay stubs or tax returns), and bank statements.</li>
            <li><strong>Compare Lenders:</strong> Shop around to find the best rates and terms. Many online lenders offer pre-qualification with a soft credit check, which won't affect your score.</li>
        </ol>
        
        <div className="not-prose mt-12">
            <h2 className="text-3xl font-extrabold text-dark-navy mb-6 border-t pt-8">Top Personal Loan Providers</h2>
            <div className="space-y-4">
                {personalLoanProviders.map(provider => (
                    <ProviderCard key={provider.name} provider={provider} />
                ))}
            </div>
            <div className="text-center mt-8">
                <button 
                  onClick={() => onNavigate('providers')} 
                  className="bg-white text-gray-700 font-bold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-300"
                >
                    View All Providers
                </button>
            </div>
        </div>
    </InfoPageWrapper>
  );
};

export default PersonalLoanInfo;