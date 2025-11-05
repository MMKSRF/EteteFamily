// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HeroSection from './components/sections/Hero/HeroSection';
import AboutSection from './components/sections/About/AboutSection';
import FamilyTreeSection from './components/sections/FamilyTree/FamilyTreeSection';
import GallerySection from './components/sections/Gallery/GallerySection';
import ContactSection from './components/sections/Contact/ContactSection';
import SignInPage from './components/signin'; // 👈 import your page here

function App() {
  const user = JSON.parse(localStorage.getItem('familyUser'));
  console.log("App loaded with user: ", user);

  function handleLogout() {
    localStorage.removeItem('familyUser');
    window.location.reload();
  }

  return (
    <Router>
      {/* If no user, show only SignInPage */}
      {!user ? (
        <SignInPage />
      ) : (
        <Layout>
          <Routes>
            <Route path="/" element={<HeroSection />} />
            <Route path="/about" element={<AboutSection />} />
            <Route path="/memories" element={<AboutSection />} />
            <Route path="/family-tree" element={<FamilyTreeSection />} />
            <Route path="/gallery" element={<GallerySection />} />
            <Route path="/contact" element={<ContactSection />} />
          </Routes>

          
        </Layout>
      )}
    </Router>
  );
}

export default App;