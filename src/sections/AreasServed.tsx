import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Navigation } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const AreasServed = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<SVGSVGElement>(null);

  const areas = [
    { name: 'Chester', angle: -60, distance: 180 },
    { name: 'Chesterfield', angle: -30, distance: 200 },
    { name: 'Henrico', angle: 30, distance: 190 },
    { name: 'Midlothian', angle: 60, distance: 170 },
    { name: 'Ashland', angle: 120, distance: 210 },
    { name: 'Hanover', angle: 150, distance: 185 },
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

      // Map background
      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: mapRef.current,
          start: 'top 80%',
          onEnter: () => {
            gsap.fromTo(
              mapRef.current,
              { opacity: 0, scale: 1.1 },
              { opacity: 1, scale: 1, duration: 1, ease: 'power2.out' }
            );
          },
          once: true,
        })
      );

      // Central hub
      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: hubRef.current,
          start: 'top 80%',
          onEnter: () => {
            gsap.fromTo(
              hubRef.current,
              { scale: 0, opacity: 0 },
              { scale: 1, opacity: 1, duration: 0.7, ease: 'back.out(1.7)', delay: 0.5 }
            );
          },
          once: true,
        })
      );

      // Connecting lines
      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: linesRef.current,
          start: 'top 80%',
          onEnter: () => {
            if (linesRef.current) {
              const paths = linesRef.current.querySelectorAll('line');
              paths.forEach((path, i) => {
                const length = Math.sqrt(
                  Math.pow(parseFloat(path.getAttribute('x2') || '0') - parseFloat(path.getAttribute('x1') || '0'), 2) +
                  Math.pow(parseFloat(path.getAttribute('y2') || '0') - parseFloat(path.getAttribute('y1') || '0'), 2)
                );
                gsap.set(path, {
                  strokeDasharray: length,
                  strokeDashoffset: length,
                });
                gsap.to(path, {
                  strokeDashoffset: 0,
                  duration: 1.2,
                  ease: 'power2.out',
                  delay: 0.7 + i * 0.1,
                });
              });
            }
          },
          once: true,
        })
      );

      // Area badges
      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: badgesRef.current,
          start: 'top 80%',
          onEnter: () => {
            if (badgesRef.current) {
              const badges = badgesRef.current.querySelectorAll('.area-badge');
              gsap.fromTo(
                badges,
                { scale: 0, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.4, stagger: 0.1, ease: 'back.out(1.7)', delay: 0.9 }
              );
            }
          },
          once: true,
        })
      );

      // Parallax effect
      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            if (mapRef.current) {
              gsap.set(mapRef.current, { y: 30 - 60 * progress });
            }
          },
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
      id="areas"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Map Background */}
      <div
        ref={mapRef}
        className="absolute inset-0 opacity-0"
      >
        <img
          src="/areas-map.jpg"
          alt="Richmond Area Map"
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--teal)]/80 via-[var(--teal)]/70 to-[var(--teal)]/80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <span className="section-label text-white opacity-0">Areas Served</span>
          <h2 className="font-display text-4xl lg:text-5xl text-white mt-4 mb-4 opacity-0">
            Your Neighborhood <span className="text-[var(--teal-pale)]">Expert</span>
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto opacity-0">
            Deep local knowledge across Richmond and surrounding communities
          </p>
        </div>

        {/* Map Container */}
        <div className="relative h-[500px] lg:h-[600px]">
          {/* Central Hub - Richmond */}
          <div
            ref={hubRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 opacity-0"
          >
            <div className="relative">
              {/* Pulse rings */}
              <div className="absolute inset-0 rounded-full bg-white/20 animate-ping" style={{ animationDuration: '3s' }} />
              <div className="absolute inset-0 rounded-full bg-white/10 animate-ping" style={{ animationDuration: '3s', animationDelay: '1s' }} />
              
              {/* Main hub */}
              <div className="relative w-32 h-32 rounded-full bg-white shadow-2xl flex flex-col items-center justify-center pulse-glow">
                <Navigation className="w-8 h-8 text-[var(--teal)] mb-1" />
                <span className="font-display text-lg font-semibold text-[var(--charcoal)]">Richmond</span>
                <span className="text-xs text-[var(--dark-gray)]">VA</span>
              </div>
            </div>
          </div>

          {/* SVG Connecting Lines */}
          <svg
            ref={linesRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 800 600"
            preserveAspectRatio="xMidYMid meet"
          >
            {areas.map((area, index) => {
              const centerX = 400;
              const centerY = 300;
              const angleRad = (area.angle * Math.PI) / 180;
              const endX = centerX + Math.cos(angleRad) * area.distance * 0.8;
              const endY = centerY + Math.sin(angleRad) * area.distance * 0.8;

              return (
                <line
                  key={index}
                  x1={centerX}
                  y1={centerY}
                  x2={endX}
                  y2={endY}
                  stroke="white"
                  strokeWidth="2"
                  strokeOpacity="0.4"
                  strokeLinecap="round"
                />
              );
            })}
          </svg>

          {/* Area Badges */}
          <div ref={badgesRef} className="absolute inset-0">
            {areas.map((area, index) => {
              const angleRad = (area.angle * Math.PI) / 180;
              const x = 50 + (Math.cos(angleRad) * area.distance) / 4;
              const y = 50 + (Math.sin(angleRad) * area.distance) / 3;

              return (
                <div
                  key={index}
                  className="area-badge absolute transform -translate-x-1/2 -translate-y-1/2 opacity-0"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                  }}
                >
                  <div className="group flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 cursor-default">
                    <MapPin className="w-4 h-4 text-[var(--teal)]" />
                    <span className="font-medium text-[var(--charcoal)] text-sm whitespace-nowrap">
                      {area.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom text */}
        <div className="mt-12 text-center">
          <p className="text-white/80 text-lg">
            Serving the greater Richmond area with{' '}
            <span className="text-white font-semibold">local expertise</span> and{' '}
            <span className="text-white font-semibold">personalized service</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default AreasServed;
