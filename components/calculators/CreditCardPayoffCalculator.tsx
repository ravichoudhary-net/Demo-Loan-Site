import React, { useState, useMemo } from 'react';
import { Page } from '../../App';
import CalculatorWrapper from './common/CalculatorWrapper';

interface Card {
  id: number;
  name: string;
  balance: number;
  apr: number;
}

type PayoffStrategy = 'avalanche' | 'snowball';

const CreditCardPayoffCalculator: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => {
  const [cards, setCards] = useState<Card[]>([
    { id: 1, name: 'Visa', balance: 4500, apr: 21.99 },
    { id: 2, name: 'Mastercard', balance: 2200, apr: 18.5 },
  ]);
  const [extraPayment, setExtraPayment] = useState(200);

  const handleCardChange = (id: number, field: keyof Card, value: string | number) => {
    setCards(cards.map(card => card.id === id ? { ...card, [field]: value } : card));
  };
  
  const addCard = () => {
    const newId = cards.length > 0 ? Math.max(...cards.map(c => c.id)) + 1 : 1;
    setCards([...cards, { id: newId, name: `Card ${cards.length + 1}`, balance: 0, apr: 0 }]);
  };

  const removeCard = (id: number) => {
    setCards(cards.filter(card => card.id !== id));
  };

  const calculatePayoff = (strategy: PayoffStrategy) => {
    let localCards = JSON.parse(JSON.stringify(cards)) as Card[];
    if (localCards.length === 0) return { months: 0, totalInterest: 0 };
    
    // Calculate minimum payments (e.g., 1% of balance + interest)
    localCards.forEach(card => {
        const monthlyRate = card.apr / 100 / 12;
        const interest = card.balance * monthlyRate;
        const minPrincipal = card.balance * 0.01;
        (card as any).minPayment = Math.max(25, interest + minPrincipal);
    });

    const totalMinimumPayments = localCards.reduce((sum, card) => sum + (card as any).minPayment, 0);
    const totalPayment = totalMinimumPayments + extraPayment;
    
    let months = 0;
    let totalInterest = 0;
    
    while(localCards.some(c => c.balance > 0)) {
        months++;
        let paymentPool = totalPayment;

        // Apply minimums first
        localCards.forEach(card => {
            if (card.balance > 0) {
                const interest = card.balance * (card.apr / 100 / 12);
                totalInterest += interest;
                card.balance += interest;
                const payment = Math.min(card.balance, (card as any).minPayment);
                card.balance -= payment;
                paymentPool -= payment;
            }
        });
        
        // Sort for strategy
        if (strategy === 'avalanche') localCards.sort((a, b) => b.apr - a.apr);
        if (strategy === 'snowball') localCards.sort((a, b) => a.balance - b.balance);

        // Apply extra payments
        for (const card of localCards) {
            if (card.balance > 0 && paymentPool > 0) {
                const payment = Math.min(card.balance, paymentPool);
                card.balance -= payment;
                paymentPool -= payment;
            }
        }
        if (months > 600) break; // Safety break
    }
    return { months, totalInterest };
  };

  const avalancheResult = useMemo(() => calculatePayoff('avalanche'), [cards, extraPayment]);
  const snowballResult = useMemo(() => calculatePayoff('snowball'), [cards, extraPayment]);

  return (
    <CalculatorWrapper
      title="Credit Card Payoff Calculator"
      description="Create a plan to pay off your credit card debt. Compare strategies like the Avalanche and Snowball methods to see which is right for you."
      onNavigate={onNavigate}
    >
      <div className="grid lg:grid-cols-2 gap-8">
        <div>
            <h3 className="text-xl font-bold text-dark-navy mb-4">Your Credit Cards</h3>
            <div className="space-y-3">
                 {cards.map(card => (
                    <div key={card.id} className="p-4 rounded-lg bg-gray-50 border relative grid grid-cols-3 gap-2 text-sm">
                         <button onClick={() => removeCard(card.id)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500">&times;</button>
                         <input type="text" value={card.name} onChange={e => handleCardChange(card.id, 'name', e.target.value)} className="font-semibold col-span-3 w-full border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-brand-purple mb-2" />
                        <div><label>Balance ($)</label><input type="number" value={card.balance} onChange={e => handleCardChange(card.id, 'balance', Number(e.target.value))} className="w-full mt-1 p-1 border-gray-300 rounded-md" /></div>
                        <div><label>APR (%)</label><input type="number" value={card.apr} onChange={e => handleCardChange(card.id, 'apr', Number(e.target.value))} className="w-full mt-1 p-1 border-gray-300 rounded-md" /></div>
                    </div>
                ))}
            </div>
             <button onClick={addCard} className="mt-4 w-full text-sm font-semibold text-brand-purple border-2 border-dashed border-brand-purple rounded-lg py-2 hover:bg-purple-50">
                + Add Card
            </button>
            <div className="mt-6">
                 <label className="font-semibold text-gray-700">Extra Monthly Payment</label>
                 <div className="relative mt-2">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <input type="number" value={extraPayment} onChange={e => setExtraPayment(Number(e.target.value))} className="w-full pl-7 pr-4 py-2 rounded-md border-gray-300 shadow-sm" />
                </div>
            </div>
        </div>
        <div className="bg-light-bg p-6 rounded-lg">
             <h3 className="text-xl font-bold text-dark-navy mb-4">Payoff Strategy Comparison</h3>
             <div className="space-y-4">
                <div className="bg-white p-4 rounded-md shadow-sm border-l-4 border-purple-500">
                    <h4 className="font-bold text-purple-700">Avalanche Method (High APR First)</h4>
                    <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                        <p><strong>Payoff Time:</strong> {Math.floor(avalancheResult.months / 12)}y {avalancheResult.months % 12}m</p>
                        <p><strong>Total Interest:</strong> ${avalancheResult.totalInterest.toFixed(2)}</p>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-md shadow-sm border-l-4 border-blue-500">
                    <h4 className="font-bold text-blue-700">Snowball Method (Low Balance First)</h4>
                     <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                        <p><strong>Payoff Time:</strong> {Math.floor(snowballResult.months / 12)}y {snowballResult.months % 12}m</p>
                        <p><strong>Total Interest:</strong> ${snowballResult.totalInterest.toFixed(2)}</p>
                    </div>
                </div>
                 <div className="bg-green-100 p-4 rounded-md shadow-sm text-center">
                    <p className="text-sm font-semibold text-green-800">Avalanche Method Saves You</p>
                    <p className="text-2xl font-extrabold text-green-900">${(snowballResult.totalInterest - avalancheResult.totalInterest).toFixed(2)}</p>
                    <p className="text-xs text-green-700 mt-1">in interest compared to the Snowball method.</p>
                </div>
             </div>
        </div>
      </div>
       <div className="mt-16 max-w-4xl mx-auto p-8 rounded-lg bg-gray-50 border">
        <h3 className="text-2xl font-bold text-dark-navy mb-4">Credit Card Payoff Strategies</h3>
        <div className="space-y-4 text-gray-700">
          <p>
            High-interest credit card debt can feel overwhelming, but having a clear strategy can make all the difference. This calculator compares two of the most popular debt payoff methods to help you decide which approach is best for you.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>
                <strong>The Avalanche Method:</strong> With this strategy, you make minimum payments on all your cards and put any extra money toward the card with the highest Annual Percentage Rate (APR). Once that card is paid off, you roll its payment amount over to the card with the next-highest APR. Mathematically, this method will always save you the most money in interest and get you out of debt the fastest.
            </li>
            <li>
                <strong>The Snowball Method:</strong> This strategy focuses on building momentum. You make minimum payments on all cards and put any extra money toward the card with the smallest balance. When you pay off a card, you get a quick win, which can be highly motivating. You then roll that card's payment into the next-smallest balance. While you may pay more in interest overall, the psychological boost can be very powerful for staying on track.
            </li>
          </ul>
          <p>
            There is no single "right" answer—the best strategy depends on your personality. If you're motivated by saving the most money, the Avalanche method is for you. If you need quick wins to stay motivated, the Snowball method is a fantastic choice.
          </p>
        </div>
      </div>
    </CalculatorWrapper>
  );
};

export default CreditCardPayoffCalculator;
