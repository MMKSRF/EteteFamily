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




