import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, Mail, MapPin, Send, CheckCircle, ArrowRight, Building2, Shield } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { isTouchDevice } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const contactInfo = [
    {
      icon: Phone,
      label: "Let's Talk Real Estate",
      value: '+1 804-514-0953',
      href: 'tel:+18045140953',
    },
    {
      icon: Mail,
      label: 'Inquire About My Services',
      value: 'khairi.shabazz@exprealty.com',
      href: 'mailto:khairi.shabazz@exprealty.com',
    },
    {
      icon: MapPin,
      label: 'Office Location',
      value: '10469 Atlee Station Rd, Ashland, VA 23005',
      href: '#',
    },
  ];

  const credentials = [
    { icon: Building2, text: 'EXP Realty LLC' },
    { icon: Shield, text: 'Agent License #0225249963' },
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
            gsap.fromTo(
              headerRef.current,
              { y: 30, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
            );
          },
          once: true,
        })
      );

      // Contact info cards
      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: infoRef.current,
          start: 'top 80%',
          onEnter: () => {
            if (infoRef.current) {
              const cards = infoRef.current.querySelectorAll('.info-card');
              gsap.fromTo(
                cards,
                { x: -40, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power3.out', delay: 0.2 }
              );
            }
          },
          once: true,
        })
      );

      // Form animation
      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: formRef.current,
          start: 'top 80%',
          onEnter: () => {
            gsap.fromTo(
              formRef.current,
              { x: 40, opacity: 0 },
              { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.3 }
            );

            if (formRef.current) {
              const fields = formRef.current.querySelectorAll('.form-field');
              gsap.fromTo(
                fields,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: 'power2.out', delay: 0.5 }
              );
            }
          },
          once: true,
        })
      );

      // Parallax (disabled on touch for smoother mobile scroll)
      if (!isTouchDevice()) {
        scrollTriggers.push(
          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
            onUpdate: (self) => {
              const progress = self.progress;
              if (infoRef.current) {
                gsap.set(infoRef.current, { y: 20 - 40 * progress });
              }
              if (formRef.current) {
                gsap.set(formRef.current, { y: -15 + 30 * progress });
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setShowSuccess(true);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-gradient-to-b from-[var(--off-white)] to-white overflow-hidden"
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle, var(--teal) 2px, transparent 2px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 opacity-0">
          <span className="section-label">Get In Touch</span>
          <h2 className="font-display text-4xl lg:text-5xl text-[var(--charcoal)] mt-4 mb-4">
            Let's Talk <span className="text-[var(--teal)]">Real Estate</span>
          </h2>
          <p className="text-lg text-[var(--dark-gray)] max-w-2xl mx-auto">
            Ready to take the next step? I'm here to help you navigate your real estate journey.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Contact Info */}
          <div ref={infoRef} className="lg:col-span-2 space-y-6">
            {contactInfo.map((info, index) => (
              <a
                key={index}
                href={info.href}
                className="info-card group block p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 opacity-0"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[var(--teal-pale)] flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-[var(--teal)]">
                    <info.icon className="w-6 h-6 text-[var(--teal)] transition-colors duration-300 group-hover:text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-[var(--dark-gray)] mb-1">{info.label}</p>
                    <p className="font-semibold text-[var(--charcoal)] group-hover:text-[var(--teal)] transition-colors">
                      {info.value}
                    </p>
                  </div>
                </div>
              </a>
            ))}

            {/* Credentials */}
            <div className="pt-6 space-y-3">
              {credentials.map((cred, index) => (
                <div
                  key={index}
                  className="info-card flex items-center gap-3 text-[var(--charcoal)] opacity-0"
                >
                  <cred.icon className="w-5 h-5 text-[var(--teal)]" />
                  <span className="font-medium">{cred.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="lg:col-span-3 p-8 bg-white rounded-2xl shadow-xl opacity-0"
          >
            <div className="grid sm:grid-cols-2 gap-6">
              {/* Name */}
              <div className="form-field relative opacity-0">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder=" "
                  required
                  className="peer w-full px-4 py-4 border-2 border-gray-200 rounded-lg focus:border-[var(--teal)] focus:outline-none transition-colors bg-transparent"
                />
                <label className="absolute left-4 top-4 text-[var(--dark-gray)] transition-all duration-200 pointer-events-none
                  peer-focus:-translate-y-7 peer-focus:scale-85 peer-focus:text-[var(--teal)] peer-focus:bg-white peer-focus:px-1
                  peer-[:not(:placeholder-shown)]:-translate-y-7 peer-[:not(:placeholder-shown)]:scale-85 peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-1">
                  Your Name
                </label>
              </div>

              {/* Email */}
              <div className="form-field relative opacity-0">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder=" "
                  required
                  className="peer w-full px-4 py-4 border-2 border-gray-200 rounded-lg focus:border-[var(--teal)] focus:outline-none transition-colors bg-transparent"
                />
                <label className="absolute left-4 top-4 text-[var(--dark-gray)] transition-all duration-200 pointer-events-none
                  peer-focus:-translate-y-7 peer-focus:scale-85 peer-focus:text-[var(--teal)] peer-focus:bg-white peer-focus:px-1
                  peer-[:not(:placeholder-shown)]:-translate-y-7 peer-[:not(:placeholder-shown)]:scale-85 peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-1">
                  Your Email
                </label>
              </div>

              {/* Phone */}
              <div className="form-field relative opacity-0">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder=" "
                  className="peer w-full px-4 py-4 border-2 border-gray-200 rounded-lg focus:border-[var(--teal)] focus:outline-none transition-colors bg-transparent"
                />
                <label className="absolute left-4 top-4 text-[var(--dark-gray)] transition-all duration-200 pointer-events-none
                  peer-focus:-translate-y-7 peer-focus:scale-85 peer-focus:text-[var(--teal)] peer-focus:bg-white peer-focus:px-1
                  peer-[:not(:placeholder-shown)]:-translate-y-7 peer-[:not(:placeholder-shown)]:scale-85 peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-1">
                  Your Phone
                </label>
              </div>

              {/* Subject */}
              <div className="form-field relative opacity-0">
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="peer w-full px-4 py-4 border-2 border-gray-200 rounded-lg focus:border-[var(--teal)] focus:outline-none transition-colors bg-transparent appearance-none"
                >
                  <option value="">I'm interested in...</option>
                  <option value="buying">Buying a home</option>
                  <option value="selling">Selling a home</option>
                  <option value="general">General inquiry</option>
                </select>
                <ArrowRight className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--dark-gray)] pointer-events-none rotate-90" />
              </div>

              {/* Message */}
              <div className="form-field relative sm:col-span-2 opacity-0">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder=" "
                  rows={5}
                  required
                  className="peer w-full px-4 py-4 border-2 border-gray-200 rounded-lg focus:border-[var(--teal)] focus:outline-none transition-colors bg-transparent resize-none"
                />
                <label className="absolute left-4 top-4 text-[var(--dark-gray)] transition-all duration-200 pointer-events-none
                  peer-focus:-translate-y-7 peer-focus:scale-85 peer-focus:text-[var(--teal)] peer-focus:bg-white peer-focus:px-1
                  peer-[:not(:placeholder-shown)]:-translate-y-7 peer-[:not(:placeholder-shown)]:scale-85 peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-1">
                  Tell me about your real estate goals...
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="form-field group w-full mt-8 flex items-center justify-center gap-3 px-8 py-4 bg-[var(--teal)] text-white font-medium rounded-lg transition-all duration-300 hover:bg-[var(--teal-dark)] hover:scale-[1.02] hover:shadow-xl opacity-0"
            >
              <Send className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-[var(--teal-pale)] flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-[var(--teal)]" />
            </div>
            <DialogTitle className="font-display text-2xl text-[var(--charcoal)]">
              Message Sent!
            </DialogTitle>
            <DialogDescription className="text-[var(--dark-gray)]">
              Thank you for reaching out. I'll get back to you within 24 hours.
            </DialogDescription>
          </DialogHeader>
          <button
            onClick={() => setShowSuccess(false)}
            className="w-full mt-4 px-6 py-3 bg-[var(--teal)] text-white font-medium rounded-lg transition-all duration-300 hover:bg-[var(--teal-dark)]"
          >
            Send Another Message
          </button>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Contact;
