// src/components/sections/Games/MemoryGame/MemoryGame.jsx
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import MemoryCard from './MemoryCard';
import PrimaryButton from '../../../ui/buttons/PrimaryButton';
import IconButton from '../../../ui/buttons/IconButton';

// Memory game data - family-themed pairs
const memoryCardsData = [
  { id: 1, name: "Carlos", icon: "👴", type: "family" },
  { id: 2, name: "Maria", icon: "👵", type: "family" },
  { id: 3, name: "Antonio", icon: "👨", type: "family" },
  { id: 4, name: "Isabel", icon: "👩", type: "family" },
  { id: 5, name: "Home", icon: "🏠", type: "location" },
  { id: 6, name: "Family", icon: "👨‍👩‍👧‍👦", type: "symbol" },
  { id: 7, name: "Love", icon: "❤️", type: "symbol" },
  { id: 8, name: "Tree", icon: "🌳", type: "symbol" }
];

const MemoryGame = ({ onBack }) => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameState, setGameState] = useState('intro'); // intro, playing, completed
  const [isChecking, setIsChecking] = useState(false);
  const gameRef = useRef(null);

  // Initialize game
  useEffect(() => {
    if (gameState === 'playing') {
      initializeGame();
    }
  }, [gameState]);

  useEffect(() => {
    const game = gameRef.current;
    if (!game) return;

    if (gameState === 'intro') {
      // Intro animation
      gsap.fromTo(game,
        { opacity: 0, scale: 0.8 },
        { 
          opacity: 1, 
          scale: 1, 
          duration: 1, 
          ease: "back.out(1.5)" 
        }
      );
    }

    // Floating elements
    const floatingElements = ['🎴', '🧠', '⭐', '💫'];
    floatingElements.forEach((element) => {
      const el = document.createElement('div');
      el.className = 'absolute text-4xl opacity-20 pointer-events-none';
      el.innerHTML = element;
      el.style.left = `${Math.random() * 100}%`;
      el.style.top = `${Math.random() * 100}%`;
      game.appendChild(el);

      gsap.to(el, {
        y: -30,
        x: Math.random() * 60 - 30,
        rotation: Math.random() * 360,
        duration: Math.random() * 6 + 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });
  }, [gameState]);

  const initializeGame = () => {
    // Create pairs and shuffle
    const gameCards = [...memoryCardsData, ...memoryCardsData]
      .map((card, index) => ({ ...card, uniqueId: index }))
      .sort(() => Math.random() - 0.5);

    setCards(gameCards);
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
  };

  const handleCardClick = (clickedIndex) => {
    if (isChecking || flippedCards.includes(clickedIndex) || matchedCards.includes(cards[clickedIndex].id)) {
      return;
    }

    const newFlippedCards = [...flippedCards, clickedIndex];
    setFlippedCards(newFlippedCards);
    setMoves(moves + 1);

    if (newFlippedCards.length === 2) {
      setIsChecking(true);
      checkForMatch(newFlippedCards);
    }
  };

  const checkForMatch = (flippedIndices) => {
    const [firstIndex, secondIndex] = flippedIndices;
    const firstCard = cards[firstIndex];
    const secondCard = cards[secondIndex];

    if (firstCard.id === secondCard.id) {
      // Match found
      setMatchedCards(prev => [...prev, firstCard.id]);
      setFlippedCards([]);
      setIsChecking(false);

      // Check if game is complete
      if (matchedCards.length + 1 === memoryCardsData.length) {
        setTimeout(() => setGameState('completed'), 1000);
      }
    } else {
      // No match - flip back after delay
      setTimeout(() => {
        setFlippedCards([]);
        setIsChecking(false);
      }, 1000);
    }
  };

  const startGame = () => {
    setGameState('playing');
  };

  const restartGame = () => {
    initializeGame();
    setGameState('playing');
  };

  if (gameState === 'intro') {
    return (
      <div ref={gameRef} className="relative bg-white rounded-3xl shadow-2xl border-2 border-white/20 p-8 max-w-2xl mx-auto text-center">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
          Family Memory Game
        </h2>
        <p className="text-xl text-gray-600 mb-8">Match family members and symbols in this memory challenge!</p>
        
        <div className="grid grid-cols-4 gap-4 mb-8">
          {memoryCardsData.slice(0, 4).map(card => (
            <div key={card.id} className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-4">
              <div className="text-3xl">{card.icon}</div>
            </div>
          ))}
        </div>

        <PrimaryButton
          icon="🎴"
          onClick={startGame}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          size="lg"
        >
          Start Game
        </PrimaryButton>

        <div className="absolute top-4 left-4">
          <IconButton
            icon="←"
            onClick={onBack}
            className="bg-gradient-to-r from-gray-400 to-gray-600"
            tooltip="Back to Games"
          />
        </div>
      </div>
    );
  }

  if (gameState === 'playing') {
    return (
      <div ref={gameRef} className="relative max-w-4xl mx-auto">
        {/* Game Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full font-bold">
              Moves: {moves}
            </div>
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-full font-bold">
              Matched: {matchedCards.length} / {memoryCardsData.length}
            </div>
          </div>

          <IconButton
            icon="🔄"
            onClick={restartGame}
            className="bg-gradient-to-r from-gray-400 to-gray-600"
            tooltip="Restart Game"
          />
        </div>

        {/* Game Grid */}
        <div className="grid grid-cols-4 md:grid-cols-4 gap-4">
          {cards.map((card, index) => (
            <div key={card.uniqueId} className="aspect-square">
              <MemoryCard
                card={card}
                isFlipped={flippedCards.includes(index) || matchedCards.includes(card.id)}
                isMatched={matchedCards.includes(card.id)}
                onClick={() => handleCardClick(index)}
                index={index}
              />
            </div>
          ))}
        </div>

        {/* Back Button */}
        <div className="absolute top-4 left-4">
          <IconButton
            icon="←"
            onClick={() => setGameState('intro')}
            className="bg-gradient-to-r from-gray-400 to-gray-600"
            tooltip="Back to Menu"
          />
        </div>
      </div>
    );
  }

  if (gameState === 'completed') {
    const efficiency = Math.round((memoryCardsData.length / moves) * 100);

    return (
      <div ref={gameRef} className="relative bg-white rounded-3xl shadow-2xl border-2 border-white/20 p-8 max-w-2xl mx-auto text-center">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-4">
          Game Completed! 🎉
        </h2>
        
        <div className="text-6xl mb-6">🏆</div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl p-4">
            <div className="text-2xl font-bold">{moves}</div>
            <div>Total Moves</div>
          </div>
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-2xl p-4">
            <div className="text-2xl font-bold">{efficiency}%</div>
            <div>Efficiency</div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <PrimaryButton
            icon="🔄"
            onClick={restartGame}
            className="bg-gradient-to-r from-purple-500 to-pink-500"
          >
            Play Again
          </PrimaryButton>
          <PrimaryButton
            icon="🏠"
            onClick={onBack}
            className="bg-gradient-to-r from-gray-500 to-gray-700"
          >
            Back to Games
          </PrimaryButton>
        </div>
      </div>
    );
  }

  return null;
};

export default MemoryGame;