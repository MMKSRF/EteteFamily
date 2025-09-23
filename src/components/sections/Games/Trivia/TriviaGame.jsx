// src/components/sections/Games/Trivia/TriviaGame.jsx
import { useState, useEffect, useRef } from 'react';
// import { gsap } from 'gsap';
import { triviaData } from './triviaData';
import PrimaryButton from '../../../ui/buttons/PrimaryButton';
import IconButton from '../../../ui/buttons/IconButton';

const TriviaGame = ({ onBack }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [gameState, setGameState] = useState('intro');
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
//   const gameRef = useRef(null);
  const timerRef = useRef(null);

  const currentQuestion = triviaData.questions[currentQuestionIndex];

  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timerRef.current);
  }, [gameState, timeLeft]);

  useEffect(() => {
    if (gameState === 'playing') {
      setTimeLeft(currentQuestion.timeLimit);
      setUserAnswer('');
      setShowResult(false);
    }
  }, [currentQuestionIndex, gameState]);

  const startGame = () => {
    setGameState('playing');
    setCurrentQuestionIndex(0);
    setScore(0);
  };

  const handleAnswerSubmit = () => {
    clearInterval(timerRef.current);
    const isCorrect = userAnswer.trim().toLowerCase() === currentQuestion.answer.toLowerCase();
    const timeBonus = Math.floor((timeLeft / currentQuestion.timeLimit) * currentQuestion.points);
    const pointsEarned = isCorrect ? currentQuestion.points + timeBonus : 0;

    setScore(prev => prev + pointsEarned);
    setShowResult(true);

    setTimeout(() => {
      if (currentQuestionIndex < triviaData.questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        setGameState('completed');
      }
    }, 3000);
  };

  const handleTimeUp = () => {
    clearInterval(timerRef.current);
    setShowResult(true);
    setTimeout(() => {
      if (currentQuestionIndex < triviaData.questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        setGameState('completed');
      }
    }, 3000);
  };

  if (gameState === 'intro') {
    return (
      <div className="relative bg-white rounded-3xl shadow-2xl p-8 max-w-2xl mx-auto text-center">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
          {triviaData.title}
        </h2>
        <p className="text-xl text-gray-600 mb-8">{triviaData.description}</p>
        
        <PrimaryButton
          icon="⚡"
          onClick={startGame}
          className="bg-gradient-to-r from-orange-500 to-red-500"
          size="lg"
        >
          Start Trivia
        </PrimaryButton>

        <IconButton
          icon="←"
          onClick={onBack}
          className="absolute top-4 left-4 bg-gradient-to-r from-gray-400 to-gray-600"
          tooltip="Back to Games"
        />
      </div>
    );
  }

  if (gameState === 'playing') {
    return (
      <div className="relative bg-white rounded-3xl shadow-2xl p-8 max-w-2xl mx-auto">
        {/* Timer */}
        <div className="text-center mb-6">
          <div className={`text-4xl font-bold ${
            timeLeft <= 5 ? 'text-red-500 animate-pulse' : 'text-gray-700'
          }`}>
            {timeLeft}s
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-1000 ${
                timeLeft <= 5 ? 'bg-red-500' : 'bg-green-500'
              }`}
              style={{ width: `${(timeLeft / currentQuestion.timeLimit) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question */}
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">{currentQuestion.question}</h3>
          <p className="text-gray-600">Points: {currentQuestion.points} + time bonus</p>
        </div>

        {/* Answer Input */}
        <div className="mb-6">
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Type your answer..."
            className="w-full p-4 border-2 border-gray-200 rounded-2xl text-lg focus:border-purple-500 focus:outline-none"
            disabled={showResult}
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <PrimaryButton
            icon="🎯"
            onClick={handleAnswerSubmit}
            disabled={!userAnswer.trim() || showResult}
            className="bg-gradient-to-r from-purple-500 to-pink-500"
          >
            Submit Answer
          </PrimaryButton>
        </div>

        {/* Results */}
        {showResult && (
          <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl text-center">
            <div className="text-2xl mb-2">⏰ Time Bonus: +{Math.floor((timeLeft / currentQuestion.timeLimit) * currentQuestion.points)}</div>
            <div className="text-lg text-gray-700">Correct answer: {currentQuestion.answer}</div>
          </div>
        )}
      </div>
    );
  }

  if (gameState === 'completed') {
    return (
      <div className="relative bg-white rounded-3xl shadow-2xl p-8 max-w-2xl mx-auto text-center">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-4">
          Trivia Complete! 🎉
        </h2>
        <div className="text-6xl mb-4">🏆</div>
        <div className="text-3xl font-bold text-gray-800 mb-2">{score} Points</div>
        <p className="text-gray-600 mb-6">Great job! You've mastered family trivia.</p>
        
        <div className="flex gap-4 justify-center">
          <PrimaryButton
            icon="🔄"
            onClick={startGame}
            className="bg-gradient-to-r from-orange-500 to-red-500"
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

export default TriviaGame;