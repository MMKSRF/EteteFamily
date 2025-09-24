// src/pages/HomePage.jsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const heroRef = useRef(null);
  const particlesRef = useRef([]);
  const sectionRefs = useRef([]);

  // Complete family data structure
  const familyData = {
    founders: {
      grandmother: { name: "Etete", role: "Matriarch", emoji: "👑" },
      grandfather: { name: "Getachew", role: "Patriarch", emoji: "🌳" }
    },
    generations: [
      {
        title: "First Generation",
        couples: [
          { 
            parents: "Saron & Mule", 
            children: [],
            description: "Building their legacy together"
          },
          { 
            parents: "Mary & Tamerat", 
            children: ["Amni", "Joci", "Abeni", "Abigyiya", "Root"],
            description: "Growing family with five wonderful children"
          },
          { 
            parents: "Mekdes & Endale", 
            children: ["Daric", "Edna", "Perez", "Liora"],
            description: "Four amazing children continuing the tradition"
          },
          { 
            parents: "Mebakom & Feben", 
            children: [],
            description: "Writing their unique family story"
          },
          { 
            parents: "Temesgen & Lidya", 
            children: [],
            description: "Starting their journey together"
          }
        ]
      }
    ]
  };

  useEffect(() => {
    // Quantum particle system
    const createQuantumParticles = () => {
      const particles = [];
      const container = heroRef.current;
      
      for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 4 + 2;
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        particle.className = `absolute rounded-full quantum-particle`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.background = `radial-gradient(circle, ${color}, transparent)`;
        particle.style.boxShadow = `0 0 ${size * 2}px ${color}`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.opacity = '0';
        
        container.appendChild(particle);
        particles.push(particle);
      }
      return particles;
    };

    particlesRef.current = createQuantumParticles();

    // Animate particles in quantum field
    particlesRef.current.forEach((particle, i) => {
      const timeline = gsap.timeline({ repeat: -1, yoyo: true });
      
      timeline.to(particle, {
        opacity: Math.random() * 0.8 + 0.2,
        x: () => Math.random() * 100 - 50,
        y: () => Math.random() * 100 - 50,
        scale: () => Math.random() * 2 + 0.5,
        rotation: 360,
        duration: Math.random() * 4 + 3,
        ease: "sine.inOut",
        delay: i * 0.01
      });
    });

    // Hero section entrance animation
    const heroTl = gsap.timeline();
    
    heroTl.fromTo('.quantum-field', 
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0, ease: "power3.out" }
    )
    .fromTo('.founder-node',
      { 
        scale: 0, 
        rotationY: 180,
        filter: "blur(20px)"
      },
      { 
        scale: 1, 
        rotationY: 0,
        filter: "blur(0px)",
        duration: 0,
        stagger: 0.3,
        ease: "back.out(1.7)"
      },
      "-=1"
    )
    .fromTo('.hero-content > *',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power2.out" }
    );

    // Section animations as they come into view
    sectionRefs.current.forEach((section) => {
      if (section) {
        gsap.fromTo(section,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    });

    // Continuous floating animations
    gsap.to('.floating-orb', {
      y: 20,
      rotation: 360,
      duration:0.9,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: {
        amount: 3,
        from: "random"
      }
    });

    // Holographic pulse effect
    gsap.to('.holographic-pulse', {
      scale: 1.1,
      opacity: 0.8,
      duration: 0.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    return () => {
      heroTl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      particlesRef.current.forEach(particle => particle.remove());
    };
  }, []);

  // Function to add section refs
  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 overflow-hidden">
      {/* Quantum Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Quantum Field Background */}
        <div className="quantum-field absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(120,119,198,0.4),_transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_rgba(255,107,107,0.3),_transparent_50%)]"></div>
        </div>

        {/* Orbital Rings */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-96 h-96 border-2 border-cyan-400/20 rounded-full animate-spin-slow floating-orb"></div>
          <div className="w-64 h-64 border-2 border-purple-400/30 rounded-full animate-spin-slow reverse floating-orb"></div>
          <div className="w-32 h-32 border-2 border-pink-400/40 rounded-full animate-spin-slow floating-orb"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="hero-content text-center">
            
            {/* Quantum Header */}
            <div className="mb-12">
              <h1 className="text-5xl md:text-7xl font-bold my-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">
                  The {familyData.founders.grandfather.name} & {familyData.founders.grandmother.name} Legacy
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
                A quantum journey through generations of love, wisdom, and shared memories. 
                Where every connection tells a story and every name carries a legacy.
              </p>
            </div>

            {/* Founders Hologram */}
            <div className="relative mb-16">
              <div className="flex justify-center space-x-12 mb-8">
                {/* Etete - Matriarch */}
                <div className="founder-node relative group">
                  <div className="w-32 h-32 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-2xl border-4 border-white/20 transform group-hover:scale-110 transition-transform duration-300">
                    {familyData.founders.grandmother.name}
                  </div>
                  <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center">
                    <div className="text-cyan-300 font-semibold">Matriarch</div>
                    <div className="text-gray-300 text-sm">Foundation of Love</div>
                  </div>
                  <div className="holographic-pulse absolute inset-0 rounded-full bg-gradient-to-r from-pink-500/30 to-purple-600/30 blur-xl"></div>
                </div>

                {/* Getachew - Patriarch */}
                <div className="founder-node relative group">
                  <div className="w-32 h-32 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-2xl border-4 border-white/20 transform group-hover:scale-110 transition-transform duration-300">
                    {familyData.founders.grandfather.name}
                  </div>
                  <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center">
                    <div className="text-cyan-300 font-semibold">Patriarch</div>
                    <div className="text-gray-300 text-sm">Pillar of Strength</div>
                  </div>
                  <div className="holographic-pulse absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/30 to-blue-600/30 blur-xl"></div>
                </div>
              </div>

              {/* Union Symbol */}
              <div className="flex justify-center mb-12">
                <div className="relative">
                  <div className="w-1 h-20 bg-gradient-to-b from-cyan-400 to-purple-500 mx-auto"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl">
                    ❤️
                  </div>
                </div>
              </div>
            </div>

            {/* Generations Timeline */}
            <div className="max-w-6xl mx-auto mb-20">
              <h2 className="text-3xl md:text-4xl font-bold text-cyan-300 mb-8">
                The Next Generation
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {familyData.generations[0].couples.map((couple, index) => (
                  <div key={index} className="group">
                    <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-6 border border-white/10 hover:border-cyan-400/30 transition-all duration-300 transform hover:scale-105">
                      {/* Couple Header */}
                      <div className="text-center mb-4">
                        <h3 className="text-xl font-bold text-white mb-2">
                          {couple.parents}
                        </h3>
                        <p className="text-cyan-200 text-sm">{couple.description}</p>
                      </div>

                      {/* Children Grid */}
                      {couple.children.length > 0 && (
                        <div className="mt-4">
                          <div className="text-gray-400 text-sm mb-3">Children:</div>
                          <div className="grid grid-cols-2 gap-2">
                            {couple.children.map((child, childIndex) => (
                              <div 
                                key={childIndex}
                                className="bg-gradient-to-r from-green-400/20 to-blue-500/20 rounded-lg p-2 text-center text-white text-sm border border-green-400/30"
                              >
                                {child}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Growth Indicator */}
                      <div className="mt-4 text-center">
                        <div className="text-xs text-gray-400">
                          {couple.children.length > 0 
                            ? `✨ ${couple.children.length} Bright Stars` 
                            : "🌱 Future Generations Blooming"
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Family Statistics */}
            <div className="mt-8 bg-black/20 backdrop-blur-lg rounded-3xl p-8 border border-white/10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div className="text-cyan-300">
                  <div className="text-3xl font-bold">2</div>
                  <div className="text-sm text-gray-300">Founders</div>
                </div>
                <div className="text-purple-300">
                  <div className="text-3xl font-bold">5</div>
                  <div className="text-sm text-gray-300">Families</div>
                </div>
                <div className="text-pink-300">
                  <div className="text-3xl font-bold">9</div>
                  <div className="text-sm text-gray-300">Grandchildren</div>
                </div>
                <div className="text-green-300">
                  <div className="text-3xl font-bold">∞</div>
                  <div className="text-sm text-gray-300">Memories</div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="mt-16 flex flex-col sm:flex-row gap-6 justify-center my-20">
              <Link 
                to="/family-tree"
                className="group relative bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl transform hover:scale-110 transition-all duration-300"
              >
                <span className="relative z-10 flex items-center space-x-2 ">
                  <span>🌌</span>
                  <span>Explore Quantum Family Tree</span>
                </span>
              </Link>

              <Link 
                to="/about"
                className="group relative border-2 border-cyan-400/50 text-white px-8 py-4 rounded-2xl font-bold text-lg backdrop-blur-lg bg-white/5 hover:bg-cyan-500/20 transform hover:scale-110 transition-all duration-300"
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <span>📸</span>
                  <span>Family Memories</span>
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="floating-orb absolute top-20 left-5 text-6xl opacity-20">🧬</div>
        <div className="floating-orb absolute top-40 right-20 text-5xl opacity-30">⚛️</div>
        <div className="floating-orb absolute bottom-40 left-20 text-7xl opacity-15">🌠</div>
        <div className="floating-orb absolute bottom-20 right-10 text-6xl opacity-25">💫</div>
      </section>

      {/* Family Timeline Section */}
      <section ref={addToRefs} className="py-20 bg-gradient-to-b from-violet-900/50 to-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-cyan-300 mb-12">Family Timeline</h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-cyan-400 to-purple-500"></div>
              
              {/* Timeline Items */}
              {[
                { year: "1970", event: "Etete & Getachew's Journey Begins", emoji: "💑" },
                { year: "1990", event: "First Family Expansion", emoji: "👨‍👩‍👧‍👦" },
                { year: "2000", event: "Grandchildren Era Starts", emoji: "🌟" },
                { year: "2020", event: "Digital Family Legacy", emoji: "💻" },
                { year: "Future", event: "Generations to Come", emoji: "🚀" }
              ].map((item, index) => (
                <div key={index} className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className="w-1/2 pr-8 pl-8">
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-cyan-400/30 transition-all duration-300">
                      <div className="text-cyan-300 font-bold text-lg mb-2">{item.year}</div>
                      <div className="text-white">{item.event}</div>
                      <div className="text-2xl mt-2">{item.emoji}</div>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full border-4 border-gray-900"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Family Values Section */}
      <section ref={addToRefs} className="py-20 bg-gradient-to-b from-gray-900 to-purple-900/50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-cyan-300 mb-12">Our Family Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { icon: "❤️", title: "Love & Unity", description: "Bound together by unconditional love and support" },
              { icon: "🌱", title: "Growth", description: "Always learning, evolving, and growing together" },
              { icon: "📚", title: "Wisdom", description: "Passing down knowledge through generations" },
              { icon: "🎉", title: "Celebration", description: "Cherishing every moment and milestone" },
              { icon: "🤝", title: "Support", description: "Always there for each other, no matter what" },
              { icon: "✨", title: "Legacy", description: "Building a lasting impact for future generations" }
            ].map((value, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-lg rounded-3xl p-6 border border-white/10 hover:border-cyan-400/30 transition-all duration-300 transform hover:scale-105">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{value.title}</h3>
                <p className="text-gray-300">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;