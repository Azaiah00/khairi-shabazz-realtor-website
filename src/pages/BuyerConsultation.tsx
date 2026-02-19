import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { DollarSign, Home, Search, Target, TrendingUp, ShieldCheck, ArrowRight } from 'lucide-react';
import BuyerCalculators from '../components/BuyerCalculators';

const BuyerConsultation = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial state immediately to avoid flash
      gsap.set('.reveal', { opacity: 0, y: 50 });

      gsap.to('.reveal', {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          once: true,
        }
      });

      // Fallback: Ensure visibility if ScrollTrigger fails
      const timer = setTimeout(() => {
        const elements = document.querySelectorAll('.reveal');
        elements.forEach(el => {
          if (window.getComputedStyle(el).opacity === '0') {
            gsap.to(el, { opacity: 1, y: 0, duration: 0.5 });
          }
        });
      }, 1000);
      return () => clearTimeout(timer);
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-[var(--off-white)]">
      {/* Hero */}
      <section className="pt-28 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 bg-[var(--teal)] text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-block px-4 py-1 rounded-full bg-white/20 border border-white/30 text-white text-sm font-semibold tracking-widest uppercase mb-6 reveal">
            Buyer Consultation
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-8 reveal">
            Find Your Dream Home in <span className="text-[var(--charcoal)]">Richmond</span>
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-12 reveal leading-relaxed">
            Your journey to homeownership starts here. Get the tools, data, and expert guidance you need to win in today's Richmond market.
          </p>
          <div className="flex flex-wrap justify-center gap-6 reveal">
            <button onClick={() => document.getElementById('calculators')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 bg-[var(--charcoal)] text-white rounded-xl font-bold hover:bg-black transition-all shadow-xl">
              Explore Financial Tools
            </button>
            <button onClick={() => document.getElementById('process')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 bg-white text-[var(--teal)] rounded-xl font-bold hover:bg-gray-100 transition-all shadow-xl">
              The 4-Step Plan
            </button>
          </div>
        </div>
      </section>

      {/* Game Plan */}
      <section id="process" className="py-16 sm:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 reveal">
            <div className="section-label mb-4">The Strategy</div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-[var(--charcoal)]">
              Our 4-Step <span className="text-[var(--teal)]">Winning Plan</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Power Pre-Approval', desc: 'Get verified by top Richmond lenders to become a "cash-like" buyer.', icon: ShieldCheck },
              { title: 'Priority Access', desc: 'See off-market and coming-soon homes before they hit Zillow.', icon: Search },
              { title: 'Strategic Offer', desc: 'Craft terms that sellers love without overpaying.', icon: Target },
              { title: 'Smooth Closing', desc: 'We manage inspections, appraisals, and paperwork to the finish line.', icon: Home }
            ].map((step, i) => (
              <div key={i} className="p-8 rounded-3xl bg-[var(--off-white)] border border-gray-100 reveal">
                <div className="w-12 h-12 rounded-2xl bg-[var(--teal-pale)] flex items-center justify-center mb-6">
                  <step.icon className="text-[var(--teal)] w-6 h-6" />
                </div>
                <h4 className="font-display text-xl font-bold text-[var(--charcoal)] mb-4">{step.title}</h4>
                <p className="text-[var(--dark-gray)] text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculators */}
      <section id="calculators" className="py-16 sm:py-24 px-4 sm:px-6 bg-[var(--off-white)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 reveal">
            <div className="section-label mb-4">Financials</div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-[var(--charcoal)]">
              Know Your <span className="text-[var(--teal)]">Numbers</span>
            </h2>
          </div>
          <div className="reveal">
            <BuyerCalculators />
          </div>
        </div>
      </section>

      {/* Wealth Building */}
<section className="py-16 sm:py-24 px-4 sm:px-6 bg-[var(--charcoal)] text-white">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="reveal">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">
              Real Estate is <span className="text-[var(--teal)]">Wealth Building</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Buying a home isn't just about a place to live—it's your biggest investment. In Richmond, property values have consistently grown, helping homeowners build massive equity over time.
            </p>
            <div className="space-y-6">
              {[
                'Forced savings through mortgage principal paydown',
                'Tax benefits and appreciation potential',
                'Protection against rising Richmond rent prices',
                'A tangible asset for your family\'s future'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <TrendingUp className="text-[var(--teal)] w-6 h-6 flex-shrink-0" />
                  <span className="text-gray-200 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white/5 rounded-3xl p-12 border border-white/10 reveal">
            <div className="text-center">
              <DollarSign className="w-16 h-16 text-[var(--teal)] mx-auto mb-6" />
              <h3 className="text-3xl font-display font-bold mb-4 text-[var(--teal-light)]">Stop Paying Rent</h3>
              <p className="text-gray-400 mb-8">If you pay $2,000/month in rent, you're spending $24,000 a year with 0% return. Let's turn that into equity.</p>
              <button onClick={() => window.location.href = '/#contact'} className="w-full py-4 bg-[var(--teal)] text-white rounded-xl font-bold hover:bg-[var(--teal-dark)] transition-all">
                Start My Wealth Journey
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16 reveal">
            <h2 className="text-4xl font-display font-bold text-[var(--charcoal)] mb-4">Buyer FAQ</h2>
            <p className="text-[var(--dark-gray)]">Common questions about buying in Richmond.</p>
          </div>
          <div className="space-y-4 reveal">
            {[
              { q: 'How much do I need for a down payment?', a: 'While 20% is standard, many Richmond buyers qualify for programs with as little as 3% or even 0% down (VA loans).' },
              { q: 'What are closing costs for buyers?', a: 'Typically 2.5% to 3% of the purchase price. This covers lender fees, title insurance, and prepaids.' },
              { q: 'How long does the process take?', a: 'Once under contract, most Richmond homes close in 30 days. The search process can take anywhere from a week to several months.' }
            ].map((faq, i) => (
              <div key={i} className="p-6 rounded-2xl border border-gray-100 bg-[var(--off-white)]">
                <h4 className="font-bold text-[var(--charcoal)] mb-2">{faq.q}</h4>
                <p className="text-[var(--dark-gray)] text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Khairi */}
<section className="py-16 sm:py-24 px-4 sm:px-6 bg-white">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="reveal order-2 lg:order-1">
            <div className="section-label mb-4">Your Richmond Guide</div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-[var(--charcoal)] mb-6">
              Meet <span className="text-[var(--teal)]">Khairi Shabazz</span>
            </h2>
            <p className="text-[var(--dark-gray)] text-lg leading-relaxed mb-8">
              Finding the right home in Richmond requires more than just a search—it requires a strategy. I help my clients navigate the complexities of the local market with confidence and ease.
            </p>
            <p className="text-[var(--dark-gray)] text-lg leading-relaxed mb-8">
              Whether you're a first-time buyer or looking for your next investment, I'm here to ensure you win the home you want at the best possible terms. Let's find your dream home together.
            </p>
            <button onClick={() => window.location.href = '/#contact'} className="group inline-flex items-center gap-3 text-[var(--teal)] font-bold hover:underline">
              Start Your Home Search <ArrowRight size={20} className="transition-transform group-hover:translate-x-2" />
            </button>
          </div>
          <div className="reveal order-1 lg:order-2">
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl border-8 border-[var(--off-white)]">
                <img 
                  src="/khairi-shabazz-profile-image.jpeg" 
                  alt="Khairi Shabazz" 
                  className="w-full h-[500px] object-cover"
                />
              </div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-[var(--teal)] rounded-full -z-10 opacity-20" />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-[var(--charcoal)] text-white text-center">
        <div className="max-w-3xl mx-auto reveal">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">Ready to Find Your Home?</h2>
          <p className="text-xl text-gray-300 mb-12">Schedule a personalized consultation with Khairi to discuss your goals and start your Richmond home search.</p>
          <button onClick={() => window.location.href = '/#contact'} className="px-10 py-5 bg-[var(--teal)] text-white rounded-xl font-bold text-lg hover:bg-[var(--teal-dark)] transition-all shadow-2xl">
            Book My Consultation
          </button>
        </div>
      </section>
    </div>
  );
};

export default BuyerConsultation;
