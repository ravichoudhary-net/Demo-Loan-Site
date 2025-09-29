import React, { useState, useMemo } from 'react';
import { Page } from '../../App';
import CalculatorWrapper from './common/CalculatorWrapper';
import SliderInput from './common/SliderInput';

interface Debt {
  id: number;
  name: string;
  balance: number;
  apr: number;
  monthlyPayment: number;
}

const DebtConsolidationCalculator: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => {
  const [debts, setDebts] = useState<Debt[]>([
    { id: 1, name: 'Credit Card 1', balance: 5000, apr: 22, monthlyPayment: 200 },
    { id: 2, name: 'Personal Loan', balance: 10000, apr: 12, monthlyPayment: 300 },
  ]);
  const [newLoanApr, setNewLoanApr] = useState(9);
  const [newLoanTerm, setNewLoanTerm] = useState(5);

  const handleDebtChange = (id: number, field: keyof Debt, value: string | number) => {
    setDebts(debts.map(debt => debt.id === id ? { ...debt, [field]: value } : debt));
  };

  const addDebt = () => {
    const newId = debts.length > 0 ? Math.max(...debts.map(d => d.id)) + 1 : 1;
    setDebts([...debts, { id: newId, name: `Debt ${debts.length + 1}`, balance: 0, apr: 0, monthlyPayment: 0 }]);
  };

  const removeDebt = (id: number) => {
    setDebts(debts.filter(debt => debt.id !== id));
  };

  const {
    totalBalance,
    currentMonthlyPayment,
    newMonthlyPayment,
    monthlySavings,
    totalInterestSaved,
    newPayoffTime,
  } = useMemo(() => {
    const totalBal = debts.reduce((sum, debt) => sum + Number(debt.balance), 0);
    const currentPmt = debts.reduce((sum, debt) => sum + Number(debt.monthlyPayment), 0);
    
    if (totalBal <= 0) {
        return { totalBalance: 0, currentMonthlyPayment: 0, newMonthlyPayment: 0, monthlySavings: 0, totalInterestSaved: 0, newPayoffTime: 'N/A' };
    }

    const newMonthlyRate = newLoanApr / 100 / 12;
    const newNumberOfPayments = newLoanTerm * 12;

    const newPmt = (totalBal * newMonthlyRate) / (1 - Math.pow(1 + newMonthlyRate, -newNumberOfPayments));
    
    const totalPaidWithNewLoan = newPmt * newNumberOfPayments;
    const totalInterestWithNewLoan = totalPaidWithNewLoan - totalBal;
    
    let totalInterestWithOldLoans = 0;
    debts.forEach(debt => {
        let balance = debt.balance;
        const monthlyRate = debt.apr / 100 / 12;
        while(balance > 0) {
            const interest = balance * monthlyRate;
            totalInterestWithOldLoans += interest;
            balance -= (debt.monthlyPayment - interest);
            if (debt.monthlyPayment <= interest) { // Failsafe for payments that don't cover interest
                totalInterestWithOldLoans = Infinity;
                break;
            }
        }
    });

    const interestSaved = totalInterestWithOldLoans - totalInterestWithNewLoan;

    return {
      totalBalance: totalBal,
      currentMonthlyPayment: currentPmt,
      newMonthlyPayment: newPmt,
      monthlySavings: currentPmt - newPmt,
      totalInterestSaved: isFinite(interestSaved) ? interestSaved : 0,
      newPayoffTime: `${newLoanTerm} years`
    };

  }, [debts, newLoanApr, newLoanTerm]);

  return (
    <CalculatorWrapper
      title="Debt Consolidation Calculator"
      description="Enter your existing debts and a potential consolidation loan to see how much you could save on interest and simplify your payments."
      onNavigate={onNavigate}
    >
        <div className="grid lg:grid-cols-2 gap-8">
            {/* Left side: Inputs */}
            <div>
                <h3 className="text-xl font-bold text-dark-navy mb-4">Your Current Debts</h3>
                <div className="space-y-4">
                    {debts.map((debt, index) => (
                        <div key={debt.id} className="p-4 rounded-lg bg-gray-50 border relative">
                            <button onClick={() => removeDebt(debt.id)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500">
                                &times;
                            </button>
                            <input type="text" value={debt.name} onChange={e => handleDebtChange(debt.id, 'name', e.target.value)} className="font-semibold w-full border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-brand-purple mb-2" />
                            <div className="grid grid-cols-3 gap-2 text-sm">
                                <div><label>Balance ($)</label><input type="number" value={debt.balance} onChange={e => handleDebtChange(debt.id, 'balance', Number(e.target.value))} className="w-full mt-1 p-1 border-gray-300 rounded-md" /></div>
                                <div><label>APR (%)</label><input type="number" value={debt.apr} onChange={e => handleDebtChange(debt.id, 'apr', Number(e.target.value))} className="w-full mt-1 p-1 border-gray-300 rounded-md" /></div>
                                <div><label>Payment ($)</label><input type="number" value={debt.monthlyPayment} onChange={e => handleDebtChange(debt.id, 'monthlyPayment', Number(e.target.value))} className="w-full mt-1 p-1 border-gray-300 rounded-md" /></div>
                            </div>
                        </div>
                    ))}
                </div>
                <button onClick={addDebt} className="mt-4 w-full text-sm font-semibold text-brand-purple border-2 border-dashed border-brand-purple rounded-lg py-2 hover:bg-purple-50 transition-colors">
                    + Add Another Debt
                </button>

                <h3 className="text-xl font-bold text-dark-navy mt-8 mb-4">New Consolidation Loan</h3>
                <div className="space-y-4">
                     <SliderInput label="New Loan Interest Rate" value={newLoanApr} min={2} max={30} step={0.25} onChange={setNewLoanApr} format={v => `${v.toFixed(2)}%`} />
                     <SliderInput label="New Loan Term (Years)" value={newLoanTerm} min={1} max={10} step={1} onChange={setNewLoanTerm} format={v => `${v} years`} />
                </div>
            </div>

            {/* Right side: Results */}
            <div className="bg-light-bg p-6 rounded-lg">
                <h3 className="text-xl font-bold text-dark-navy mb-4">Potential Savings Analysis</h3>
                <div className="space-y-4">
                    <div className="bg-white p-4 rounded-md shadow-sm">
                        <p className="text-sm text-gray-500">Total Debt Balance</p>
                        <p className="text-2xl font-bold text-dark-navy">${totalBalance.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-md shadow-sm">
                             <p className="text-sm text-gray-500">Current Monthly Payment</p>
                            <p className="text-xl font-bold text-red-600">${currentMonthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                        </div>
                         <div className="bg-white p-4 rounded-md shadow-sm">
                             <p className="text-sm text-gray-500">New Monthly Payment</p>
                            <p className="text-xl font-bold text-green-600">${newMonthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                        </div>
                    </div>
                     <div className="bg-green-100 p-4 rounded-md shadow-sm text-center">
                        <p className="text-sm font-semibold text-green-800">Potential Monthly Savings</p>
                        <p className="text-3xl font-extrabold text-green-900">${monthlySavings.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                    </div>
                     <div className="bg-blue-100 p-4 rounded-md shadow-sm text-center">
                        <p className="text-sm font-semibold text-blue-800">Potential Total Interest Saved</p>
                        <p className="text-3xl font-extrabold text-blue-900">${totalInterestSaved.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                    </div>
                     <div className="bg-purple-100 p-4 rounded-md shadow-sm text-center">
                        <p className="text-sm font-semibold text-purple-800">New Payoff Time</p>
                        <p className="text-3xl font-extrabold text-purple-900">{newPayoffTime}</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="mt-16 max-w-4xl mx-auto p-8 rounded-lg bg-gray-50 border">
            <h3 className="text-2xl font-bold text-dark-navy mb-4">How Debt Consolidation Works</h3>
            <div className="space-y-4 text-gray-700">
            <p>
                If you're juggling multiple high-interest debts like credit cards, personal loans, or medical bills, managing them can be overwhelming. Debt consolidation is a strategy where you take out a single new loan to pay off all your other existing debts.
            </p>
            <p>
                The primary goals of debt consolidation are:
            </p>
            <ul className="list-disc list-inside space-y-2">
                <li><strong>Simplification:</strong> Instead of making multiple payments to different lenders each month, you only have one payment to worry about.</li>
                <li><strong>Lower Interest Rate:</strong> Ideally, the new consolidation loan will have a lower Annual Percentage Rate (APR) than the average rate of your existing debts. This is where the savings come from.</li>
                <li><strong>Fixed Repayment Plan:</strong> Unlike credit cards with variable payments, a consolidation loan typically has a fixed term and monthly payment, so you know exactly when you'll be debt-free.</li>
            </ul>
            <p>
                This calculator helps you see the potential benefits in black and white. By comparing your total current monthly payments to the single payment of a new loan, you can quickly see if consolidation is a smart financial move for you.
            </p>
            </div>
      </div>
    </CalculatorWrapper>
  );
};

export default DebtConsolidationCalculator;
