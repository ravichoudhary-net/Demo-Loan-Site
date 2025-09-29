import React, { useState, useMemo } from 'react';
import { Page } from '../../App';
import CalculatorWrapper from './common/CalculatorWrapper';
import SliderInput from './common/SliderInput';

// Simplified 2024 tax data for estimation purposes
const federalBrackets = {
  single: [
    { rate: 0.10, upto: 11600 },
    { rate: 0.12, upto: 47150 },
    { rate: 0.22, upto: 100525 },
    { rate: 0.24, upto: 191950 },
    { rate: 0.32, upto: 243725 },
    { rate: 0.35, upto: 609350 },
    { rate: 0.37, upto: Infinity },
  ],
  married: [
    { rate: 0.10, upto: 23200 },
    { rate: 0.12, upto: 94300 },
    { rate: 0.22, upto: 201050 },
    { rate: 0.24, upto: 383900 },
    { rate: 0.32, upto: 487450 },
    { rate: 0.35, upto: 731100 },
    { rate: 0.37, upto: Infinity },
  ]
};
const standardDeductions = { single: 14600, married: 29200 };
const stateTaxRates: {[key: string]: number} = { 'CA': 0.093, 'NY': 0.0685, 'TX': 0, 'FL': 0, 'OTHER': 0.04 }; // Example rates

const PaycheckCalculator: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => {
  const [grossSalary, setGrossSalary] = useState(80000);
  const [payFrequency, setPayFrequency] = useState('bi-weekly');
  const [filingStatus, setFilingStatus] = useState<'single' | 'married'>('single');
  const [state, setState] = useState('CA');

  const { grossPay, federalTax, stateTax, netPay } = useMemo(() => {
    const payPeriods = { 'weekly': 52, 'bi-weekly': 26, 'semi-monthly': 24, 'monthly': 12 };
    const numPayPeriods = payPeriods[payFrequency as keyof typeof payPeriods];
    
    const taxableIncome = Math.max(0, grossSalary - standardDeductions[filingStatus]);
    
    let federalTaxTotal = 0;
    let incomeLeft = taxableIncome;
    let lastLimit = 0;
    for (const bracket of federalBrackets[filingStatus]) {
      if (incomeLeft > 0) {
        const taxableInBracket = Math.min(incomeLeft, bracket.upto - lastLimit);
        federalTaxTotal += taxableInBracket * bracket.rate;
        incomeLeft -= taxableInBracket;
        lastLimit = bracket.upto;
      }
    }
    
    const stateTaxTotal = taxableIncome * (stateTaxRates[state] || stateTaxRates['OTHER']);
    
    const perPaycheckGross = grossSalary / numPayPeriods;
    const perPaycheckFederal = federalTaxTotal / numPayPeriods;
    const perPaycheckState = stateTaxTotal / numPayPeriods;
    const perPaycheckNet = perPaycheckGross - perPaycheckFederal - perPaycheckState;

    return {
      grossPay: perPaycheckGross,
      federalTax: perPaycheckFederal,
      stateTax: perPaycheckState,
      netPay: perPaycheckNet,
    };
  }, [grossSalary, payFrequency, filingStatus, state]);

  return (
    <CalculatorWrapper
      title="Paycheck Calculator (Salary)"
      description="Estimate your take-home pay after taxes. See a breakdown of your gross pay, estimated deductions, and net pay per paycheck."
      onNavigate={onNavigate}
    >
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="space-y-6">
          <SliderInput label="Annual Gross Salary" value={grossSalary} min={20000} max={500000} step={1000} onChange={setGrossSalary} format={v => `$${v.toLocaleString()}`} />
          <div>
            <label className="font-semibold text-gray-700 block mb-2">Pay Frequency</label>
            <select value={payFrequency} onChange={e => setPayFrequency(e.target.value)} className="w-full p-2 border-gray-300 rounded-md">
                <option value="bi-weekly">Bi-Weekly (26/year)</option>
                <option value="weekly">Weekly (52/year)</option>
                <option value="semi-monthly">Semi-Monthly (24/year)</option>
                <option value="monthly">Monthly (12/year)</option>
            </select>
          </div>
          <div>
            <label className="font-semibold text-gray-700 block mb-2">Federal Filing Status</label>
            <select value={filingStatus} onChange={e => setFilingStatus(e.target.value as 'single' | 'married')} className="w-full p-2 border-gray-300 rounded-md">
                <option value="single">Single</option>
                <option value="married">Married Filing Jointly</option>
            </select>
          </div>
           <div>
            <label className="font-semibold text-gray-700 block mb-2">State</label>
            <select value={state} onChange={e => setState(e.target.value)} className="w-full p-2 border-gray-300 rounded-md">
                <option value="CA">California</option>
                <option value="NY">New York</option>
                <option value="TX">Texas (No state income tax)</option>
                <option value="FL">Florida (No state income tax)</option>
                <option value="OTHER">Other (Uses average)</option>
            </select>
          </div>
        </div>

        <div className="bg-light-bg p-6 rounded-lg sticky top-28">
          <h3 className="text-xl font-bold text-dark-navy mb-4">Estimated Paycheck</h3>
          <div className="bg-white p-4 rounded-md shadow-sm text-center">
            <p className="text-sm text-gray-500">Estimated Net Pay (Take-Home)</p>
            <p className="text-4xl font-extrabold text-brand-purple">${netPay.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          </div>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between p-2 bg-white rounded"><span>Gross Pay</span><span className="font-semibold">${grossPay.toFixed(2)}</span></div>
            <div className="flex justify-between p-2 bg-white rounded text-red-600"><span>- Federal Tax</span><span className="font-semibold">${federalTax.toFixed(2)}</span></div>
            <div className="flex justify-between p-2 bg-white rounded text-red-600"><span>- State Tax</span><span className="font-semibold">${stateTax.toFixed(2)}</span></div>
          </div>
           <p className="text-xs text-gray-500 mt-4 text-center"><strong>Disclaimer:</strong> This is an estimate for informational purposes only. It does not include local taxes, FICA, or other deductions like 401(k) or health insurance.</p>
        </div>
      </div>
      <div className="mt-16 max-w-4xl mx-auto p-8 rounded-lg bg-gray-50 border">
        <h3 className="text-2xl font-bold text-dark-navy mb-4">About the Paycheck Calculator</h3>
        <div className="space-y-4 text-gray-700">
          <p>
            Understanding your paycheck can sometimes be confusing. Your annual salary is not what you take home, due to taxes and other deductions. This calculator provides a simplified estimate of your "net pay" or "take-home pay" per paycheck.
          </p>
          <p>
            Here's a breakdown of the terms used:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Gross Salary:</strong> Your total annual salary before any deductions are taken out.</li>
            <li><strong>Gross Pay:</strong> Your gross salary divided by the number of pay periods in a year.</li>
            <li><strong>Federal Income Tax:</strong> The tax levied by the U.S. federal government on your annual earnings. We estimate this using the standard deduction and federal tax brackets for your filing status.</li>
            <li><strong>State Income Tax:</strong> Tax levied by your state government. This varies significantly by state, with some states having no income tax at all.</li>
            <li><strong>Net Pay (Take-Home Pay):</strong> The amount of money you actually receive in your paycheck after all deductions are taken out.</li>
          </ul>
          <p>
            <strong>Important:</strong> This calculator provides an estimation and should not be used for tax planning purposes. It does not account for all variables, such as FICA taxes (Social Security and Medicare), local taxes, or voluntary deductions like 401(k) contributions, health insurance premiums, or flexible spending accounts.
          </p>
        </div>
      </div>
    </CalculatorWrapper>
  );
};

export default PaycheckCalculator;
