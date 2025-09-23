// src/components/sections/Games/FamilyQuiz/QuizQuestion.jsx
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import PrimaryButton from '../../../ui/buttons/PrimaryButton';
import { quizData } from './quizData';
import IconButton from '../../../ui/buttons/IconButton';

const QuizQuestion = ({ 
  question, 
  questionNumber, 
  totalQuestions, 
  onAnswer, 
  onNext 
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const questionRef = useRef(null);
  const optionsRef = useRef([]);

  useEffect(() => {
    if (!questionRef.current) return;

    // Question entrance animation
    const tl = gsap.timeline();
    tl.fromTo(questionRef.current,
      { opacity: 0, y: 50, scale: 0.9 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        duration: 0.8, 
        ease: "back.out(1.5)" 
      }
    )
    .fromTo(optionsRef.current,
      { opacity: 0, x: -100 },
      { 
        opacity: 1, 
        x: 0, 
        duration: 0.6, 
        stagger: 0.1, 
        ease: "power2.out" 
      },
      "-=0.4"
    );

    // Continuous floating animation for question card
    gsap.to(questionRef.current, {
      y: -5,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    return () => {
      tl.kill();
    };
  }, [question]);

  const handleAnswerSelect = (answerIndex) => {
    if (showResult) return;

    setSelectedAnswer(answerIndex);
    
    // Animate the selected option
    const optionElement = optionsRef.current[answerIndex];
    if (optionElement) {
      gsap.to(optionElement, {
        scale: 1.05,
        duration: 0.2,
        ease: "power2.out"
      });
    }

    // Check if correct
    const correct = answerIndex === question.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);

    // Animate result
    setTimeout(() => {
      if (optionElement) {
        gsap.to(optionElement, {
          backgroundColor: correct ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
          borderColor: correct ? 'rgb(34, 197, 94)' : 'rgb(239, 68, 68)',
          duration: 0.5
        });
      }

      // Show correct answer if wrong
      if (!correct) {
        const correctElement = optionsRef.current[question.correctAnswer];
        if (correctElement) {
          gsap.to(correctElement, {
            backgroundColor: 'rgba(34, 197, 94, 0.2)',
            borderColor: 'rgb(34, 197, 94)',
            duration: 0.5,
            delay: 0.5
          });
        }
      }

      // Trigger confetti if correct
      if (correct) {
        triggerConfetti();
      }

      // Call onAnswer after animation
      setTimeout(() => onAnswer(correct, question.points), 1000);
    }, 500);
  };

  const triggerConfetti = () => {
    // Create confetti elements
    for (let i = 0; i < 20; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'absolute text-2xl pointer-events-none';
      confetti.innerHTML = ['🎉', '✨', '🌟', '💫'][Math.floor(Math.random() * 4)];
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.top = `${Math.random() * 100}%`;
      questionRef.current?.appendChild(confetti);

      gsap.to(confetti, {
        y: -100,
        x: Math.random() * 100 - 50,
        rotation: 360,
        opacity: 0,
        duration: 2,
        ease: "power2.out",
        onComplete: () => confetti.remove()
      });
    }
  };

  const getDifficultyColor = () => {
    switch (question.difficulty) {
      case 'easy': return 'from-green-500 to-emerald-500';
      case 'medium': return 'from-yellow-500 to-amber-500';
      case 'hard': return 'from-red-500 to-pink-500';
      default: return 'from-gray-500 to-gray-700';
    }
  };

  const getDifficultyText = () => {
    switch (question.difficulty) {
      case 'easy': return 'Easy';
      case 'medium': return 'Medium';
      case 'hard': return 'Hard';
      default: return 'Unknown';
    }
  };

  return (
    <div 
      ref={questionRef}
      className="relative bg-white rounded-3xl shadow-2xl border-2 border-white/20 p-8 max-w-2xl mx-auto"
    >
      {/* Question Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className={`bg-gradient-to-r ${getDifficultyColor()} text-white px-4 py-2 rounded-full font-bold`}>
            {getDifficultyText()}
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full font-bold">
            {question.points} pts
          </div>
        </div>
        <div className="text-lg font-semibold text-gray-600">
          {questionNumber} / {totalQuestions}
        </div>
      </div>

      {/* Question Text */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-4 leading-relaxed">
          {question.question}
        </h3>
        
        {/* Category Badge */}
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-gray-100 to-gray-200 px-3 py-1 rounded-full">
          <span>{quizData.categories.find(cat => cat.id === question.category)?.icon}</span>
          <span className="text-sm font-medium text-gray-700">
            {quizData.categories.find(cat => cat.id === question.category)?.name}
          </span>
        </div>
      </div>

      {/* Answer Options */}
      <div className="space-y-4 mb-8">
        {question.options.map((option, index) => (
          <button
            key={index}
            ref={el => optionsRef.current[index] = el}
            onClick={() => handleAnswerSelect(index)}
            disabled={showResult}
            className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
              selectedAnswer === index 
                ? 'border-purple-500 bg-purple-50' 
                : 'border-gray-200 bg-gray-50 hover:border-purple-300'
            } ${showResult ? 'cursor-default' : 'cursor-pointer'}`}
          >
            <div className="flex items-center space-x-4">
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                selectedAnswer === index 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                  : 'bg-gray-200 text-gray-700'
              }`}>
                {String.fromCharCode(65 + index)}
              </div>
              <span className="text-lg font-medium text-gray-800">{option}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Result Display */}
      {showResult && (
        <div className={`p-4 rounded-2xl mb-6 animate-fadeIn ${
          isCorrect 
            ? 'bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200' 
            : 'bg-gradient-to-r from-red-50 to-pink-50 border border-red-200'
        }`}>
          <div className="flex items-center space-x-3">
            <div className={`text-2xl ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
              {isCorrect ? '✅' : '❌'}
            </div>
            <div>
              <h4 className={`font-bold ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                {isCorrect ? 'Correct!' : 'Not quite!'}
              </h4>
              <p className="text-gray-700">{question.explanation}</p>
            </div>
          </div>
        </div>
      )}

      {/* Next Button */}
      {showResult && (
        <div className="flex justify-center">
          <PrimaryButton
            icon="➡️"
            onClick={onNext}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            {questionNumber === totalQuestions ? 'See Results' : 'Next Question'}
          </PrimaryButton>
        </div>
      )}

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
        <div 
          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
        ></div>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute -top-4 -right-4 opacity-0 hover:opacity-100 transition-opacity duration-500">
        <div className="text-3xl animate-bounce">💡</div>
      </div>
    </div>
  );
};

export default QuizQuestion;