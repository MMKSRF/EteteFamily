// src/components/sections/About/Timeline/timelineData.js
export const timelineData = [
  {
    id: 1,
    year: 1950,
    title: "Family Foundation",
    description: "Grandparents Maria and Carlos Etet started their journey together in a small village, building the foundation of our family legacy.",
    image: "/images/timeline/foundation.jpg",
    category: "foundation",
    members: ["grandpa-maria", "grandpa-carlos"],
    location: "Seville, Spain",
    significance: "The beginning of the EtetFamily legacy",
    icon: "🌱",
    color: "from-green-400 to-teal-500",
    achievements: ["First family home", "Family business started"]
  },
  {
    id: 2,
    year: 1975,
    title: "New Generations",
    description: "The family expanded with the birth of their children, bringing new energy and dreams to the Etet family tree.",
    image: "/images/timeline/generations.jpg",
    category: "growth",
    members: ["papa-antonio", "mama-isabel"],
    location: "Madrid, Spain",
    significance: "Family expansion and growth",
    icon: "👨‍👩‍👧‍👦",
    color: "from-blue-400 to-cyan-500",
    achievements: ["Family moved to Madrid", "Children's education"]
  },
  {
    id: 3,
    year: 1990,
    title: "Family Business Success",
    description: "The Etet family business flourished, becoming a cornerstone of our community and providing for generations to come.",
    image: "/images/timeline/business.jpg",
    category: "achievement",
    members: ["papa-antonio", "uncle-miguel"],
    location: "Barcelona, Spain",
    significance: "Economic foundation established",
    icon: "💼",
    color: "from-purple-400 to-pink-500",
    achievements: ["Business expansion", "Community recognition"]
  },
  {
    id: 4,
    year: 2005,
    title: "Global Connections",
    description: "Family members began traveling and settling around the world, creating an international EtetFamily network.",
    image: "/images/timeline/global.jpg",
    category: "expansion",
    members: ["cousin-lucia", "aunt-carmen"],
    location: "Multiple Countries",
    significance: "Family goes international",
    icon: "🌎",
    color: "from-yellow-400 to-orange-500",
    achievements: ["International branches", "Cultural exchange"]
  },
  {
    id: 5,
    year: 2015,
    title: "Digital Family Era",
    description: "The family embraced technology, creating digital connections that kept everyone close despite geographical distances.",
    image: "/images/timeline/digital.jpg",
    category: "innovation",
    members: ["you", "siblings", "cousins"],
    location: "Worldwide",
    significance: "Digital family connectivity",
    icon: "💻",
    color: "from-indigo-400 to-purple-500",
    achievements: ["Family social media", "Virtual reunions"]
  },
  {
    id: 6,
    year: 2023,
    title: "Modern Legacy",
    description: "The EtetFamily continues to grow, with new generations carrying forward our traditions while creating their own paths.",
    image: "/images/timeline/legacy.jpg",
    category: "legacy",
    members: ["new-generation"],
    location: "Global Presence",
    significance: "Continuing the family legacy",
    icon: "✨",
    color: "from-pink-400 to-red-500",
    achievements: ["Family website launch", "Next generation milestones"]
  }
];

export const timelineCategories = {
  foundation: { label: "Foundation", icon: "🌱", color: "green" },
  growth: { label: "Growth", icon: "📈", color: "blue" },
  achievement: { label: "Achievement", icon: "🏆", color: "purple" },
  expansion: { label: "Expansion", icon: "🚀", color: "yellow" },
  innovation: { label: "Innovation", icon: "💡", color: "indigo" },
  legacy: { label: "Legacy", icon: "👑", color: "pink" }
};

export const familyMembers = {
  "grandpa-maria": { name: "Maria Etet", role: "Family Matriarch" },
  "grandpa-carlos": { name: "Carlos Etet", role: "Family Patriarch" },
  "papa-antonio": { name: "Antonio Etet", role: "Business Leader" },
  "mama-isabel": { name: "Isabel Etet", role: "Family Anchor" },
  "uncle-miguel": { name: "Miguel Etet", role: "Entrepreneur" },
  "aunt-carmen": { name: "Carmen Etet", role: "Global Connector" },
  "cousin-lucia": { name: "Lucia Etet", role: "Cultural Ambassador" },
  "you": { name: "Current Generation", role: "Digital Pioneers" },
  "siblings": { name: "Siblings", role: "Family Support" },
  "cousins": { name: "Cousins", role: "Extended Network" },
  "new-generation": { name: "Next Generation", role: "Future Leaders" }
};