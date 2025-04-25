// src/components/dashboard/ResultsCard.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useQuiz } from '../../hooks/useQuiz';
import { useAuth } from '../../hooks/useAuth';
import { ArrowRight } from 'lucide-react';

export default function ResultsCard() {
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { getUserResults } = useQuiz();
  const { user } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    const fetchResults = async () => {
      if (!user) return;
      
      try {
        const data = await getUserResults();
        setResults(data);
      } catch (error) {
        console.error("Error fetching quiz results:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchResults();
  }, [user]);

  const handleRetakeQuiz = () => {
    router.push('/quiz');
  };

  if (isLoading) {
    return (
      <div className="card p-6 flex items-center justify-center h-40">
        <div className="loader"></div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="card p-6">
        <div className="text-center py-4">
          <div className="text-3xl mb-3">❓</div>
          <h3 className="font-medium mb-2">No quiz results</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Take the roommate quiz to see your preferences
          </p>
          <button 
            onClick={handleRetakeQuiz}
            className="text-sm text-funky-purple hover:underline flex items-center justify-center mx-auto"
          >
            Take Quiz <ArrowRight size={14} className="ml-1" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card p-6">
      <h3 className="text-xl font-semibold mb-4">Your Results</h3>
      
      <div className="space-y-3">
        {Object.entries(results?.answers || {}).map(([questionId, answer]) => {
          // Match question text from question ID
          const questionText = getQuestionText(questionId);
          
          return (
            <div key={questionId} className="flex justify-between items-center">
              <div className="text-sm text-gray-700 dark:text-gray-300">{questionText}</div>
              <div className="text-sm font-medium px-3 py-1 bg-funky-purple/10 dark:bg-funky-purple/20 text-funky-purple rounded-full">
                {answer}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <button 
          onClick={handleRetakeQuiz}
          className="text-sm text-funky-purple hover:underline flex items-center"
        >
          Retake Quiz <ArrowRight size={14} className="ml-1" />
        </button>
      </div>
    </div>
  );
}

// Helper function to get question text from ID
function getQuestionText(id) {
  const questions = {
    "1": "Night owl or early bird?",
    "2": "Clean as you go or deep clean?",
    "3": "Quiet home or social spot?",
    "4": "Cook at home or takeout?", 
    "5": "Temperature preference",
    "6": "Shower time preference",
    "7": "TV in common areas",
    "8": "Guests frequency",
    "9": "Grocery arrangement",
    "10": "Pet preference"
  };
  
  return questions[id] || `Question ${id}`;
}