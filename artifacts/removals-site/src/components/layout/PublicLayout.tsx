import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Mail, MapPin, Facebook } from "lucide-react";
import { useState, useEffect } from "react";

export function PublicLayout({ children }: { children: ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-accent selection:text-white">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground py-2 px-4 md:px-8 text-sm hidden md:flex justify-between items-center z-50 relative">
        <div className="flex items-center gap-6">
          <a href="tel:07711961375" className="flex items-center gap-2 hover:text-accent transition-colors">
            <Phone className="w-4 h-4 text-accent" />
            <span>07711 961 375</span>
          </a>
          <a href="https://www.facebook.com/share/193veY3mhT/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-accent transition-colors">
            <Facebook className="w-4 h-4 text-accent" />
            <span>Message us on Facebook</span>
          </a>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-accent" />
          <span>Woolavington &amp; Surrounding Areas</span>
        </div>
      </div>

      {/* Main Navigation */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm py-3"
            : "bg-white py-5"
        }`}
      >
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl tracking-tighter">
              DB
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl leading-none text-primary tracking-tight">DB Removals</span>
              <span className="text-xs text-muted-foreground font-medium tracking-wider uppercase">DB &amp; Family Man and a Van</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link href="/" className={`text-sm font-semibold transition-colors hover:text-accent ${location === '/' ? 'text-accent' : 'text-foreground/80'}`}>Home</Link>
            <Link href="/services" className={`text-sm font-semibold transition-colors hover:text-accent ${location === '/services' ? 'text-accent' : 'text-foreground/80'}`}>Services</Link>
            <Link href="/gallery" className={`text-sm font-semibold transition-colors hover:text-accent ${location === '/gallery' ? 'text-accent' : 'text-foreground/80'}`}>Gallery</Link>
            <Link href="/contact" className={`text-sm font-semibold transition-colors hover:text-accent ${location === '/contact' ? 'text-accent' : 'text-foreground/80'}`}>Contact</Link>
          </nav>

          <div className="hidden lg:flex">
            <Button asChild size="lg" className="rounded-full shadow-md font-semibold tracking-wide">
              <Link href="/quote">Get a Free Quote</Link>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[72px] z-30 bg-white flex flex-col p-6 animate-in slide-in-from-top-4 duration-300 lg:hidden">
          <nav className="flex flex-col gap-6 text-lg font-medium">
            <Link href="/" className="py-2 border-b border-border">Home</Link>
            <Link href="/services" className="py-2 border-b border-border">Services</Link>
            <Link href="/gallery" className="py-2 border-b border-border">Gallery</Link>
            <Link href="/contact" className="py-2 border-b border-border">Contact</Link>
          </nav>
          <div className="mt-8 flex flex-col gap-4">
            <Button asChild size="lg" className="w-full rounded-full">
              <Link href="/quote">Get a Free Quote</Link>
            </Button>
            <div className="mt-8 flex flex-col gap-4 text-sm text-muted-foreground">
              <a href="tel:07711961375" className="flex items-center gap-3 hover:text-primary transition-colors">
                <Phone className="w-5 h-5 text-primary" /> 07711 961 375
              </a>
              <a href="https://www.facebook.com/share/193veY3mhT/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-primary transition-colors">
                <Facebook className="w-5 h-5 text-primary" /> Message us on Facebook
              </a>
            </div>
          </div>
        </div>
      )}

      <main className="flex-1 flex flex-col">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-white text-primary rounded flex items-center justify-center font-bold text-lg">
                  DB
                </div>
                <span className="font-bold text-xl tracking-tight">DB Removals</span>
              </div>
              <p className="text-primary-foreground/70 text-sm leading-relaxed mb-6">
                DB &amp; Family Man and a Van. Fully licensed, affordable, and reliable removals, clearances, and more across Woolavington and the surrounding areas.
              </p>
              <a
                href="https://www.facebook.com/share/193veY3mhT/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-white transition-colors"
              >
                <Facebook className="w-5 h-5 text-accent" />
                DB Removals on Facebook
              </a>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-6">Our Services</h3>
              <ul className="space-y-3 text-sm text-primary-foreground/70">
                <li><Link href="/services" className="hover:text-white transition-colors">House Removals</Link></li>
                <li><Link href="/services" className="hover:text-white transition-colors">House Clearances</Link></li>
                <li><Link href="/services" className="hover:text-white transition-colors">Rubbish Removal</Link></li>
                <li><Link href="/services" className="hover:text-white transition-colors">Scrap Metal Collection</Link></li>
                <li><Link href="/services" className="hover:text-white transition-colors">Garden Clearance &amp; Lawn Care</Link></li>
                <li><Link href="/services" className="hover:text-white transition-colors">Man &amp; Van</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-6">Quick Links</h3>
              <ul className="space-y-3 text-sm text-primary-foreground/70">
                <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link href="/quote" className="hover:text-white transition-colors">Get a Free Quote</Link></li>
                <li><Link href="/gallery" className="hover:text-white transition-colors">Our Work</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link href="/admin/login" className="hover:text-white transition-colors">Admin Login</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-6">Contact</h3>
              <ul className="space-y-4 text-sm text-primary-foreground/70">
                <li className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-accent shrink-0" />
                  <a href="tel:07711961375" className="hover:text-white transition-colors">
                    07711 961 375<br /><span className="text-xs opacity-70">Call for a free quote</span>
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Facebook className="w-5 h-5 text-accent shrink-0" />
                  <a href="https://www.facebook.com/share/193veY3mhT/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                    Message DB Removals<br /><span className="text-xs opacity-70">on Facebook</span>
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-accent shrink-0" />
                  <span>Woolavington &amp; Surrounding Areas<br /><span className="text-xs opacity-70">Long &amp; short distance available</span></span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-primary-foreground/50">
            <p>&copy; {new Date().getFullYear()} DB Removals — DB &amp; Family Man and a Van. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
