// src/components/dashboard/CompatibilityChart.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/helpers';

export default function CompatibilityChart({ matches }) {
  const [selectedMatch, setSelectedMatch] = useState(null);
  
  if (!matches || matches.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-center p-6 bg-gray-50 dark:bg-gray-900 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
        <div>
          <div className="text-4xl mb-3">🔍</div>
          <h3 className="text-xl font-medium mb-2">No compatibility data yet</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Complete the roommate quiz to see your compatibility with others
          </p>
        </div>
      </div>
    );
  }

  // Sort matches by compatibility score (highest first)
  const sortedMatches = [...matches].sort((a, b) => b.score - a.score);

  return (
    <div className="card">
      <h3 className="text-xl font-semibold mb-4">Compatibility Scores</h3>
      
      <div className="space-y-4">
        {sortedMatches.map((match, index) => (
          <motion.div
            key={match.id}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => setSelectedMatch(selectedMatch === match.id ? null : match.id)}
            className={cn(
              "p-4 rounded-lg cursor-pointer transition-colors",
              selectedMatch === match.id 
                ? "bg-funky-purple/10 dark:bg-funky-purple/20 border border-funky-purple/30" 
                : "border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
            )}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-funky-purple to-funky-pink flex items-center justify-center text-white">
                  {match.name.charAt(0)}
                </div>
                <div>
                  <div className="font-medium">{match.name}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {match.location}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="text-sm font-medium">{match.score}%</div>
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center" 
                  style={{ 
                    background: `conic-gradient(#8b5cf6 ${match.score}%, transparent 0)`,
                    backgroundOrigin: 'border-box',
                  }}
                >
                  <div className="w-8 h-8 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center text-xs font-medium">
                    {match.score}%
                  </div>
                </div>
              </div>
            </div>
            
            {selectedMatch === match.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
                className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
              >
                <div className="text-sm">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="font-medium mb-1">Common Traits</div>
                      <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                        {match.commonTraits.map((trait, i) => (
                          <li key={i} className="flex items-center">
                            <span className="mr-1 text-green-500">✓</span> {trait}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="font-medium mb-1">Differences</div>
                      <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                        {match.differences.map((diff, i) => (
                          <li key={i} className="flex items-center">
                            <span className="mr-1 text-amber-500">•</span> {diff}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-2 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                    <button className="text-sm text-funky-purple hover:underline">
                      Send message
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}