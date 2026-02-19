import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Home, TrendingUp, MapPin, Check, Search, DollarSign, BarChart3, Building } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ServiceCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  features: string[];
  delay: number;
}

const ServiceCard = ({ icon: Icon, title, description, features, delay }: ServiceCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: cardRef.current,
        start: 'top 85%',
        onEnter: () => {
          gsap.fromTo(
            cardRef.current,
            { rotateY: -90, opacity: 0 },
            { rotateY: 0, opacity: 1, duration: 0.8, ease: 'back.out(1.7)', delay }
          );
        },
        once: true,
      });
    });

    return () => ctx.revert();
  }, [delay]);

  return (
    <div
      ref={cardRef}
      className="card-3d group relative bg-white rounded-2xl p-8 shadow-lg border border-gray-100 opacity-0"
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[var(--teal)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Icon */}
      <div className="relative mb-6">
        <div className="w-16 h-16 rounded-xl bg-[var(--teal-pale)] flex items-center justify-center transition-all duration-300 group-hover:bg-[var(--teal)] group-hover:scale-110">
          <Icon className="w-8 h-8 text-[var(--teal)] transition-colors duration-300 group-hover:text-white" />
        </div>
      </div>

      {/* Content */}
      <h3 className="relative font-display text-2xl text-[var(--charcoal)] mb-4">{title}</h3>
      <p className="relative text-[var(--dark-gray)] leading-relaxed mb-6">{description}</p>

      {/* Features */}
      <ul className="relative space-y-3">
        {features.map((feature, index) => (
          <li
            key={index}
            className="flex items-center gap-3 text-sm text-[var(--charcoal)] transition-transform duration-200 group-hover:translate-x-1"
            style={{ transitionDelay: `${index * 50}ms` }}
          >
            <div className="w-5 h-5 rounded-full bg-[var(--teal-pale)] flex items-center justify-center flex-shrink-0">
              <Check className="w-3 h-3 text-[var(--teal)]" />
            </div>
            {feature}
          </li>
        ))}
      </ul>

      {/* Border glow */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[var(--teal)]/20 transition-colors duration-300 pointer-events-none" />
    </div>
  );
};

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);

  const services = [
    {
      icon: Search,
      title: "Buyer's Agent",
      description:
        "Finding your perfect home is my priority. I'll guide you through every step—from mortgage pre-approval to closing day—with expert market knowledge and negotiation skills.",
      features: [
        'Personalized property searches',
        'Market analysis & pricing guidance',
        'Expert negotiation representation',
        'Closing coordination',
      ],
    },
    {
      icon: DollarSign,
      title: "Seller's Agent",
      description:
        "Maximize your home's value with strategic marketing and professional staging advice. I'll ensure your property stands out and sells for top dollar.",
      features: [
        'Comparative market analysis',
        'Professional marketing strategy',
        'Staging & presentation guidance',
        'Offer negotiation & management',
      ],
    },
    {
      icon: BarChart3,
      title: 'Market Expertise',
      description:
        'Richmond area specialist with deep knowledge of local neighborhoods, market trends, and investment opportunities. Make informed decisions with confidence.',
      features: [
        'Neighborhood insights',
        'Investment opportunity analysis',
        'Market trend forecasting',
        'Local school & amenity info',
      ],
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTriggers: ScrollTrigger[] = [];

      // Header animation
      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: headerRef.current,
          start: 'top 80%',
          onEnter: () => {
            if (!headerRef.current) return;
            const tl = gsap.timeline();

            const label = headerRef.current.querySelector('.section-label');
            const headline = headerRef.current.querySelector('h2');
            const subheadline = headerRef.current.querySelector('p');

            // Label
            if (label) {
              tl.fromTo(
                label,
                { opacity: 0, letterSpacing: '0.2em' },
                { opacity: 1, letterSpacing: '0.1em', duration: 0.5, ease: 'power3.out' }
              );
            }

            // Headline
            if (headline) {
              tl.fromTo(
                headline,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
                '-=0.3'
              );
            }

            // Subheadline
            if (subheadline) {
              tl.fromTo(
                subheadline,
                { opacity: 0, filter: 'blur(8px)' },
                { opacity: 1, filter: 'blur(0px)', duration: 0.6, ease: 'power2.out' },
                '-=0.4'
              );
            }
          },
          once: true,
        })
      );

      // SVG connecting line animation
      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top 60%',
          onEnter: () => {
            if (lineRef.current) {
              const length = lineRef.current.getTotalLength();
              gsap.set(lineRef.current, {
                strokeDasharray: length,
                strokeDashoffset: length,
              });
              gsap.to(lineRef.current, {
                strokeDashoffset: 0,
                duration: 1.5,
                ease: 'power2.out',
                delay: 1,
              });
            }
          },
          once: true,
        })
      );

      return () => {
        scrollTriggers.forEach((st) => st.kill());
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-gradient-to-b from-white to-[var(--teal-pale)]/30 overflow-hidden"
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(var(--teal) 1px, transparent 1px), linear-gradient(90deg, var(--teal) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <span className="section-label opacity-0">My Services</span>
          <h2 className="font-display text-4xl lg:text-5xl text-[var(--charcoal)] mt-4 mb-4 opacity-0">
            How I Can <span className="text-[var(--teal)]">Help You</span>
          </h2>
          <p className="text-lg text-[var(--dark-gray)] max-w-2xl mx-auto opacity-0">
            Comprehensive real estate services tailored to your unique needs
          </p>
        </div>

        {/* Services Grid */}
        <div className="relative grid md:grid-cols-2 lg:grid-cols-3 gap-8" style={{ perspective: '1200px' }}>
          {/* Connecting SVG line (visible on lg+) */}
          <svg
            className="hidden lg:block absolute top-1/2 left-0 w-full h-4 -translate-y-1/2 pointer-events-none"
            viewBox="0 0 1200 20"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              ref={lineRef}
              d="M0 10 Q 200 0, 400 10 T 800 10 T 1200 10"
              stroke="var(--teal)"
              strokeWidth="2"
              strokeOpacity="0.2"
              fill="none"
            />
          </svg>

          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              features={service.features}
              delay={0.5 + index * 0.15}
            />
          ))}
        </div>

        {/* Bottom stats */}
        <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Home, value: '50+', label: 'Happy Clients' },
            { icon: TrendingUp, value: '5.0', label: 'Star Rating' },
            { icon: MapPin, value: '6', label: 'Areas Served' },
            { icon: Building, value: '100%', label: 'Dedication' },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <stat.icon className="w-8 h-8 text-[var(--teal)] mx-auto mb-3" />
              <p className="font-display text-3xl text-[var(--charcoal)] mb-1">{stat.value}</p>
              <p className="text-sm text-[var(--dark-gray)]">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
