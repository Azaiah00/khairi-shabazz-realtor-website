import { useEffect, useState, useRef } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { gsap } from 'gsap';

import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', href: '/', isHash: false },
    { name: 'Seller', href: '/seller-consultation', isHash: false },
    { name: 'Buyer', href: '/buyer-consultation', isHash: false },
    { name: 'Resources', href: '/resources', isHash: false },
  ];

  const hashLinks = [
    { name: 'About', href: '/#about' },
    { name: 'Services', href: '/#services' },
    { name: 'Testimonials', href: '/#testimonials' },
    { name: 'Contact', href: '/#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open so page doesn't scroll behind it
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    // Entrance animation
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      tl.fromTo(
        logoRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
      );

      if (linksRef.current) {
        const links = linksRef.current.querySelectorAll('.nav-link');
        tl.fromTo(
          links,
          { opacity: 0, y: -15 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out' },
          '-=0.3'
        );
      }

      tl.fromTo(
        ctaRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' },
        '-=0.2'
      );
    });

    return () => ctx.revert();
  }, []);

  const handleLinkClick = (href: string, isHash: boolean) => {
    if (isHash) {
      const hash = href.split('#')[1];
      if (pathname !== '/') {
        navigate('/');
        // Use a longer delay to ensure the home page has mounted and sections are ready
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            const navHeight = 80;
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({
              top: elementPosition - navHeight,
              behavior: 'smooth'
            });
          }
        }, 500);
      } else {
        const element = document.getElementById(hash);
        if (element) {
          const navHeight = 80;
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo({
            top: elementPosition - navHeight,
            behavior: 'smooth'
          });
        }
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'glass shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div ref={logoRef} className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt=""
                className={`transition-all duration-300 group-hover:rotate-3 flex-shrink-0 ${
                  isScrolled ? 'h-10' : 'h-12'
                }`}
              />
              <div className="hidden sm:block">
                <p className={`font-display font-semibold text-lg leading-tight transition-colors ${
                  isScrolled ? 'text-[var(--charcoal)]' : 'text-[var(--charcoal)]'
                }`}>
                  KHAIRI SHABAZZ
                </p>
                <p className={`text-xs tracking-wider transition-colors ${
                  isScrolled ? 'text-[var(--teal)]' : 'text-[var(--teal)]'
                }`}>
                  CLOSE WITH KHAIRI
                </p>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div ref={linksRef} className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`nav-link text-sm font-medium underline-animate transition-colors ${
                  pathname === link.href
                    ? 'text-[var(--teal)]'
                    : 'text-[var(--charcoal)] hover:text-[var(--teal)]'
                }`}
              >
                {link.name}
              </Link>
            ))}
            {hashLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href, true);
                }}
                className="nav-link text-sm font-medium underline-animate transition-colors text-[var(--charcoal)] hover:text-[var(--teal)]"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <button
            ref={ctaRef}
            onClick={() => handleLinkClick('#contact', true)}
            className="hidden lg:flex items-center gap-2 px-6 py-3 bg-[var(--teal)] text-white text-sm font-medium rounded-lg transition-all duration-300 hover:bg-[var(--teal-dark)] hover:scale-105 hover:shadow-lg"
          >
            <Phone className="w-4 h-4" />
            Let's Talk
          </button>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-[var(--charcoal)]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ${
            isMobileMenuOpen ? 'max-h-[32rem] opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="glass rounded-xl p-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block py-3 px-4 font-medium rounded-lg transition-colors ${
                  pathname === link.href
                    ? 'bg-[var(--teal-pale)] text-[var(--teal)]'
                    : 'text-[var(--charcoal)] hover:bg-[var(--teal-pale)] hover:text-[var(--teal)]'
                }`}
              >
                {link.name}
              </Link>
            ))}
            {hashLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href, true);
                }}
                className="block py-3 px-4 text-[var(--charcoal)] font-medium rounded-lg hover:bg-[var(--teal-pale)] hover:text-[var(--teal)] transition-colors"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={() => handleLinkClick('#contact', true)}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[var(--teal)] text-white font-medium rounded-lg mt-4"
            >
              <Phone className="w-4 h-4" />
              Let's Talk
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
