import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, ArrowUp, Home, User, Briefcase, MessageSquare, Handshake } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

import { Link, useLocation, useNavigate } from 'react-router-dom';

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const waveRef = useRef<SVGPathElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const socialLinks = [
    { href: 'https://facebook.com', label: 'Facebook', icon: Facebook },
    { href: 'https://www.instagram.com/closewithkhairi/', label: 'Instagram', icon: Instagram },
    { href: 'https://linkedin.com', label: 'LinkedIn', icon: Linkedin },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { name: 'Home', href: '/', isHash: false, icon: Home },
    { name: 'Seller', href: '/seller-consultation', isHash: false, icon: Briefcase },
    { name: 'Buyer', href: '/buyer-consultation', isHash: false, icon: User },
    { name: 'Resources', href: '/resources', isHash: false, icon: Briefcase },
  ];

  const hashLinks = [
    { name: 'About', href: '/#about', icon: User },
    { name: 'Services', href: '/#services', icon: Briefcase },
    { name: 'Testimonials', href: '/#testimonials', icon: MessageSquare },
    { name: 'Contact', href: '/#contact', icon: Handshake },
  ];

  const handleLinkClick = (href: string, isHash: boolean) => {
    if (isHash) {
      const hash = href.split('#')[1];
      if (pathname !== '/') {
        navigate('/');
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
    } else {
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      });

      tl.to('.footer-logo', { opacity: 1, y: 0, duration: 0.6 })
        .to('.footer-tagline', { opacity: 1, y: 0, duration: 0.4 }, '-=0.3')
        .to('.footer-desc', { opacity: 1, y: 0, duration: 0.4 }, '-=0.3')
        .to('.social-icon', { opacity: 1, scale: 1, duration: 0.4, stagger: 0.1 }, '-=0.2')
        .to('.footer-column', { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }, '-=0.4')
        .to('.footer-bottom', { opacity: 1, y: 0, duration: 0.6 }, '-=0.2');
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="relative bg-[var(--charcoal)] text-white overflow-hidden">
      {/* Wave Divider */}
      <div className="absolute top-0 left-0 right-0 -translate-y-[99%]">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          preserveAspectRatio="none"
        >
          <path
            ref={waveRef}
            d="M0 120L48 110C96 100 192 80 288 75C384 70 480 80 576 85C672 90 768 90 864 85C960 80 1056 70 1152 70C1248 70 1344 80 1392 85L1440 90V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z"
            fill="var(--charcoal)"
            stroke="var(--teal)"
            strokeWidth="2"
            strokeOpacity="0.3"
          />
        </svg>
      </div>

      <div ref={contentRef} className="relative z-10 pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <Link
                to="/"
                onClick={() => window.scrollTo(0, 0)}
                className="footer-logo flex items-center gap-3 mb-4 opacity-0 translate-y-4"
              >
                <div className="w-12 h-12 rounded-full overflow-hidden border border-[var(--teal)]/30 bg-white p-1">
                  <img src="/logo.png" alt="Khairi Shabazz Logo" className="w-full h-full object-contain" />
                </div>
                <div>
                  <p className="font-display font-semibold text-lg">KHAIRI SHABAZZ</p>
                  <p className="text-xs text-[var(--teal)] tracking-wider">CLOSE WITH KHAIRI</p>
                </div>
              </Link>
              <p className="footer-tagline text-[var(--teal)] font-medium mb-4 opacity-0 translate-y-4">
                Close With Khairi
              </p>
              <p className="footer-desc text-gray-400 text-sm leading-relaxed opacity-0 translate-y-4">
                Professional real estate services in Richmond, VA and surrounding areas. 
                Your trusted partner in buying and selling homes.
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-4 mt-6">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="social-icon w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-all duration-300 hover:bg-[var(--teal)] hover:scale-110 opacity-0 scale-90"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-column opacity-0 translate-y-4">
              <h4 className="font-display text-lg mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.href}
                      onClick={() => handleLinkClick(link.href, false)}
                      className="group flex items-center gap-2 text-gray-400 hover:text-[var(--teal)] transition-colors duration-200"
                    >
                      <link.icon className="w-4 h-4" />
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        {link.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Hash Links */}
            <div className="footer-column opacity-0 translate-y-4">
              <h4 className="font-display text-lg mb-6">Explore</h4>
              <ul className="space-y-3">
                {hashLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleLinkClick(link.href, true);
                      }}
                      className="group flex items-center gap-2 text-gray-400 hover:text-[var(--teal)] transition-colors duration-200"
                    >
                      <link.icon className="w-4 h-4" />
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        {link.name}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="footer-column opacity-0 translate-y-4">
              <h4 className="font-display text-lg mb-6">Connect</h4>
              <ul className="space-y-4">
                <li>
                  <a
                    href="tel:+18045140953"
                    className="group flex items-start gap-3 text-gray-400 hover:text-[var(--teal)] transition-colors duration-200"
                  >
                    <Phone className="w-5 h-5 mt-0.5" />
                    <span>(804) 514-0953</span>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:khairi.shabazz@exprealty.com"
                    className="group flex items-start gap-3 text-gray-400 hover:text-[var(--teal)] transition-colors duration-200"
                  >
                    <Mail className="w-5 h-5 mt-0.5" />
                    <span className="break-all">khairi.shabazz@exprealty.com</span>
                  </a>
                </li>
                <li className="flex items-start gap-3 text-gray-400">
                  <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span>10469 Atlee Station Rd, Ashland, VA 23005</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/10 pt-8">
            <div className="footer-bottom flex flex-col md:flex-row justify-between items-center gap-4 opacity-0 translate-y-4">
              <p className="text-gray-400 text-sm text-center md:text-left">
                © {new Date().getFullYear()} Khairi Shabazz. All rights reserved.
              </p>
              <div className="flex items-center gap-6 text-sm text-gray-400">
                <span>Licensed in Virginia</span>
                <span>•</span>
                <span>EXP Realty LLC</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 bg-[var(--teal)] text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:bg-[var(--teal-dark)] hover:scale-110 hover:shadow-xl z-50"
        aria-label="Back to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </footer>
  );
};

export default Footer;
