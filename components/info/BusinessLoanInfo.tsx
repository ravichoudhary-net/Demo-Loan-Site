import React from 'react';
import { Page } from '../../App';
import InfoPageWrapper from './InfoPageWrapper';
import { allProvidersData, Provider } from '../AllProviders';
import CompactBusinessLoanCalculator from './calculators/CompactBusinessLoanCalculator';

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

const BusinessLoanInfo: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => {
  const businessLoanProviders = allProvidersData
    .filter(p => p.loanTypes.includes('Business'))
    .sort((a, b) => a.minApr - b.minApr)
    .slice(0, 5);

  const sidebarContent = (
    <>
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <h3 className="text-lg font-bold text-dark-navy border-b pb-2 mb-3">Key Takeaways</h3>
            <ul className="space-y-2 text-sm text-gray-600 list-disc list-inside">
                <li>Funding for various business needs like expansion or inventory.</li>
                <li>Lenders evaluate business revenue and credit history.</li>
                <li>Term loans, lines of credit, and SBA loans are common types.</li>
                <li>A strong business plan is essential for your application.</li>
                <li>Rates and terms can vary significantly between lenders.</li>
            </ul>
        </div>
        <CompactBusinessLoanCalculator />
    </>
  );

  return (
    <InfoPageWrapper title="Guide to Business Loans" onNavigate={onNavigate} sidebarContent={sidebarContent}>
      <p>A business loan provides capital for business purposes, such as funding startup costs, managing day-to-day operations, or financing expansion. Unlike personal loans, business loans are specifically for commercial use and are underwritten based on the company's financial health and creditworthiness.</p>
      
      <h2 className="text-2xl font-bold text-dark-navy mt-8 mb-4">Common Types of Business Loans</h2>
      <p>There is a wide variety of financing options available for businesses:</p>
      <ul>
        <li><strong>Term Loans:</strong> A lump sum of cash that you pay back with interest over a fixed period. Ideal for large, one-time investments like purchasing equipment or real estate.</li>
        <li><strong>Business Line of Credit:</strong> A flexible source of funds that you can draw from as needed, up to a certain limit. You only pay interest on the amount you use. Great for managing cash flow and unexpected expenses.</li>
        <li><strong>SBA Loans:</strong> Loans partially guaranteed by the Small Business Administration. They offer favorable terms and lower interest rates but have a lengthy application process.</li>
        <li><strong>Equipment Financing:</strong> Loans specifically for purchasing business equipment, where the equipment itself serves as collateral.</li>
      </ul>

      <h2 className="text-2xl font-bold text-dark-navy mt-8 mb-4">How to Qualify for a Business Loan</h2>
      <p>Lenders will scrutinize your business's financial health. Be prepared to provide:</p>
      <ol>
        <li><strong>Business Plan:</strong> A comprehensive document outlining your business model, market analysis, and financial projections.</li>
        <li><strong>Financial Statements:</strong> Including profit and loss statements, balance sheets, and cash flow statements for the last 2-3 years.</li>
        <li><strong>Business and Personal Credit Scores:</strong> Lenders will check both your business's credit history and your personal credit as the owner.</li>
        <li><strong>Tax Returns:</strong> Both business and personal tax returns are typically required.</li>
        <li><strong>Legal Documents:</strong> Such as your business license, articles of incorporation, and commercial leases.</li>
      </ol>
      
      <div className="not-prose mt-12">
          <h2 className="text-3xl font-extrabold text-dark-navy mb-6 border-t pt-8">Top Business Loan Providers</h2>
          <div className="space-y-4">
              {businessLoanProviders.map(provider => (
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

export default BusinessLoanInfo;
