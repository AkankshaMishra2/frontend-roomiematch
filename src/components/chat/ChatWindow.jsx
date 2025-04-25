// src/components/chat/ChatWindow.jsx
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useChat } from '../../hooks/useChat';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

export default function ChatWindow({ recipientId, recipientName, recipientMood }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { fetchMessages, sendMessage, subscribeToMessages } = useChat();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!user?.uid || !recipientId) return;
    
    const chatId = [user.uid, recipientId].sort().join('-');
    
    const loadMessages = async () => {
      setLoading(true);
      try {
        const initialMessages = await fetchMessages(chatId);
        setMessages(initialMessages);
      } catch (error) {
        console.error("Error loading messages:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadMessages();
    
    // Subscribe to new messages
    const unsubscribe = subscribeToMessages(chatId, (newMessages) => {
      setMessages(newMessages);
    });
    
    return () => unsubscribe();
  }, [user?.uid, recipientId]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (text) => {
    if (!text.trim() || !user?.uid || !recipientId) return;
    
    const chatId = [user.uid, recipientId].sort().join('-');
    
    try {
      await sendMessage(chatId, {
        text,
        senderId: user.uid,
        senderName: user.displayName || 'Anonymous',
        receiverId: recipientId,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex items-center">
        <div className="flex-1">
          <div className="font-medium">{recipientName || 'Select a contact'}</div>
          {recipientMood && (
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <span className="mr-1">{recipientMood.emoji}</span>
              <span>{recipientMood.name}</span>
              {recipientMood.status && <span className="ml-1">- {recipientMood.status}</span>}
            </div>
          )}
        </div>
      </div>
      
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="loader"></div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400">
            <div className="text-5xl mb-4">💬</div>
            <p className="text-center">
              {recipientId 
                ? "No messages yet. Send a message to start the conversation!"
                : "Select a contact to start chatting"}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message, index) => (
              <ChatMessage
                key={message.id || index}
                message={message}
                isOwnMessage={message.senderId === user?.uid}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
      
      {/* Message input */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-800">
        <ChatInput onSendMessage={handleSendMessage} disabled={!recipientId} />
      </div>
    </div>
  );
}