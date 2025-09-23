// src/components/sections/Games/FamilyQuiz/quizData.js
export const quizData = {
  title: "EtetFamily Knowledge Challenge",
  description: "Test your knowledge about our family history, members, and traditions!",
  categories: [
    {
      id: "family-history",
      name: "Family History",
      icon: "📜",
      color: "from-purple-500 to-pink-500"
    },
    {
      id: "family-members",
      name: "Family Members",
      icon: "👨‍👩‍👧‍👦",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: "traditions",
      name: "Family Traditions",
      icon: "🏮",
      color: "from-green-500 to-teal-500"
    },
    {
      id: "memories",
      name: "Special Memories",
      icon: "🌟",
      color: "from-yellow-500 to-orange-500"
    }
  ],
  questions: [
    {
      id: 1,
      category: "family-history",
      question: "In which year did Carlos and Maria Etet get married?",
      options: ["1948", "1950", "1952", "1955"],
      correctAnswer: 1,
      explanation: "Carlos and Maria got married in 1950, marking the beginning of our family legacy.",
      difficulty: "easy",
      points: 100
    },
    {
      id: 2,
      category: "family-members",
      question: "Which family member is known for starting the international business expansion?",
      options: ["Carlos", "Antonio", "Miguel", "Javier"],
      correctAnswer: 2,
      explanation: "Miguel started the international expansion by opening branches in Europe.",
      difficulty: "medium",
      points: 200
    },
    {
      id: 3,
      category: "traditions",
      question: "What is our family's traditional Christmas Eve meal?",
      options: ["Paella", "Roast Turkey", "Seafood Feast", "Traditional Cocido"],
      correctAnswer: 2,
      explanation: "We've had a seafood feast on Christmas Eve since Grandma Maria started the tradition.",
      difficulty: "medium",
      points: 200
    },
    {
      id: 4,
      category: "memories",
      question: "Where was the first international family vacation?",
      options: ["Paris, France", "Rome, Italy", "London, UK", "New York, USA"],
      correctAnswer: 0,
      explanation: "Our first international trip was to Paris in 2005 with three generations!",
      difficulty: "hard",
      points: 300
    },
    {
      id: 5,
      category: "family-history",
      question: "What was the original family business founded by Carlos?",
      options: ["Restaurant", "Construction", "Textile Shop", "Olive Oil Production"],
      correctAnswer: 2,
      explanation: "Carlos started with a small textile shop that grew into our family business.",
      difficulty: "medium",
      points: 200
    },
    {
      id: 6,
      category: "family-members",
      question: "Which family member speaks the most languages?",
      options: ["Carmen", "Lucia", "Sofia", "Diego"],
      correctAnswer: 0,
      explanation: "Carmen is fluent in 6 languages: Spanish, English, French, Italian, German, and Catalan.",
      difficulty: "easy",
      points: 100
    },
    {
      id: 7,
      category: "traditions",
      question: "How often do we have the annual family reunion?",
      options: ["Every month", "Every 3 months", "Every year", "Every 2 years"],
      correctAnswer: 2,
      explanation: "We gather every summer for our annual family reunion, a tradition started in 1980.",
      difficulty: "easy",
      points: 100
    },
    {
      id: 8,
      category: "memories",
      question: "What was the most attended family event in our history?",
      options: ["Carlos' 90th birthday", "Lucia's wedding", "Business 50th anniversary", "Family reunion 2023"],
      correctAnswer: 0,
      explanation: "Carlos' 90th birthday gathered 85 family members from around the world!",
      difficulty: "hard",
      points: 300
    },
    {
      id: 9,
      category: "family-history",
      question: "Which city is considered the family's hometown?",
      options: ["Madrid", "Barcelona", "Seville", "London"],
      correctAnswer: 2,
      explanation: "Seville is where Carlos and Maria started the family and built our first home.",
      difficulty: "easy",
      points: 100
    },
    {
      id: 10,
      category: "family-members",
      question: "Who was the first family member to be born outside of Spain?",
      options: ["Javier", "Lucia", "Mateo", "Carla"],
      correctAnswer: 2,
      explanation: "Mateo was born in London, making him the first non-Spain born family member.",
      difficulty: "hard",
      points: 300
    }
  ]
};

// Helper functions
export const getQuestionsByCategory = (categoryId) => {
  if (categoryId === 'all') return quizData.questions;
  return quizData.questions.filter(q => q.category === categoryId);
};

export const getQuestionsByDifficulty = (difficulty) => {
  return quizData.questions.filter(q => q.difficulty === difficulty);
};

export const getRandomQuestions = (count) => {
  const shuffled = [...quizData.questions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};