// src/components/sections/Gallery/GallerySection.jsx
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { galleryData, getFeaturedMedia } from './galleryData';
import PhotoGrid from './PhotoGrid';
import VideoCarousel from './VideoCarousel';
import LightboxModal from './LightboxModal';
import PrimaryButton from '../../ui/buttons/PrimaryButton';
import IconButton from '../../ui/buttons/IconButton';
import { useScrollAnimation } from '../../animations/hooks/useScrollAnimation';

gsap.registerPlugin(ScrollTrigger);

const GallerySection = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('photos'); // 'photos' or 'videos'
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentMedia, setCurrentMedia] = useState(null);
  const [mediaType, setMediaType] = useState('photo');
  const [currentIndex, setCurrentIndex] = useState(0);

  const sectionRef = useRef(null);
  const headerRef = useScrollAnimation({ animation: 'fadeInDown', duration: 1.5 });
  const featuredRef = useRef(null);

  const featuredMedia = getFeaturedMedia();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Animate featured section
    gsap.fromTo(featuredRef.current,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: featuredRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Floating background elements
    const floatingIcons = ['📷', '🎞️', '✨', '🌟', '📸', '🎬'];
    floatingIcons.forEach((icon) => {
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

  const handlePhotoClick = (photo) => {
    setCurrentMedia(photo);
    setMediaType('photo');
    setCurrentIndex(galleryData.photos.findIndex(p => p.id === photo.id));
    setLightboxOpen(true);
  };

  const handleVideoClick = (video) => {
    setCurrentMedia(video);
    setMediaType('video');
    setCurrentIndex(galleryData.videos.findIndex(v => v.id === video.id));
    setLightboxOpen(true);
  };

  const handleNextMedia = () => {
    const mediaArray = mediaType === 'photo' ? galleryData.photos : galleryData.videos;
    const nextIndex = (currentIndex + 1) % mediaArray.length;
    setCurrentIndex(nextIndex);
    setCurrentMedia(mediaArray[nextIndex]);
  };

  const handlePrevMedia = () => {
    const mediaArray = mediaType === 'photo' ? galleryData.photos : galleryData.videos;
    const prevIndex = (currentIndex - 1 + mediaArray.length) % mediaArray.length;
    setCurrentIndex(prevIndex);
    setCurrentMedia(mediaArray[prevIndex]);
  };

  const handleCloseLightbox = () => {
    setLightboxOpen(false);
    setTimeout(() => {
      setCurrentMedia(null);
      setCurrentIndex(0);
    }, 300);
  };

  return (
    <div ref={sectionRef} className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 text-white overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div ref={headerRef} className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Family <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Gallery</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 leading-relaxed">
              Explore {galleryData.photos.length} photos and {galleryData.videos.length} videos 
              capturing our family's most precious moments through the years.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <PrimaryButton 
                icon="📷" 
                onClick={() => document.getElementById('gallery-content').scrollIntoView({ behavior: 'smooth' })}
              >
                Explore Gallery
              </PrimaryButton>
              <PrimaryButton 
                icon="⭐" 
                variant="secondary"
                onClick={() => document.getElementById('featured').scrollIntoView({ behavior: 'smooth' })}
              >
                Featured Memories
              </PrimaryButton>
            </div>
          </div>
        </div>

        {/* Floating camera icons */}
        <div className="absolute inset-0 overflow-hidden">
          {['📷', '🎥', '📸', '🎞️'].map((icon, i) => (
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

      {/* Featured Section */}
      <section id="featured" ref={featuredRef} className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Featured Memories
            </h2>
            <p className="text-xl text-gray-600">Some of our most cherished moments</p>
          </div>

          {/* Featured Videos */}
          <div className="mb-16">
            <VideoCarousel 
              videos={featuredMedia.videos}
              onVideoClick={handleVideoClick}
              selectedCategory="all"
            />
          </div>

          {/* Featured Photos Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredMedia.photos.slice(0, 6).map(photo => (
              <div key={photo.id} className="group cursor-pointer" onClick={() => handlePhotoClick(photo)}>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-500 group-hover:scale-105">
                  <img
                    src={photo.image}
                    alt={photo.title}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
                    <div className="text-white">
                      <h3 className="font-bold text-lg">{photo.title}</h3>
                      <p className="text-white/90 text-sm">{photo.description}</p>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-2 py-1 rounded-full text-xs font-bold">
                      ⭐ Featured
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Gallery Content */}
      <section id="gallery-content" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          {/* Gallery Controls */}
          <div className="mb-8 bg-gradient-to-r from-gray-50 to-purple-50 rounded-3xl p-6 shadow-lg">
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
                    selectedCategory === 'all'
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  All Categories
                </button>
                {galleryData.categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 flex items-center space-x-2 ${
                      selectedCategory === category.id
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span>{category.icon}</span>
                    <span>{category.name}</span>
                  </button>
                ))}
              </div>

              {/* Search Box */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search memories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent w-64"
                />
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
              </div>

              {/* View Toggle */}
              <div className="flex bg-gray-100 rounded-full p-1">
                <button
                  onClick={() => setActiveTab('photos')}
                  className={`px-4 py-2 rounded-full transition-all duration-300 flex items-center space-x-2 ${
                    activeTab === 'photos'
                      ? 'bg-white shadow-sm text-purple-600'
                      : 'text-gray-600'
                  }`}
                >
                  <span>📷</span>
                  <span>Photos ({galleryData.photos.length})</span>
                </button>
                <button
                  onClick={() => setActiveTab('videos')}
                  className={`px-4 py-2 rounded-full transition-all duration-300 flex items-center space-x-2 ${
                    activeTab === 'videos'
                      ? 'bg-white shadow-sm text-purple-600'
                      : 'text-gray-600'
                  }`}
                >
                  <span>🎥</span>
                  <span>Videos ({galleryData.videos.length})</span>
                </button>
              </div>
            </div>
          </div>

          {/* Gallery Content */}
          {activeTab === 'photos' ? (
            <PhotoGrid
              photos={galleryData.photos}
              onPhotoClick={handlePhotoClick}
              selectedCategory={selectedCategory}
              searchTerm={searchTerm}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryData.videos
                .filter(video => selectedCategory === 'all' || video.category === selectedCategory)
                .filter(video => 
                  searchTerm === '' ||
                  video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  video.description.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map(video => (
                  <div key={video.id} className="group cursor-pointer" onClick={() => handleVideoClick(video)}>
                    <div className="relative rounded-2xl overflow-hidden shadow-lg transform transition-all duration-500 group-hover:scale-105">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 transform group-hover:scale-110 transition-transform duration-300">
                          <span className="text-3xl">▶️</span>
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white bg-gradient-to-t from-black/80 to-transparent">
                        <h3 className="font-bold">{video.title}</h3>
                        <p className="text-white/90 text-sm">{video.duration}</p>
                      </div>
                      {video.featured && (
                        <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-2 py-1 rounded-full text-xs font-bold">
                          ⭐
                        </div>
                      )}
                    </div>
                  </div>
                ))
              }
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      <LightboxModal
        isOpen={lightboxOpen}
        onClose={handleCloseLightbox}
        media={currentMedia}
        mediaType={mediaType}
        currentIndex={currentIndex}
        onNext={handleNextMedia}
        onPrev={handlePrevMedia}
      />
    </div>
  );
};

export default GallerySection;