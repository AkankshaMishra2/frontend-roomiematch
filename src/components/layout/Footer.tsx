import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center mb-4">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-funky-purple to-funky-pink flex items-center justify-center">
                <span className="text-white font-bold">R</span>
              </div>
              <span className="ml-2 text-xl font-bold">RoomieMatch</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Finding compatible roommates made easy, fun, and efficient.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary" aria-label="Facebook">
                <span className="text-xl">📱</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary" aria-label="Twitter">
                <span className="text-xl">💬</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary" aria-label="Instagram">
                <span className="text-xl">📸</span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Product</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/quiz" className="text-muted-foreground hover:text-primary">
                  Compatibility Quiz
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-muted-foreground hover:text-primary">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/chat" className="text-muted-foreground hover:text-primary">
                  Chat System
                </Link>
              </li>
              <li>
                <Link href="/profiles" className="text-muted-foreground hover:text-primary">
                  Browse Profiles
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-primary">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-muted-foreground hover:text-primary">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-muted-foreground hover:text-primary">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-6 text-sm text-muted-foreground">
          <p>© {currentYear} RoomieMatch. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}