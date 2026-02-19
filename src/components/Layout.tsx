import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from '../sections/Navigation';
import Footer from '../sections/Footer';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
    
    // Refresh ScrollTrigger on route change to ensure animations work correctly
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  }, [pathname]);

  return (
    <div className="relative min-h-screen min-h-[100dvh] w-full max-w-[100vw] overflow-x-hidden bg-[var(--off-white)]">
      <Navigation />
      <main className="w-full max-w-[100vw] overflow-x-hidden">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
