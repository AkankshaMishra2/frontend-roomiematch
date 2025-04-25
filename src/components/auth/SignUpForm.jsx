// src/components/auth/SignUpForm.jsx
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { User, Mail, Lock, AlertCircle, CheckCircle } from 'lucide-react';

export default function SignUpForm() {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();
  const router = useRouter();
  const returnUrl = router.query.returnUrl || '/dashboard';

  const validatePassword = () => {
    if (password.length < 6) {
      setError('Password must be at least 6