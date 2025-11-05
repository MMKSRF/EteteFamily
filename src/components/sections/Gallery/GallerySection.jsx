// src/components/sections/Gallery/GallerySection.jsx (Updated video sections)
import { useState } from 'react';
import { galleryData, getFeaturedMedia } from './galleryData';
import PhotoGrid from './PhotoGrid';
import VideoGrid from './VideoCarousel'; // New component
import LightboxModal from './LightboxModal';
import PrimaryButton from '../../ui/buttons/PrimaryButton';

const GallerySection = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('photos');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentMedia, setCurrentMedia] = useState(null);
  const [mediaType, setMediaType] = useState('photo');
  const [currentIndex, setCurrentIndex] = useState(0);

  const featuredMedia = getFeaturedMedia();

  // Filter videos based on category and search
  const getFilteredVideos = () => {
    let filtered = galleryData.videos;
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(video => video.category === selectedCategory);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(video =>
        video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  };

  const handleVideoClick = (video) => {
    setCurrentMedia(video);
    setMediaType('video');
    const videoIndex = galleryData.videos.findIndex(v => v.id === video.id);
    setCurrentIndex(videoIndex);
    setLightboxOpen(true);
  };

  const handlePhotoClick = (photo) => {
    setCurrentMedia(photo);
    setMediaType('photo');
    const photoIndex = galleryData.photos.findIndex(p => p.id === photo.id);
    setCurrentIndex(photoIndex);
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

  const filteredVideos = getFilteredVideos();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 text-white overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
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
      </section>

      {/* Featured Section */}
      <section id="featured" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Featured Memories
            </h2>
            <p className="text-xl text-gray-600">Some of our most cherished moments</p>
          </div>

          {/* Featured Videos */}
          <div className="mb-16">
            <div className="bg-gradient-to-br from-gray-900 to-purple-900 rounded-3xl p-8 text-white">
              <div className="text-center mb-8">
                {/* <h3 className="text-3xl font-bold mb-2">Featured Videos</h3> */}
                <p className="text-white/80">Watch our most special moments</p>
              </div>
              <VideoGrid 
                videos={featuredMedia.videos}
                onVideoClick={handleVideoClick}
              />
            </div>
          </div>

          {/* Featured Photos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredMedia.photos.slice(0, 6).map(photo => (
              <div key={photo.id} className="group cursor-pointer" onClick={() => handlePhotoClick(photo)}>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-300 group-hover:scale-105">
                  <img
                    src={photo.image}
                    alt={photo.title}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
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
            <VideoGrid
              videos={filteredVideos}
              onVideoClick={handleVideoClick}
            />
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