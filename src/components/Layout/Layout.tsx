import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import Disclaimer from '../Common/Disclaimer';
import { ArrowRight } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-primary-dark">
      <div className="bg-yellow-400 text-primary-black py-2 px-4 text-center font-bold sticky top-0 z-[60] shadow-md border-b border-yellow-500">
        <a href="https://sassaaistatusupdate.co.za" target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center justify-center gap-2 text-sm md:text-base">
          Instant Status Check →
        </a>
      </div>
      <Header />
      <Disclaimer />
      <main className="flex-1">
        {children}
      </main>
      <Footer />

      {/* Floating Widget */}
      <div className="fixed bottom-24 right-6 z-40">
        <a
          href="https://sassaaistatusupdate.co.za"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-red-600 text-white py-3 px-6 rounded-full shadow-2xl flex items-center gap-2 hover:bg-red-700 transition-all transform hover:scale-105 active:scale-95 animate-pulse hover:animate-none"
        >
          <span className="font-bold whitespace-nowrap">Check Status Instantly!</span>
          <ArrowRight className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
};

export default Layout;