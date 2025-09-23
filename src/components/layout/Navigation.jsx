// src/components/layout/Navigation.jsx
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const overlayRef = useRef(null);
  const itemsRef = useRef([]);

  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', emoji: '🏠', color: 'from-red-400 to-orange-400' },
    { path: '/about', label: 'Our Story', emoji: '📖', color: 'from-orange-400 to-yellow-400' },
    { path: '/family-tree', label: 'Family Tree', emoji: '🌳', color: 'from-yellow-400 to-green-400' },
    { path: '/gallery', label: 'Gallery', emoji: '🖼️', color: 'from-green-400 to-blue-400' },
    { path: '/map', label: 'Family Map', emoji: '🗺️', color: 'from-blue-400 to-indigo-400' },
    { path: '/games', label: 'Games', emoji: '🎮', color: 'from-indigo-400 to-purple-400' },
    { path: '/contact', label: 'Contact', emoji: '💌', color: 'from-purple-400 to-pink-400' }
  ];

  useEffect(() => {
    if (isOpen) {
      // Open animation
      const tl = gsap.timeline();
      tl.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out"
      })
      .to(menuRef.current, {
        x: 0,
        duration: 0.5,
        ease: "back.out(1.5)"
      })
      .fromTo(itemsRef.current,
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.1,
          ease: "power2.out"
        }
      );
    } else {
      // Close animation
      const tl = gsap.timeline();
      tl.to(itemsRef.current, {
        x: 100,
        opacity: 0,
        duration: 0.3,
        stagger: 0.05,
        ease: "power2.in"
      })
      .to(menuRef.current, {
        x: '100%',
        duration: 0.4,
        ease: "power2.in"
      })
      .to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button 
        onClick={toggleMenu}
        className="md:hidden fixed top-6 right-6 z-50 text-2xl bg-gradient-to-r from-purple-600 to-pink-500 text-white w-12 h-12 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center"
      >
        {isOpen ? '✕' : '☰'}
      </button>

      {/* Overlay */}
      <div
        ref={overlayRef}
        onClick={closeMenu}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 opacity-0 pointer-events-none md:hidden"
        style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
      />

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className="fixed top-0 right-0 h-full w-80 bg-gradient-to-b from-purple-900 via-blue-900 to-indigo-900 z-40 transform translate-x-full shadow-2xl md:hidden"
      >
        <div className="p-8 h-full flex flex-col">
          {/* Menu Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">
              EtetFamily
            </h2>
            <p className="text-gray-300 mt-2">Family Navigation</p>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 space-y-4">
            {navItems.map((item, index) => (
              <Link
                key={item.path}
                to={item.path}
                ref={el => itemsRef.current[index] = el}
                onClick={closeMenu}
                className={`block p-4 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                  location.pathname === item.path
                    ? 'bg-white/20 scale-105'
                    : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`text-2xl p-3 rounded-full bg-gradient-to-r ${item.color}`}>
                    {item.emoji}
                  </div>
                  <span className="text-white font-semibold text-lg">
                    {item.label}
                  </span>
                </div>
                
                {/* Active indicator */}
                {location.pathname === item.path && (
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                  </div>
                )}
              </Link>
            ))}
          </nav>

          {/* Footer */}
          <div className="text-center text-gray-400 text-sm">
            <p>💖 EtetFamily Forever</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;