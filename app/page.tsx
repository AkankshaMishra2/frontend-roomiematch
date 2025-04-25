// src/pages/index.js
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/layout/Layout';
import { useAuth } from '../hooks/useAuth';

export default function Home() {
  const { user } = useAuth();

  return (
    <Layout>
      <Head>
        <title>RoomieMatch - Find Your Perfect Roommate</title>
        <meta name="description" content="Match with compatible roommates using our fun compatibility quiz and chat system." />
      </Head>

      <section className="px-4 py-16 md:py-24">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <motion.div 
              className="md:w-1/2 mb-10 md:mb-0"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="mb-6">
                <span className="funky-text">Find Your</span>{" "}
                <span className="block">Perfect Roomie</span>
              </h1>
              <p className="text-xl mb-8 text-gray-700 dark:text-gray-300">
                Discover roommates who match your lifestyle, habits, and personality
                with our fun, interactive compatibility system.
              </p>
              <div className="flex flex-wrap gap-4">
                {user ? (
                  <Link href="/dashboard" className="btn-primary">
                    Go to Dashboard
                  </Link>
                ) : (
                  <>
                    <Link href="/auth/signup" className="btn-primary">
                      Sign Up Now
                    </Link>
                    <Link href="/auth/signin" className="btn-secondary">
                      Sign In
                    </Link>
                  </>
                )}
                <Link href="/quiz" className="btn-accent">
                  Try the Quiz
                </Link>
              </div>
            </motion.div>

            <motion.div 
              className="md:w-1/2 flex justify-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-funky-purple to-funky-pink rounded-full blur-3xl opacity-20 animation-float"></div>
                <div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 max-w-md">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <div className="h-12 w-12 rounded-full bg-gradient-to-r from-funky-pink to-funky-purple flex items-center justify-center">
                        <span className="text-white text-xl font-bold">RM</span>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-xl font-bold">RoomieMatch</h3>
                        <p className="text-gray-500 dark:text-gray-400">Your perfect match awaits</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span className="text-2xl mr-4">🏠</span>
                      <div>
                        <h4 className="font-medium">Lifestyle Quiz</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Find compatible roommates</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span className="text-2xl mr-4">💬</span>
                      <div>
                        <h4 className="font-medium">Live Chat</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Connect with potential roomies</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span className="text-2xl mr-4">🎯</span>
                      <div>
                        <h4 className="font-medium">Compatibility Score</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">See how well you match</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 bg-gradient-to-br from-funky-purple/10 via-funky-blue/10 to-funky-teal/10">
        <div className="container mx-auto max-w-6xl text-center">
          <motion.h2 
            className="mb-12 funky-text"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            How RoomieMatch Works
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="h-16 w-16 rounded-full bg-funky-purple/20 flex items-center justify-center text-funky-purple text-2xl mb-4 mx-auto">
                1
              </div>
              <h3 className="text-xl mb-4">Take the "Th!s or That" Quiz</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Answer fun, rapid-fire questions about your lifestyle, habits, and preferences.
              </p>
            </motion.div>
            
            <motion.div 
              className="card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="h-16 w-16 rounded-full bg-funky-pink/20 flex items-center justify-center text-funky-pink text-2xl mb-4 mx-auto">
                2
              </div>
              <h3 className="text-xl mb-4">View Compatibility Scores</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Our algorithm matches you with potential roommates based on your responses.
              </p>
            </motion.div>
            
            <motion.div 
              className="card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="h-16 w-16 rounded-full bg-funky-teal/20 flex items-center justify-center text-funky-teal text-2xl mb-4 mx-auto">
                3
              </div>
              <h3 className="text-xl mb-4">Chat and Connect</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Message your matches, share your mood, and find your perfect roomie!
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="container mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="funky-background rounded-3xl p-10 text-white"
          >
            <h2 className="mb-6">Ready to find your perfect roommate?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of people who have found their ideal living situation through RoomieMatch!
            </p>
            <Link href={user ? "/dashboard" : "/auth/signup"} className="btn bg-white text-funky-purple hover:bg-gray-100">
              {user ? "Go to Dashboard" : "Get Started Free"}
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}