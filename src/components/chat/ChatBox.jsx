/ src/components/chat/ChatBox.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { useAuth } from '../../hooks/useAuth';
import { useChat } from '../../hooks/useChat';

export default function ChatBox({ recipientId, recipientName, onClose }) {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { fetchMessages, sendMessage, subscribeToMessages } = useChat();

  useEffect(() => {
    if (user?.uid && recipientId) {
      const chatId = [user.uid, recipientId].sort().join('-');
      
      const loadMessages = async () => {
        setIsLoading(true);
        try {
          const msgs = await fetchMessages(chatId);
          setMessages(msgs);
        } catch (error) {
          console.error('Error loading messages:', error);
        } finally {
          setIsLoading(false);
        }
      };
      
      loadMessages();
      
      const unsubscribe = subscribeToMessages(chatId, (newMessages) => {
        setMessages(newMessages);
      });
      
      return () => unsubscribe();
    }
  }, [user?.uid, recipientId]);

  const handleSendMessage = async (text) => {
    if (!text.trim() || !user?.uid || !recipientId) return;
    
    const chatId = [user.uid, recipientId].sort().join('-');
    
    try {
      await sendMessage(chatId, {
        text,
        senderId: user.uid,
        senderName: user.displayName || 'You',
        receiverId: recipientId,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-6 right-6 w-[350px] h-[500px] bg-white dark:bg-gray-800 rounded-xl shadow-xl flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700 z-50"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700">
        <div className="font-medium">{recipientName}</div>
        <button 
          onClick={onClose}
          className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <X size={16} />
        </button>
      </div>
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 bg-gray-50 dark:bg-gray-900">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <div className="loader"></div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <div className="text-4xl mb-2">💬</div>
            <p className="text-sm text-center">No messages yet. Send a message to start the conversation!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {messages.map((message, index) => (
              <ChatMessage
                key={message.id || index}
                message={message}
                isOwnMessage={message.senderId === user?.uid}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Input */}
      <div className="p-3 border-t border-gray-200 dark:border-gray-700">
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </motion.div>
  );
}