import React from 'react';
import { Page } from '../App';

const FooterLink: React.FC<{ href?: string; onClick?: () => void; children: React.ReactNode }> = ({ href, onClick, children }) => {
  const commonClasses = "text-gray-400 hover:text-white transition-colors flex items-center space-x-2 cursor-pointer";

  if (href) {
    return (
      <a href={href} className={commonClasses}>
        <span>›</span>
        <span>{children}</span>
      </a>
    );
  }

  return (
     <button onClick={onClick} className={commonClasses}>
        <span>›</span>
        <span>{children}</span>
     </button>
  );
};


// FIX: Replaced JSX.Element with React.ReactElement to resolve "Cannot find namespace 'JSX'" error.
const FooterSection: React.FC<{ title: string; children: React.ReactNode; icon: React.ReactElement }> = ({ title, children, icon }) => (
  <div>
    <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
        <div className="text-green-400">{icon}</div>
        <span>{title}</span>
    </h3>
    <div className="space-y-3">
      {children}
    </div>
  </div>
);

const SocialIcon: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
    <a href={href} className="w-9 h-9 flex items-center justify-center bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors">
        {children}
    </a>
)

const Footer: React.FC<{onNavigate: (page: Page) => void}> = ({onNavigate}) => {
  return (
    <footer className="bg-dark-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <FooterSection title="Quick Links" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}>
                <FooterLink onClick={() => onNavigate('home')}>Home</FooterLink>
                <FooterLink href="#">About Us</FooterLink>
                <FooterLink onClick={() => onNavigate('providers')}>All Providers</FooterLink>
                <FooterLink href="#">Loan Types</FooterLink>
                <FooterLink href="#">Blog</FooterLink>
                <FooterLink href="#">Contact</FooterLink>
            </FooterSection>
            <FooterSection title="Resources" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>}>
                <FooterLink href="#">FAQ</FooterLink>
                <FooterLink href="#">Financial Resources</FooterLink>
                <FooterLink onClick={() => onNavigate('calculators')}>Loan Calculators</FooterLink>
                <FooterLink href="#">Q&A Community</FooterLink>
                <FooterLink href="#">Financial Education</FooterLink>
            </FooterSection>
            <FooterSection title="Legal & Support" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>}>
                <FooterLink href="#">Privacy Policy</FooterLink>
                <FooterLink href="#">Terms of Service</FooterLink>
                <FooterLink href="#">Customer Support</FooterLink>
                <FooterLink href="#">Lending Guides</FooterLink>
                <FooterLink href="#">Credit Tips</FooterLink>
            </FooterSection>
            <FooterSection title="Get in Touch" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>}>
                <p className="text-gray-400"><strong>Email Us:</strong> info@fastloanr.com</p>
                <p className="text-gray-400"><strong>Call Us:</strong> 1-800-555-1234</p>
                <p className="text-gray-400"><strong>Office:</strong> San Francisco, CA</p>
                <div className="mt-4 bg-purple-900/50 p-4 rounded-lg">
                    <h4 className="font-semibold text-white">24/7 AI Assistant</h4>
                    <p className="text-sm text-gray-300">Get instant help with your loan questions</p>
                    <button className="mt-3 w-full bg-gradient-primary text-white font-bold py-2 rounded-lg text-sm">Chat Now</button>
                </div>
            </FooterSection>
        </div>
        <div className="mt-16 border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
             <div className="flex items-center space-x-2">
                <div className="bg-gradient-primary p-2 rounded-lg">
                    <span className="font-bold text-2xl text-white">D</span>
                </div>
                <span className="font-bold text-xl text-white">Demo Loan Site</span>
            </div>
            <p className="text-gray-400 mt-4 md:mt-0 text-center">This site revolutionizes loan matching with AI-powered technology.</p>
             <div className="flex items-center space-x-3 mt-4 md:mt-0">
                <SocialIcon href="#"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.46.67.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.22-1.95-.55v.05c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21c7.34 0 11.35-6.08 11.35-11.35 0-.17 0-.34-.01-.51.78-.57 1.45-1.29 1.99-2.09z" /></svg></SocialIcon>
                <SocialIcon href="#"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg></SocialIcon>
                <SocialIcon href="#"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.012 3.584-.07 4.85c-.148 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.85s.012-3.584.07-4.85c.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.947s-.014-3.667-.072-4.947c-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44c0-.795-.645-1.44-1.441-1.44z" /></svg></SocialIcon>
            </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm">
            <p className="text-gray-400">&copy; 2025 Demo Loan Site. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 sm:mt-0">
                <a href="#" className="text-gray-400 hover:text-white">Privacy</a>
                <a href="#" className="text-gray-400 hover:text-white">Terms</a>
                <a href="#" className="text-gray-400 hover:text-white">Contact</a>
            </div>
        </div>
        <div className="mt-8 text-xs text-gray-500 text-left">
            <p><strong>Disclaimer:</strong> Demo Loan Site is not a lender and does not make credit decisions. The rates and terms displayed are estimates and may not reflect the actual terms offered by lenders. We may receive compensation from some of the companies featured on our site. NMLS #12345</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;