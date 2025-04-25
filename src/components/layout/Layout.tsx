// src/components/layout/Layout.jsx
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Header from './Header';
import Footer from './Footer';
import { useAuth } from '../../hooks/useAuth';
import { AnimatePresence, motion } from 'framer-motion';

export default function Layout({ children }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { user, loading } = useAuth();
  
  // After mounting, we can safely show the UI
  useEffect(() => setMounted(true), []);
  
  if (!mounted) return null;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <AnimatePresence mode="wait">
        <motion.main 
          className="flex-grow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.main>
      </AnimatePresence>
      
      <Footer />
      
      {/* Background gradient elements */}
      <div className="fixed -z-10 top-0 left-0 right-0 h-screen overflow-hidden">
        <div className="absolute top-0 -left-40 h-[30rem] w-[30rem] bg-funky-purple/30 rounded-full blur-[10rem] dark:bg-funky-purple/20" />
        <div className="absolute bottom-0 -right-40 h-[30rem] w-[30rem] bg-funky-pink/30 rounded-full blur-[10rem] dark:bg-funky-pink/20" />
      </div>
    </div>
  );
}