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

import GoogleLoginButton from './components/signin';
// import VideoGallery from './components/video';




function App() {

  const user = JSON.parse(localStorage.getItem("etete_user"));

  function handleLogout() {
    localStorage.removeItem("etete_user");
    window.location.reload();
  }



  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/signin" element={ <div>
      {user ? (
        <>
          <h2>Welcome, {user.name} 👋</h2>
          <img src={user.picture} alt="User profile" />
          <p>Email: {user.email}</p>
          <button onClick={handleLogout}>Logout</button>
          {/* Show your private YouTube videos here */}
        </>
      ) : (
        <>
          <h2>Sign in to access family videos</h2>
          <GoogleLoginButton />
        </>
      )}
    </div>} />  
          <Route path="/about" element={<AboutSection />} />
          <Route path="/memories" element={<AboutSection />} />
          <Route path="/family-tree" element={<FamilyTreeSection />} />
          <Route path="/gallery" element={<GallerySection />} />
          {/* <Route path="/map" element={<MapSection />} /> */}
          {/* <Route path="/games" element={<GamesSection />} /> */}
          <Route path="/contact" element={<ContactSection />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;