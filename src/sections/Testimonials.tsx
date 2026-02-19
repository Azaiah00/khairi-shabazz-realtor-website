import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Quote, CheckCircle } from 'lucide-react';
import { isTouchDevice } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const quoteMarkRef = useRef<HTMLDivElement>(null);

  const testimonials = [
    {
      rating: 5,
      quote:
        "As a first time home buyer it was a daunting task to even start, but Khairi helped me from the very beginning. All the way from how to get started, setting up time with other resources to get me better informed and prepared for this journey. Then came the support throughout the rest of the way, suggesting strategies, meeting me at times that were convenient to me and answering every question I had. This made this whole endeavor relatively painless and I can now proudly say that I am a homeowner thanks to him!",
      author: 'Wilfredo',
      location: 'Richmond, VA',
      date: 'June 29, 2023',
      verified: true,
    },
    {
      rating: 5,
      quote:
        "I had the pleasure of working with Khairi as our realtor during our journey to finding and buying a brand new house. I cannot express how grateful we are for his exceptional service and dedication throughout the entire process. From the very beginning, Khairi guided us effortlessly through the home buying process, explaining every step in a way that was easy to understand. What truly set Khairi apart was his unwavering support, especially when we encountered uncertainty and panic. He went above and beyond by calling us, even at 8:00 pm at night, just to provide reassurance and put our minds at ease.",
      author: 'Anthony T. Hall',
      location: 'Richmond, VA',
      date: '2 years ago',
      verified: true,
    },
    {
      rating: 5,
      quote:
        "Khairi was a great listener and appeared to have my best interest at heart. He held our hands throughout the entire process. I felt like I was in good hands and that he could be trusted. I never felt alone during this process—he met the building reps and translated language terms I did not understand. I just felt like I had an advocate working in my best interest. We purchased a condo which we adore. Thanks Khairi.",
      author: 'Satisfied Homeowner',
      location: 'Richmond, VA',
      date: 'Verified Review',
      verified: true,
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

            if (label) {
              tl.fromTo(
                label,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }
              );
            }

            if (headline) {
              tl.fromTo(
                headline,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
                '-=0.3'
              );
            }

            if (subheadline) {
              tl.fromTo(
                subheadline,
                { opacity: 0, filter: 'blur(8px)' },
                { opacity: 1, filter: 'blur(0px)', duration: 0.5, ease: 'power2.out' },
                '-=0.3'
              );
            }
          },
          once: true,
        })
      );

      // Quote mark background
      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top 70%',
          onEnter: () => {
            gsap.fromTo(
              quoteMarkRef.current,
              { scale: 0.8, opacity: 0 },
              { scale: 1, opacity: 0.05, duration: 1, ease: 'power3.out' }
            );
          },
          once: true,
        })
      );

      // Cards stagger animation
      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: trackRef.current,
          start: 'top 80%',
          onEnter: () => {
            if (trackRef.current) {
              const cards = trackRef.current.querySelectorAll('.testimonial-card');
              gsap.fromTo(
                cards,
                { x: 100, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
              );
            }
          },
          once: true,
        })
      );

      // Quote mark parallax (disabled on touch for smoother mobile scroll)
      if (!isTouchDevice()) {
        scrollTriggers.push(
          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
            onUpdate: (self) => {
              if (quoteMarkRef.current) {
                gsap.set(quoteMarkRef.current, {
                  rotation: 15 * self.progress,
                  x: 20 * self.progress,
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

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[var(--off-white)] overflow-hidden"
    >
      {/* Large decorative quote mark */}
      <div
        ref={quoteMarkRef}
        className="absolute top-20 left-10 font-display text-[400px] leading-none text-[var(--teal)] opacity-0 pointer-events-none select-none"
        style={{ fontFamily: 'Georgia, serif' }}
      >
        "
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <span className="section-label opacity-0">Testimonials</span>
          <h2 className="font-display text-4xl lg:text-5xl text-[var(--charcoal)] mt-4 mb-4 opacity-0">
            What My <span className="text-[var(--teal)]">Clients Say</span>
          </h2>
          <p className="text-lg text-[var(--dark-gray)] max-w-2xl mx-auto opacity-0">
            Building relationships, one successful closing at a time
          </p>
        </div>

        {/* Testimonials Grid */}
        <div ref={trackRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="testimonial-card group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 opacity-0"
            >
              {/* Quote icon */}
              <div className="absolute top-6 right-6">
                <Quote className="w-10 h-10 text-[var(--teal-pale)]" />
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-[var(--gold)] text-[var(--gold)] twinkle"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>

              {/* Quote text */}
              <p className="text-[var(--charcoal)] leading-relaxed mb-8 line-clamp-6 group-hover:line-clamp-none transition-all duration-300">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                <div className="w-12 h-12 rounded-full bg-[var(--teal)] flex items-center justify-center">
                  <span className="text-white font-semibold">
                    {testimonial.author.charAt(0)}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-[var(--charcoal)]">{testimonial.author}</p>
                  <div className="flex items-center gap-2 text-sm text-[var(--dark-gray)]">
                    <span>{testimonial.location}</span>
                    <span>•</span>
                    <span>{testimonial.date}</span>
                  </div>
                </div>
                {testimonial.verified && (
                  <div className="flex items-center gap-1 text-[var(--teal)]">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-xs font-medium">Verified</span>
                  </div>
                )}
              </div>

              {/* Hover border glow */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[var(--teal)]/20 transition-colors duration-300 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="mt-16 flex flex-wrap justify-center items-center gap-8">
          <div className="flex items-center gap-3 px-6 py-3 bg-white rounded-full shadow-md">
            <div className="flex -space-x-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-[var(--teal)] border-2 border-white flex items-center justify-center"
                >
                  <span className="text-white text-xs font-semibold">{String.fromCharCode(65 + i)}</span>
                </div>
              ))}
            </div>
            <span className="text-sm text-[var(--dark-gray)]">
              <strong className="text-[var(--charcoal)]">50+</strong> Happy Clients
            </span>
          </div>

          <div className="flex items-center gap-3 px-6 py-3 bg-white rounded-full shadow-md">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[var(--gold)] text-[var(--gold)]" />
              ))}
            </div>
            <span className="text-sm text-[var(--dark-gray)]">
              <strong className="text-[var(--charcoal)]">5.0</strong> Average Rating
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
