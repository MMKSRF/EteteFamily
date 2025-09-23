// src/components/sections/Games/GamesSection.jsx
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import QuizGame from './FamilyQuiz/QuizGame';
import MemoryGame from './MemoryGame/MemoryGame';
import TriviaGame from './Trivia/TriviaGame';
import PrimaryButton from '../../ui/buttons/PrimaryButton';
import InfoCard from '../../ui/cards/InfoCard';
import { useScrollAnimation } from '../../animations/hooks/useScrollAnimation';

gsap.registerPlugin(ScrollTrigger);

const GamesSection = () => {
  const [activeGame, setActiveGame] = useState(null);
  const sectionRef = useRef(null);
  const headerRef = useScrollAnimation({ animation: 'fadeInDown', duration: 1.5 });
  const gamesRef = useScrollAnimation({ animation: 'fadeInUp', duration: 1, delay: 0.2 });

  const games = [
    {
      id: 'quiz',
      title: 'Family Knowledge Quiz',
      description: 'Test your knowledge about our family history and members',
      icon: '🧠',
      color: 'from-purple-500 to-pink-500',
      component: QuizGame
    },
    {
      id: 'memory',
      title: 'Family Memory Game',
      description: 'Match family members and symbols in this classic game',
      icon: '🎴',
      color: 'from-blue-500 to-cyan-500',
      component: MemoryGame
    },
    {
      id: 'trivia',
      title: 'Quick Family Trivia',
      description: 'Fast-paced trivia with time bonuses',
      icon: '⚡',
      color: 'from-orange-500 to-red-500',
      component: TriviaGame
    }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Floating game icons
    const floatingIcons = ['🎮', '👾', '🕹️', '🎯', '🏆', '✨'];
    floatingIcons.forEach((icon) => {
      const element = document.createElement('div');
      element.className = 'absolute text-4xl opacity-10 pointer-events-none';
      element.innerHTML = icon;
      element.style.left = `${Math.random() * 100}%`;
      element.style.top = `${Math.random() * 100}%`;
      section.appendChild(element);

      gsap.to(element, {
        y: -30,
        rotation: Math.random() * 360,
        duration: Math.random() * 10 + 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });
  }, []);

  const handleGameSelect = (gameId) => {
    setActiveGame(gameId);
  };

  const handleBackToGames = () => {
    setActiveGame(null);
  };

  const renderActiveGame = () => {
    const game = games.find(g => g.id === activeGame);
    if (!game) return null;

    const GameComponent = game.component;
    return <GameComponent onBack={handleBackToGames} onComplete={handleBackToGames} />;
  };

  if (activeGame) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 py-20">
        <div className="container mx-auto px-6">
          {renderActiveGame()}
        </div>
      </div>
    );
  }

  return (
    <div ref={sectionRef} className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 text-white overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div ref={headerRef} className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Family <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Games</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 leading-relaxed">
              Have fun while learning about our family! Challenge yourself and other family members with these interactive games.
            </p>
          </div>
        </div>

        {/* Floating game icons */}
        <div className="absolute inset-0 overflow-hidden">
          {['🎮', '👾', '🕹️', '🎯'].map((icon, i) => (
            <div
              key={i}
              className="absolute text-4xl opacity-20 animate-float"
              style={{
                left: `${10 + i * 25}%`,
                top: `${20 + (i % 2) * 40}%`,
                animationDelay: `${i * 2}s`
              }}
            >
              {icon}
            </div>
          ))}
        </div>
      </section>

      {/* Games Selection */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div ref={gamesRef} className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Choose Your Game
            </h2>
            <p className="text-xl text-gray-600">Pick a game and start having fun!</p>
          </div>

          {/* Games Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {games.map((game) => (
              <InfoCard
                key={game.id}
                icon={game.icon}
                title={game.title}
                description={game.description}
                color={game.color.split(' ')[0].replace('from-', '')}
                onClick={() => handleGameSelect(game.id)}
                className="transform hover:scale-105 transition-transform duration-300 cursor-pointer h-full"
              >
                <div className="mt-4">
                  <PrimaryButton
                    icon="🎯"
                    onClick={() => handleGameSelect(game.id)}
                    className="w-full bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900"
                  >
                    Play Game
                  </PrimaryButton>
                </div>
              </InfoCard>
            ))}
          </div>

          {/* Family Challenge */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Family Challenge Leaderboard</h3>
            <p className="text-gray-600 mb-6">Compete with family members and see who scores the highest!</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white rounded-2xl p-4 shadow-lg">
                <div className="text-2xl font-bold text-purple-600">1,250</div>
                <div className="text-gray-600">Total Games Played</div>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-lg">
                <div className="text-2xl font-bold text-blue-600">28</div>
                <div className="text-gray-600">Family Members Playing</div>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-lg">
                <div className="text-2xl font-bold text-green-600">4,800</div>
                <div className="text-gray-600">Total Points Earned</div>
              </div>
            </div>

            <PrimaryButton
              icon="🏆"
              onClick={() => handleGameSelect('quiz')}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
            >
              Start Family Challenge
            </PrimaryButton>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GamesSection;