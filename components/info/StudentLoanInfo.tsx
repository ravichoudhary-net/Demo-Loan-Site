import React from 'react';
import { Page } from '../../App';
import InfoPageWrapper from './InfoPageWrapper';

const StudentLoanInfo: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => {
  return (
    <InfoPageWrapper title="About Student Loans" onNavigate={onNavigate}>
      <p>Student loans are a form of financial aid designed to help students pay for post-secondary education and associated fees, including tuition, books and supplies, and living expenses. There are two main types of student loans: federal and private.</p>
      
      <h2 className="text-2xl font-bold text-dark-navy mt-8 mb-4">Federal vs. Private Student Loans</h2>
      <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-bold text-blue-800">Federal Loans</h3>
                <p className="text-sm">Originated by the U.S. government.</p>
                <ul className="list-disc list-inside mt-2">
                    <li>Fixed interest rates set by Congress.</li>
                    <li>No credit check required for most loans.</li>
                    <li>Offer flexible repayment plans, including income-driven options.</li>
                    <li>Provide options for deferment, forbearance, and loan forgiveness programs.</li>
                </ul>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-bold text-purple-800">Private Loans</h3>
                <p className="text-sm">Originated by banks, credit unions, and online lenders.</p>
                <ul className="list-disc list-inside mt-2">
                    <li>Can have fixed or variable interest rates.</li>
                    <li>Require a credit check; a co-signer may be needed.</li>
                    <li>Repayment options are less flexible than federal loans.</li>
                    <li>Fewer forgiveness or discharge options.</li>
                </ul>
            </div>
        </div>

      <h2 className="text-2xl font-bold text-dark-navy mt-8 mb-4">Key Concepts to Understand</h2>
       <ul>
            <li><strong>Interest Capitalization:</strong> Unpaid interest is added to the principal balance of the loan, increasing the total amount you owe. This can happen after periods of deferment or forbearance.</li>
            <li><strong>Grace Period:</strong> A set period after you graduate, leave school, or drop below half-time enrollment before you must begin repayment. For federal loans, this is typically six months.</li>
            <li><strong>Deferment and Forbearance:</strong> Options to temporarily postpone or reduce your monthly payments if you're experiencing financial hardship.</li>
            <li><strong>Repayment Plans:</strong> Federal loans offer several plans, from the Standard Repayment Plan (10 years of fixed payments) to Income-Driven Repayment (IDR) plans that base your monthly payment on your income and family size.</li>
        </ul>

      <h2 className="text-2xl font-bold text-dark-navy mt-8 mb-4">Smart Borrowing Strategy</h2>
      <p>It's generally recommended to exhaust all other options before taking out loans. Follow this order:</p>
      <ol>
        <li><strong>Grants and Scholarships:</strong> Free money that does not need to be repaid.</li>
        <li><strong>Work-Study Programs:</strong> Part-time jobs for students with financial need.</li>
        <li><strong>Federal Student Loans:</strong> Borrow only what you need, starting with federal loans due to their protections and flexible repayment options.</li>
        <li><strong>Private Student Loans:</strong> Use these to fill any remaining funding gaps after you've exhausted federal aid.</li>
      </ol>
    </InfoPageWrapper>
  );
};

export default StudentLoanInfo;