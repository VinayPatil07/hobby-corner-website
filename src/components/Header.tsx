import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Youtube, Instagram, Facebook } from 'lucide-react';
import logo from '../assets/logo.png';

export const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();

  // Close mobile menu when a link is clicked
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const controlHeader = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
          setIsVisible(false);
          setIsMenuOpen(false); // Auto-close menu on scroll
        } else {
          setIsVisible(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    window.addEventListener('scroll', controlHeader);
    return () => window.removeEventListener('scroll', controlHeader);
  }, [lastScrollY]);

  const navItems = [
    { name: 'Hobby Con', href: '/hobby-con' },
    { name: 'Events', href: '/events' },
    { name: 'Services', href: '/services' },
    { name: 'Special Orders', href: '/special-orders' },
    { name: 'Blog', href: '/blog' },
    { name: 'FAQ & Support', href: '/faq' },
  ];

  return (
    <>
      <header 
        className={`
          sticky top-0 z-50 w-full bg-navy-base text-white py-5 shadow-xl transition-transform duration-500 ease-in-out border-b-2 border-tangerine-accent/20
          ${isVisible ? 'translate-y-0' : '-translate-y-full'}
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-12">
            
            {/* LOGO SECTION */}
            <Link to="/" className="flex items-center gap-4 shrink-0 hover:opacity-90 transition-opacity">
              <img src={logo} alt="Hobby Corner" className="h-11 w-auto object-contain" />
              <div className="flex flex-col">
                <h1 className="text-xl font-black tracking-tight uppercase leading-none">Hobby Corner</h1>
                <p className="text-[10px] text-soft-gray-blue font-sans font-bold uppercase tracking-[0.25em] mt-1.5 opacity-90">Find Your Hobby</p>
              </div>
            </Link>

            {/* DESKTOP NAV */}
            <nav className="hidden xl:flex items-center space-x-7">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-[11px] font-bold uppercase tracking-widest transition-all duration-300 relative group
                    ${location.pathname === item.href ? 'text-tangerine-accent' : 'text-soft-gray-blue hover:text-tangerine-accent'}`}
                >
                  {item.name}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-tangerine-accent transition-all duration-300 
                    ${location.pathname === item.href ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                </Link>
              ))}
            </nav>

            {/* SOCIALS (Desktop) */}
            <div className="hidden lg:flex items-center gap-6">
              <div className="flex items-center gap-2 text-white border-r border-muted-cerulean/30 pr-6 h-8">
                <Phone size={14} className="text-tangerine-accent" />
                <span className="text-xs font-bold tracking-wider">319-338-1788</span>
              </div>
              <div className="flex items-center gap-4 text-soft-gray-blue">
                <a href="https://discord.gg/XW3FRhNhda" target="_blank" rel="noopener noreferrer" className="hover:text-tangerine-accent transition-all duration-300 transform hover:-translate-y-1">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.196.373.291a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
                </a>
                <a href="https://www.youtube.com/@thehobbycorner208" target="_blank" rel="noopener noreferrer" className="hover:text-tangerine-accent transition-transform hover:-translate-y-0.5"><Youtube size={19} /></a>
                <a href="https://www.instagram.com/thehobbycorner/" target="_blank" rel="noopener noreferrer" className="hover:text-tangerine-accent transition-transform hover:-translate-y-0.5"><Instagram size={18} /></a>
                <a href="https://www.facebook.com/Thehobbycorner/" target="_blank" rel="noopener noreferrer" className="hover:text-tangerine-accent transition-transform hover:-translate-y-0.5"><Facebook size={18} /></a>
              </div>
            </div>

            {/* MOBILE TOGGLE */}
            <div className="xl:hidden">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-tangerine-accent p-2 hover:bg-white/5 rounded transition-colors"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        <div className={`
          absolute top-full left-0 w-full h-screen z-40 bg-navy-base/95 backdrop-blur-md transition-all duration-300 xl:hidden
          ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}
        `}>
          <nav className="flex flex-col items-center pt-16 h-full space-y-8 pb-20">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-xl font-black uppercase tracking-widest text-white hover:text-tangerine-accent transition-colors"
              >
                {item.name}
              </Link>
            ))}
            
            <div className="pt-8 flex items-center gap-8 text-tangerine-accent">
              <a href="https://discord.gg/XW3FRhNhda" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-transform hover:-translate-y-0.5">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.196.373.291a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
              </a>
              <a href="https://www.youtube.com/@thehobbycorner208" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-transform hover:-translate-y-0.5"><Youtube size={24} /></a>
              <a href="https://www.instagram.com/thehobbycorner/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-transform hover:-translate-y-0.5"><Instagram size={24} /></a>
              <a href="https://www.facebook.com/Thehobbycorner/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-transform hover:-translate-y-0.5"><Facebook size={24} /></a>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};