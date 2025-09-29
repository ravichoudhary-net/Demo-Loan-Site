import React from 'react';
import { Page } from '../../App';
import InfoPageWrapper from './InfoPageWrapper';

const MortgageLoanInfo: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => {
  return (
    <InfoPageWrapper title="About Mortgages" onNavigate={onNavigate}>
      <p>A mortgage is a loan used to purchase or maintain a home, land, or other types of real estate. The borrower agrees to pay the lender back over time, typically in a series of regular payments that are divided into principal and interest. The property itself serves as collateral to secure the loan.</p>
      
      <h2 className="text-2xl font-bold text-dark-navy mt-8 mb-4">Types of Mortgages</h2>
      <p>There are many types of mortgages, but most fall into these common categories:</p>
      <ul>
        <li><strong>Fixed-Rate Mortgage:</strong> The interest rate remains the same for the entire life of the loan, providing predictable monthly payments. Common terms are 15 or 30 years.</li>
        <li><strong>Adjustable-Rate Mortgage (ARM):</strong> The interest rate is fixed for an initial period, then adjusts periodically based on market indexes. ARMs often start with a lower rate but can increase over time.</li>
        <li><strong>FHA Loans:</strong> Insured by the Federal Housing Administration, these loans are popular with first-time homebuyers due to their lower down payment requirements.</li>
        <li><strong>VA Loans:</strong> Backed by the Department of Veterans Affairs, these loans are available to eligible veterans, service members, and surviving spouses, often with no down payment required.</li>
      </ul>

      <h2 className="text-2xl font-bold text-dark-navy mt-8 mb-4">Key Terminology</h2>
       <ul>
            <li><strong>PITI:</strong> Stands for Principal, Interest, Taxes, and Insurance. These are the four components of a typical monthly mortgage payment.</li>
            <li><strong>LTV (Loan-to-Value):</strong> The ratio of the loan amount to the appraised value of the property. A lower LTV is less risky for lenders.</li>
            <li><strong>PMI (Private Mortgage Insurance):</strong> Insurance that protects the lender if you default on the loan. It's usually required if your down payment is less than 20% of the home's purchase price.</li>
            <li><strong>Closing Costs:</strong> Fees paid at the closing of a real estate transaction. These can include appraisal fees, title insurance, and attorney fees, typically ranging from 2% to 5% of the loan amount.</li>
        </ul>

      <h2 className="text-2xl font-bold text-dark-navy mt-8 mb-4">The Mortgage Process</h2>
      <p>Securing a mortgage involves several key steps:</p>
      <ol>
        <li><strong>Pre-Qualification & Pre-Approval:</strong> Getting an estimate of how much you can borrow, followed by a conditional commitment from a lender for a specific loan amount.</li>
        <li><strong>House Hunting:</strong> Finding a home within your approved budget.</li>
        <li><strong>Loan Application:</strong> Submitting a formal application with detailed financial documentation.</li>
        <li><strong>Underwriting:</strong> The lender verifies your information and assesses the risk of the loan.</li>
        <li><strong>Closing:</strong> Signing the final paperwork to make the home purchase official.</li>
      </ol>
    </InfoPageWrapper>
  );
};

export default MortgageLoanInfo;