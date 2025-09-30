import React from 'react';
import { Page } from '../../App';
import InfoPageWrapper from './InfoPageWrapper';
import { allProvidersData, Provider } from '../AllProviders';
import CompactMortgageCalculator from './calculators/CompactMortgageCalculator';

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

const MortgageLoanInfo: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => {
  const mortgageProviders = allProvidersData
    .filter(p => p.loanTypes.includes('Mortgage'))
    .sort((a, b) => a.minApr - b.minApr)
    .slice(0, 5);

  const sidebarContent = (
    <>
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <h3 className="text-lg font-bold text-dark-navy border-b pb-2 mb-3">Key Takeaways</h3>
            <ul className="space-y-2 text-sm text-gray-600 list-disc list-inside">
                <li>A secured loan used to buy property.</li>
                <li>Fixed-rate offers payment stability.</li>
                <li>Adjustable-rate (ARM) may start lower.</li>
                <li>Down payments under 20% often require PMI.</li>
                <li>Pre-approval strengthens your offer.</li>
            </ul>
        </div>
        <CompactMortgageCalculator />
    </>
  );

  return (
    <InfoPageWrapper title="Guide to Mortgages" onNavigate={onNavigate} sidebarContent={sidebarContent}>
      <p>A mortgage is a loan used to purchase or maintain a home, land, or other types of real estate. The borrower agrees to pay the lender back over time, typically in a series of regular payments that are divided into principal and interest. The property itself serves as collateral to secure the loan.</p>
      
      <h2 className="text-2xl font-bold text-dark-navy mt-8 mb-4">Types of Mortgages</h2>
      <p>There are many types of mortgages, but most fall into these common categories:</p>
      <ul>
        <li><strong>Fixed-Rate Mortgage:</strong> The interest rate remains the same for the entire life of the loan, providing predictable monthly payments. Common terms are 15 or 30 years.</li>
        <li><strong>Adjustable-Rate Mortgage (ARM):</strong> The interest rate is fixed for an initial period, then adjusts periodically based on market indexes. ARMs often start with a lower rate but can increase over time.</li>
        <li><strong>FHA Loans:</strong> Insured by the Federal Housing Administration, these loans are popular with first-time homebuyers due to their lower down payment requirements.</li>
        <li><strong>VA Loans:</strong> Backed by the Department of Veterans Affairs, these loans are available to eligible veterans, service members, and surviving spouses, often with no down payment required.</li>
      </ul>

      <h2 className="text-2xl font-bold text-dark-navy mt-8 mb-4">Factors That Affect Your Rate</h2>
       <ul>
            <li><strong>Credit Score:</strong> The higher your score, the lower your interest rate. This is the most significant factor for lenders.</li>
            <li><strong>Down Payment:</strong> A larger down payment (ideally 20% or more) reduces the lender's risk and can lead to a better rate.</li>
            <li><strong>Loan-to-Value (LTV):</strong> This ratio of the loan amount to the home's value is directly related to your down payment. A lower LTV is better.</li>
            <li><strong>Debt-to-Income (DTI) Ratio:</strong> Lenders want to see that your total monthly debts, including the new mortgage, are manageable compared to your income.</li>
        </ul>

      <h2 className="text-2xl font-bold text-dark-navy mt-8 mb-4">The Mortgage Process Step-by-Step</h2>
      <p>Securing a mortgage involves several key steps:</p>
      <ol>
        <li><strong>Budgeting & Credit Check:</strong> Determine how much house you can afford and check your credit report for any errors.</li>
        <li><strong>Pre-Approval:</strong> Submit financial documents to a lender to get a conditional commitment for a specific loan amount. This shows sellers you are a serious buyer.</li>
        <li><strong>House Hunting:</strong> Find a home within your approved budget and make an offer.</li>
        <li><strong>Formal Loan Application:</strong> Once your offer is accepted, you complete the official loan application.</li>
        <li><strong>Underwriting & Appraisal:</strong> The lender verifies all your information and has the property appraised to ensure it's worth the loan amount.</li>
        <li><strong>Closing:</strong> You sign the final loan documents, pay closing costs, and get the keys to your new home.</li>
      </ol>

      <div className="not-prose mt-12">
            <h2 className="text-3xl font-extrabold text-dark-navy mb-6 border-t pt-8">Top Mortgage Providers</h2>
            <div className="space-y-4">
                {mortgageProviders.map(provider => (
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

export default MortgageLoanInfo;