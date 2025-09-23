// src/components/sections/Gallery/PhotoGrid.jsx
import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ImageCard from '../../ui/cards/ImageCard';
import IconButton from '../../ui/buttons/IconButton';
import { galleryData } from './galleryData';

gsap.registerPlugin(ScrollTrigger);

const PhotoGrid = ({ 
  photos, 
  onPhotoClick, 
  selectedCategory,
  searchTerm = '' 
}) => {
  const gridRef = useRef(null);
  const [filteredPhotos, setFilteredPhotos] = useState(photos);
  const [masonryColumns, setMasonryColumns] = useState(3);

  useEffect(() => {
    // Filter photos based on search term
    let filtered = photos;
    
    if (searchTerm) {
      filtered = photos.filter(photo =>
        photo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        photo.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        photo.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    if (selectedCategory && selectedCategory !== 'all') {
      filtered = filtered.filter(photo => photo.category === selectedCategory);
    }
    
    setFilteredPhotos(filtered);
  }, [photos, selectedCategory, searchTerm]);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    // Animate grid items on scroll
    const items = grid.querySelectorAll('.grid-item');
    
    gsap.fromTo(items,
      { opacity: 0, y: 100, scale: 0.8 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: grid,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Responsive column count
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width < 640) setMasonryColumns(1);
      else if (width < 1024) setMasonryColumns(2);
      else setMasonryColumns(3);
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    
    return () => window.removeEventListener('resize', updateColumns);
  }, [filteredPhotos]);

  // Create masonry columns
  const createMasonryColumns = () => {
    const columns = Array(masonryColumns).fill().map(() => []);
    
    filteredPhotos.forEach((photo, index) => {
      columns[index % masonryColumns].push(photo);
    });
    
    return columns;
  };

  const columns = createMasonryColumns();

  if (filteredPhotos.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">📷</div>
        <h3 className="text-2xl font-bold text-gray-600 mb-2">No photos found</h3>
        <p className="text-gray-500">Try adjusting your search or filter criteria</p>
      </div>
    );
  }

  return (
    <div ref={gridRef} className="relative">
      {/* Grid Header */}
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-bold text-gray-800">
          {filteredPhotos.length} {filteredPhotos.length === 1 ? 'Photo' : 'Photos'}
          {selectedCategory && selectedCategory !== 'all' && (
            <span className="text-purple-600"> in {galleryData.categories.find(cat => cat.id === selectedCategory)?.name}</span>
          )}
        </h3>
        
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">Layout:</span>
          <div className="flex bg-gray-100 rounded-lg p-1">
            {[1, 2, 3].map(cols => (
              <IconButton
                key={cols}
                icon={cols === 1 ? '📱' : cols === 2 ? '💻' : '🖥️'}
                onClick={() => setMasonryColumns(cols)}
                className={masonryColumns === cols ? 
                  "bg-white shadow-sm" : "bg-transparent"
                }
                tooltip={`${cols} column${cols > 1 ? 's' : ''}`}
                size="sm"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Masonry Grid */}
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${masonryColumns} gap-6`}>
        {columns.map((column, columnIndex) => (
          <div key={columnIndex} className="space-y-6">
            {column.map((photo) => (
              <div key={photo.id} className="grid-item">
                <ImageCard
                  image={photo.image}
                  title={photo.title}
                  description={photo.description}
                  onClick={() => onPhotoClick(photo)}
                  className="transform hover:scale-105 transition-transform duration-300 cursor-pointer"
                  overlayContent={
                    <div className="absolute top-4 right-4">
                      {photo.featured && (
                        <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                          ⭐ Featured
                        </span>
                      )}
                    </div>
                  }
                >
                  {/* Additional photo info */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center justify-between text-white text-sm">
                      <span>📅 {new Date(photo.date).getFullYear()}</span>
                      <span>📍 {photo.location.split(',')[0]}</span>
                    </div>
                  </div>
                </ImageCard>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Floating decorative elements */}
      <div className="absolute -top-10 -right-10 opacity-10">
        <div className="text-6xl animate-spin-slow">✨</div>
      </div>
    </div>
  );
};

export default PhotoGrid;