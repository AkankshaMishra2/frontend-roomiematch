
// src/components/dashboard/CompatibilityDashboard.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useAuth } from '../../hooks/useAuth';
import { useQuiz } from '../../hooks/useQuiz';
import CompatibilityChart from './CompatibilityChart';
import MoodWidget from './MoodWidget';
import ResultsCard from './ResultsCard';
import { ArrowRight } from 'lucide-react';

export default function CompatibilityDashboard() {
  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { getMatches, getUserResults } = useQuiz();
  const router = useRouter();
  
  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      
      setIsLoading(true);
      try {
        const userResults = await getUserResults();
        
        if (!userResults) {
          // User hasn't taken the quiz yet
          setIsLoading(false);
          return;
        }
        
        const matchesData = await getMatches();
        setMatches(matchesData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [user]);

  const handleTakeQuiz = () => {
    router.push('/quiz');
  };

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="flex justify-center items-center h-64">
          <div className="loader"></div>
        </div>
      </div>
    );
  }

  if (matches.length === 0) {
    return (
      <div className="container max-w-4xl py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="card"
            >
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="text-5xl mb-6">🏠</div>
                <h2 className="text-2xl font-bold mb-4">Find Your Perfect Roommate</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
                  Take our quick quiz to discover compatible roommates based on your living preferences and habits.
                </p>
                <button
                  onClick={handleTakeQuiz}
                  className="btn-primary flex items-center"
                >
                  Take the Quiz <ArrowRight size={16} className="ml-2" />
                </button>
              </div>
            </motion.div>
          </div>
          
          <div className="md:col-span-1">
            <MoodWidget />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <CompatibilityChart matches={matches} />
          </motion.div>
        </div>
        
        <div className="md:col-span-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <MoodWidget />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="mt-6"
          >
            <ResultsCard />
          </motion.div>
        </div>
      </div>
    </div>
  );
}