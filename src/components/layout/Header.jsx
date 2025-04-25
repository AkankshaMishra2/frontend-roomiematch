// src/components/layout/Header.jsx
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import { Menu, X, Sun, Moon, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();
  const { user, signout } = useAuth();
  const router = useRouter();
  
  // After mounting, we can safely show the UI
  useEffect(() => setMounted(true), []);
  
  // Close mobile menu on route change
  useEffect(() => {
    const handleRouteChange = () => setIsMenuOpen(false);
    router.events.on('routeChangeStart', handleRouteChange);
    return () => router.events.off('routeChangeStart', handleRouteChange);
  }, [router]);
  
  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };
  
  const handleSignOut = async () => {
    try {
      await signout();
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  
  // Menu links with active state
  const menuLinks = [
    { href: '/', label: 'Home', showAlways: true },
    { href: '/quiz', label: 'Quiz', showAlways: true },
    { href: '/dashboard', label: 'Dashboard', showWhenAuth: true },
    { href: '/chat', label: 'Messages', showWhenAuth: true },
    { href: '/auth/signin', label: 'Sign In', showWhenNoAuth: true },
    { href: '/auth/signup', label: 'Sign Up', showWhenNoAuth: true },
  ];
  
  const filteredLinks = menuLinks.filter(link => {
    if (link.showAlways) return true;
    if (user && link.showWhenAuth) return true;
    if (!user && link.showWhenNoAuth) return true;
    return false;
  });

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-funky-purple to-funky-pink flex items-center justify-center">
            <span className="text-white text-sm font-bold">RM</span>
          </div>
          <span className="font-bold text-xl">RoomieMatch</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <div className="flex items-center space-x-6">
            {filteredLinks.map(link => (
              <Link 
                key={link.href} 
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  router.pathname === link.href 
                    ? 'text-primary' 
                    : 'text-foreground/70'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          
          <div className="flex items-center space-x-2">
            {mounted && (
              <button
                onClick={toggleTheme}
                className="h-9 w-9 rounded-lg border border-border flex items-center justify-center text-foreground/70 hover:text-primary"
                aria-label="Toggle theme"
              >
                {resolvedTheme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            )}
            
            {user && (
              <button
                onClick={handleSignOut}
                className="h-9 w-9 rounded-lg border border-border flex items-center justify-center text-foreground/70 hover:text-primary"
                aria-label="Sign out"
              >
                <LogOut size={18} />
              </button>
            )}
          </div>
        </nav>
        
        {/* Mobile Menu Button */}
        <button
          className="md:hidden h-9 w-9 rounded-lg border border-border flex items-center justify-center"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t border-border/40 bg-background"
        >
          <div className="container py-4 space-y-3">
            {filteredLinks.map(link => (
              <Link 
                key={link.href} 
                href={link.href}
                className={`block py-2 text-sm font-medium transition-colors hover:text-primary ${
                  router.pathname === link.href 
                    ? 'text-primary' 
                    : 'text-foreground/70'
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            <div className="pt-4 border-t border-border/40 flex items-center justify-between">
              {mounted && (
                <button
                  onClick={toggleTheme}
                  className="flex items-center text-sm space-x-2 text-foreground/70"
                >
                  {resolvedTheme === 'dark' ? (
                    <>
                      <Sun size={16} />
                      <span>Light mode</span>
                    </>
                  ) : (
                    <>
                      <Moon size={16} />
                      <span>Dark mode</span>
                    </>
                  )}
                </button>
              )}
              
              {user && (
                <button
                  onClick={handleSignOut}
                  className="flex items-center text-sm space-x-2 text-foreground/70"
                >
                  <LogOut size={16} />
                  <span>Sign out</span>
                </button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
}