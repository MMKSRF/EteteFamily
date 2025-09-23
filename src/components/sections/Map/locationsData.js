// src/components/sections/Map/locationsData.js
export const locationsData = {
  familyMembers: [
    {
      id: "carlos-maria",
      type: "family-home",
      name: "Carlos & Maria's Home",
      description: "The original family home where our story began",
      coordinates: [37.3891, -5.9845], // Seville, Spain
      members: ["carlos", "maria"],
      year: 1950,
      significance: "Family foundation",
      image: "/images/map/seville-home.jpg",
      stories: [
        "Built the house together when they got married",
        "Hosted countless family gatherings and celebrations",
        "Where all children and grandchildren visited during holidays"
      ],
      color: "from-blue-500 to-cyan-500",
      icon: "🏠"
    },
    {
      id: "antonio-isabel",
      type: "family-home",
      name: "Antonio & Isabel's Residence",
      description: "Modern family home in the heart of Madrid",
      coordinates: [40.4168, -3.7038], // Madrid, Spain
      members: ["antonio", "isabel", "javier", "lucia"],
      year: 1985,
      significance: "Family business expansion",
      image: "/images/map/madrid-home.jpg",
      stories: [
        "Moved here when Antonio took over the family business",
        "Hosts the annual family Christmas celebration",
        "Where Javier and Lucia grew up"
      ],
      color: "from-green-500 to-teal-500",
      icon: "🏡"
    },
    {
      id: "miguel-carmen",
      type: "family-home",
      name: "Miguel & Carmen's Villa",
      description: "Beautiful villa with Mediterranean views",
      coordinates: [41.3851, 2.1734], // Barcelona, Spain
      members: ["miguel", "carmen", "sofia", "diego"],
      year: 1990,
      significance: "Entrepreneurial expansion",
      image: "/images/map/barcelona-home.jpg",
      stories: [
        "Built after Miguel started his successful business",
        "Known for its amazing garden and pool area",
        "Family summer vacation spot"
      ],
      color: "from-orange-500 to-red-500",
      icon: "🏰"
    },
    {
      id: "javier-elena",
      type: "family-home",
      name: "Javier & Elena's London Flat",
      description: "Modern apartment in cosmopolitan London",
      coordinates: [51.5074, -0.1278], // London, UK
      members: ["javier", "elena", "mateo", "carla"],
      year: 2015,
      significance: "International expansion",
      image: "/images/map/london-home.jpg",
      stories: [
        "Moved here for Javier's tech career",
        "First family home outside Spain",
        "Where Mateo and Carla were born"
      ],
      color: "from-purple-500 to-pink-500",
      icon: "🏢"
    },
    {
      id: "lucia-nyc",
      type: "current-residence",
      name: "Lucia's NYC Apartment",
      description: "Artist loft in vibrant New York City",
      coordinates: [40.7128, -74.0060], // New York, USA
      members: ["lucia"],
      year: 2018,
      significance: "Cultural exploration",
      image: "/images/map/nyc-apartment.jpg",
      stories: [
        "Moved here to pursue art and cultural studies",
        "Hosts family when they visit the US",
        "Her art studio overlooks the city"
      ],
      color: "from-yellow-500 to-amber-500",
      icon: "🎨"
    },
    {
      id: "sofia-berlin",
      type: "current-residence",
      name: "Sofia's Berlin Flat",
      description: "Historic apartment in creative Berlin",
      coordinates: [52.5200, 13.4050], // Berlin, Germany
      members: ["sofia"],
      year: 2019,
      significance: "Academic pursuit",
      image: "/images/map/berlin-flat.jpg",
      stories: [
        "Moved here for her PhD studies",
        "Active in local education initiatives",
        "Family's gateway to European culture"
      ],
      color: "from-indigo-500 to-blue-500",
      icon: "📚"
    },
    {
      id: "diego-amsterdam",
      type: "current-residence",
      name: "Diego's Sustainable Home",
      description: "Eco-friendly house in Amsterdam",
      coordinates: [52.3676, 4.9041], // Amsterdam, Netherlands
      members: ["diego"],
      year: 2020,
      significance: "Environmental focus",
      image: "/images/map/amsterdam-home.jpg",
      stories: [
        "Designed with sustainable materials",
        "Rooftop garden and solar panels",
        "Family example of green living"
      ],
      color: "from-emerald-500 to-green-500",
      icon: "🌱"
    }
  ],
  significantLocations: [
    {
      id: "family-business-hq",
      type: "business",
      name: "Etet Family Business HQ",
      description: "The main headquarters of our family business",
      coordinates: [40.4168, -3.7038], // Madrid
      significance: "Economic foundation",
      image: "/images/map/business-hq.jpg",
      year: 1970,
      stories: ["Founded by Carlos and Maria", "Expanded by Antonio and Miguel", "Now run by the third generation"],
      color: "from-gray-600 to-gray-800",
      icon: "💼"
    },
    {
      id: "summer-villa",
      type: "vacation-home",
      name: "Family Summer Villa",
      description: "Coastal retreat for family vacations",
      coordinates: [36.7213, -4.4214], // Costa del Sol
      significance: "Family bonding",
      image: "/images/map/summer-villa.jpg",
      year: 1980,
      stories: ["Purchased for family summer vacations", "Hosts annual family reunions", "Where generations connect"],
      color: "from-cyan-500 to-blue-500",
      icon: "🏖️"
    },
    {
      id: "wedding-chapel",
      type: "celebration",
      name: "Family Wedding Chapel",
      description: "Where multiple family weddings took place",
      coordinates: [37.3891, -5.9845], // Seville
      significance: "Family celebrations",
      image: "/images/map/wedding-chapel.jpg",
      year: 1975,
      stories: ["Carlos and Maria's wedding", "Antonio and Isabel's wedding", "Lucia's wedding"],
      color: "from-pink-500 to-rose-500",
      icon: "💒"
    },
    {
      id: "family-cemetery",
      type: "heritage",
      name: "Family Resting Place",
      description: "Where we honor our ancestors",
      coordinates: [37.3891, -5.9845], // Seville
      significance: "Family heritage",
      image: "/images/map/cemetery.jpg",
      year: 1920,
      stories: ["Resting place of Carlos and Maria", "Annual memorial visits", "Family history preservation"],
      color: "from-purple-500 to-indigo-500",
      icon: "⛪"
    }
  ],
  travelDestinations: [
    {
      id: "paris-trip",
      type: "travel",
      name: "Paris Family Vacation",
      description: "Memorable family trip to Paris",
      coordinates: [48.8566, 2.3522],
      significance: "First international family vacation",
      image: "/images/map/paris-trip.jpg",
      year: 2005,
      stories: ["All generations traveled together", "Visited Eiffel Tower and Louvre", "Created lasting memories"],
      color: "from-blue-500 to-purple-500",
      icon: "🗼"
    },
    {
      id: "japan-adventure",
      type: "travel",
      name: "Japan Cultural Exchange",
      description: "Family cultural exploration in Japan",
      coordinates: [35.6762, 139.6503],
      significance: "Cultural immersion",
      image: "/images/map/japan-trip.jpg",
      year: 2018,
      stories: ["Lucia's art inspiration trip", "Traditional tea ceremonies", "Family bonding experience"],
      color: "from-red-500 to-pink-500",
      icon: "🗾"
    }
  ]
};

// Helper functions
export const getAllLocations = () => {
  return [
    ...locationsData.familyMembers,
    ...locationsData.significantLocations,
    ...locationsData.travelDestinations
  ];
};

export const getLocationsByType = (type) => {
  return getAllLocations().filter(location => location.type === type);
};

export const getLocationsByMember = (memberId) => {
  return getAllLocations().filter(location => 
    location.members && location.members.includes(memberId)
  );
};

export const getLocationById = (id) => {
  return getAllLocations().find(location => location.id === id);
};

export const getFamilyStats = () => {
  const allLocations = getAllLocations();
  return {
    totalLocations: allLocations.length,
    countries: new Set(allLocations.map(loc => {
      // Simple country detection based on coordinates
      if (loc.coordinates[0] > 35 && loc.coordinates[0] < 45) return 'Spain';
      if (loc.coordinates[0] > 50 && loc.coordinates[0] < 60) return 'UK';
      if (loc.coordinates[0] > 40 && loc.coordinates[0] < 45) return 'USA';
      if (loc.coordinates[0] > 50 && loc.coordinates[0] < 55) return 'Germany';
      if (loc.coordinates[0] > 52 && loc.coordinates[0] < 53) return 'Netherlands';
      if (loc.coordinates[0] > 35 && loc.coordinates[0] < 40) return 'Japan';
      return 'France';
    })).size,
    generations: 4,
    years: Math.max(...allLocations.map(loc => loc.year)) - Math.min(...allLocations.map(loc => loc.year))
  };
};