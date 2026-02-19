import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, MapPin, Shield, ArrowRight, CheckCircle } from 'lucide-react';
import { isTouchDevice } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const credentialsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<SVGRectElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTriggers: ScrollTrigger[] = [];

      // Section label animation
      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top 80%',
          onEnter: () => {
            gsap.fromTo(
              labelRef.current,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }
            );
          },
          once: true,
        })
      );

      // Headline word reveal
      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: headlineRef.current,
          start: 'top 80%',
          onEnter: () => {
            if (headlineRef.current) {
              const words = headlineRef.current.querySelectorAll('.word');
              gsap.fromTo(
                words,
                { y: 40, opacity: 0, rotateX: 30 },
                { y: 0, opacity: 1, rotateX: 0, duration: 0.6, stagger: 0.05, ease: 'power3.out', delay: 0.2 }
              );
            }
          },
          once: true,
        })
      );

      // Body paragraphs
      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: bodyRef.current,
          start: 'top 80%',
          onEnter: () => {
            if (bodyRef.current) {
              const paragraphs = bodyRef.current.querySelectorAll('p');
              gsap.fromTo(
                paragraphs,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power2.out', delay: 0.5 }
              );
            }
          },
          once: true,
        })
      );

      // Credentials stagger
      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: credentialsRef.current,
          start: 'top 85%',
          onEnter: () => {
            if (credentialsRef.current) {
              const items = credentialsRef.current.querySelectorAll('.credential-item');
              gsap.fromTo(
                items,
                { x: -20, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: 'power3.out', delay: 0.8 }
              );
            }
          },
          once: true,
        })
      );

      // CTA button
      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: ctaRef.current,
          start: 'top 90%',
          onEnter: () => {
            gsap.fromTo(
              ctaRef.current,
              { scale: 0.9, opacity: 0 },
              { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)', delay: 1 }
            );
          },
          once: true,
        })
      );

      // Image clip reveal
      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: imageRef.current,
          start: 'top 80%',
          onEnter: () => {
            gsap.fromTo(
              imageRef.current,
              { clipPath: 'inset(0 100% 0 0)' },
              { clipPath: 'inset(0 0% 0 0)', duration: 1, ease: 'power3.inOut', delay: 0.3 }
            );
          },
          once: true,
        })
      );

      // SVG frame draw
      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: imageRef.current,
          start: 'top 80%',
          onEnter: () => {
            if (frameRef.current) {
              const length = frameRef.current.getTotalLength();
              gsap.set(frameRef.current, {
                strokeDasharray: length,
                strokeDashoffset: length,
              });
              gsap.to(frameRef.current, {
                strokeDashoffset: 0,
                duration: 1.2,
                ease: 'power2.out',
                delay: 0.6,
              });
            }
          },
          once: true,
        })
      );

      // Parallax effect (disabled on touch for smoother mobile scroll)
      if (!isTouchDevice()) {
        scrollTriggers.push(
          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
            onUpdate: (self) => {
              const progress = self.progress;
              if (imageRef.current) {
                gsap.set(imageRef.current, { y: 50 - 100 * progress });
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

  const credentials = [
    { icon: Shield, text: 'Licensed in Virginia' },
    { icon: Award, text: 'Agent License #0225249963' },
    { icon: MapPin, text: 'EXP Realty LLC' },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-white overflow-hidden"
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle, var(--teal) 1px, transparent 1px)`,
          backgroundSize: '30px 30px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="relative order-2 lg:order-1 min-w-0">
            <div
              ref={imageRef}
              className="relative rounded-2xl overflow-hidden shadow-xl"
              style={{ clipPath: 'inset(0 100% 0 0)' }}
            >
              <img
                src="/khairi-shabazz-profile-image.jpeg"
                alt="Khairi Shabazz - Real Estate Agent"
                className="w-full h-[500px] lg:h-[600px] object-cover"
              />
              {/* Subtle overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--teal)]/10 to-transparent" />
            </div>

            {/* Decorative SVG frame */}
            <svg
              className="absolute -top-4 -left-4 w-[calc(100%+32px)] h-[calc(100%+32px)] pointer-events-none"
              viewBox="0 0 400 500"
              fill="none"
            >
              <rect
                ref={frameRef}
                x="2"
                y="2"
                width="396"
                height="496"
                rx="18"
                stroke="var(--teal)"
                strokeWidth="2"
                strokeOpacity="0.3"
                fill="none"
              />
            </svg>

            {/* Floating accent */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[var(--teal-pale)] rounded-full -z-10" />
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2 space-y-6">
            <span ref={labelRef} className="section-label opacity-0">
              About Me
            </span>

            <h2
              ref={headlineRef}
              className="font-display text-4xl lg:text-5xl text-[var(--charcoal)] leading-tight"
              style={{ perspective: '1000px' }}
            >
              <span className="word inline-block">Dedicated</span>{' '}
              <span className="word inline-block">to</span>{' '}
              <span className="word inline-block">Your</span>{' '}
              <span className="word inline-block text-[var(--teal)]">Real</span>{' '}
              <span className="word inline-block text-[var(--teal)]">Estate</span>{' '}
              <span className="word inline-block">Success</span>
            </h2>

            <div ref={bodyRef} className="space-y-4">
              <p className="text-lg text-[var(--dark-gray)] leading-relaxed opacity-0">
                I'm <strong className="text-[var(--charcoal)]">Khairi Shabazz</strong>, a licensed 
                realtor with 1st Class Real Estate Premier Homes in Richmond, VA. I provide home 
                buyers and sellers with professional, responsive, and attentive real estate services.
              </p>
              <p className="text-lg text-[var(--dark-gray)] leading-relaxed opacity-0">
                Want an agent who'll truly listen to what you want in a home? Need an agent who 
                can effectively market your property so it sells quickly and for top dollar? I'm 
                eager to help and would love to talk to you about your real estate goals.
              </p>
            </div>

            {/* Credentials */}
            <div ref={credentialsRef} className="space-y-3 pt-4">
              {credentials.map((cred, index) => (
                <div
                  key={index}
                  className="credential-item flex items-center gap-3 text-[var(--charcoal)] opacity-0"
                >
                  <cred.icon className="w-5 h-5 text-[var(--teal)]" />
                  <span className="font-medium">{cred.text}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <button
              ref={ctaRef}
              onClick={() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-[var(--teal)] text-white font-medium rounded-lg transition-all duration-300 hover:bg-[var(--teal-dark)] hover:scale-105 hover:shadow-lg mt-6 opacity-0"
            >
              <CheckCircle className="w-5 h-5" />
              Learn More About My Approach
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
