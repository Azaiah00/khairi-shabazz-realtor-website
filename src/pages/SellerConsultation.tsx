import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Camera, Layout, CheckCircle, DollarSign, TrendingUp, BarChart3, Clock, MessageCircle, ArrowRight } from 'lucide-react';
import VirtualStagingSlider from '../components/VirtualStagingSlider';
import NetSheetCalculator from '../components/NetSheetCalculator';
import ROICalculator from '../components/ROICalculator';
import SmartSellTimeline from '../components/SmartSellTimeline';

const SellerConsultation = () => {
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
      <section className="pt-32 pb-20 px-6 bg-[var(--charcoal)] text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full gradient-teal" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-block px-4 py-1 rounded-full bg-[var(--teal)]/20 border border-[var(--teal)]/30 text-[var(--teal-light)] text-sm font-semibold tracking-widest uppercase mb-6 reveal">
            Seller Consultation
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-8 reveal">
            Sell Your Richmond Home for <span className="text-[var(--teal)]">Top Dollar</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12 reveal leading-relaxed">
            A strategic, data-driven approach to selling real estate in the Richmond area. 
            Leverage professional marketing, virtual staging, and expert negotiation to maximize your equity.
          </p>
          <div className="flex flex-wrap justify-center gap-6 reveal">
            <button onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 bg-[var(--teal)] text-white rounded-xl font-bold hover:bg-[var(--teal-dark)] transition-all shadow-xl hover:shadow-[var(--teal)]/20">
              Calculate Net Proceeds
            </button>
            <button onClick={() => document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 bg-white/10 text-white border border-white/20 rounded-xl font-bold hover:bg-white/20 transition-all backdrop-blur-sm">
              View Selling Roadmap
            </button>
          </div>
        </div>
      </section>

      {/* Virtual Staging */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          <div className="reveal">
            <div className="section-label mb-4">Marketing Mastery</div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-[var(--charcoal)] mb-6">
              The Virtual Staging <span className="text-[var(--teal)]">Advantage</span>
            </h2>
            <p className="text-[var(--dark-gray)] text-lg leading-relaxed mb-8">
              Empty rooms can feel cold and small. Our high-end virtual staging transforms vacant spaces into inviting homes that buyers can actually envision themselves living in. 
              <strong> Included with every listing.</strong>
            </p>
            <ul className="space-y-4">
              {[
                'Attract 85% more online clicks',
                'Sell up to 30% faster than vacant homes',
                'Showcase multiple design possibilities',
                'Maximize perceived square footage'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-[var(--charcoal)] font-medium">
                  <CheckCircle className="text-[var(--teal)] w-5 h-5" /> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="reveal">
            <VirtualStagingSlider />
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section id="timeline" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 reveal">
            <div className="section-label mb-4">The Process</div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-[var(--charcoal)]">
              Your Smart-Sell <span className="text-[var(--teal)]">Roadmap</span>
            </h2>
          </div>
          <div className="reveal">
            <SmartSellTimeline />
          </div>
        </div>
      </section>

      {/* Calculators */}
      <section id="calculator" className="py-24 px-6 bg-[var(--off-white)]">
        <div className="max-w-7xl mx-auto space-y-24">
          <div className="reveal">
            <NetSheetCalculator />
          </div>
          <div className="reveal">
            <ROICalculator />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16 reveal">
            <h2 className="text-4xl font-display font-bold text-[var(--charcoal)] mb-4">Seller FAQ</h2>
            <p className="text-[var(--dark-gray)]">Common questions about selling in Richmond.</p>
          </div>
          <div className="space-y-4 reveal">
            {[
              { q: 'How long does it take to sell a home in Richmond?', a: 'Typically 21-45 days from listing to closing, depending on the neighborhood and pricing strategy.' },
              { q: 'What repairs should I make before listing?', a: 'Focus on high-ROI items like interior paint, landscaping, and minor flooring repairs. Use our ROI calculator above for specifics.' },
              { q: 'Is virtual staging really effective?', a: 'Yes! Most buyers start their search online. High-quality staged photos are the #1 factor in getting buyers through your front door.' }
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
      <section className="py-24 px-6 bg-[var(--teal-pale)]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="reveal order-2 lg:order-1">
            <div className="section-label mb-4">Your Richmond Expert</div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-[var(--charcoal)] mb-6">
              Meet <span className="text-[var(--teal)]">Khairi Shabazz</span>
            </h2>
            <p className="text-[var(--dark-gray)] text-lg leading-relaxed mb-8">
              Selling a home is one of the most significant financial transactions you'll ever make. You deserve an agent who combines local Richmond expertise with a modern, data-driven marketing strategy. 
            </p>
            <p className="text-[var(--dark-gray)] text-lg leading-relaxed mb-8">
              My goal is simple: to make the process as smooth as possible while putting the most money in your pocket. From our initial strategy session to the final closing, I'm your advocate every step of the way.
            </p>
            <button onClick={() => window.location.href = '/#contact'} className="group inline-flex items-center gap-3 text-[var(--teal)] font-bold hover:underline">
              Start Your Selling Journey <ArrowRight size={20} className="transition-transform group-hover:translate-x-2" />
            </button>
          </div>
          <div className="reveal order-1 lg:order-2">
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
                <img 
                  src="/khairi-shabazz-profile-image.jpeg" 
                  alt="Khairi Shabazz" 
                  className="w-full h-[500px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[var(--teal)] rounded-full -z-10 opacity-20" />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 bg-[var(--charcoal)] text-white text-center">
        <div className="max-w-3xl mx-auto reveal">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">Ready to Maximize Your Equity?</h2>
          <p className="text-xl text-gray-300 mb-12">Schedule a personalized consultation with Khairi to discuss your home's unique value and our winning marketing plan.</p>
          <button onClick={() => window.location.href = '/#contact'} className="px-10 py-5 bg-[var(--teal)] text-white rounded-xl font-bold text-lg hover:bg-[var(--teal-dark)] transition-all shadow-2xl">
            Book My Consultation
          </button>
        </div>
      </section>
    </div>
  );
};

export default SellerConsultation;
