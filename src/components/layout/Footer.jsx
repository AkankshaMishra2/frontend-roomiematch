// src/components/layout/Footer.jsx
import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();
  
  return (
    <footer className="border-t border-border/40 py-6 md:py-0">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4 md:h-16">
        <div className="text-sm text-foreground/70">
          © {year} RoomieMatch. All rights reserved.
        </div>
        
        <div className="flex items-center space-x-6">
          <Link 
            href="/privacy" 
            className="text-sm text-foreground/70 hover:text-primary"
          >
            Privacy
          </Link>
          <Link 
            href="/terms" 
            className="text-sm text-foreground/70 hover:text-primary"
          >
            Terms
          </Link>
          <Link 
            href="/help" 
            className="text-sm text-foreground/70 hover:text-primary"
          >
            Help Center
          </Link>
        </div>
      </div>
    </footer>
  );
}