// src/components/layout/Footer.jsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';

const Footer = () => {
  const footerRef = useRef(null);
  const heartsRef = useRef([]);

  useEffect(() => {
    // Footer entrance animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });

    tl.fromTo(footerRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    )
    .fromTo(".footer-item",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.5)" },
      "-=0.5"
    );

    // Floating hearts animation
    heartsRef.current.forEach((heart, i) => {
      gsap.to(heart, {
        y: -20,
        rotation: 10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.3
      });
    });

    // Background pulse effect
    gsap.to(footerRef.current, {
      backgroundPosition: "0% 50%",
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }, []);

  const quickLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'Our Story' },
    { path: '/family-tree', label: 'Family Tree' },
    { path: '/gallery', label: 'Gallery' }
  ];

  const socialLinks = [
    { platform: 'Facebook', icon: '📘', url: '#' },
    { platform: 'Instagram', icon: '📷', url: '#' },
    { platform: 'Family Chat', icon: '💬', url: '#' },
    { platform: 'Family Album', icon: '🖼️', url: '#' }
  ];

  return (
    <footer 
      ref={footerRef}
      className="relative bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 text-white overflow-hidden"
    >
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            ref={el => heartsRef.current[i] = el}
            className="absolute text-2xl opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 20 + 10}px`
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Family Brand Section */}
          <div className="footer-item text-center md:text-left">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent mb-4">
              EtetFamily
            </h3>
            <p className="text-gray-200 mb-4">
              Celebrating generations of love, laughter, and unforgettable memories. 
              Our family story continues to grow every day.
            </p>
            <div className="flex space-x-4 justify-center md:justify-start">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-xl hover:bg-white/30 hover:scale-110 transition-all duration-300"
                  title={social.platform}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-item text-center">
            <h4 className="text-xl font-semibold mb-4">Family Navigation</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path}
                    className="text-gray-200 hover:text-white hover:underline transition-all duration-300 hover:translate-x-2 block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Family Stats */}
          <div className="footer-item text-center md:text-right">
            <h4 className="text-xl font-semibold mb-4">Family Stats</h4>
            <div className="space-y-2 text-gray-200">
              <p>👨‍👩‍👧‍👦 4 Generations</p>
              <p>🎉 12 Family Members</p>
              <p>📅 Established 1950</p>
              <p>🌎 3 Countries</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p className="text-gray-200">
            Made with ❤️ for the EtetFamily • {new Date().getFullYear()}
          </p>
          <p className="text-gray-300 text-sm mt-2">
            Family isn't just an important thing. It's everything. 💫
          </p>
        </div>
      </div>

      {/* Animated Wave */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="relative w-full h-16"
        >
          <path 
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
            opacity=".25" 
            className="fill-current text-white/30"
          ></path>
          <path 
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
            opacity=".5" 
            className="fill-current text-white/20"
          ></path>
          <path 
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" 
            className="fill-current text-white/10"
          ></path>
        </svg>
      </div>
    </footer>
  );
};

export default Footer;