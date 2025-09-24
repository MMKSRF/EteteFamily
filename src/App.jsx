// src/App.jsx - Final complete routes
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HeroSection from './components/sections/Hero/HeroSection';
import AboutSection from './components/sections/About/AboutSection';
import FamilyTreeSection from './components/sections/FamilyTree/FamilyTreeSection';
import GallerySection from './components/sections/Gallery/GallerySection';
import MapSection from './components/sections/Map/MapSection';
import ContactSection from './components/sections/Contact/ContactSection';
import GamesSection from './components/sections/Games/GamesSection';

// Placeholder pages for games (we can implement these later)
const GamesPage = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="text-6xl mb-4">🎮</div>
      <h1 className="text-4xl font-bold text-gray-800">Family Games</h1>
      <p className="text-xl text-gray-600 mt-2">Coming soon - Family trivia and memory games!</p>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/about" element={<AboutSection />} />
          <Route path="/memories" element={<AboutSection />} />
          <Route path="/family-tree" element={<FamilyTreeSection />} />
          <Route path="/gallery" element={<GallerySection />} />
          <Route path="/map" element={<MapSection />} />
          <Route path="/games" element={<GamesSection />} />
          <Route path="/contact" element={<ContactSection />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;