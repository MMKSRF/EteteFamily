// src/components/sections/FamilyTree/familyData.js
export const familyData = {
  id: "root",
  name: "Etete Family Tree",
  children: [
    {
      id: "gen1",
      generation: 1,
      members: [
        {
          id: "carlos",
          name: "Carlos Etete",
          birthDate: "1925-03-15",
          deathDate: "2005-08-20",
          image: "/images/family/carlos.jpg",
          role: "Family Patriarch",
          bio: "Founded the family business and established our family values. Loved gardening and storytelling.",
          spouse: "maria",
          children: ["antonio", "miguel"],
          parents: [],
          location: "Seville, Spain",
          favoriteMemory: "Teaching grandchildren how to plant olive trees",
          funFact: "Could speak 4 languages fluently",
          color: "from-blue-500 to-cyan-500"
        },
        {
          id: "maria",
          name: "Maria Etete",
          birthDate: "1930-07-22",
          deathDate: "2010-12-10",
          image: "/images/family/maria.jpg",
          role: "Family Matriarch",
          bio: "The heart of our family. Known for her incredible cooking and warm hospitality.",
          spouse: "carlos",
          children: ["antonio", "miguel"],
          parents: [],
          location: "Seville, Spain",
          favoriteMemory: "Family Sunday dinners with 3 generations",
          funFact: "Won multiple cooking competitions",
          color: "from-pink-500 to-rose-500"
        }
      ]
    },
    {
      id: "gen2",
      generation: 2,
      members: [
        {
          id: "antonio",
          name: "Antonio Etete",
          birthDate: "1955-11-08",
          image: "/images/family/antonio.jpg",
          role: "Business Leader",
          bio: "Expanded the family business internationally while maintaining our core values.",
          spouse: "isabel",
          children: ["javier", "lucia"],
          parents: ["carlos", "maria"],
          location: "Madrid, Spain",
          favoriteMemory: "Taking the family on first international vacation",
          funFact: "Runs marathons for charity",
          color: "from-green-500 to-teal-500"
        },
        {
          id: "isabel",
          name: "Isabel Etete",
          birthDate: "1958-04-17",
          image: "/images/family/isabel.jpg",
          role: "Family Anchor",
          bio: "Keeps the family connected across generations and continents.",
          spouse: "antonio",
          children: ["javier", "lucia"],
          parents: [],
          location: "Madrid, Spain",
          favoriteMemory: "Organizing family reunions with 50+ members",
          funFact: "Published a family recipe book",
          color: "from-purple-500 to-indigo-500"
        },
        {
          id: "miguel",
          name: "Miguel Etete",
          birthDate: "1960-09-30",
          image: "/images/family/miguel.jpg",
          role: "Entrepreneur",
          bio: "Started multiple successful businesses while supporting family initiatives.",
          spouse: "carmen",
          children: ["sofia", "diego"],
          parents: ["carlos", "maria"],
          location: "Barcelona, Spain",
          favoriteMemory: "Building the family vacation home together",
          funFact: "Invented a popular board game",
          color: "from-orange-500 to-red-500"
        },
        {
          id: "carmen",
          name: "Carmen Etete",
          birthDate: "1963-12-05",
          image: "/images/family/carmen.jpg",
          role: "Global Connector",
          bio: "Bridges cultural gaps and keeps international family branches connected.",
          spouse: "miguel",
          children: ["sofia", "diego"],
          parents: [],
          location: "Barcelona, Spain",
          favoriteMemory: "Hosting exchange students from different countries",
          funFact: "Fluent in 6 languages",
          color: "from-yellow-500 to-amber-500"
        }
      ]
    },
    {
      id: "gen3",
      generation: 3,
      members: [
        {
          id: "javier",
          name: "Javier Etete",
          birthDate: "1985-06-14",
          image: "/images/family/javier.jpg",
          role: "Tech Innovator",
          bio: "Brings the family into the digital age while honoring traditions.",
          spouse: "elena",
          children: ["mateo", "carla"],
          parents: ["antonio", "isabel"],
          location: "London, UK",
          favoriteMemory: "Creating the first family digital archive",
          funFact: "Developed a popular mobile app",
          color: "from-indigo-500 to-blue-500"
        },
        {
          id: "elena",
          name: "Elena Etete",
          birthDate: "1987-03-22",
          image: "/images/family/elena.jpg",
          role: "Creative Director",
          bio: "Adds artistic flair to family projects and celebrations.",
          spouse: "javier",
          children: ["mateo", "carla"],
          parents: [],
          location: "London, UK",
          favoriteMemory: "Designing family wedding invitations",
          funFact: "Exhibited art in 3 countries",
          color: "from-rose-500 to-pink-500"
        },
        {
          id: "lucia",
          name: "Lucia Etete",
          birthDate: "1990-11-08",
          image: "/images/family/lucia.jpg",
          role: "Cultural Ambassador",
          bio: "Explores and shares family heritage through travel and storytelling.",
          spouse: null,
          children: [],
          parents: ["antonio", "isabel"],
          location: "New York, USA",
          favoriteMemory: "Documenting family history across Europe",
          funFact: "Traveled to 30+ countries",
          color: "from-teal-500 to-green-500"
        },
        {
          id: "sofia",
          name: "Sofia Etete",
          birthDate: "1992-04-15",
          image: "/images/family/sofia.jpg",
          role: "Education Advocate",
          bio: "Focuses on family education and lifelong learning opportunities.",
          spouse: null,
          children: [],
          parents: ["miguel", "carmen"],
          location: "Berlin, Germany",
          favoriteMemory: "Starting family book club",
          funFact: "Has 3 university degrees",
          color: "from-violet-500 to-purple-500"
        },
        {
          id: "diego",
          name: "Diego Etete",
          birthDate: "1995-08-30",
          image: "/images/family/diego.jpg",
          role: "Environmentalist",
          bio: "Leads family sustainability initiatives and eco-friendly practices.",
          spouse: null,
          children: [],
          parents: ["miguel", "carmen"],
          location: "Amsterdam, Netherlands",
          favoriteMemory: "Family beach clean-up projects",
          funFact: "Runs an organic farm",
          color: "from-amber-500 to-orange-500"
        }
      ]
    },
    {
      id: "gen4",
      generation: 4,
      members: [
        {
          id: "mateo",
          name: "Mateo Etete",
          birthDate: "2015-02-18",
          image: "/images/family/mateo.jpg",
          role: "Next Generation",
          bio: "Growing up in a digital world while learning family traditions.",
          spouse: null,
          children: [],
          parents: ["javier", "elena"],
          location: "London, UK",
          favoriteMemory: "Virtual family game nights",
          funFact: "Already speaks 2 languages",
          color: "from-cyan-500 to-blue-500"
        },
        {
          id: "carla",
          name: "Carla Etete",
          birthDate: "2018-07-25",
          image: "/images/family/carla.jpg",
          role: "Future Leader",
          bio: "The youngest member, full of energy and curiosity.",
          spouse: null,
          children: [],
          parents: ["javier", "elena"],
          location: "London, UK",
          favoriteMemory: "Family video calls with cousins",
          funFact: "Loves dancing and music",
          color: "from-pink-500 to-rose-500"
        }
      ]
    }
  ]
};

// Helper functions
export const getMemberById = (id) => {
  const allMembers = familyData.children.flatMap(gen => gen.members);
  return allMembers.find(member => member.id === id);
};

export const getFamilyGenerations = () => {
  return familyData.children.map(gen => ({
    generation: gen.generation,
    count: gen.members.length,
    years: gen.generation === 1 ? "1925-2005" : 
           gen.generation === 2 ? "1955-Present" :
           gen.generation === 3 ? "1985-Present" : "2015-Present"
  }));
};

export const getFamilyStats = () => {
  const allMembers = familyData.children.flatMap(gen => gen.members);
  return {
    totalMembers: allMembers.length,
    livingMembers: allMembers.filter(m => !m.deathDate).length,
    countries: [...new Set(allMembers.map(m => m.location.split(', ')[1]))].length,
    generations: familyData.children.length,
    averageAge: Math.round(allMembers.filter(m => !m.deathDate).reduce((sum, m) => {
      const birthYear = new Date(m.birthDate).getFullYear();
      return sum + (new Date().getFullYear() - birthYear);
    }, 0) / allMembers.filter(m => !m.deathDate).length)
  };
};