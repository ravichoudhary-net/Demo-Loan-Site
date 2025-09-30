import React from 'react';
import { Page } from '../../App';
import InfoPageWrapper from './InfoPageWrapper';
import { allProvidersData, Provider } from '../AllProviders';
import CompactHomeEquityLoanCalculator from './calculators/CompactHomeEquityLoanCalculator';

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

const HomeEquityLoanInfo: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => {
  const homeEquityProviders = allProvidersData
    .filter(p => p.tags.includes('Home Improvement'))
    .sort((a, b) => a.minApr - b.minApr)
    .slice(0, 5);

  const sidebarContent = (
    <>
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <h3 className="text-lg font-bold text-dark-navy border-b pb-2 mb-3">Key Takeaways</h3>
            <ul className="space-y-2 text-sm text-gray-600 list-disc list-inside">
                <li>Lets you borrow against your home's equity.</li>
                <li>Often has lower interest rates than personal loans.</li>
                <li>The interest paid may be tax-deductible.</li>
                <li>Your home is used as collateral, which carries risk.</li>
                <li>Two main types: fixed-rate loans and lines of credit (HELOC).</li>
            </ul>
        </div>
        <CompactHomeEquityLoanCalculator />
    </>
  );

  return (
    <InfoPageWrapper title="Guide to Home Equity Loans" onNavigate={onNavigate} sidebarContent={sidebarContent}>
      <p>Home equity financing allows you to borrow against the value of your home that you've already paid off. It's a powerful financial tool that can provide access to a large sum of money at a lower interest rate than most other types of credit, because your home serves as collateral.</p>
      
      <h2 className="text-2xl font-bold text-dark-navy mt-8 mb-4">Home Equity Loan vs. HELOC</h2>
      <p>There are two primary ways to tap into your home's equity:</p>
      <ul>
        <li><strong>Home Equity Loan:</strong> This is a type of installment loan. You receive a lump sum of money upfront and pay it back in fixed monthly payments over a set term (typically 5 to 15 years). It's a good choice if you have a specific, large expense and want the predictability of a fixed interest rate and payment.</li>
        <li><strong>Home Equity Line of Credit (HELOC):</strong> This functions more like a credit card. You're approved for a revolving line of credit up to a certain limit. During a "draw period" (usually 10 years), you can borrow and repay funds as needed. Payments are often interest-only during this time. After the draw period, you enter a repayment period where you pay back the principal and interest. HELOCs are ideal for ongoing projects or when you're unsure of the total cost.</li>
      </ul>

      <h2 className="text-2xl font-bold text-dark-navy mt-8 mb-4">How Much Can You Borrow?</h2>
      <p>Lenders typically allow you to borrow up to 85% of your home's appraised value, minus what you still owe on your primary mortgage. This is known as the combined loan-to-value (CLTV) ratio. For example, if your home is worth $400,000 and your mortgage balance is $250,000, your maximum potential credit might be:</p>
      <p className="not-prose my-4 p-4 bg-gray-100 rounded-lg text-center font-mono">($400,000 x 0.85) - $250,000 = $90,000</p>
      
      <h2 className="text-2xl font-bold text-dark-navy mt-8 mb-4">Risks to Consider</h2>
      <p>The biggest risk of a home equity loan or HELOC is that your home is the collateral. If you are unable to make your payments, you could face foreclosure and lose your home. It's crucial to borrow responsibly and ensure you can comfortably afford the monthly payments before taking on this type of debt.</p>
      
      <div className="not-prose mt-12">
          <h2 className="text-3xl font-extrabold text-dark-navy mb-6 border-t pt-8">Top Home Equity Loan Providers</h2>
          <div className="space-y-4">
              {homeEquityProviders.map(provider => (
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

export default HomeEquityLoanInfo;
