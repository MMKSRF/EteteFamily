// src/components/sections/Hero/HeroSection.jsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import FloatingElements from './FloatingElements';
import TypewriterText from './TypewriterText';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const familyTreeRef = useRef(null);
  const ctaRef = useRef(null);
  const particlesRef = useRef([]);

  const typewriterTexts = [
    "Welcome to the EtetFamily!",
    "Where Love Grows Forever 🌱",
    "Generations of Memories ✨",
    "Our Story Continues... 📖"
  ];

  useEffect(() => {
    const tl = gsap.timeline();

    // Main hero entrance sequence
    tl.fromTo(heroRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: "power2.out" }
    )
    .fromTo(contentRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, ease: "back.out(1.5)" }
    )
    .fromTo('.family-tree-node',
      { scale: 0, rotation: -180 },
      { 
        scale: 1, 
        rotation: 0, 
        duration: 1, 
        stagger: 0.2,
        ease: "elastic.out(1, 0.8)" 
      },
      "-=1"
    )
    .fromTo('.tree-connection',
      { scaleX: 0 },
      { 
        scaleX: 1, 
        duration: 0.8, 
        stagger: 0.1,
        ease: "power2.out" 
      }
    )
    .fromTo(ctaRef.current,
      { scale: 0, rotation: 360 },
      { 
        scale: 1, 
        rotation: 0, 
        duration: 1, 
        ease: "bounce.out" 
      }
    );

    // Floating particles creation and animation
    const createParticles = () => {
      const particles = [];
      for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute w-2 h-2 bg-yellow-400 rounded-full opacity-0';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        heroRef.current.appendChild(particle);
        particles.push(particle);
      }
      return particles;
    };

    particlesRef.current = createParticles();

    // Animate particles
    particlesRef.current.forEach((particle, i) => {
      gsap.to(particle, {
        opacity: 0.6,
        y: -100,
        x: Math.random() * 100 - 50,
        scale: Math.random() * 2 + 1,
        duration: Math.random() * 5 + 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.5
      });
    });

    // Parallax effect on scroll
    ScrollTrigger.create({
      trigger: heroRef.current,
      start: "top top",
      end: "bottom top",
      onUpdate: (self) => {
        gsap.to(contentRef.current, {
          y: self.progress * 100,
          ease: "none"
        });
        gsap.to('.family-tree-node', {
          y: self.progress * 50,
          stagger: 0.1,
          ease: "none"
        });
      }
    });

    // Continuous subtle animations
    gsap.to('.floating-element', {
      y: 10,
      rotation: 5,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    return () => {
      tl.kill();
      particlesRef.current.forEach(particle => particle.remove());
    };
  }, []);

  const familyMembers = [
    { name: "Grandpa", generation: 1, position: "top-20 left-1/2" },
    { name: "Grandma", generation: 1, position: "top-20 right-1/3" },
    { name: "Dad", generation: 2, position: "top-40 left-1/4" },
    { name: "Mom", generation: 2, position: "top-40 right-1/4" },
    { name: "You", generation: 3, position: "top-60 left-1/2" },
    { name: "Sis", generation: 3, position: "top-60 right-1/3" }
  ];

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900"
    >
      {/* Background Elements */}
      <FloatingElements />
      
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-transparent to-pink-600/20 animate-pulse"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div ref={contentRef} className="text-center">
          
          {/* Main Heading with Typewriter */}
          <div className="mb-8">
            <TypewriterText texts={typewriterTexts} speed={150} loop={true} />
          </div>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed">
            Discover our family's journey through generations of love, laughter, 
            and unforgettable memories. Every branch tells a story. Every leaf holds a dream.
          </p>

          {/* Interactive Family Tree Preview */}
          <div 
            ref={familyTreeRef}
            className="relative h-96 mb-12 mx-auto max-w-4xl"
          >
            {/* Tree Connections */}
            <div className="absolute inset-0 flex justify-center">
              <div className="tree-connection w-1 bg-gradient-to-b from-yellow-400 to-pink-500 h-full"></div>
            </div>

            {/* Family Members Nodes */}
            {familyMembers.map((member, index) => (
              <div
                key={index}
                className={`family-tree-node absolute transform -translate-x-1/2 -translate-y-1/2 ${member.position}`}
              >
                <div className="relative group cursor-pointer">
                  {/* Member Node */}
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm md:text-base shadow-2xl transform group-hover:scale-110 transition-transform duration-300">
                    {member.name.split(' ')[0]}
                  </div>
                  
                  {/* Connection Line */}
                  {member.generation > 1 && (
                    <div className={`tree-connection absolute w-1 h-20 bg-gradient-to-b from-yellow-400 to-pink-500 left-1/2 -top-20 transform -translate-x-1/2`}></div>
                  )}
                  
                  {/* Hover Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-black/80 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap">
                      {member.name} - Generation {member.generation}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action Buttons */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link 
              to="/family-tree"
              className="group relative overflow-hidden bg-gradient-to-r from-yellow-400 to-pink-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl transform hover:scale-110 transition-all duration-300"
            >
              <span className="relative z-10 flex items-center space-x-2">
                <span>🌳</span>
                <span>Explore Family Tree</span>
              </span>
              
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Floating elements on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-white rounded-full animate-ping"
                    style={{
                      left: `${20 + i * 30}%`,
                      top: '50%',
                      animationDelay: `${i * 0.2}s`
                    }}
                  />
                ))}
              </div>
            </Link>

            <Link 
              to="/about"
              className="group relative overflow-hidden border-2 border-white/50 text-white px-8 py-4 rounded-2xl font-bold text-lg backdrop-blur-sm hover:bg-white/20 transform hover:scale-110 transition-all duration-300"
            >
              <span className="relative z-10 flex items-center space-x-2">
                <span>📖</span>
                <span>Our Story</span>
              </span>
              
              {/* Shine effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            </Link>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="flex flex-col items-center space-y-2">
              <span className="text-white/70 text-sm">Scroll to Discover</span>
              <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-bounce"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating decorative elements */}
      <div className="floating-element absolute top-20 left-10 text-6xl opacity-20">❤️</div>
      <div className="floating-element absolute top-40 right-20 text-4xl opacity-30">✨</div>
      <div className="floating-element absolute bottom-20 left-20 text-5xl opacity-25">🌟</div>
      <div className="floating-element absolute bottom-40 right-10 text-3xl opacity-35">💫</div>
    </section>
  );
};

export default HeroSection;