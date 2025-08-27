import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import Disclaimer from '../Common/Disclaimer';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-primary-dark">
      <Header />
      <Disclaimer />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;