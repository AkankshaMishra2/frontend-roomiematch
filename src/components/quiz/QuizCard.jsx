// src/components/quiz/QuizCard.jsx
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { ArrowRight } from 'lucide-react';
import Button from '../ui/Button';

export default function QuizCard({ onStartQuiz }) {
  const router = useRouter();
  
  const handleStartQuiz = () => {
    if (onStartQuiz) {
      onStartQuiz();
    } else {
      router.push('/quiz');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="card p-6"
    >
      <div className="flex flex-col items-center text-center py-6">
        <div className="bg-funky-purple/20 dark:bg-funky-purple/30 w-20 h-20 rounded-full flex items-center justify-center mb-6">
          <span className="text-4xl">🏠</span>
        </div>
        
        <h3 className="text-2xl font-bold mb-4">Roommate Compatibility Quiz</h3>
        
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
          Answer 10 quick questions about your living preferences and habits to find your most compatible roommates.
        </p>
        
        <Button
          onClick={handleStartQuiz}
          variant="funky"
          size="lg"
          className="flex items-center"
        >
          Start Quiz <ArrowRight size={16} className="ml-2" />
        </Button>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center text-center">
            <div className="text-xl mb-2">⏱️</div>
            <p className="text-xs text-gray-600 dark:text-gray-400">Takes just 2 minutes</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="text-xl mb-2">🎯</div>
            <p className="text-xs text-gray-600 dark:text-gray-400">Precise matching</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="text-xl mb-2">🔄</div>
            <p className="text-xs text-gray-600 dark:text-gray-400">Update anytime</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}