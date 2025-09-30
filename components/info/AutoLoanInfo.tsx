import React from 'react';
import { Page } from '../../App';
import InfoPageWrapper from './InfoPageWrapper';
import { allProvidersData, Provider } from '../AllProviders';
import CompactAutoLoanCalculator from './calculators/CompactAutoLoanCalculator';

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

const AutoLoanInfo: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => {
  const autoLoanProviders = allProvidersData
    .filter(p => p.loanTypes.includes('Auto'))
    .sort((a, b) => a.minApr - b.minApr)
    .slice(0, 5);
  
  const sidebarContent = (
    <>
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <h3 className="text-lg font-bold text-dark-navy border-b pb-2 mb-3">Key Takeaways</h3>
            <ul className="space-y-2 text-sm text-gray-600 list-disc list-inside">
                <li>Secured by the vehicle, resulting in lower rates.</li>
                <li>Get pre-approved before visiting a dealership.</li>
                <li>Your credit score is the biggest factor in your APR.</li>
                <li>Shorter terms save interest but have higher payments.</li>
                <li>A larger down payment reduces your loan amount.</li>
            </ul>
        </div>
        <CompactAutoLoanCalculator />
    </>
  );

  return (
    <InfoPageWrapper title="Guide to Auto Loans" onNavigate={onNavigate} sidebarContent={sidebarContent}>
      <p>An auto loan is a secured loan that helps you finance the purchase of a new or used vehicle. Because the vehicle itself serves as collateral, auto loans typically have lower interest rates than unsecured personal loans. The loan is paid back in fixed monthly installments over a set period.</p>
      
      <h2 className="text-2xl font-bold text-dark-navy mt-8 mb-4">Key Factors in an Auto Loan</h2>
      <p>When you're shopping for a car loan, these are the most important elements to consider:</p>
      <ul>
        <li><strong>Loan Amount:</strong> This is the total amount you finance, which includes the vehicle price, taxes, and fees, minus your down payment and any trade-in value.</li>
        <li><strong>APR (Annual Percentage Rate):</strong> The true cost of your loan, including the interest rate and any lender fees. Your credit score is the single biggest factor influencing your APR.</li>
        <li><strong>Loan Term:</strong> The length of time you have to repay the loan, typically ranging from 36 to 84 months. A longer term means lower monthly payments but more total interest paid over the life of the loan.</li>
        <li><strong>Down Payment:</strong> The amount of cash you pay upfront. A larger down payment reduces the amount you need to finance, lowers your monthly payment, and can help you secure a better interest rate. A down payment of 10-20% is recommended.</li>
      </ul>

      <h2 className="text-2xl font-bold text-dark-navy mt-8 mb-4">Where to Get an Auto Loan</h2>
      <p>You have several options for securing financing, each with its own pros and cons:</p>
        <ul className="list-disc list-inside space-y-2">
            <li><strong>Banks and Credit Unions:</strong> Often offer competitive rates, especially if you are an existing customer. Credit unions, in particular, are known for favorable terms.</li>
            <li><strong>Online Lenders:</strong> Can provide a fast, convenient application process and may have competitive rates. This is a great place to get pre-approved.</li>
            <li><strong>Dealership Financing:</strong> While convenient, the rates offered may not be the most competitive. Having a pre-approval from another lender gives you a strong negotiating position.</li>
        </ul>

      <h2 className="text-2xl font-bold text-dark-navy mt-8 mb-4">Getting the Best Deal</h2>
      <p>To ensure you get the best possible auto loan:</p>
      <ol>
        <li><strong>Check Your Credit:</strong> Know your credit score before you start shopping. A higher score will get you better rates. Dispute any errors on your report.</li>
        <li><strong>Get Pre-Approved:</strong> This is the most crucial step. Get a loan offer from a bank, credit union, or online lender *before* you go to the dealership. This tells you how much you can afford and gives you a baseline rate to compare against.</li>
        <li><strong>Negotiate the Car Price First:</strong> Keep the conversation about the vehicle price separate from financing. Settle on a price for the car before discussing loan terms.</li>
        <li><strong>Keep the Term as Short as Possible:</strong> Choose the shortest loan term you can comfortably afford to minimize the total interest you pay.</li>
      </ol>
      
       <div className="not-prose mt-12">
            <h2 className="text-3xl font-extrabold text-dark-navy mb-6 border-t pt-8">Top Auto Loan Providers</h2>
            <div className="space-y-4">
                {autoLoanProviders.map(provider => (
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

export default AutoLoanInfo;