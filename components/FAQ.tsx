import React, { useState } from 'react';

const FAQItem: React.FC<{ question: string; children: React.ReactNode; isOpen: boolean; onClick: () => void; }> = ({ question, children, isOpen, onClick }) => {
  return (
    <div className="border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center p-5 text-left font-semibold text-dark-navy"
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        <svg
          className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}
      >
        <div className="p-5 pt-0 text-gray-600">
          {children}
        </div>
      </div>
    </div>
  );
};

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "Will checking my rates affect my credit score?",
      answer: "No. Checking your rates on our platform involves a 'soft' credit inquiry, which does not impact your credit score. This allows you to see personalized offers and compare options without any negative effect. A 'hard' inquiry, which can have a small, temporary impact on your score, only occurs if you choose to proceed with a formal loan application with a specific lender."
    },
    {
      question: "What's the difference between a fixed-rate and a variable-rate loan?",
      answer: "A fixed-rate loan has an interest rate that is locked in for the entire life of the loan, meaning your monthly principal and interest payments will always be the same. This provides predictability and stability. A variable-rate loan has an interest rate that can change over time based on market conditions. It might start lower than a fixed rate, but your payments could increase (or decrease) in the future."
    },
    {
      question: "What documents do I typically need to apply for a loan?",
      answer: "While requirements vary by lender, you should generally be prepared to provide: proof of identity (like a driver's license or passport), proof of income (such as recent pay stubs, W-2s, or tax returns), and proof of address (like a utility bill or lease agreement). Some lenders may also ask for recent bank statements."
    },
    {
      question: "Can I get a loan if I have bad credit?",
      answer: "Yes, it is possible. While having a higher credit score will give you access to more options and better interest rates, some lenders specialize in providing loans to individuals with fair or poor credit. These loans may have higher interest rates to offset the lender's risk. We can help you find lenders that work with borrowers across the credit spectrum."
    }
  ];

  return (
    <section className="py-20 bg-light-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-dark-navy">Frequently Asked Questions</h2>
          <p className="mt-4 text-lg text-gray-600">
            Have questions? We've got answers. Here are some of the most common inquiries we receive.
          </p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              isOpen={openIndex === index}
              onClick={() => handleToggle(index)}
            >
              <p>{faq.answer}</p>
            </FAQItem>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;