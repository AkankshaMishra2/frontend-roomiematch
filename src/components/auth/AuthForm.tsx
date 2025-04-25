// src/components/auth/AuthForm.tsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

interface AuthFormProps {
  initialMode?: 'signin' | 'signup';
}

export default function AuthForm({ initialMode = 'signin' }: AuthFormProps) {
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>(initialMode);

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        class="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700"
      >
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setAuthMode('signin')}
            className={`flex-1 py-4 text-center transition-colors ${
              authMode === 'signin'
                ? 'bg-gray-100 dark:bg-gray-700 font-semibold text-primary'
                : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setAuthMode('signup')}
            className={`flex-1 py-4 text-center transition-colors ${
              authMode === 'signup'
                ? 'bg-gray-100 dark:bg-gray-700 font-semibold text-primary'
                : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
            }`}
          >
            Sign Up
          </button>
        </div>

        <div className="p-6">
          {authMode === 'signin' ? <SignInForm /> : <SignUpForm />}
        </div>
      </motion.div>
    </div>
  );
}