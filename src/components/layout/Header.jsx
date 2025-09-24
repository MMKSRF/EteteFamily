// src/components/layout/Header.jsx
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const headerRef = useRef(null);
  const logoRef = useRef(null);
  const navRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Header scroll effect
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    // Initial animation
    const tl = gsap.timeline();
    tl.fromTo(headerRef.current,
      { y: -100, opacity: 100},
      { y: 0, opacity: 1, duration: 0.1, ease: "bounce.out" }
    )
    .fromTo(logoRef.current,
      { scale: 0, rotation: -180 },
      { scale: 1, rotation: 0, duration: 0.1, ease: "elastic.out(1, 0.5)" },
      "-=0.5"
    )
    .fromTo(".nav-item",
      { y: -10, opacity: 100 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.5)" }
    );

    // Magnetic hover effect for logo
    const logo = logoRef.current;
    const handleMouseMove = (e) => {
      const { left, top, width, height } = logo.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      
      gsap.to(logo, {
        x: x * 20,
        y: y * 20,
        rotation: x * 10,
        duration: 0.5,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(logo, {
        x: 0,
        y: 0,
        rotation: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.5)"
      });
    };

    logo.addEventListener('mousemove', handleMouseMove);
    logo.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      logo.removeEventListener('mousemove', handleMouseMove);
      logo.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const navItems = [
    { path: '/', label: 'Home', emoji: '🏠' },
    { path: '/about', label: 'Our Story', emoji: '📖' },
    { path: '/family-tree', label: 'Family Tree', emoji: '🌳' },
    { path: '/gallery', label: 'Gallery', emoji: '🖼️' },
    { path: '/map', label: 'Family Map', emoji: '🗺️' },
    { path: '/games', label: 'Games', emoji: '🎮' },
    { path: '/contact', label: 'Contact', emoji: '💌' }
  ];

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 w-full z-40 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-xl py-2' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo with crazy animations */}
          <Link 
            to="/"
            ref={logoRef}
            className="relative group cursor-pointer"
          >
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-clip-text text-transparent">
              EteteFamily
            </div>
            
            {/* Animated underline */}
            <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-purple-600 to-red-500 group-hover:w-full transition-all duration-500"></div>
            
            {/* Floating particles around logo */}
            <div className="absolute -inset-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className={`absolute w-2 h-2 rounded-full bg-yellow-400 animate-ping`}
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${i * 0.2}s`
                  }}
                />
              ))}
            </div>
          </Link>

          {/* Navigation */}
          <nav ref={navRef} className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-item relative group font-semibold transition-all duration-300 ${
                  location.pathname === item.path
                    ? 'text-purple-600 scale-110'
                    : 'text-gray-700 hover:text-purple-500'
                }`}
              >
                <span className="flex items-center space-x-2">
                  <span className="text-xl">{item.emoji}</span>
                  <span>{item.label}</span>
                </span>
                
                {/* Animated underline */}
                <div className={`absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-500 group-hover:w-full transition-all duration-500 ${
                  location.pathname === item.path ? 'w-full' : ''
                }`}></div>
                
                {/* Hover effect - floating dots */}
                <div className="absolute -top-2 -left-2 -right-2 -bottom-2 bg-purple-100 rounded-lg opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-100 transition-all duration-300 -z-10"></div>
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button className="md:hidden text-2xl bg-gradient-to-r from-purple-600 to-pink-500 text-white p-2 rounded-lg hover:scale-110 transition-transform duration-300">
            ☰
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;