// src/components/sections/Contact/ContactSection.jsx
import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ContactForm from './ContactForm';
import FormSuccess from './FormSuccess';
import PrimaryButton from '../../ui/buttons/PrimaryButton';
import InfoCard from '../../ui/cards/InfoCard';
import { useScrollAnimation } from '../../animations/hooks/useScrollAnimation';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const [formState, setFormState] = useState('idle'); // 'idle', 'submitting', 'success'
  const [submittedData, setSubmittedData] = useState(null);
  const sectionRef = useRef(null);
  const headerRef = useScrollAnimation({ animation: 'fadeInDown', duration: 1.5 });
  const featuresRef = useScrollAnimation({ animation: 'fadeInUp', duration: 1, delay: 0.2 });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Floating background elements
    const floatingIcons = ['💌', '📮', '✉️', '📧', '💬', '📝'];
    floatingIcons.forEach((icon, i) => {
      const element = document.createElement('div');
      element.className = 'absolute text-4xl opacity-10 pointer-events-none';
      element.innerHTML = icon;
      element.style.left = `${Math.random() * 100}%`;
      element.style.top = `${Math.random() * 100}%`;
      section.appendChild(element);

      gsap.to(element, {
        y: -30,
        rotation: Math.random() * 360,
        duration: Math.random() * 10 + 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });
  }, []);

  const handleFormSubmit = async (formData) => {
    setFormState('submitting');
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmittedData(formData);
      setFormState('success');
      
      // Success animation
      gsap.to('.contact-content', {
        opacity: 0,
        y: -50,
        duration: 0.5,
        ease: "power2.in"
      });
    } catch (error) {
      setFormState('idle');
      // Handle error state here
    }
  };

  const handleResetForm = () => {
    setFormState('idle');
    setSubmittedData(null);
    
    // Reset animation
    gsap.fromTo('.contact-content',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    );
  };

  const handleCloseSuccess = () => {
    // Navigate to home or other page
    window.location.href = '/';
  };

  const contactMethods = [
    {
      icon: '👥',
      title: 'Family Network',
      description: 'Connect with relatives across generations and locations',
      color: 'purple'
    },
    {
      icon: '🌳',
      title: 'Tree Updates',
      description: 'Help keep our family tree accurate and complete',
      color: 'green'
    },
    {
      icon: '📸',
      title: 'Memory Sharing',
      description: 'Contribute photos and stories to our family archive',
      color: 'blue'
    },
    {
      icon: '🎉',
      title: 'Event Coordination',
      description: 'Plan and invite family to gatherings and celebrations',
      color: 'orange'
    }
  ];

  return (
    <div ref={sectionRef} className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 text-white overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div ref={headerRef} className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Family <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Connection</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 leading-relaxed">
              Stay connected with the EtetFamily across generations and continents. 
              Share your news, updates, and memories with your extended family.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <PrimaryButton 
                icon="💌" 
                onClick={() => document.getElementById('contact-form').scrollIntoView({ behavior: 'smooth' })}
              >
                Send a Message
              </PrimaryButton>
              <PrimaryButton 
                icon="👥" 
                variant="secondary"
                onClick={() => document.getElementById('contact-methods').scrollIntoView({ behavior: 'smooth' })}
              >
                Ways to Connect
              </PrimaryButton>
            </div>
          </div>
        </div>

        {/* Floating message icons */}
        <div className="absolute inset-0 overflow-hidden">
          {['💌', '📮', '✉️', '📧'].map((icon, i) => (
            <div
              key={i}
              className="absolute text-4xl opacity-20 animate-float"
              style={{
                left: `${10 + i * 25}%`,
                top: `${20 + (i % 2) * 40}%`,
                animationDelay: `${i * 2}s`
              }}
            >
              {icon}
            </div>
          ))}
        </div>
      </section>

      {/* Contact Methods */}
      <section id="contact-methods" className="py-20">
        <div className="container mx-auto px-6">
          <div ref={featuresRef} className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Ways to Connect
            </h2>
            <p className="text-xl text-gray-600">Multiple ways to stay in touch with the family</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactMethods.map((method, index) => (
              <InfoCard
                key={method.title}
                icon={method.icon}
                title={method.title}
                description={method.description}
                color={method.color}
                className="transform hover:scale-105 transition-transform duration-300"
              />
            ))}
          </div>

          {/* Family Communication Stats */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Family Communication Stats</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: '💌', label: 'Messages/Month', value: '127' },
                { icon: '👥', label: 'Active Members', value: '48' },
                { icon: '🌎', label: 'Countries', value: '6' },
                { icon: '📅', label: 'Years Connected', value: '70+' }
              ].map((stat, index) => (
                <div key={stat.label} className="text-center">
                  <div className="text-4xl mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold text-purple-600">{stat.value}</div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Send a Family Message
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Whether it's big news, family updates, or just saying hello, we'd love to hear from you!
            </p>
          </div>

          <div className="contact-content">
            {formState === 'success' ? (
              <FormSuccess
                formData={submittedData}
                onReset={handleResetForm}
                onClose={handleCloseSuccess}
              />
            ) : (
              <ContactForm
                onSubmit={handleFormSubmit}
                isLoading={formState === 'submitting'}
              />
            )}
          </div>

          {/* Additional Contact Information */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl">
              <div className="text-4xl mb-3">📞</div>
              <h3 className="font-bold text-gray-800 mb-2">Family Hotline</h3>
              <p className="text-gray-600">Emergency family communications</p>
              <div className="text-blue-600 font-semibold mt-2">+34 912 345 678</div>
            </div>
            
            <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl">
              <div className="text-4xl mb-3">👥</div>
              <h3 className="font-bold text-gray-800 mb-2">Family Group</h3>
              <p className="text-gray-600">Join our family WhatsApp group</p>
              <div className="text-green-600 font-semibold mt-2">EtetFamily Chat</div>
            </div>
            
            <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl">
              <div className="text-4xl mb-3">📧</div>
              <h3 className="font-bold text-gray-800 mb-2">Direct Email</h3>
              <p className="text-gray-600">For private communications</p>
              <div className="text-purple-600 font-semibold mt-2">family@etetfamily.com</div>
            </div>
          </div>
        </div>
      </section>

      {/* Family Promise */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-purple-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Our Family Promise</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
            "We commit to maintaining strong family bonds across distances and generations. 
            Every voice matters, every story is precious, and every connection strengthens our family tapestry."
          </p>
          
          <div className="flex justify-center space-x-4 text-2xl">
            {['❤️', '✨', '👨‍👩‍👧‍👦', '🌍', '💫'].map((icon, i) => (
              <div key={i} className="animate-bounce" style={{ animationDelay: `${i * 0.2}s` }}>
                {icon}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactSection;