import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { BookOpen, FileText, MapPin, Calculator, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Resources = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial state immediately to avoid flash
      gsap.set('.reveal', { opacity: 0, y: 30 });

      gsap.to('.reveal', {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
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

  const guides = [
    { title: "Richmond Buyer's Guide", desc: "Everything you need to know about buying in the current market.", icon: BookOpen, link: "/buyer-consultation" },
    { title: "Home Seller's Roadmap", desc: "A step-by-step guide to preparing and selling your home.", icon: FileText, link: "/seller-consultation" },
    { title: "Neighborhood Insights", desc: "Deep dives into Richmond's most popular communities.", icon: MapPin, link: "/#areas" },
  ];

  const tools = [
    { title: "Net Sheet Calculator", desc: "Estimate your proceeds after all selling costs.", icon: Calculator, link: "/seller-consultation#calculator" },
    { title: "Mortgage Calculator", desc: "Calculate your monthly P&I payments.", icon: Calculator, link: "/buyer-consultation#calculators" },
  ];

  return (
    <div ref={containerRef} className="bg-[var(--off-white)] pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 reveal">
          <div className="section-label mb-4">Resources & Tools</div>
          <h1 className="text-5xl md:text-6xl font-display font-bold text-[var(--charcoal)] mb-6">
            Everything You Need to <span className="text-[var(--teal)]">Succeed</span>
          </h1>
          <p className="text-xl text-[var(--dark-gray)] max-w-2xl mx-auto">
            Free guides, calculators, and local insights to help you make informed real estate decisions in Richmond.
          </p>
        </div>

        {/* Guides Section */}
        <div className="mb-24">
          <h2 className="text-3xl font-display font-bold text-[var(--charcoal)] mb-10 reveal">Educational Guides</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {guides.map((guide, i) => (
              <Link key={i} to={guide.link} className="group p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all reveal">
                <div className="w-14 h-14 rounded-2xl bg-[var(--teal-pale)] flex items-center justify-center mb-6 group-hover:bg-[var(--teal)] transition-colors">
                  <guide.icon className="text-[var(--teal)] w-7 h-7 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-[var(--charcoal)] mb-3">{guide.title}</h3>
                <p className="text-[var(--dark-gray)] text-sm mb-6 leading-relaxed">{guide.desc}</p>
                <div className="flex items-center gap-2 text-[var(--teal)] font-bold text-sm">
                  Learn More <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Tools Section */}
        <div className="mb-24">
          <h2 className="text-3xl font-display font-bold text-[var(--charcoal)] mb-10 reveal">Real Estate Tools</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {tools.map((tool, i) => (
              <Link key={i} to={tool.link} className="group p-8 rounded-3xl bg-[var(--charcoal)] text-white hover:bg-black transition-all reveal">
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6 group-hover:bg-[var(--teal)] transition-colors">
                  <tool.icon className="text-[var(--teal-light)] w-7 h-7 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold mb-3">{tool.title}</h3>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">{tool.desc}</p>
                <div className="flex items-center gap-2 text-[var(--teal-light)] font-bold text-sm">
                  Open Tool <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Market Update CTA */}
        <div className="bg-gradient-to-br from-[var(--teal)] to-[var(--teal-dark)] rounded-[3rem] p-12 md:p-20 text-white text-center reveal overflow-hidden relative">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-white rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-black rounded-full blur-3xl" />
          </div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Get a Custom Market Report</h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10">
              Curious about what's happening in your specific neighborhood? I'll send you a detailed analysis of recent sales and trends.
            </p>
            <button onClick={() => window.location.href = '/#contact'} className="px-10 py-5 bg-white text-[var(--teal)] rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all shadow-2xl">
              Request My Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;
