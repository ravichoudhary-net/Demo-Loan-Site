import React, { useState, useMemo } from 'react';
import { Page } from '../../App';
import CalculatorWrapper from './common/CalculatorWrapper';

interface DebtItem {
  id: number;
  name: string;
  amount: number;
}

const DTICalculator: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => {
  const [grossIncome, setGrossIncome] = useState(6000);
  const [debts, setDebts] = useState<DebtItem[]>([
    { id: 1, name: 'Mortgage / Rent', amount: 1800 },
    { id: 2, name: 'Car Payment', amount: 400 },
    { id: 3, name: 'Credit Card Minimums', amount: 200 },
  ]);

  const handleDebtChange = (id: number, field: keyof DebtItem, value: string | number) => {
    setDebts(debts.map(debt => debt.id === id ? { ...debt, [field]: value } : debt));
  };
  
  const addDebt = () => {
    const newId = debts.length > 0 ? Math.max(...debts.map(d => d.id)) + 1 : 1;
    setDebts([...debts, { id: newId, name: '', amount: 0 }]);
  };

  const removeDebt = (id: number) => {
    setDebts(debts.filter(debt => debt.id !== id));
  };

  const { totalDebt, dti, category } = useMemo(() => {
    const total = debts.reduce((sum, debt) => sum + Number(debt.amount), 0);
    if (grossIncome <= 0) return { totalDebt: total, dti: 0, category: 'N/A' };

    const ratio = (total / grossIncome) * 100;
    let cat = 'Excellent';
    if (ratio > 36) cat = 'Manageable';
    if (ratio > 43) cat = 'Concerning';
    if (ratio > 50) cat = 'High Risk';

    return { totalDebt: total, dti: ratio, category: cat };
  }, [grossIncome, debts]);

  const getCategoryColor = () => {
      if (category === 'Excellent') return 'bg-green-500';
      if (category === 'Manageable') return 'bg-yellow-500';
      if (category === 'Concerning') return 'bg-orange-500';
      if (category === 'High Risk') return 'bg-red-500';
      return 'bg-gray-300';
  }

  return (
    <CalculatorWrapper
      title="Debt-to-Income (DTI) Ratio Calculator"
      description="Calculate your DTI ratio to understand your financial health and borrowing power from a lender's perspective."
      onNavigate={onNavigate}
    >
      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Input Section */}
        <div>
          <div className="mb-6">
            <label className="font-semibold text-gray-700 block mb-2">Gross Monthly Income ($)</label>
            <input type="number" value={grossIncome} onChange={e => setGrossIncome(Number(e.target.value))} className="w-full mt-1 p-2 border-gray-300 rounded-md" placeholder="e.g., 6000" />
            <p className="text-xs text-gray-500 mt-1">Your total income before taxes and deductions.</p>
          </div>
           <div>
              <h3 className="font-semibold text-gray-700 mb-2">Monthly Debt Payments</h3>
              <div className="space-y-2">
                {debts.map(debt => (
                  <div key={debt.id} className="flex items-center gap-2">
                    <input type="text" value={debt.name} onChange={e => handleDebtChange(debt.id, 'name', e.target.value)} className="w-1/2 p-2 border-gray-300 rounded-md text-sm" placeholder="e.g., Rent" />
                    <div className="relative w-1/2">
                        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                        <input type="number" value={debt.amount} onChange={e => handleDebtChange(debt.id, 'amount', Number(e.target.value))} className="w-full pl-6 p-2 border-gray-300 rounded-md text-sm" />
                    </div>
                    <button onClick={() => removeDebt(debt.id)} className="text-red-500 hover:text-red-700">&times;</button>
                  </div>
                ))}
              </div>
              <button onClick={addDebt} className="mt-3 w-full text-sm font-semibold text-brand-purple border-2 border-dashed border-brand-purple rounded-lg py-1.5 hover:bg-purple-50">
                + Add Debt
              </button>
          </div>
        </div>
        
        {/* Results Section */}
        <div className="bg-light-bg p-6 rounded-lg text-center sticky top-28">
           <p className="text-sm text-gray-500">Your Debt-to-Income (DTI) Ratio</p>
          <p className="text-6xl font-extrabold text-brand-purple my-4">{dti.toFixed(2)}%</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className={`h-2.5 rounded-full ${getCategoryColor()}`} style={{width: `${Math.min(dti, 100)}%`}}></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0%</span>
              <span>36%</span>
              <span>43%</span>
              <span>50%+</span>
          </div>
           <div className="mt-4 bg-white p-3 rounded-md shadow-sm">
             <p className="font-semibold text-gray-500">Lender View</p>
             <p className={`text-lg font-bold ${category === 'Excellent' ? 'text-green-600' : category === 'Manageable' ? 'text-yellow-600' : category === 'Concerning' ? 'text-orange-600' : 'text-red-600'}`}>{category}</p>
          </div>
           <p className="text-xs text-gray-500 mt-3">Lenders generally prefer a DTI ratio below 36%.</p>
        </div>
      </div>
      <div className="mt-16 max-w-4xl mx-auto p-8 rounded-lg bg-gray-50 border">
        <h3 className="text-2xl font-bold text-dark-navy mb-4">What is Debt-to-Income (DTI) Ratio?</h3>
        <div className="space-y-4 text-gray-700">
          <p>
            Your Debt-to-Income (DTI) ratio is a key financial metric that compares your total monthly debt payments to your gross monthly income. It's expressed as a percentage, and lenders use it as one of the main indicators of your ability to manage monthly payments and repay debts.
          </p>
          <p>
            Here's a general guide to how lenders view DTI ratios:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>36% or less:</strong> Generally seen as ideal. You likely have a good balance between your debt and income and are in a strong position to handle new credit.</li>
            <li><strong>37% to 43%:</strong> Manageable, but could be a cause for concern. Lenders may see you as having less room in your budget for new debt.</li>
            <li><strong>44% to 50%:</strong> Concerning. You may have difficulty qualifying for new loans, especially mortgages, as a large portion of your income is already allocated to debt.</li>
            <li><strong>Over 50%:</strong> Generally considered high risk. It indicates that more than half of your income goes to debt payments, leaving little for savings or discretionary spending.</li>
          </ul>
          <p>
            Knowing your DTI is the first step toward improving it. If your ratio is high, you can work on either increasing your income or, more commonly, reducing your debt.
          </p>
        </div>
      </div>
    </CalculatorWrapper>
  );
};

export default DTICalculator;
