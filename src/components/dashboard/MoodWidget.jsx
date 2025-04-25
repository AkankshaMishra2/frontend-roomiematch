// src/components/dashboard/MoodWidget.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useMood } from '../../hooks/useMood';
import { useAuth } from '../../hooks/useAuth';

const moods = [
  { emoji: '😊', name: 'Happy', color: '#FFD700' },
  { emoji: '😴', name: 'Sleepy', color: '#8A2BE2' },
  { emoji: '🤔', name: 'Thoughtful', color: '#1E90FF' },
  { emoji: '😎', name: 'Cool', color: '#00CED1' },
  { emoji: '🥳', name: 'Celebratory', color: '#FF1493' },
  { emoji: '😤', name: 'Frustrated', color: '#FF8C00' },
  { emoji: '🧘', name: 'Zen', color: '#32CD32' },
  { emoji: '🤓', name: 'Focused', color: '#708090' },
];

export default function MoodWidget() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [customStatus, setCustomStatus] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { updateMood, getCurrentMood } = useMood();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const fetchCurrentMood = async () => {
        try {
          const currentMood = await getCurrentMood();
          if (currentMood) {
            setSelectedMood(currentMood.mood);
            setCustomStatus(currentMood.status || '');
          }
        } catch (error) {
          console.error("Error fetching current mood:", error);
        }
      };
      
      fetchCurrentMood();
    }
  }, [user]);

  const handleSubmit = async () => {
    if (!selectedMood) return;
    
    setIsSubmitting(true);
    try {
      await updateMood({
        mood: selectedMood,
        status: customStatus,
        timestamp: new Date().toISOString()
      });
      setIsOpen(false);
    } catch (error) {
      console.error("Error updating mood:", error);
      alert("Failed to update mood. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">My Mood</h3>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-sm bg-funky-purple/10 hover:bg-funky-purple/20 text-funky-purple px-3 py-1 rounded-full transition-colors duration-200"
          >
            {isOpen ? 'Close' : 'Update'}
          </button>
        </div>

        {selectedMood ? (
          <div className="flex items-center space-x-3">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
              style={{ backgroundColor: selectedMood.color + '33' }} // Adding transparency
            >
              {selectedMood.emoji}
            </div>
            <div>
              <div className="font-medium">{selectedMood.name}</div>
              {customStatus && (
                <div className="text-sm text-gray-600 dark:text-gray-400">{customStatus}</div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-gray-500 dark:text-gray-400">
            No mood set yet. Update your mood to let potential roomies know how you're feeling.
          </div>
        )}

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6"
          >
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Select your mood</label>
              <div className="grid grid-cols-4 gap-2">
                {moods.map((mood) => (
                  <button
                    key={mood.name}
                    onClick={() => setSelectedMood(mood)}
                    className={`
                      rounded-lg p-2 flex flex-col items-center justify-center transition-all duration-200
                      ${selectedMood?.name === mood.name 
                        ? 'ring-2 ring-funky-purple ring-offset-2' 
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800'}
                    `}
                    style={{ 
                      backgroundColor: selectedMood?.name === mood.name ? mood.color + '33' : 'transparent' 
                    }}
                  >
                    <span className="text-2xl mb-1">{mood.emoji}</span>
                    <span className="text-xs">{mood.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Custom status (optional)</label>
              <input
                type="text"
                value={customStatus}
                onChange={(e) => setCustomStatus(e.target.value)}
                placeholder="What's on your mind?"
                maxLength={50}
                className="input"
              />
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !selectedMood}
                className={`
                  btn-primary
                  ${(!selectedMood || isSubmitting) ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                {isSubmitting ? 'Updating...' : 'Update Mood'}
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}