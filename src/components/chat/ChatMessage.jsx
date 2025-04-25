// src/components/chat/ChatMessage.jsx
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';

export default function ChatMessage({ message, isOwnMessage }) {
  // Format the timestamp if it exists
  const formattedTime = message.timestamp 
    ? formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })
    : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
    >
      <div 
        className={`max-w-[75%] rounded-2xl px-4 py-2 ${
          isOwnMessage 
            ? 'bg-funky-purple text-white rounded-br-none' 
            : 'bg-gray-200 dark:bg-gray-700 rounded-bl-none'
        }`}
      >
        {!isOwnMessage && (
          <div className="font-medium text-xs mb-1">
            {message.senderName}
          </div>
        )}
        <div>{message.text}</div>
        <div className={`text-xs mt-1 ${isOwnMessage ? 'text-white/70' : 'text-gray-500'}`}>
          {formattedTime}
        </div>
      </div>
    </motion.div>
  );
}
