// src/components/sections/About/FamilyValues.jsx
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScrollAnimation } from '../../animations/hooks/useScrollAnimation';
import InfoCard from '../../ui/cards/InfoCard';

gsap.registerPlugin(ScrollTrigger);

const FamilyValues = () => {
  const sectionRef = useRef(null);
  const titleRef = useScrollAnimation({ animation: 'fadeInDown', duration: 1.5 });
  const valuesRef = useRef([]);

  const familyValues = [
    {
      icon: "❤️",
      title: "Unconditional Love",
      description: "We support each other through all of life's challenges and celebrations, no matter the distance or circumstances.",
      color: "pink",
      principles: ["Support", "Empathy", "Care"]
    },
    {
      icon: "🤝",
      title: "Strong Unity",
      description: "Together we are stronger. Our family stands united through generations, cultures, and continents.",
      color: "blue",
      principles: ["Teamwork", "Cooperation", "Solidarity"]
    },
    {
      icon: "🎯",
      title: "Shared Dreams",
      description: "We believe in dreaming big and supporting each other's aspirations while building our collective future.",
      color: "purple",
      principles: ["Ambition", "Vision", "Growth"]
    },
    {
      icon: "📚",
      title: "Continuous Learning",
      description: "Every generation builds upon the knowledge of the last, creating an ever-growing legacy of wisdom.",
      color: "green",
      principles: ["Education", "Wisdom", "Progress"]
    },
    {
      icon: "🌍",
      title: "Global Perspective",
      description: "While rooted in tradition, we embrace diversity and welcome new perspectives from around the world.",
      color: "orange",
      principles: ["Diversity", "Adaptability", "Openness"]
    },
    {
      icon: "✨",
      title: "Enduring Legacy",
      description: "We honor our past while building a future that will inspire generations of EtetFamily members to come.",
      color: "yellow",
      principles: ["Heritage", "Innovation", "Sustainability"]
    }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Animate values cards with stagger
    gsap.fromTo(valuesRef.current,
      { opacity: 0, y: 100, scale: 0.8 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        stagger: 0.2,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          end: "bottom 30%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Floating background elements
    const floatingIcons = ['❤️', '✨', '🌟', '💫', '🎯', '🤝'];
    floatingIcons.forEach((icon, i) => {
      const element = document.createElement('div');
      element.className = 'absolute text-4xl md:text-6xl opacity-10 pointer-events-none';
      element.innerHTML = icon;
      element.style.left = `${10 + i * 15}%`;
      element.style.top = `${20 + (i % 3) * 25}%`;
      section.appendChild(element);

      gsap.to(element, {
        y: -30,
        rotation: 360,
        duration: Math.random() * 10 + 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });

    // Background gradient animation
    gsap.to(section, {
      backgroundPosition: '100% 50%',
      duration: 20,
      repeat: -1,
      yoyo: true,
      ease: "none"
    });
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 overflow-hidden"
      style={{ backgroundSize: '200% 200%' }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-200/30 via-transparent to-pink-200/30 animate-pulse"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Our Family Values
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            These core principles have guided the EtetFamily through generations, shaping our identity and strengthening our bonds.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {familyValues.map((value, index) => (
            <div
              key={value.title}
              ref={el => valuesRef.current[index] = el}
            >
              <InfoCard
                icon={value.icon}
                title={value.title}
                description={value.description}
                color={value.color}
                className="h-full transform hover:scale-105 transition-transform duration-300"
              >
                {/* Additional principles */}
                <div className="mt-4 pt-4 border-t border-gray-200/50">
                  <div className="flex flex-wrap gap-2">
                    {value.principles.map(principle => (
                      <span
                        key={principle}
                        className="px-3 py-1 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full text-sm text-gray-700 border"
                      >
                        {principle}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/10 opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              </InfoCard>
            </div>
          ))}
        </div>

        {/* Family Quote */}
        <div className="mt-16 text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 max-w-4xl mx-auto">
            <blockquote className="text-2xl md:text-3xl font-serif italic text-gray-800 mb-4">
              "Family is not an important thing. It's everything. Our love grows stronger with each generation, and our story is written in the hearts of those who came before and those who will follow."
            </blockquote>
            <cite className="text-lg text-gray-600 font-semibold">
              — EtetFamily Motto
            </cite>
            
            {/* Decorative elements */}
            <div className="flex justify-center space-x-4 mt-6">
              {['❤️', '✨', '🌟'].map(icon => (
                <div key={icon} className="text-2xl animate-bounce" style={{ animationDelay: `${Math.random()}s` }}>
                  {icon}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FamilyValues;