// src/components/sections/Gallery/VideoCarousel.jsx
import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import IconButton from '../../ui/buttons/IconButton';
import PrimaryButton from '../../ui/buttons/PrimaryButton';

const VideoCarousel = ({ videos, onVideoClick, selectedCategory }) => {
  const carouselRef = useRef(null);
  const trackRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filteredVideos, setFilteredVideos] = useState(videos);

  useEffect(() => {
    // Filter videos based on category
    let filtered = videos;
    if (selectedCategory && selectedCategory !== 'all') {
      filtered = videos.filter(video => video.category === selectedCategory);
    }
    setFilteredVideos(filtered);
    setCurrentIndex(0); // Reset to first video when filter changes
  }, [videos, selectedCategory]);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    // Animate carousel entrance
    gsap.fromTo(carousel,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: carousel,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Auto-play carousel
    const interval = setInterval(() => {
      if (filteredVideos.length > 1) {
        handleNext();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [filteredVideos.length]);

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % filteredVideos.length);
    animateTransition('next');
  };

  const handlePrev = () => {
    setCurrentIndex(prev => (prev - 1 + filteredVideos.length) % filteredVideos.length);
    animateTransition('prev');
  };

  const animateTransition = (direction) => {
    if (!trackRef.current) return;

    gsap.to(trackRef.current, {
      x: direction === 'next' ? -20 : 20,
      duration: 0.2,
      ease: "power2.out",
      yoyo: true,
      repeat: 1
    });
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  if (filteredVideos.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">🎥</div>
        <h3 className="text-2xl font-bold text-gray-600 mb-2">No videos found</h3>
        <p className="text-gray-500">Try adjusting your filter criteria</p>
      </div>
    );
  }

  const currentVideo = filteredVideos[currentIndex];

  return (
    <div ref={carouselRef} className="relative bg-gradient-to-br from-gray-900 to-purple-900 rounded-3xl p-8 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 text-4xl">🎬</div>
        <div className="absolute bottom-10 right-10 text-4xl">📹</div>
      </div>

      {/* Header */}
      <div className="relative z-10 text-center mb-8">
        <h3 className="text-3xl font-bold mb-2">Family Videos</h3>
        <p className="text-white/80">Relive our precious moments together</p>
      </div>

      {/* Main Video Display */}
      <div className="relative mb-8">
        <div ref={trackRef} className="transition-transform duration-500">
          <div 
            className="relative cursor-pointer group"
            onClick={() => onVideoClick(currentVideo)}
          >
            {/* Video Thumbnail */}
            <div className="relative rounded-2xl overflow-hidden bg-black">
              <img
                src={currentVideo.thumbnail}
                alt={currentVideo.title}
                className="w-full h-64 md:h-96 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 group-hover:bg-black/20">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-6 transform group-hover:scale-110 transition-transform duration-300">
                  <div className="text-6xl">▶️</div>
                </div>
              </div>

              {/* Video Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h4 className="text-xl font-bold mb-2">{currentVideo.title}</h4>
                <p className="text-white/90 text-sm">{currentVideo.description}</p>
                <div className="flex items-center justify-between mt-2 text-white/70 text-sm">
                  <span>⏱️ {currentVideo.duration}</span>
                  <span>📅 {new Date(currentVideo.date).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Featured Badge */}
              {currentVideo.featured && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1 rounded-full text-sm font-bold">
                  ⭐ Featured
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        {filteredVideos.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 rounded-full p-3 transition-all duration-300"
            >
              <span className="text-2xl">⬅️</span>
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 rounded-full p-3 transition-all duration-300"
            >
              <span className="text-2xl">➡️</span>
            </button>
          </>
        )}
      </div>

      {/* Video Thumbnails */}
      {filteredVideos.length > 1 && (
        <div className="relative z-10">
          <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
            {filteredVideos.map((video, index) => (
              <button
                key={video.id}
                onClick={() => goToSlide(index)}
                className={`flex-shrink-0 w-32 transition-all duration-300 ${
                  index === currentIndex ? 'scale-110' : 'opacity-70 hover:opacity-100'
                }`}
              >
                <div className="relative rounded-lg overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-20 object-cover"
                  />
                  <div className={`absolute inset-0 ${
                    index === currentIndex ? 'bg-purple-500/30' : 'bg-black/30'
                  }`}></div>
                  <div className="absolute bottom-1 left-1 bg-black/70 rounded px-1 text-xs">
                    {video.duration}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Carousel Indicators */}
      <div className="flex justify-center space-x-2 mt-6">
        {filteredVideos.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-white' : 'bg-white/30'
            }`}
          />
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center mt-6">
        <PrimaryButton
          icon="🎥"
          onClick={() => onVideoClick(currentVideo)}
          className="bg-gradient-to-r from-purple-500 to-pink-500"
        >
          Watch This Video
        </PrimaryButton>
      </div>
    </div>
  );
};

export default VideoCarousel;