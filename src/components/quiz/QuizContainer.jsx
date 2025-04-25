// src/components/quiz/QuizContainer.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { useAuth } from '../../hooks/useAuth';
import { useQuiz } from '../../hooks/useQuiz';
import QuizQuestion from './QuizQuestion';
import Button from '../ui/Button';

const TOTAL_QUESTIONS = 10;

const questions = [
  {
    id: 1,
    question: "Night owl or early bird?",
    options: ["Night owl", "Early bird"]
  },
  {
    id: 2,
    question: "Clean as you go or deep clean once a week?",
    options: ["Clean as you go", "Deep clean once a week"]
  },
  {
    id: 3,
    question: "Prefer quiet home or social hangout spot?",
    options: ["Quiet home", "Social hangout spot"]
  },
  {
    id: 4,
    question: "Cook at home or order takeout?",
    options: ["Cook at home", "Order takeout"]
  },
  {
    id: 5,
    question: "Temperature: warmer or cooler?",
    options: ["Warmer", "Cooler"]
  },
  {
    id: 6,
    question: "Shower: morning or night?",
    options: ["Morning", "Night"]
  },
  {
    id: 7,
    question: "TV in common areas: on or off?",
    options: ["On", "Off"]
  },
  {
    id: 8,
    question: "Guests over: often or rarely?",
    options: ["Often", "Rarely"]
  },
  {
    id: 9,
    question: "Shared groceries or separate food?",
    options: ["Shared groceries", "Separate food"]
  },
  {
    id: 10,
    question: "Pet friendly or no pets?",
    options: ["Pet friendly", "No pets"]
  }
];

export default function QuizContainer() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const { submitQuizResults } = useQuiz();
  const router = useRouter();

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
    
    // Move to next question with a slight delay for animation
    setTimeout(() => {
      if (currentQuestionIndex < TOTAL_QUESTIONS - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        setShowResults(true);
      }
    }, 300);
  };

  const handleSubmit = async () => {
    if (!user) {
      // If not logged in, prompt to sign up
      router.push('/auth/signup?returnUrl=/quiz');
      return;
    }

    setIsSubmitting(true);
    try {
      await submitQuizResults(answers);
      router.push('/dashboard');
    } catch (error) {
      console.error("Error submitting quiz:", error);
      alert("There was an error submitting your quiz. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const restartQuiz = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setShowResults(false);
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="card overflow-hidden">
        {!showResults ? (
          <>
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-lg font-medium">
                  Question {currentQuestionIndex + 1} of {TOTAL_QUESTIONS}
                </span>
                <span className="text-sm text-gray-500">
                  {Math.round(((currentQuestionIndex + 1) / TOTAL_QUESTIONS) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-funky-purple to-funky-pink h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestionIndex + 1) / TOTAL_QUESTIONS) * 100}%` }}
                ></div>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestionIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <QuizQuestion 
                  question={questions[currentQuestionIndex]}
                  onAnswer={handleAnswer}
                  selectedAnswer={answers[questions[currentQuestionIndex].id]}
                />
              </motion.div>
            </AnimatePresence>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="py-6 px-2">
              <div className="mb-6 h-32 w-32 mx-auto bg-funky-purple/20 rounded-full flex items-center justify-center">
                <span className="text-5xl">🎉</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Quiz Completed!</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                You've answered all {TOTAL_QUESTIONS} questions. Ready to see your compatibility matches?
              </p>
              <div className="flex flex-col space-y-4">
                <Button 
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="btn-primary w-full"
                >
                  {isSubmitting ? 'Submitting...' : user ? 'See My Matches' : 'Sign Up to See Matches'}
                </Button>
                <Button 
                  onClick={restartQuiz}
                  className="btn border border-gray-300 dark:border-gray-700 bg-transparent text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Restart Quiz
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}