import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Star, Home, Phone } from 'lucide-react';
import { isTouchDevice } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const trustBadgeRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const decorRef1 = useRef<HTMLDivElement>(null);
  const decorRef2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation timeline
      const entranceTl = gsap.timeline({ delay: 0.5 });

      // Decorative shapes
      entranceTl.fromTo(
        decorRef1.current,
        { scale: 0, rotation: -45 },
        { scale: 1, rotation: 0, duration: 1.2, ease: 'back.out(1.7)' },
        0.2
      );

      entranceTl.fromTo(
        decorRef2.current,
        { scale: 0, rotation: 45 },
        { scale: 1, rotation: 0, duration: 1.2, ease: 'back.out(1.7)' },
        0.4
      );

      // Hero image clip reveal
      entranceTl.fromTo(
        imageRef.current,
        { clipPath: 'inset(100% 0 0 0)', scale: 1.1 },
        { clipPath: 'inset(0% 0 0 0)', scale: 1, duration: 1.4, ease: 'power3.inOut' },
        0.3
      );

      // Headline word reveal
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.word');
        entranceTl.fromTo(
          words,
          { y: 60, opacity: 0, rotateX: 45 },
          { y: 0, opacity: 1, rotateX: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' },
          0.6
        );
      }

      // Subheadline
      entranceTl.fromTo(
        subheadlineRef.current,
        { opacity: 0, filter: 'blur(10px)' },
        { opacity: 1, filter: 'blur(0px)', duration: 0.7, ease: 'power2.out' },
        1.2
      );

      // CTA buttons
      if (ctaRef.current) {
        const buttons = ctaRef.current.querySelectorAll('button');
        entranceTl.fromTo(
          buttons,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.6, stagger: 0.15, ease: 'back.out(1.7)' },
          1.4
        );
      }

      // Trust badge
      entranceTl.fromTo(
        trustBadgeRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
        1.7
      );

      // Scroll-triggered parallax (disabled on touch for smoother mobile scroll)
      const scrollTriggers: ScrollTrigger[] = [];
      if (!isTouchDevice()) {
        scrollTriggers.push(
          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
            onUpdate: (self) => {
              const progress = self.progress;
              if (headlineRef.current) {
                gsap.set(headlineRef.current, {
                  y: -80 * progress,
                  opacity: 1 - progress * 0.7,
                });
              }
              if (subheadlineRef.current) {
                gsap.set(subheadlineRef.current, {
                  y: -120 * progress,
                  opacity: 1 - progress,
                });
              }
              if (imageRef.current) {
                gsap.set(imageRef.current, {
                  scale: 1 + 0.15 * progress,
                  y: -50 * progress,
                });
              }
              if (decorRef1.current) {
                gsap.set(decorRef1.current, {
                  x: -100 * progress,
                  y: -50 * progress,
                  rotation: 180 * progress,
                });
              }
              if (decorRef2.current) {
                gsap.set(decorRef2.current, {
                  x: 100 * progress,
                  y: 50 * progress,
                  rotation: -180 * progress,
                });
              }
            },
          })
        );
      }

      return () => {
        scrollTriggers.forEach((st) => st.kill());
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden gradient-hero"
    >
      {/* Decorative Elements */}
      <div
        ref={decorRef1}
        className="absolute top-20 right-[15%] w-40 h-40 rounded-full bg-[var(--teal)] opacity-10 float"
        style={{ mixBlendMode: 'multiply' }}
      />
      <div
        ref={decorRef2}
        className="absolute bottom-32 left-[10%] w-32 h-32 bg-[var(--teal)] opacity-10 float-delayed rotate-45"
        style={{ mixBlendMode: 'multiply' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center w-full">
          {/* Content */}
          <div className="order-2 lg:order-1 space-y-8">
            <div ref={headlineRef} className="space-y-2" style={{ perspective: '1000px' }}>
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-[var(--charcoal)] leading-tight">
                <span className="word inline-block">Your</span>{' '}
                <span className="word inline-block">Dream</span>{' '}
                <span className="word inline-block text-[var(--teal)]">Home</span>
              </h1>
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-[var(--charcoal)] leading-tight">
                <span className="word inline-block">Awaits</span>{' '}
                <span className="word inline-block">in</span>{' '}
                <span className="word inline-block">Richmond</span>
              </h1>
            </div>

            <p
              ref={subheadlineRef}
              className="text-lg sm:text-xl text-[var(--dark-gray)] max-w-lg leading-relaxed"
            >
              Professional real estate services with a personal touch. Let me guide you home 
              through every step of your buying or selling journey.
            </p>

            <div ref={ctaRef} className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollToSection('#services')}
                className="group flex items-center gap-3 px-8 py-4 bg-[var(--teal)] text-white font-medium rounded-lg transition-all duration-300 hover:bg-[var(--teal-dark)] hover:scale-105 hover:shadow-xl"
              >
                <Home className="w-5 h-5" />
                Explore Services
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => scrollToSection('#contact')}
                className="group flex items-center gap-3 px-8 py-4 border-2 border-[var(--teal)] text-[var(--teal)] font-medium rounded-lg transition-all duration-300 hover:bg-[var(--teal)] hover:text-white hover:scale-105"
              >
                <Phone className="w-5 h-5" />
                Contact Me
              </button>
            </div>

            <div
              ref={trustBadgeRef}
              className="flex items-center gap-4 pt-4"
            >
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-[var(--gold)] text-[var(--gold)] twinkle"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
              <div className="text-sm">
                <span className="font-semibold text-[var(--charcoal)]">5.0 Rating</span>
                <span className="text-[var(--dark-gray)]"> | Verified Clients</span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="order-1 lg:order-2 relative">
            <div
              ref={imageRef}
              className="relative rounded-2xl overflow-hidden shadow-2xl"
              style={{ perspective: '1000px' }}
            >
              <img
                src="/hero-house.jpg"
                alt="Beautiful Richmond Home"
                className="w-full h-[400px] lg:h-[550px] object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              
              {/* Floating info card */}
              <div className="absolute bottom-6 left-6 right-6 glass rounded-xl p-4 shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[var(--teal)]">
                    <img 
                      src="/khairi-shabazz-profile-image.jpeg" 
                      alt="Khairi Shabazz" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--charcoal)]">Khairi Shabazz</p>
                    <p className="text-sm text-[var(--dark-gray)]">Richmond Real Estate Expert</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative frame */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-[var(--teal)] rounded-2xl -z-10 opacity-30" />
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
