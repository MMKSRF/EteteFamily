// src/components/sections/Games/FamilyQuiz/QuizGame.jsx
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { quizData, getRandomQuestions } from './quizData';
import QuizQuestion from './QuizQuestion';
import PrimaryButton from '../../../ui/buttons/PrimaryButton';
import IconButton from '../../../ui/buttons/IconButton';

const QuizGame = ({ onBack, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState('intro'); // intro, playing, results
  const [questions, setQuestions] = useState([]);
  // const [selectedCategory, setSelectedCategory] = useState('all');
  const gameRef = useRef(null);

  useEffect(() => {
    // Initialize with random questions
    setQuestions(getRandomQuestions(5));
  }, []);

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

    // Floating background elements
    const floatingElements = ['🎯', '🧠', '⭐', '🏆', '💫', '✨'];
    floatingElements.forEach((element, i) => {
      const el = document.createElement('div');
      el.className = 'absolute text-4xl opacity-20 pointer-events-none';
      el.innerHTML = element;
      el.style.left = `${Math.random() * 100}%`;
      el.style.top = `${Math.random() * 100}%`;
      game.appendChild(el);

      gsap.to(el, {
        y: -40,
        x: Math.random() * 80 - 40,
        rotation: Math.random() * 360,
        duration: Math.random() * 8 + 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 1.5
      });
    });

    return () => {
      // Cleanup
    };
  }, [gameState]);

  const startGame = () => {
    // setSelectedCategory(category);
    setQuestions(getRandomQuestions(5));
    setScore(0);
    setCurrentQuestionIndex(0);
    setGameState('playing');
  };



  //   const startGame = (category = 'all') => {
  //   setSelectedCategory(category);
  //   setQuestions(getRandomQuestions(5));
  //   setScore(0);
  //   setCurrentQuestionIndex(0);
  //   setGameState('playing');
  // };



  const handleAnswer = (isCorrect, points) => {
    if (isCorrect) {
      setScore(prev => prev + points);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setGameState('results');
    }
  };

  const getScoreMessage = () => {
    const percentage = (score / (questions.length * 200)) * 100;
    if (percentage >= 90) return { message: "Family Expert! 🏆", color: "from-yellow-500 to-amber-500" };
    if (percentage >= 70) return { message: "Great Knowledge! ⭐", color: "from-purple-500 to-pink-500" };
    if (percentage >= 50) return { message: "Good Job! 👍", color: "from-blue-500 to-cyan-500" };
    return { message: "Keep Learning! 📚", color: "from-green-500 to-teal-500" };
  };

  const restartGame = () => {
    setGameState('intro');
  };

  if (gameState === 'intro') {
    return (
      <div ref={gameRef} className="relative bg-white rounded-3xl shadow-2xl border-2 border-white/20 p-8 max-w-4xl mx-auto">
        {/* Game Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            {quizData.title}
          </h2>
          <p className="text-xl text-gray-600">{quizData.description}</p>
        </div>

        {/* Category Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {quizData.categories.map(category => (
            <button
              key={category.id}
              onClick={() => startGame(category.id)}
              className={`bg-gradient-to-r ${category.color} text-white rounded-2xl p-6 text-left transform transition-all duration-300 hover:scale-105 hover:shadow-xl`}
            >
              <div className="flex items-center space-x-4">
                <span className="text-4xl">{category.icon}</span>
                <div>
                  <h3 className="text-xl font-bold">{category.name}</h3>
                  <p className="text-white/90">
                    {quizData.questions.filter(q => q.category === category.id).length} questions
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* All Categories Button */}
        <div className="text-center">
          <PrimaryButton
            icon="🎯"
            onClick={() => startGame('all')}
            className="bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900"
            size="lg"
          >
            Start Random Quiz (All Categories)
          </PrimaryButton>
        </div>

        {/* Game Stats */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4">
            <div className="text-2xl font-bold text-purple-600">{quizData.questions.length}</div>
            <div className="text-sm text-gray-600">Total Questions</div>
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-4">
            <div className="text-2xl font-bold text-blue-600">{quizData.categories.length}</div>
            <div className="text-sm text-gray-600">Categories</div>
          </div>
          <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-2px-4">
            <div className="text-2xl font-bold text-green-600">500</div>
            <div className="text-sm text-gray-600">Max Points</div>
          </div>
        </div>

        {/* Back Button */}
        <div className="absolute top-4 left-4">
          <IconButton
            icon="←"
            onClick={onBack}
            className="bg-gradient-to-r from-gray-400 to-gray-600 hover:from-gray-500 hover:to-gray-700"
            tooltip="Back to Games"
          />
        </div>
      </div>
    );
  }

  if (gameState === 'playing' && questions.length > 0) {
    return (
      <div ref={gameRef} className="relative">
        <QuizQuestion
          question={questions[currentQuestionIndex]}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={questions.length}
          onAnswer={handleAnswer}
          onNext={handleNextQuestion}
        />

        {/* Score Display */}
        <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full font-bold shadow-lg">
          Score: {score}
        </div>

        {/* Back Button */}
        <div className="absolute top-4 left-4">
          <IconButton
            icon="←"
            onClick={() => setGameState('intro')}
            className="bg-gradient-to-r from-gray-400 to-gray-600 hover:from-gray-500 hover:to-gray-700"
            tooltip="Back to Menu"
          />
        </div>
      </div>
    );
  }

  if (gameState === 'results') {
    const scoreMessage = getScoreMessage();
    const percentage = Math.round((score / (questions.length * 200)) * 100);

    return (
      <div ref={gameRef} className="relative bg-white rounded-3xl shadow-2xl border-2 border-white/20 p-8 max-w-2xl mx-auto text-center">
        {/* Results Header */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Quiz Complete!
          </h2>
          <div className="text-6xl mb-4">🎉</div>
        </div>

        {/* Score Display */}
        <div className={`bg-gradient-to-r ${scoreMessage.color} text-white rounded-2xl p-8 mb-6 transform transition-all duration-500 hover:scale-105`}>
          <div className="text-6xl font-bold mb-2">{score}</div>
          <div className="text-2xl font-semibold">Points</div>
          <div className="text-lg opacity-90">{percentage}% Correct</div>
        </div>

        {/* Score Message */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">{scoreMessage.message}</h3>
          <p className="text-gray-600">
            You answered {Math.round(questions.length * (percentage / 100))} out of {questions.length} questions correctly.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <PrimaryButton
            icon="🔄"
            onClick={restartGame}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
          >
            Play Again
          </PrimaryButton>
          <PrimaryButton
            icon="🏠"
            onClick={onBack}
            className="bg-gradient-to-r from-gray-500 to-gray-700 hover:from-gray-600 hover:to-gray-800"
          >
            Back to Games
          </PrimaryButton>
          <PrimaryButton
            icon="📊"
            onClick={onComplete}
            className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600"
          >
            View All Results
          </PrimaryButton>
        </div>

        {/* Share Results */}
        <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl">
          <p className="text-gray-700 mb-2">Share your score with family!</p>
          <div className="flex justify-center space-x-4">
            {['📱', '💬', '📧'].map(icon => (
              <IconButton
                key={icon}
                icon={icon}
                className="bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500"
                tooltip="Share Score"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default QuizGame;