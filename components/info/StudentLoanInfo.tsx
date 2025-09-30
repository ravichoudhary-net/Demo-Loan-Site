import React from 'react';
import { Page } from '../../App';
import InfoPageWrapper from './InfoPageWrapper';
import { allProvidersData, Provider } from '../AllProviders';
import CompactStudentLoanCalculator from './calculators/CompactStudentLoanCalculator';

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


const StudentLoanInfo: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => {
  const studentLoanProviders = allProvidersData
    .filter(p => p.loanTypes.includes('Student'))
    .sort((a, b) => a.minApr - b.minApr)
    .slice(0, 5);

  const sidebarContent = (
    <>
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <h3 className="text-lg font-bold text-dark-navy border-b pb-2 mb-3">Key Takeaways</h3>
            <ul className="space-y-2 text-sm text-gray-600 list-disc list-inside">
                <li>Exhaust grants and scholarships first.</li>
                <li>Prioritize federal loans over private loans.</li>
                <li>Federal loans offer more protections and flexible repayment.</li>
                <li>Private loans are credit-based and may need a co-signer.</li>
                <li>Understand your repayment plan options.</li>
            </ul>
        </div>
        <CompactStudentLoanCalculator />
    </>
  );
    
  return (
    <InfoPageWrapper title="Guide to Student Loans" onNavigate={onNavigate} sidebarContent={sidebarContent}>
      <p>Student loans are a form of financial aid designed to help students pay for post-secondary education and associated fees, including tuition, books and supplies, and living expenses. It's crucial to understand how they work to make informed borrowing decisions.</p>
      
      <h2 className="text-2xl font-bold text-dark-navy mt-8 mb-4">Federal vs. Private Student Loans</h2>
      <div className="grid md:grid-cols-2 gap-6 not-prose">
            <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-bold text-blue-800">Federal Loans</h3>
                <p className="text-sm">Originated by the U.S. government.</p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-sm text-gray-700">
                    <li>Fixed interest rates set by Congress.</li>
                    <li>No credit check required for most loans.</li>
                    <li>Offer flexible repayment plans, including income-driven options.</li>
                    <li>Provide options for deferment, forbearance, and loan forgiveness programs.</li>
                </ul>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-bold text-purple-800">Private Loans</h3>
                <p className="text-sm">Originated by banks, credit unions, and online lenders.</p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-sm text-gray-700">
                    <li>Can have fixed or variable interest rates.</li>
                    <li>Require a credit check; a co-signer may be needed.</li>
                    <li>Repayment options are less flexible than federal loans.</li>
                    <li>Fewer forgiveness or discharge options.</li>
                </ul>
            </div>
        </div>

      <h2 className="text-2xl font-bold text-dark-navy mt-8 mb-4">Key Repayment Concepts</h2>
       <ul>
            <li><strong>Grace Period:</strong> A set period after you graduate (typically six months) before you must begin repayment. Interest may still accrue during this time.</li>
            <li><strong>Repayment Plans:</strong> Federal loans offer several plans, from the Standard 10-year plan to Income-Driven Repayment (IDR) plans that base your monthly payment on your income.</li>
            <li><strong>Deferment and Forbearance:</strong> Options to temporarily postpone or reduce your monthly payments if you're experiencing financial hardship. Note that interest may still capitalize (be added to your principal).</li>
            <li><strong>Refinancing:</strong> Taking out a new private loan to pay off your existing student loans, ideally to get a lower interest rate. You can refinance federal loans, but you will lose access to federal protections and programs.</li>
        </ul>

      <h2 className="text-2xl font-bold text-dark-navy mt-8 mb-4">Smart Borrowing Strategy</h2>
      <p>It's generally recommended to exhaust all other options before taking out loans. Follow this order:</p>
      <ol>
        <li><strong>Complete the FAFSA:</strong> The Free Application for Federal Student Aid is your gateway to grants, scholarships, work-study, and federal loans.</li>
        <li><strong>Accept "Free Money":</strong> Prioritize grants and scholarships, as they do not need to be repaid.</li>
        <li><strong>Consider Work-Study:</strong> These programs offer part-time jobs to help you earn money for education expenses.</li>
        <li><strong>Borrow Federal Loans:</strong> If you must borrow, start with federal loans due to their protections and flexible repayment options. Only borrow what you absolutely need.</li>
        <li><strong>Use Private Loans as a Last Resort:</strong> Use these to fill any remaining funding gaps after you've exhausted all other options.</li>
      </ol>
      
       <div className="not-prose mt-12">
            <h2 className="text-3xl font-extrabold text-dark-navy mb-6 border-t pt-8">Top Student Loan Providers</h2>
            <div className="space-y-4">
                {studentLoanProviders.map(provider => (
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

export default StudentLoanInfo;