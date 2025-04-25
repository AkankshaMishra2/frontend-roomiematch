// src/components/quiz/QuizQuestion.jsx
import { motion } from 'framer-motion';

export default function QuizQuestion({ question, onAnswer, selectedAnswer }) {
  if (!question) return null;

  return (
    <div className="text-center">
      <h3 className="text-2xl font-bold mb-8">{question.question}</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === option;
          
          return (
            <motion.button
              key={index}
              onClick={() => onAnswer(question.id, option)}
              className={`
                p-6 rounded-xl border-2 transition-all duration-200
                ${isSelected 
                  ? 'border-funky-purple bg-funky-purple/10 dark:bg-funky-purple/20' 
                  : 'border-gray-200 dark:border-gray-700 hover:border-funky-purple/50 hover:bg-funky-purple/5 dark:hover:bg-funky-purple/10'}
              `}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex flex-col items-center justify-center">
                <span className="text-3xl mb-2">
                  {index === 0 ? '👈' : '👉'}
                </span>
                <span className="text-lg font-medium">{option}</span>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}