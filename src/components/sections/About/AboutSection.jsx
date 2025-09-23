// src/components/sections/About/AboutSection.jsx
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScrollAnimation } from '../../animations/hooks/useScrollAnimation';
import PrimaryButton from '../../ui/buttons/PrimaryButton';
import Timeline from './Timeline/Timeline';
import FamilyValues from './FamilyValues';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef(null);
  const heroRef = useScrollAnimation({ animation: 'fadeInUp', duration: 2 });
  const contentRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Parallax effect for background
    gsap.to(section, {
      backgroundPosition: '50% 100%',
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    // Animate image on scroll
    gsap.fromTo(imageRef.current,
      { scale: 1.2, rotation: -5 },
      {
        scale: 1,
        rotation: 0,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Floating elements in hero
    const floatingElements = [];
    for (let i = 0; i < 6; i++) {
      const element = document.createElement('div');
      element.className = 'absolute text-3xl opacity-20 pointer-events-none';
      element.innerHTML = ['❤️', '✨', '🌟', '👨‍👩‍👧‍👦', '🏠', '💖'][i];
      element.style.left = `${Math.random() * 100}%`;
      element.style.top = `${Math.random() * 100}%`;
      section.querySelector('.hero-section')?.appendChild(element);
      floatingElements.push(element);

      gsap.to(element, {
        y: -20,
        x: Math.random() * 40 - 20,
        rotation: Math.random() * 360,
        duration: Math.random() * 8 + 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }

    return () => {
      floatingElements.forEach(el => el.remove());
    };
  }, []);

  return (
    <div ref={sectionRef} className="relative">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="hero-section relative min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 overflow-hidden"
        style={{ backgroundSize: 'cover' }}
      >
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div ref={contentRef} className="text-white">
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                The <span className="bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">EtetFamily</span> Story
              </h1>
              
              <p className="text-xl md:text-2xl mb-8 leading-relaxed opacity-90">
                For over 70 years, our family has woven a tapestry of love, resilience, and shared dreams. 
                From our humble beginnings to our global presence, every generation has added its unique thread to our beautiful story.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3 text-lg">
                  <span className="text-2xl">👥</span>
                  <span>4 Generations Strong</span>
                </div>
                <div className="flex items-center space-x-3 text-lg">
                  <span className="text-2xl">🌎</span>
                  <span>Connecting Families Worldwide</span>
                </div>
                <div className="flex items-center space-x-3 text-lg">
                  <span className="text-2xl">💫</span>
                  <span>Building Legacies Since 1950</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <PrimaryButton icon="📖" onClick={() => document.getElementById('timeline').scrollIntoView({ behavior: 'smooth' })}>
                  Explore Our Timeline
                </PrimaryButton>
                <PrimaryButton icon="❤️" variant="secondary" onClick={() => document.getElementById('values').scrollIntoView({ behavior: 'smooth' })}>
                  Our Values
                </PrimaryButton>
              </div>
            </div>

            {/* Family Image */}
            <div className="relative">
              <img
                ref={imageRef}
                src="/images/about/family-hero.jpg"
                alt="EtetFamily Generations"
                className="rounded-3xl shadow-2xl border-4 border-white/20 transform hover:scale-105 transition-transform duration-500"
              />
              
              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-pink-500 text-white px-4 py-2 rounded-full font-bold shadow-2xl transform rotate-12">
                Since 1950
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-full font-bold shadow-2xl transform -rotate-6">
                4 Generations
              </div>

              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-pink-500/20 rounded-3xl blur-xl -z-10"></div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="text-white text-center">
            <span className="block mb-2">Scroll to Discover</span>
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="timeline">
        <Timeline />
      </section>

      {/* Family Values Section */}
      <section id="values">
        <FamilyValues />
      </section>

      {/* Call to Action */}
      <section className="relative py-20 bg-gradient-to-br from-gray-900 to-purple-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Become Part of Our Story
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            The EtetFamily story is still being written. Join us as we continue to build memories, 
            celebrate milestones, and create a legacy that will inspire generations to come.
          </p>
          <PrimaryButton icon="💌" size="lg" onClick={() => window.location.href = '/contact'}>
            Connect With Our Family
          </PrimaryButton>
        </div>

        {/* Floating hearts */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute text-2xl opacity-20 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 2}s`
              }}
            >
              ❤️
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutSection;