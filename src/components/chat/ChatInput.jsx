// src/components/chat/ChatInput.jsx
import { useState } from 'react';
import { SendHorizonal, PlusCircle, Smile } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ChatInput({ onSendMessage, disabled }) {
  const [message, setMessage] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-full pl-4 pr-2 py-1 bg-gray-50 dark:bg-gray-900 focus-within:ring-2 focus-within:ring-funky-purple/60 focus-within:border-transparent">
        <button 
          type="button" 
          className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 mr-1"
          disabled={disabled}
        >
          <PlusCircle size={20} />
        </button>
        
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={disabled ? "Select a contact to start chatting" : "Type a message..."}
          disabled={disabled}
          className="flex-1 bg-transparent border-none focus:outline-none focus:ring-0 text-sm py-2 px-2"
        />
        
        <button 
          type="button" 
          className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 mr-1"
          disabled={disabled}
        >
          <Smile size={20} />
        </button>
        
        <motion.button
          type="submit"
          className="bg-funky-purple hover:bg-funky-purple/90 text-white rounded-full p-2 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!message.trim() || disabled}
          whileTap={{ scale: 0.95 }}
        >
          <SendHorizonal size={18} />
        </motion.button>
      </div>
    </form>
  );
}