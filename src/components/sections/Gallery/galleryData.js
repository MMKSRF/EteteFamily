// src/components/sections/Gallery/galleryData.js
export const galleryData = {
  categories: [
    {
      id: 'family-reunions',
      name: 'Family Reunions',
      icon: '👨‍👩‍👧‍👦',
      description: 'Memorable gatherings across generations',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'celebrations',
      name: 'Celebrations',
      icon: '🎉',
      description: 'Birthdays, weddings, and special moments',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      id: 'travels',
      name: 'Family Travels',
      icon: '✈️',
      description: 'Adventures around the world',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'traditions',
      name: 'Family Traditions',
      icon: '🏮',
      description: 'Holidays and cultural celebrations',
      color: 'from-green-500 to-teal-500'
    },
    {
      id: 'generations',
      name: 'Generational',
      icon: '📸',
      description: 'Photos through the decades',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      id: 'candid',
      name: 'Candid Moments',
      icon: '😊',
      description: 'Everyday family life',
      color: 'from-pink-500 to-rose-500'
    }
  ],
  photos: [
    {
      id: 1,
      title: "Family Reunion 2023",
      description: "Four generations together at the annual family reunion",
      image: "/images/gallery/reunion-2023.jpg",
      category: "family-reunions",
      date: "2023-07-15",
      location: "Madrid, Spain",
      people: ["carlos", "maria", "antonio", "isabel", "javier", "elena", "mateo", "carla"],
      tags: ["reunion", "generations", "summer"],
      featured: true
    },
    {
      id: 2,
      title: "Beach Vacation",
      description: "Summer fun at the Costa del Sol",
      image: "/images/gallery/beach-vacation.jpg",
      category: "travels",
      date: "2022-08-20",
      location: "Málaga, Spain",
      people: ["javier", "elena", "mateo", "carla"],
      tags: ["beach", "summer", "vacation"],
      featured: true
    },
    {
      id: 3,
      title: "Christmas Dinner",
      description: "Traditional family Christmas celebration",
      image: "/images/gallery/christmas-2022.jpg",
      category: "traditions",
      date: "2022-12-24",
      location: "Madrid, Spain",
      people: ["antonio", "isabel", "javier", "elena", "lucia"],
      tags: ["christmas", "holidays", "dinner"],
      featured: false
    },
    {
      id: 4,
      title: "Grandpa's 90th Birthday",
      description: "Celebrating Carlos' 90th birthday with the whole family",
      image: "/images/gallery/90th-birthday.jpg",
      category: "celebrations",
      date: "2015-03-15",
      location: "Seville, Spain",
      people: ["carlos", "maria", "antonio", "miguel", "all"],
      tags: ["birthday", "milestone", "celebration"],
      featured: true
    },
    {
      id: 5,
      title: "Family Business Opening",
      description: "Opening of the new family business location",
      image: "/images/gallery/business-opening.jpg",
      category: "celebrations",
      date: "2018-05-10",
      location: "Barcelona, Spain",
      people: ["antonio", "miguel", "carmen"],
      tags: ["business", "achievement", "growth"],
      featured: false
    },
    {
      id: 6,
      title: "Baby Carla's First Steps",
      description: "Capturing Carla's first steps in the garden",
      image: "/images/gallery/first-steps.jpg",
      category: "candid",
      date: "2019-09-05",
      location: "London, UK",
      people: ["javier", "elena", "carla"],
      tags: ["baby", "milestone", "candid"],
      featured: true
    },
    {
      id: 7,
      title: "Family Wedding",
      description: "Lucia's wedding day with family",
      image: "/images/gallery/wedding.jpg",
      category: "celebrations",
      date: "2021-06-12",
      location: "New York, USA",
      people: ["lucia", "antonio", "isabel", "javier"],
      tags: ["wedding", "love", "celebration"],
      featured: false
    },
    {
      id: 8,
      title: "Generational Portrait",
      description: "Four generations of Etet women",
      image: "/images/gallery/generations.jpg",
      category: "generations",
      date: "2020-03-08",
      location: "Madrid, Spain",
      people: ["maria", "isabel", "elena", "carla"],
      tags: ["generations", "women", "portrait"],
      featured: true
    },
    {
      id: 9,
      title: "Family Hike",
      description: "Weekend hiking adventure in the mountains",
      image: "/images/gallery/hiking.jpg",
      category: "travels",
      date: "2023-04-18",
      location: "Pyrenees, Spain",
      people: ["javier", "elena", "mateo", "carla"],
      tags: ["hiking", "nature", "adventure"],
      featured: false
    },
    {
      id: 10,
      title: "Traditional Cooking",
      description: "Maria teaching family recipes to the next generation",
      image: "/images/gallery/cooking.jpg",
      category: "traditions",
      date: "2017-11-20",
      location: "Seville, Spain",
      people: ["maria", "isabel", "elena"],
      tags: ["cooking", "tradition", "learning"],
      featured: true
    },
    {
      id: 11,
      title: "Family Game Night",
      description: "Competitive game night with all generations",
      image: "/images/gallery/game-night.jpg",
      category: "candid",
      date: "2023-01-15",
      location: "Madrid, Spain",
      people: ["antonio", "isabel", "javier", "elena", "mateo"],
      tags: ["games", "fun", "family-time"],
      featured: false
    },
    {
      id: 12,
      title: "New Year's Celebration",
      description: "Welcoming the new year together",
      image: "/images/gallery/new-year.jpg",
      category: "traditions",
      date: "2022-12-31",
      location: "Madrid, Spain",
      people: ["antonio", "isabel", "javier", "elena", "lucia"],
      tags: ["new-year", "celebration", "tradition"],
      featured: true
    }
  ],
  videos: [
    {
      id: 1,
      title: "Family Reunion 2023 Highlights",
      description: "Best moments from our annual family reunion",
      thumbnail: "/images/gallery/video-reunion-thumb.jpg",
      videoUrl: "https://www.youtube.com/embed/example1",
      category: "family-reunions",
      duration: "3:45",
      date: "2023-07-20",
      featured: true
    },
    {
      id: 2,
      title: "Wedding Ceremony",
      description: "Lucia's beautiful wedding ceremony",
      thumbnail: "/images/gallery/video-wedding-thumb.jpg",
      videoUrl: "https://www.youtube.com/embed/example2",
      category: "celebrations",
      duration: "15:20",
      date: "2021-06-12",
      featured: true
    },
    {
      id: 3,
      title: "Family Vacation Memories",
      description: "Highlights from our summer vacation",
      thumbnail: "/images/gallery/video-vacation-thumb.jpg",
      videoUrl: "https://www.youtube.com/embed/example3",
      category: "travels",
      duration: "5:30",
      date: "2022-08-25",
      featured: false
    },
    {
      id: 4,
      title: "Christmas Traditions",
      description: "Our family's unique Christmas traditions",
      thumbnail: "/images/gallery/video-christmas-thumb.jpg",
      videoUrl: "https://www.youtube.com/embed/example4",
      category: "traditions",
      duration: "8:15",
      date: "2022-12-28",
      featured: true
    },
    {
      id: 5,
      title: "Generational Interviews",
      description: "Stories from different generations",
      thumbnail: "/images/gallery/video-interviews-thumb.jpg",
      videoUrl: "https://www.youtube.com/embed/example5",
      category: "generations",
      duration: "12:40",
      date: "2023-03-10",
      featured: false
    },
    {
      id: 6,
      title: "Family Recipe Cooking",
      description: "Making grandma's famous paella",
      thumbnail: "/images/gallery/video-cooking-thumb.jpg",
      videoUrl: "https://www.youtube.com/embed/example6",
      category: "traditions",
      duration: "6:50",
      date: "2023-05-15",
      featured: true
    }
  ]
};

// Helper functions
export const getCategoryById = (id) => {
  return galleryData.categories.find(cat => cat.id === id);
};

export const getPhotosByCategory = (categoryId) => {
  if (categoryId === 'all') return galleryData.photos;
  return galleryData.photos.filter(photo => photo.category === categoryId);
};

export const getVideosByCategory = (categoryId) => {
  if (categoryId === 'all') return galleryData.videos;
  return galleryData.videos.filter(video => video.category === categoryId);
};

export const getFeaturedMedia = () => {
  return {
    photos: galleryData.photos.filter(photo => photo.featured),
    videos: galleryData.videos.filter(video => video.featured)
  };
};