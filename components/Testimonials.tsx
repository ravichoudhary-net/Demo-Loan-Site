import React, { useState, useEffect, useCallback } from 'react';

const testimonials = [
  {
    category: "Auto Loan",
    text: "This site's auto loan marketplace is amazing! The dealership quoted me 9.9% APR, but through their platform, I secured 4.9% APR with a credit union I'd never heard of. The AI assistant even helped me understand all the terms.",
    author: "James Wilson",
    role: "Teacher",
    date: "April 7, 2025",
    avatar: "https://picsum.photos/id/1005/100/100",
    savings: "$4,200",
    loanAmount: "$28,000",
  },
  {
    category: "Personal Loan",
    text: "I needed to consolidate some credit card debt, and this site made it so simple. I got multiple offers in minutes and chose one with a much lower interest rate. The process was transparent and fast.",
    author: "Sarah Davis",
    role: "Graphic Designer",
    date: "May 12, 2025",
    avatar: "https://picsum.photos/id/1011/100/100",
    savings: "$2,800",
    loanAmount: "$15,000",
  },
  {
    category: "Mortgage Refinance",
    text: "Refinancing our home seemed daunting, but this platform was incredibly user-friendly. We locked in a great rate and are now saving hundreds every month. Highly recommended!",
    author: "Michael Chen",
    role: "Software Engineer",
    date: "June 2, 2025",
    avatar: "https://picsum.photos/id/1012/100/100",
    savings: "$6,500 Annually",
    loanAmount: "$450,000",
  },
];

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };
  
  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 5000);
    return () => clearInterval(slideInterval);
  }, [nextSlide]);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-block bg-white px-4 py-2 rounded-full shadow-md border border-gray-200 mb-4">
          <span className="text-sm font-semibold text-brand-purple">Success Stories</span>
        </div>
        <h2 className="text-4xl font-extrabold text-dark-navy">Real Results from Real People</h2>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Discover how our AI-powered platform has helped thousands save money and secure better loan terms
        </p>
        <div className="mt-12 max-w-4xl mx-auto relative">
            <div className="bg-white p-8 rounded-2xl shadow-2xl border border-gray-100 flex flex-col md:flex-row items-center gap-8">
                <div className="w-full md:w-1/3 flex-shrink-0 h-80 rounded-xl bg-gradient-primary relative overflow-hidden p-6 flex flex-col justify-between text-white">
                    <h3 className="text-2xl font-bold">Success Story</h3>
                    <div className="space-y-4">
                        <div className="bg-white/20 p-4 rounded-lg backdrop-blur-sm text-center">
                            <p className="text-2xl font-bold">{currentTestimonial.savings}</p>
                            <p className="text-sm opacity-80">Total Savings</p>
                        </div>
                        <div className="bg-white/20 p-4 rounded-lg backdrop-blur-sm text-center">
                            <p className="text-2xl font-bold">{currentTestimonial.loanAmount}</p>
                            <p className="text-sm opacity-80">Loan Amount</p>
                        </div>
                    </div>
                    <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full"></div>
                    <div className="absolute top-10 -left-10 w-24 h-24 bg-white/10 rounded-full"></div>
                </div>
                <div className="w-full md:w-2/3 text-left">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center space-x-1 text-yellow-500">
                             {[...Array(5)].map((_, i) => <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}
                             <span className="text-gray-700 font-bold ml-2">5.0</span>
                        </div>
                        <div className="flex space-x-2">
                             <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold">Verified</span>
                             <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-semibold">Success</span>
                        </div>
                    </div>
                    <span className="inline-block bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold mb-2">{currentTestimonial.category}</span>
                    <p className="text-gray-600 text-lg">“{currentTestimonial.text}”</p>
                    <div className="mt-6 flex items-center space-x-4">
                        <img src={currentTestimonial.avatar} alt={currentTestimonial.author} className="w-14 h-14 rounded-full"/>
                        <div>
                            <p className="font-bold text-dark-navy">{currentTestimonial.author}</p>
                            <p className="text-sm text-gray-500">{currentTestimonial.role}</p>
                            <p className="text-sm text-gray-400 mt-1 flex items-center space-x-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" /></svg>
                                <span>{currentTestimonial.date}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <button onClick={prevSlide} className="absolute top-1/2 -left-6 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button onClick={nextSlide} className="absolute top-1/2 -right-6 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
        </div>
        <div className="mt-8 flex justify-center space-x-2">
            {testimonials.map((_, index) => (
                <button key={index} onClick={() => setCurrentIndex(index)} className={`w-2.5 h-2.5 rounded-full ${currentIndex === index ? 'bg-brand-purple' : 'bg-gray-300'} transition-colors`}></button>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;