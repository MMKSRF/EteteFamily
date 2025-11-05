// src/components/VideoGallery.jsx
import React, { useEffect, useState } from 'react';
import Loader from './layout/Loader';
const privateVideoIds = [
  "4XjE1wn-7ek",
  "OGIzAALOfBM",
  "x-qwJI_0yeE",
  "Lt7BMiNJF1I",
  "xuc6US9Dn8Y",
  "VL_XCP4Wuzw"
];

const VideoGallery = () => {
  const [user, setUser] = useState({});
  const [useLoader, setLoader] = useState(false);

  // ✅ Load logged-in user
  useEffect(() => {
    setLoader(true)
    const savedUser = localStorage.getItem('familyUser');
    // console.log("Saved user is .... ", savedUser);
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      console.log("User loaded: ", JSON.parse(savedUser));
    }
    setLoader(false)
  }, []);

  if (!user) {
    return (
      <div className="text-center p-6 text-white bg-gray-900 rounded-lg">
        <p>Please sign in to view private family videos.</p>
      </div>
    );
  }

  return useLoader ? <Loader/> :( 
    <div className="video-gallery grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {privateVideoIds.map((id) => (
        <div key={id} className="relative pb-[56.25%] h-0">
          <iframe
            className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
            src={`https://www.youtube.com/embed/${id}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={`Private Video ${id}`}
          />
        </div>
      ))}
    </div>)
  
};

export default VideoGallery;