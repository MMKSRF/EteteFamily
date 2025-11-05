// src/components/sections/Gallery/VideoGrid.jsx
const VideoGrid = ({ videos, onVideoClick }) => {
  if (videos.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">🎥</div>
        <h3 className="text-2xl font-bold text-gray-600 mb-2">No videos found</h3>
        <p className="text-gray-500">Try adjusting your filter criteria</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map((video) => (
        <div 
          key={video.id} 
          className="group cursor-pointer"
          onClick={() => onVideoClick(video)}
        >
          <div className="relative rounded-2xl overflow-hidden shadow-lg transform transition-all duration-300 group-hover:scale-105">
            {/* Video Thumbnail */}
            <div className="relative w-full pt-[56.25%]"> {/* 16:9 aspect ratio container */}
  <img
    src={video.thumbnail}
    alt={video.title}
    className="absolute top-0 left-0 w-full h-full object-contain rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
  />
</div>
            
            {/* Play Button Overlay */}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 transform group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl">▶️</span>
              </div>
            </div>

            {/* Video Info */}
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white bg-gradient-to-t from-black/80 to-transparent">
              <h3 className="font-bold text-lg mb-1">{video.title}</h3>
              <p className="text-white/90 text-sm mb-2">{video.description}</p>
              <div className="flex items-center justify-between text-white/70 text-xs">
                <span>⏱️ {video.duration}</span>
                <span>📅 {new Date(video.date).getFullYear()}</span>
              </div>
            </div>

            {/* Featured Badge */}
            {video.featured && (
              <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-2 py-1 rounded-full text-xs font-bold">
                ⭐ Featured
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoGrid;