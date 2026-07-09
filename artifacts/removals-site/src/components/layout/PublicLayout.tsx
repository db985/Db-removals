import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Mail, MapPin } from "lucide-react";
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
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-accent" />
            <span>0800 123 4567</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-accent" />
            <span>hello@yourcompany.co.uk</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-accent" />
          <span>Serving London & Surrounding Areas</span>
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
              YC
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl leading-none text-primary tracking-tight">YOUR COMPANY</span>
              <span className="text-xs text-muted-foreground font-medium tracking-wider uppercase">Removals & Clearance</span>
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
              <div className="flex items-center gap-3"><Phone className="w-5 h-5 text-primary" /> 0800 123 4567</div>
              <div className="flex items-center gap-3"><Mail className="w-5 h-5 text-primary" /> hello@yourcompany.co.uk</div>
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
                  YC
                </div>
                <span className="font-bold text-xl tracking-tight">YOUR COMPANY</span>
              </div>
              <p className="text-primary-foreground/70 text-sm leading-relaxed mb-6">
                Premium, fully insured local removals and clearance services. We take the stress out of moving day with professional, careful, and friendly service.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-6">Our Services</h3>
              <ul className="space-y-3 text-sm text-primary-foreground/70">
                <li><Link href="/services" className="hover:text-white transition-colors">House Removals</Link></li>
                <li><Link href="/services" className="hover:text-white transition-colors">Furniture Moving</Link></li>
                <li><Link href="/services" className="hover:text-white transition-colors">House Clearances</Link></li>
                <li><Link href="/services" className="hover:text-white transition-colors">Packing Services</Link></li>
                <li><Link href="/services" className="hover:text-white transition-colors">Commercial Moves</Link></li>
                <li><Link href="/services" className="hover:text-white transition-colors">Man & Van</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-6">Quick Links</h3>
              <ul className="space-y-3 text-sm text-primary-foreground/70">
                <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link href="/quote" className="hover:text-white transition-colors">Get a Quote</Link></li>
                <li><Link href="/gallery" className="hover:text-white transition-colors">Gallery</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link href="/admin/login" className="hover:text-white transition-colors">Admin Login</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-6">Contact</h3>
              <ul className="space-y-4 text-sm text-primary-foreground/70">
                <li className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-accent shrink-0" />
                  <span>0800 123 4567<br/><span className="text-xs opacity-70">Mon-Sat, 8am-6pm</span></span>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-accent shrink-0" />
                  <span>hello@yourcompany.co.uk</span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-accent shrink-0" />
                  <span>London & Surrounding Areas<br/><span className="text-xs opacity-70">UK Wide for select jobs</span></span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-primary-foreground/50">
            <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}