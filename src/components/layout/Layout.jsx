// src/components/layout/Layout.jsx
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Navigation from './Navigation';
import Footer from './Footer';
import Loader from './Loader';

const Layout = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [location]);


  const num = 3 
  // if (isLoading) {
  if (1 == num  && isLoading){
    return <Loader onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
      <Header />
      <Navigation />
      
      {/* Main Content */}
      <main className="pt-24 min-h-screen">
        {children}
      </main>
      
      <Footer />
    </div>
  );
};

export default Layout;