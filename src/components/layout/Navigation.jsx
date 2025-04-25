// src/components/layout/Navigation.jsx
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../../hooks/useAuth';

export default function Navigation({ isMobile = false, onLinkClick }) {
  const router = useRouter();
  const { user } = useAuth();
  
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

  // Mobile view
  if (isMobile) {
    return (
      <div className="py-4 space-y-3">
        {filteredLinks.map(link => (
          <Link 
            key={link.href} 
            href={link.href}
            onClick={onLinkClick}
            className={`block py-2 text-sm font-medium transition-colors hover:text-primary ${
              router.pathname === link.href 
                ? 'text-primary' 
                : 'text-foreground/70'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    );
  }
  
  // Desktop view
  return (
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
  );
}