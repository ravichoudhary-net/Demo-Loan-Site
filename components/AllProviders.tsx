import React, { useState, useMemo, FC } from 'react';
import { LoanFilters } from '../App';

// --- DATA ---
// FIX: Export `allProvidersData` to allow other components to import and use it.
export const allProvidersData = [
    // Existing and Updated Providers from Screenshot
    { name: "College Ave", rating: 4.1, reviews: "3200", aprRange: "3.5% - 12.99%", amountRange: "$1,000 - $100,000", time: "2-3 Weeks", tags: ['Student Loans', 'Co-signers'], minApr: 3.5, maxApr: 12.99, minAmount: 1000, maxAmount: 100000, minCreditScore: 660, speed: 'Slow', loanTypes: ['Student'], hasFees: false, loanTerm: '5-15 years', logoType: 'initial', logoContent: 'C', logoBg: 'bg-blue-300', isTopTen: true, originationFee: '0%', lateFee: '5% of unpaid amount', prepaymentPenalty: false, website: 'https://www.collegeave.com/' },
    { name: "First Republic Personal Line of Credit", rating: 4.8, reviews: "1200", aprRange: "3.95% - 9.95%", amountRange: "$50,000 - $1,000,000", time: "3-7 business days", tags: ['Jumbo Loans', 'Wealth Management'], minApr: 3.95, maxApr: 9.95, minAmount: 50000, maxAmount: 1000000, minCreditScore: 720, speed: 'Standard', loanTypes: ['Personal'], hasFees: false, loanTerm: '2-7 years', logoType: 'initial', logoContent: 'F', logoBg: 'bg-blue-400', isTopTen: true, originationFee: '0%', lateFee: 'Not specified', prepaymentPenalty: true, website: 'https://www.firstrepublic.com/' },
    { name: "Discover Student Loans", rating: 4.3, reviews: "5600", aprRange: "4% - 14%", amountRange: "$1,000 - $100,000", time: "2-3 Weeks", tags: ['Student Loans', 'No Fees'], minApr: 4.0, maxApr: 14.0, minAmount: 1000, maxAmount: 100000, minCreditScore: 660, speed: 'Slow', loanTypes: ['Student'], hasFees: false, loanTerm: '10-20 years', logoType: 'initial', logoContent: 'D', logoBg: 'bg-orange-400', isTopTen: true, originationFee: '0%', lateFee: 'Up to $25', prepaymentPenalty: false, website: 'https://www.discover.com/' },
    { name: "Sallie Mae", rating: 3.9, reviews: "8500", aprRange: "4% - 13%", amountRange: "$1,000 - $100,000", time: "2-3 Weeks", tags: ['Student Loans', 'Variety of options'], minApr: 4.0, maxApr: 13.0, minAmount: 1000, maxAmount: 100000, minCreditScore: 650, speed: 'Slow', loanTypes: ['Student'], hasFees: false, loanTerm: '5-15 years', logoType: 'initial', logoContent: 'S', logoBg: 'bg-blue-300', isTopTen: true, originationFee: '0%', lateFee: '6% of past due amount', prepaymentPenalty: false, website: 'https://www.salliemae.com/' },
    { name: "Fundbox", rating: 4.1, reviews: "1800", aprRange: "4.66% - 35.99%", amountRange: "$1,000 - $150,000", time: "1-2 Days", tags: ['Business line of credit', 'Fast Funding'], minApr: 4.66, maxApr: 35.99, minAmount: 1000, maxAmount: 150000, minCreditScore: 600, speed: 'Fast', loanTypes: ['Business'], hasFees: false, loanTerm: '12-24 weeks', logoType: 'initial', logoContent: 'F', logoBg: 'bg-blue-400', isTopTen: true, originationFee: '0%', lateFee: 'Not specified', prepaymentPenalty: true, website: 'https://fundbox.com/' },
    { name: "BlueVine", rating: 4.2, reviews: "2700", aprRange: "4.8% - 48%", amountRange: "$6,000 - $250,000", time: "1-2 Days", tags: ['Business checking', 'Fast funding'], minApr: 4.8, maxApr: 48, minAmount: 6000, maxAmount: 250000, minCreditScore: 625, speed: 'Fast', loanTypes: ['Business'], hasFees: true, loanTerm: '6-12 months', logoType: 'initial', logoContent: 'B', logoBg: 'bg-blue-500', isTopTen: true, originationFee: '1.5% - 2.5%', lateFee: 'Not specified', prepaymentPenalty: true, website: 'https://www.bluevine.com/' },
    { name: "Capital One Auto Finance", rating: 4.2, reviews: "28000", aprRange: "4.99% - 19.99%", amountRange: "$4,000 - $100,000", time: "Same Day", tags: ['Auto loans', 'Pre-qualification'], minApr: 4.99, maxApr: 19.99, minAmount: 4000, maxAmount: 100000, minCreditScore: 620, speed: 'Fast', loanTypes: ['Auto'], hasFees: false, loanTerm: '3-7 years', logoType: 'initial', logoContent: 'C', logoBg: 'bg-blue-300', isTopTen: true, originationFee: '0%', lateFee: '$29', prepaymentPenalty: false, website: 'https://www.capitalone.com/' },
    { name: "Figure", rating: 4.2, reviews: "4500", aprRange: "4.99% - 25.99%", amountRange: "$5,000 - $400,000", time: "5-7 Days", tags: ['HELOC Alternative', 'Fast Funding', 'Home Improvement'], minApr: 4.99, maxApr: 25.99, minAmount: 5000, maxAmount: 400000, minCreditScore: 640, speed: 'Standard', loanTypes: ['Personal', 'Home Improvement'], hasFees: true, loanTerm: '3-10 years', logoType: 'initial', logoContent: 'F', logoBg: 'bg-blue-400', isTopTen: true, originationFee: 'Up to 4.99%', lateFee: 'Not specified', prepaymentPenalty: false, website: 'https://www.figure.com/' },
    { name: "Earnest Personal Loans", rating: 4.6, reviews: "12000", aprRange: "5.99% - 24.99%", amountRange: "$5,000 - $300,000", time: "1-3 business days", tags: ['Student loans', 'Refinancing'], minApr: 5.99, maxApr: 24.99, minAmount: 5000, maxAmount: 300000, minCreditScore: 680, speed: 'Standard', loanTypes: ['Personal', 'Student'], hasFees: false, loanTerm: '5-20 years', logoType: 'initial', logoContent: 'E', logoBg: 'bg-gray-400', isTopTen: true, originationFee: '0%', lateFee: 'Not specified', prepaymentPenalty: false, website: 'https://www.earnest.com/' },
    { name: "Payoff Personal Loans", rating: 4.2, reviews: "12000", aprRange: "5.99% - 24.99%", amountRange: "$5,000 - $40,000", time: "1-7 Business Days", tags: ['Debt Consolidation', 'Credit Building'], minApr: 5.99, maxApr: 24.99, minAmount: 5000, maxAmount: 40000, minCreditScore: 640, speed: 'Standard', loanTypes: ['Personal'], hasFees: true, loanTerm: '2-5 years', logoType: 'initial', logoContent: 'P', logoBg: 'bg-blue-300', isTopTen: true, originationFee: '0% - 5%', lateFee: '$15', prepaymentPenalty: false, website: 'https://happymoney.com/' },
    { name: "Wells Fargo Personal Loans", rating: 4.1, reviews: "8200", aprRange: "7.49% - 23.24%", amountRange: "$3,000 - $100,000", time: "1-3 Business Days", tags: ['Relationship discounts', 'Large loan amounts'], minApr: 7.49, maxApr: 23.24, minAmount: 3000, maxAmount: 100000, minCreditScore: 660, speed: 'Standard', loanTypes: ['Personal', 'Auto'], hasFees: true, loanTerm: '3-7 years', logoType: 'initial', logoContent: 'WF', logoBg: 'bg-red-600', isTopTen: false, originationFee: '0%', lateFee: 'Not specified', prepaymentPenalty: true, website: 'https://www.wellsfargo.com/' },
    { name: "Bank of America", rating: 4.0, reviews: "18500", aprRange: "6.99% - 19.99%", amountRange: "$3,000 - $100,000", time: "1-5 Business Days", tags: ['Major Bank', 'Good Rates'], minApr: 6.99, maxApr: 19.99, minAmount: 3000, maxAmount: 100000, minCreditScore: 680, speed: 'Standard', loanTypes: ['Personal', 'Mortgage'], hasFees: false, loanTerm: '3-5 years', logoType: 'initial', logoContent: 'BA', logoBg: 'bg-red-700', isTopTen: false, originationFee: '0%', lateFee: 'Not specified', prepaymentPenalty: true, website: 'https://www.bankofamerica.com/' },
    { name: "Chase Personal Loans", rating: 4.2, reviews: "8500", aprRange: "6.99% - 24.99%", amountRange: "$5,000 - $50,000", time: "1-2 Business Days", tags: ['Fast funding for existing customers', 'Competitive rates', 'Featured'], minApr: 6.99, maxApr: 24.99, minAmount: 5000, maxAmount: 50000, minCreditScore: 680, speed: 'Fast', loanTypes: ['Personal', 'Business'], hasFees: true, loanTerm: '2-6 years', logoType: 'initial', logoContent: 'C', logoBg: 'bg-blue-800', isTopTen: false, originationFee: '0%', lateFee: 'Not specified', prepaymentPenalty: true, website: 'https://www.chase.com/' },
    { name: "SoFi", rating: 4.7, reviews: "15420", aprRange: "8.99% - 29.49%", amountRange: "$5,000 - $100,000", time: "Next Business Day", tags: ['No fees', 'Membership perks', 'Featured', 'Debt Consolidation'], minApr: 8.99, maxApr: 29.49, minAmount: 5000, maxAmount: 100000, minCreditScore: 680, speed: "Fast", loanTypes: ["Personal", "Student Refinance"], hasFees: false, loanTerm: "2-7 years", logoType: "initial", logoContent: "S", logoBg: "bg-teal-500", isTopTen: false, originationFee: "0%", lateFee: "Not specified", prepaymentPenalty: false, website: 'https://www.sofi.com/' },
    { name: "LendingClub Bank", rating: 4.3, reviews: "8950", aprRange: "7.9% - 35.99%", amountRange: "$1,000 - $50,000", time: "1 Business Day", tags: ['Peer-to-peer', 'Fair credit', 'Featured'], minApr: 7.9, maxApr: 35.99, minAmount: 1000, maxAmount: 50000, minCreditScore: 600, speed: "Fast", loanTypes: ["Personal", "Business"], hasFees: true, loanTerm: "3-5 years", logoType: "initial", logoContent: "L", logoBg: "bg-blue-600", isTopTen: false, originationFee: "0-8%", lateFee: "$15", prepaymentPenalty: false, website: 'https://www.lendingclub.com/' },
    { name: "Upstart Personal Loans", rating: 4.4, reviews: "38000", aprRange: "6.5% - 35.99%", amountRange: "$1,000 - $50,000", time: "Next Business Day", tags: ['AI underwriting', 'Fast approval', 'Featured', 'Debt Consolidation'], minApr: 6.5, maxApr: 35.99, minAmount: 1000, maxAmount: 50000, minCreditScore: 580, speed: "Fast", loanTypes: ["Personal", "Auto Refinance"], hasFees: true, loanTerm: "3-5 years", logoType: "initial", logoContent: "U", logoBg: "bg-gray-700", isTopTen: false, originationFee: "0% - 12%", lateFee: "$15", prepaymentPenalty: false, website: 'https://www.upstart.com/' },
    { name: "Marcus by Goldman Sachs", rating: 4.5, reviews: "15800", aprRange: "6.99% - 19.99%", amountRange: "$3,500 - $40,000", time: "1-4 Business Days", tags: ['No fees', 'On-time payment reward'], minApr: 6.99, maxApr: 19.99, minAmount: 3500, maxAmount: 40000, minCreditScore: 660, speed: "Standard", loanTypes: ["Personal"], hasFees: false, loanTerm: "3-6 years", logoType: "initial", logoContent: "M", logoBg: "bg-blue-900", isTopTen: false, originationFee: "0%", lateFee: "Not specified", prepaymentPenalty: false, website: 'https://www.marcus.com/' },
    { name: "Universal Credit (Upgrade)", rating: 3.8, reviews: "3200", aprRange: "11.69% - 35.99%", amountRange: "$1,000 - $50,000", time: "1 Business Day", tags: ['Fair credit', 'Secured options'], minApr: 11.69, maxApr: 35.99, minAmount: 1000, maxAmount: 50000, minCreditScore: 580, speed: "Fast", loanTypes: ["Personal"], hasFees: true, loanTerm: "5.25-9.98%", lateFee: "$10", prepaymentPenalty: false, website: 'https://www.upgrade.com/' },
    { name: "Avant Personal Loans", rating: 4.2, reviews: "35000", aprRange: "9.95% - 35.99%", amountRange: "$2,000 - $35,000", time: "Next Business Day", tags: ['Fast funding', 'Fair credit', 'Featured'], minApr: 9.95, maxApr: 35.99, minAmount: 2000, maxAmount: 35000, minCreditScore: 580, speed: "Fast", loanTypes: ["Personal"], hasFees: true, loanTerm: "0% - 9.95%", lateFee: "$25", prepaymentPenalty: false, website: 'https://www.avant.com/' },
    { name: "LightStream Auto Loans", rating: 4.7, reviews: "15000", aprRange: "6.24% - 25.49%", amountRange: "$5,000 - $100,000", time: "Same Day", tags: ['Excellent rates', 'Same-day funding', 'No fees', 'Auto loans'], minApr: 6.24, maxApr: 25.49, minAmount: 5000, maxAmount: 100000, minCreditScore: 680, speed: "Fast", loanTypes: ["Personal", "Auto"], hasFees: false, loanTerm: "2-12 years", logoType: "initial", logoContent: "L", logoBg: "bg-teal-400", isTopTen: false, originationFee: "0%", lateFee: "Not specified", prepaymentPenalty: false, website: 'https://www.lightstream.com/' },
    { name: "Rocket Loans", rating: 4.1, reviews: "6750", aprRange: "7.16% - 29.99%", amountRange: "$2,000 - $45,000", time: "1-6%", tags: ['Fast funding', 'Quicken Loans sister company'], minApr: 7.16, maxApr: 29.99, minAmount: 2000, maxAmount: 45000, minCreditScore: 640, speed: "Standard", loanTypes: ["Personal"], hasFees: true, loanTerm: "3-5 years", logoType: "initial", logoContent: "R", logoBg: "bg-red-500", isTopTen: false, originationFee: "1% - 6%", lateFee: "$15", prepaymentPenalty: false, website: 'https://www.rocketloans.com/' },
    { name: "OneMain Financial", rating: 3.9, reviews: "7500", aprRange: "18% - 35.99%", amountRange: "$1,500 - $20,000", time: "Same Day", tags: ['Poor credit', 'Secured options'], minApr: 18, maxApr: 35.99, minAmount: 1500, maxAmount: 20000, minCreditScore: 550, speed: "Fast", loanTypes: ["Personal"], hasFees: true, loanTerm: "Varies by state", lateFee: "Varies", prepaymentPenalty: false, website: 'https://www.onemainfinancial.com/' },
    { name: "Prosper Personal Loans", rating: 4.0, reviews: "9200", aprRange: "7.95% - 35.99%", amountRange: "$2,000 - $40,000", time: "1-5%", tags: ['Peer-to-peer', 'Good credit'], minApr: 7.95, maxApr: 35.99, minAmount: 2000, maxAmount: 40000, minCreditScore: 640, speed: "Standard", loanTypes: ["Personal"], hasFees: true, loanTerm: "3-5 years", logoType: "initial", logoContent: "P", logoBg: "bg-green-500", isTopTen: false, originationFee: "1.85% - 9.95%", lateFee: "$15", prepaymentPenalty: false, website: 'https://www.prosper.com/' },
    { name: "Happy Money (Payoff)", rating: 4.2, reviews: "8900", aprRange: "11.72% - 24.99%", amountRange: "$5,000 - $40,000", time: "2-4 business days", tags: ['Debt consolidation focus', 'Member benefits', 'Premium service'], minApr: 11.72, maxApr: 24.99, minAmount: 5000, maxAmount: 40000, minCreditScore: 640, speed: "Standard", loanTypes: ["Personal"], hasFees: true, loanTerm: "2-5 years", logoType: "initial", logoContent: "H", logoBg: "bg-yellow-500", isTopTen: false, originationFee: "0% - 5%", lateFee: "$15", prepaymentPenalty: false, website: 'https://happymoney.com/' },
    
    // Newly Added Providers from Screenshot
    { name: "ACE Cash Express", rating: 3.3, reviews: "720", aprRange: "106% - 400%", amountRange: "$100 - $5,000", time: "Same Day", tags: ['Payday loans', 'Installment loans'], minApr: 106, maxApr: 400, minAmount: 100, maxAmount: 5000, minCreditScore: 300, speed: 'Fast', loanTypes: ['Personal'], hasFees: true, loanTerm: 'Varies', logoType: 'initial', logoContent: 'A', logoBg: 'bg-green-700', isTopTen: false, originationFee: '10%', lateFee: 'Varies', prepaymentPenalty: false, website: 'https://www.acecashexpress.com/' },
    { name: "Advance America", rating: 3.2, reviews: "1250", aprRange: "460% - 460%", amountRange: "$100 - $5,000", time: "Same-day if approved", tags: ['Payday loans', 'Short-term'], minApr: 460, maxApr: 460, minAmount: 100, maxAmount: 5000, minCreditScore: 300, speed: 'Fast', loanTypes: ['Personal'], hasFees: true, loanTerm: 'Varies', logoType: 'initial', logoContent: 'A', logoBg: 'bg-blue-400', isTopTen: false, originationFee: '5-10%', lateFee: 'Varies', prepaymentPenalty: false, website: 'https://www.advanceamerica.net/' },
    { name: "American Express Personal Loans", rating: 4.4, reviews: "3800", aprRange: "6.98% - 19.98%", amountRange: "$3,500 - $40,000", time: "1-3 Business Days", tags: ['For cardholders', 'Premium'], minApr: 6.98, maxApr: 19.98, minAmount: 3500, maxAmount: 40000, minCreditScore: 680, speed: 'Standard', loanTypes: ['Personal'], hasFees: false, loanTerm: '2-5 years', logoType: 'initial', logoContent: 'A', logoBg: 'bg-blue-600', isTopTen: false, originationFee: '0%', lateFee: 'Not specified', prepaymentPenalty: false, website: 'https://www.americanexpress.com/' },
    { name: "Axos Bank Personal Loans", rating: 4.3, reviews: "4200", aprRange: "6.99% - 35.99%", amountRange: "$5,000 - $50,000", time: "2-5 business days", tags: ['Competitive rates', 'No fees', 'Digital experience'], minApr: 6.99, maxApr: 35.99, minAmount: 5000, maxAmount: 50000, minCreditScore: 660, speed: 'Standard', loanTypes: ['Personal'], hasFees: false, loanTerm: '3-6 years', logoType: 'initial', logoContent: 'A', logoBg: 'bg-cyan-600', isTopTen: false, originationFee: '0%', lateFee: 'Not specified', prepaymentPenalty: false, website: 'https://www.axosbank.com/' },
    { name: "Best Egg Personal Loans", rating: 4.2, reviews: "22000", aprRange: "7.99% - 35.99%", amountRange: "$2,000 - $50,000", time: "1-3 business days", tags: ['Fast approval', 'Competitive rates', 'Autopay discount'], minApr: 7.99, maxApr: 35.99, minAmount: 2000, maxAmount: 50000, minCreditScore: 640, speed: 'Standard', loanTypes: ['Personal'], hasFees: true, loanTerm: '0.99% - 9.99%', lateFee: '$15', prepaymentPenalty: false, website: 'https://www.bestegg.com/' },
    { name: "Better.com", rating: 4.1, reviews: "12500", aprRange: "6.25% - 8.5%", amountRange: "$100,000 - $3,000,000", time: "21-30 Days", tags: ['Digital mortgage', 'Zero lender fees', 'Featured'], minApr: 6.25, maxApr: 8.5, minAmount: 100000, maxAmount: 3000000, minCreditScore: 620, speed: 'Slow', loanTypes: ['Mortgage'], hasFees: false, loanTerm: 'Varies', lateFee: 'Varies', prepaymentPenalty: false, website: 'https://better.com/' },
    { name: "CarMax Auto Finance", rating: 4.1, reviews: "22000", aprRange: "6.99% - 25%", amountRange: "$5,000 - $100,000", time: "Same Day", tags: ['Used car retailer', 'Multiple lenders', 'Auto loans'], minApr: 6.99, maxApr: 25, minAmount: 5000, maxAmount: 100000, minCreditScore: 580, speed: 'Fast', loanTypes: ['Auto'], hasFees: false, loanTerm: '3-6 years', logoType: 'initial', logoContent: 'C', logoBg: 'bg-yellow-500', isTopTen: false, originationFee: '0%', lateFee: 'Varies', prepaymentPenalty: false, website: 'https://www.carmax.com/' },
    { name: "Carvana", rating: 4.0, reviews: "15600", aprRange: "7.49% - 28%", amountRange: "$5,000 - $75,000", time: "Instant Decision", tags: ['Online used car', 'Home delivery', 'Auto loans'], minApr: 7.49, maxApr: 28, minAmount: 5000, maxAmount: 75000, minCreditScore: 580, speed: 'Fast', loanTypes: ['Auto'], hasFees: false, loanTerm: '3-6 years', logoType: 'initial', logoContent: 'C', logoBg: 'bg-blue-500', isTopTen: false, originationFee: '0%', lateFee: 'Varies', prepaymentPenalty: false, website: 'https://www.carvana.com/' },
    { name: "CashCentral", rating: 3.1, reviews: "1200", aprRange: "200% - 780%", amountRange: "$100 - $1,500", time: "Same Day", tags: ['Online payday', 'Short-term'], minApr: 200, maxApr: 780, minAmount: 100, maxAmount: 1500, minCreditScore: 300, speed: 'Fast', loanTypes: ['Personal'], hasFees: true, loanTerm: '5-25%', lateFee: 'Varies', prepaymentPenalty: false, website: 'https://www.cashcentral.com/' },
    { name: "Check n Go", rating: 3.5, reviews: "980", aprRange: "260% - 370%", amountRange: "$100 - $5,000", time: "Same Day", tags: ['Payday loans', 'Installment loans'], minApr: 260, maxApr: 370, minAmount: 100, maxAmount: 5000, minCreditScore: 300, speed: 'Fast', loanTypes: ['Personal'], hasFees: true, loanTerm: '5-10%', lateFee: 'Varies', prepaymentPenalty: false, website: 'https://www.checkngo.com/' },
    { name: "Citizens Bank Personal Loans", rating: 4.2, reviews: "8500", aprRange: "7.99% - 25%", amountRange: "$5,000 - $50,000", time: "2-5 business days", tags: ['Relationship discounts', 'Large amounts'], minApr: 7.99, maxApr: 25, minAmount: 5000, maxAmount: 50000, minCreditScore: 680, speed: 'Standard', loanTypes: ['Personal'], hasFees: false, loanTerm: '3-7 years', logoType: 'initial', logoContent: 'C', logoBg: 'bg-green-600', isTopTen: false, originationFee: '0%', lateFee: 'Not specified', prepaymentPenalty: false, website: 'https://www.citizensbank.com/' },
    { name: "Credit Ninja", rating: 3.4, reviews: "2800", aprRange: "16% - 179%", amountRange: "$750 - $7,500", time: "Next Business Day", tags: ['Less-than-perfect credit', 'Online installment'], minApr: 16, maxApr: 179, minAmount: 750, maxAmount: 7500, minCreditScore: 500, speed: 'Fast', loanTypes: ['Personal'], hasFees: true, loanTerm: 'Varies by state', lateFee: 'Varies', prepaymentPenalty: false, website: 'https://www.creditninja.com/' },
    { name: "Discover Personal Loans", rating: 4.3, reviews: "8900", aprRange: "6.99% - 24.99%", amountRange: "$2,500 - $35,000", time: "Next Business Day", tags: ['No origination fees', 'Flexible terms'], minApr: 6.99, maxApr: 24.99, minAmount: 2500, maxAmount: 35000, minCreditScore: 660, speed: 'Fast', loanTypes: ['Personal'], hasFees: false, loanTerm: '3-7 years', logoType: 'initial', logoContent: 'D', logoBg: 'bg-orange-500', isTopTen: false, originationFee: '0%', lateFee: 'Not specified', prepaymentPenalty: false, website: 'https://www.discover.com/personal-loans/' },
    { name: "Kabbage (now part of American Express)", rating: 3.8, reviews: "5200", aprRange: "12% - 99%", amountRange: "$1,000 - $250,000", time: "1-2 Days", tags: ['Small business loans', 'Fast approval'], minApr: 12, maxApr: 99, minAmount: 1000, maxAmount: 250000, minCreditScore: 640, speed: 'Fast', loanTypes: ['Business'], hasFees: true, loanTerm: 'Varies', lateFee: 'Varies', prepaymentPenalty: false, website: 'https://www.kabbage.com/' },
    { name: "LendingClub Business", rating: 4.0, reviews: "3400", aprRange: "9.77% - 35.71%", amountRange: "$25,000 - $500,000", time: "3-7 Days", tags: ['Business term loans', 'Lines of credit'], minApr: 9.77, maxApr: 35.71, minAmount: 25000, maxAmount: 500000, minCreditScore: 620, speed: 'Standard', loanTypes: ['Business'], hasFees: true, loanTerm: '1-6%', lateFee: '$15', prepaymentPenalty: false, website: 'https://www.lendingclub.com/business-loans' },
    { name: "LendingPoint", rating: 4.6, reviews: "8900", aprRange: "7.99% - 35.99%", amountRange: "$1,000 - $36,500", time: "Next Day", tags: ['Personal loans', 'Next-day funding'], minApr: 7.99, maxApr: 35.99, minAmount: 1000, maxAmount: 36500, minCreditScore: 580, speed: 'Fast', loanTypes: ['Personal'], hasFees: true, loanTerm: 'Up to 10%', lateFee: '$30', prepaymentPenalty: false, website: 'https://www.lendingpoint.com/' },
    { name: "loanDepot", rating: 3.9, reviews: "8900", aprRange: "6.75% - 8.75%", amountRange: "$75,000 - $2,500,000", time: "30-45 Days", tags: ['Mortgages', 'Personal loans', 'Home equity', 'Home Improvement'], minApr: 6.75, maxApr: 8.75, minAmount: 75000, maxAmount: 2500000, minCreditScore: 620, speed: 'Slow', loanTypes: ['Mortgage', 'Personal'], hasFees: true, loanTerm: 'Varies', lateFee: 'Varies', prepaymentPenalty: false, website: 'https://www.loandepot.com/' },
    { name: "MoneyKey", rating: 3.4, reviews: "420", aprRange: "200% - 400%", amountRange: "$200 - $3,000", time: "Next Business Day", tags: ['Installment loans', 'Online application'], minApr: 200, maxApr: 400, minAmount: 200, maxAmount: 3000, minCreditScore: 450, speed: 'Fast', loanTypes: ['Personal'], hasFees: true, loanTerm: 'Varies', lateFee: 'Varies', prepaymentPenalty: false, website: 'https://www.moneykey.com/' },
    { name: "Navy Federal Credit Union", rating: 4.8, reviews: "35000", aprRange: "7.49% - 18%", amountRange: "$250 - $50,000", time: "Same Day", tags: ['Military', 'Credit Union', 'Featured'], minApr: 7.49, maxApr: 18, minAmount: 250, maxAmount: 50000, minCreditScore: 650, speed: 'Fast', loanTypes: ['Personal'], hasFees: false, loanTerm: '1-5 years', logoType: 'initial', logoContent: 'N', logoBg: 'bg-blue-800', isTopTen: false, originationFee: '0%', lateFee: 'Not specified', prepaymentPenalty: false, website: 'https://www.navyfederal.org/' },
    { name: "OnDeck", rating: 4.0, reviews: "2700", aprRange: "30% - 80%", amountRange: "$5,000 - $100,000", time: "1-2 Days", tags: ['Short-term business loans', 'Lines of credit'], minApr: 30, maxApr: 80, minAmount: 5000, maxAmount: 100000, minCreditScore: 625, speed: 'Fast', loanTypes: ['Business'], hasFees: true, loanTerm: 'Varies', lateFee: 'Varies', prepaymentPenalty: false, website: 'https://www.ondeck.com/' },
    { name: "OppLoans", rating: 4.1, reviews: "980", aprRange: "160% - 195%", amountRange: "$500 - $5,000", time: "Same Day", tags: ['Bad credit', 'No credit check', 'Featured'], minApr: 160, maxApr: 195, minAmount: 500, maxAmount: 5000, minCreditScore: 350, speed: 'Fast', loanTypes: ['Personal'], hasFees: false, loanTerm: 'Varies', lateFee: 'Varies', prepaymentPenalty: false, website: 'https://www.opploans.com/' },
    { name: "Oportun", rating: 3.7, reviews: "2800", aprRange: "10% - 35.95%", amountRange: "$300 - $10,000", time: "Next Day", tags: ['Underserved communities', 'Build credit'], minApr: 10, maxApr: 35.95, minAmount: 300, maxAmount: 10000, minCreditScore: 500, speed: 'Fast', loanTypes: ['Personal'], hasFees: true, loanTerm: 'Varies', lateFee: 'Varies', prepaymentPenalty: false, website: 'https://oportun.com/' },
    { name: "PenFed Credit Union", rating: 4.6, reviews: "12800", aprRange: "6.49% - 17.99%", amountRange: "$600 - $50,000", time: "1-2 Business Days", tags: ['Military', 'Civilian members'], minApr: 6.49, maxApr: 17.99, minAmount: 600, maxAmount: 50000, minCreditScore: 660, speed: 'Standard', loanTypes: ['Personal'], hasFees: false, loanTerm: '1-5 years', logoType: 'initial', logoContent: 'P', logoBg: 'bg-red-600', isTopTen: false, originationFee: '0%', lateFee: 'Not specified', prepaymentPenalty: false, website: 'https://www.penfed.org/' },
    { name: "PNC Personal Loans", rating: 4.1, reviews: "7200", aprRange: "6.99% - 23.24%", amountRange: "$1,000 - $35,000", time: "1-3 business days", tags: ['Major regional bank', 'Customer discounts'], minApr: 6.99, maxApr: 23.24, minAmount: 1000, maxAmount: 35000, minCreditScore: 680, speed: 'Standard', loanTypes: ['Personal'], hasFees: false, loanTerm: 'No fees', lateFee: 'Not specified', prepaymentPenalty: false, website: 'https://www.pnc.com/' },
    { name: "Regions Bank Personal Loans", rating: 4.0, reviews: "5600", aprRange: "8.5% - 25%", amountRange: "$2,500 - $50,000", time: "2-4 business days", tags: ['Regional expertise', 'Branch network'], minApr: 8.5, maxApr: 25, minAmount: 2500, maxAmount: 50000, minCreditScore: 660, speed: 'Standard', loanTypes: ['Personal'], hasFees: false, loanTerm: 'No fees', lateFee: 'Not specified', prepaymentPenalty: false, website: 'https://www.regions.com/' },
    { name: "Rise Credit", rating: 3.5, reviews: "1900", aprRange: "60% - 299%", amountRange: "$500 - $5,000", time: "Next Day", tags: ['Bad credit', 'Build credit'], minApr: 60, maxApr: 299, minAmount: 500, maxAmount: 5000, minCreditScore: 350, speed: 'Fast', loanTypes: ['Personal'], hasFees: true, loanTerm: 'Varies', lateFee: 'Varies', prepaymentPenalty: false, website: 'https://www.risecredit.com/' },
    { name: "Rocket Mortgage", rating: 4.3, reviews: "45000", aprRange: "6.5% - 8.5%", amountRange: "$50,000 - $3,000,000", time: "30-45 Days", tags: ['Leading online mortgage lender', 'Fast digital application', 'Featured'], minApr: 6.5, maxApr: 8.5, minAmount: 50000, maxAmount: 3000000, minCreditScore: 620, speed: 'Slow', loanTypes: ['Mortgage'], hasFees: true, loanTerm: 'Varies', lateFee: 'Varies', prepaymentPenalty: false, website: 'https://www.rocketmortgage.com/' },
    { name: "Speedy Cash", rating: 3.1, reviews: "650", aprRange: "200% - 460%", amountRange: "$50 - $2,500", time: "Same Day", tags: ['Payday loans', 'Cash advances'], minApr: 200, maxApr: 460, minAmount: 50, maxAmount: 2500, minCreditScore: 300, speed: 'Fast', loanTypes: ['Personal'], hasFees: true, loanTerm: '5-15%', lateFee: 'Varies', prepaymentPenalty: false, website: 'https://www.speedycash.com/' },
    { name: "Spring EQ (formerly Spring Labs)", rating: 4.0, reviews: "2100", aprRange: "8.99% - 99%", amountRange: "$5,000 - $35,000", time: "2-4 Business Days", tags: ['Personal loan platform', 'Near-prime borrowers'], minApr: 8.99, maxApr: 99, minAmount: 5000, maxAmount: 35000, minCreditScore: 620, speed: 'Standard', loanTypes: ['Personal'], hasFees: true, loanTerm: '0.99-8.99%', lateFee: '$15', prepaymentPenalty: false, website: 'https://www.springeq.com/' },
    { name: "Truist Bank", rating: 4.0, reviews: "18000", aprRange: "7.95% - 21.95%", amountRange: "$2,000 - $35,000", time: "1-2 Business Days", tags: ['Major bank', 'BB&T and SunTrust'], minApr: 7.95, maxApr: 21.95, minAmount: 2000, maxAmount: 35000, minCreditScore: 680, speed: 'Standard', loanTypes: ['Personal'], hasFees: false, loanTerm: '1-6%', lateFee: 'Not specified', prepaymentPenalty: false, website: 'https://www.truist.com/' },
    { name: "U.S. Bank", rating: 4.1, reviews: "16500", aprRange: "7.99% - 19.99%", amountRange: "$1,000 - $50,000", time: "1-3 business days", tags: ['Fifth largest bank', 'Comprehensive products'], minApr: 7.99, maxApr: 19.99, minAmount: 1000, maxAmount: 50000, minCreditScore: 680, speed: 'Standard', loanTypes: ['Personal', 'Mortgage'], hasFees: false, loanTerm: 'No Fees', lateFee: 'Not specified', prepaymentPenalty: false, website: 'https://www.usbank.com/' },
];

export type Provider = typeof allProvidersData[0];

const topTenProviders = allProvidersData.filter(p => p.isTopTen).slice(0, 10);

const loanTypeOptions = [...new Set(allProvidersData.flatMap(p => p.loanTypes))].sort();
const heroPills = ['All Types', 'Personal', 'Debt Consolidation', 'Auto', 'Home Improvement'];
const PROVIDERS_PER_PAGE = 12;


// --- HELPER & SUB-COMPONENTS ---

const ProviderLogo: FC<{ provider: Provider, size?: string }> = ({ provider, size = 'w-12 h-12' }) => (
    <div className={`flex-shrink-0 ${size} rounded-full ${provider.logoBg} flex items-center justify-center text-white font-bold text-xl`}>
        {provider.logoContent}
    </div>
);

const DetailItem: FC<{ label: string; value: string }> = ({ label, value }) => (
    <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-semibold text-dark-navy">{value}</p>
    </div>
);

const LenderCard: FC<{ provider: Provider; onCompare: (name: string) => void; isSelected: boolean; isDisabled: boolean; }> = ({ provider, onCompare, isSelected, isDisabled }) => (
    <div className="bg-white p-5 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
        <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
                <ProviderLogo provider={provider} />
                <div>
                    <h3 className="text-lg font-bold text-dark-navy">{provider.name}</h3>
                    <div className="flex items-center gap-1">
                         <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                        <span className="font-bold text-gray-700">{provider.rating.toFixed(1)}</span>
                        <span className="text-sm text-gray-500">({provider.reviews})</span>
                    </div>
                </div>
            </div>
        </div>
        <div className="grid grid-cols-2 gap-4 my-5 border-t border-b border-gray-100 py-4">
            <DetailItem label="APR" value={provider.aprRange} />
            <DetailItem label="Loan Amount" value={provider.amountRange} />
            <DetailItem label="Loan Term" value={provider.loanTerm} />
            <DetailItem label="Min. Credit Score" value={String(provider.minCreditScore)} />
        </div>
        <div className="flex-grow flex flex-wrap gap-2 mb-5">
             {provider.tags.map(tag => (
                <span key={tag} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">{tag}</span>
            ))}
        </div>
        <div className="mt-auto grid grid-cols-2 gap-3">
             <button
                onClick={() => onCompare(provider.name)}
                disabled={isDisabled}
                className={`w-full font-bold py-2.5 rounded-lg transition-colors text-sm flex items-center justify-center gap-1.5 ${
                    isSelected
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'bg-white text-gray-800 border-2 border-gray-200 hover:bg-gray-100'
                } ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                {isSelected ? 'Selected' : 'Compare'}
            </button>
            <a
                href={provider.website}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full block text-center bg-gradient-primary text-white font-bold py-2.5 rounded-lg shadow-md hover:shadow-lg transition-shadow text-sm flex items-center justify-center gap-1.5"
            >
                Check Rates
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            </a>
        </div>
    </div>
);

const CompareBar: FC<{ selected: Provider[]; onClear: () => void; onCompare: () => void; }> = ({ selected, onClear, onCompare }) => {
    if (selected.length === 0) return null;
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-dark-navy/95 backdrop-blur-md z-[60] p-4 shadow-2xl animate-slide-up">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <p className="font-bold text-white text-lg">Compare ({selected.length})</p>
                    <div className="flex items-center gap-2">
                        {selected.map(p => <ProviderLogo key={p.name} provider={p} size="w-10 h-10" />)}
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <button onClick={onClear} className="text-gray-300 hover:text-white font-semibold">Clear all</button>
                    <button onClick={onCompare} className="bg-gradient-primary text-white font-bold py-2 px-6 rounded-lg">Compare</button>
                </div>
            </div>
        </div>
    );
};

// --- MAIN COMPONENT ---
const AllProviders: React.FC<{ onCompare: (providers: Provider[]) => void; initialFilters?: LoanFilters; }> = ({ onCompare, initialFilters }) => {
    const [loanAmount, setLoanAmount] = useState(initialFilters?.loanAmount || 10000);
    const [searchQuery, setSearchQuery] = useState(initialFilters?.searchQuery || '');
    const [loanType, setLoanType] = useState(initialFilters?.loanPurpose || 'All Types');
    const [visibleCount, setVisibleCount] = useState(PROVIDERS_PER_PAGE);
    const [selectedProviders, setSelectedProviders] = useState<string[]>([]);

    const handleCompareToggle = (name: string) => {
        setSelectedProviders(prev => {
            const isSelected = prev.includes(name);
            if (isSelected) {
                return prev.filter(p => p !== name);
            }
            if (prev.length < 3) {
                return [...prev, name];
            }
            return prev; // Do nothing if trying to add a 4th
        });
    };
    
    const filteredProviders = useMemo(() => {
        return allProvidersData.filter(provider => {
            const purposeMatch = !loanType || loanType === 'All Types' || 
                provider.tags.some(tag => tag.toLowerCase().includes(loanType.toLowerCase())) ||
                provider.loanTypes.some(lt => loanType.toLowerCase().includes(lt.toLowerCase()));
            
            const searchMatch = !searchQuery || provider.name.toLowerCase().includes(searchQuery.toLowerCase());
            
            const amount = loanAmount === 100000 ? Infinity : loanAmount;
            const amountMatch = !loanAmount || (amount >= provider.minAmount && amount <= provider.maxAmount);
            
            return purposeMatch && searchMatch && amountMatch;
        });
    }, [loanAmount, searchQuery, loanType]);

    const selectedProviderObjects = useMemo(() => 
        allProvidersData.filter(p => selectedProviders.includes(p.name)),
        [selectedProviders]
    );

    const isCompareDisabled = (providerName: string) => {
        return !selectedProviders.includes(providerName) && selectedProviders.length >= 3;
    }

    return (
        <div className="bg-white">
            {/* Providers Hero Section */}
            <section className="bg-light-bg py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-5xl font-extrabold text-dark-navy">Compare Loan Providers</h1>
                    <p className="mt-4 text-lg text-gray-600">Find the best loan for your needs. Get personalized pre-qualified rates, and select a lender. It won't affect your credit score.</p>
                    <div className="mt-8 flex flex-wrap justify-center gap-2">
                        {heroPills.map(pill => (
                            <button 
                                key={pill} 
                                onClick={() => setLoanType(pill)}
                                className={`px-4 py-2 rounded-full font-semibold transition-colors ${loanType === pill ? 'bg-brand-purple text-white shadow' : 'bg-white text-gray-700 hover:bg-gray-200'}`}
                            >
                                {pill}
                            </button>
                        ))}
                    </div>
                    <div className="mt-8 max-w-xl mx-auto">
                        <div className="flex justify-between font-semibold text-dark-navy">
                            <label htmlFor="loanAmount">Loan Amount</label>
                            <span>${loanAmount.toLocaleString()}</span>
                        </div>
                        <input
                            id="loanAmount"
                            type="range"
                            min="1000"
                            max="100000"
                            step="500"
                            value={loanAmount}
                            onChange={e => setLoanAmount(Number(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-2 accent-brand-purple"
                        />
                    </div>
                </div>
            </section>
            
            {/* Top 10 Section */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-4 mb-8">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                        <h2 className="text-3xl font-extrabold text-dark-navy">Top 10 Lowest Rates</h2>
                        <span className="bg-green-100 text-green-700 text-sm font-bold px-3 py-1 rounded-full">Best Deals</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                        {topTenProviders.map(p => (
                            <div key={p.name} className="relative bg-white p-5 rounded-2xl border border-gray-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
                                <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                                    <span>{p.minApr.toFixed(2)}%</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className={`flex-shrink-0 w-10 h-10 rounded-full ${p.logoBg} flex items-center justify-center text-white font-bold text-lg`}>
                                        {p.logoContent}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-dark-navy text-sm leading-tight">{p.name}</h3>
                                        <div className="flex items-center gap-1">
                                            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                            <span className="font-bold text-gray-700 text-xs">{p.rating.toFixed(1)}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4 pt-4 border-t border-gray-100 space-y-3 text-xs flex-grow">
                                    <div>
                                        <p className="text-gray-500">Rate Range</p>
                                        <p className="font-semibold text-gray-800"><span className="text-green-600 font-bold">{p.aprRange.split(' - ')[0]}</span> - {p.aprRange.split(' - ')[1]}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">Amount</p>
                                        <p className="font-semibold text-gray-800">{p.amountRange}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">Funding</p>
                                        <div className="flex items-center gap-1.5">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            <p className="font-semibold text-gray-800">{p.time}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4 grid grid-cols-2 gap-2">
                                     <button 
                                        onClick={() => handleCompareToggle(p.name)}
                                        disabled={isCompareDisabled(p.name)}
                                        className={`font-bold py-2 rounded-lg transition-colors text-xs flex items-center justify-center gap-1 ${
                                            selectedProviders.includes(p.name)
                                                ? 'bg-indigo-600 text-white'
                                                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                                        } ${isCompareDisabled(p.name) ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                        {selectedProviders.includes(p.name) ? '✓ Selected' : 'Compare'}
                                     </button>
                                    <button onClick={() => window.open(p.website, '_blank', 'noopener,noreferrer')} className="bg-gradient-primary text-white font-bold py-2 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center justify-center gap-1 text-xs">
                                        <span>Apply</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Main Content: Filter + List */}
            <section className="py-16 bg-light-bg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 mb-12">
                         <h2 className="flex items-center text-xl font-bold text-dark-navy mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L12 14.414V19a1 1 0 01-1.447.894l-4-2A1 1 0 016 17v-2.586L3.293 6.707A1 1 0 013 6V4z" /></svg>
                            Search & Filter All Providers ({allProvidersData.length})
                        </h2>
                         <div className="relative">
                            <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 z-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            <input type="text" placeholder="Search providers by name..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full pl-10 pr-3 py-2.5 bg-white text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-purple focus:border-transparent"/>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProviders.slice(0, visibleCount).map((provider) => (
                            <LenderCard 
                                key={provider.name} 
                                provider={provider}
                                isSelected={selectedProviders.includes(provider.name)}
                                onCompare={handleCompareToggle}
                                isDisabled={isCompareDisabled(provider.name)}
                            />
                        ))}
                    </div>

                    {filteredProviders.length === 0 && (
                        <div className="text-center py-16 col-span-full">
                            <h3 className="text-2xl font-bold text-dark-navy">No Providers Match Your Criteria</h3>
                            <p className="text-gray-600 mt-2">Try adjusting your filters or clearing the search to find results.</p>
                        </div>
                    )}

                    {visibleCount < filteredProviders.length && (
                        <div className="text-center mt-12">
                            <button 
                                onClick={() => setVisibleCount(prev => prev + PROVIDERS_PER_PAGE)}
                                className="bg-white text-brand-purple font-bold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-brand-purple"
                            >
                                Load More Providers
                            </button>
                        </div>
                    )}
                </div>
            </section>
            
            <CompareBar 
                selected={selectedProviderObjects} 
                onClear={() => setSelectedProviders([])} 
                onCompare={() => onCompare(selectedProviderObjects)}
            />
        </div>
    );
};

export default AllProviders;