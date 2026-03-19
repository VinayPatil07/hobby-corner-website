import { Phone, Youtube, Instagram, Facebook, ArrowRight } from 'lucide-react';
import logo from '../assets/logo.png';

export const Footer = () => {
  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Events', href: '/events' },
    { name: 'Services', href: '/services' },
    { name: 'Special Orders', href: '/special-orders' },
    { name: 'Blog', href: '/blog' },
    { name: 'FAQ & Support', href: '/faq' },
  ];

  return (
    <footer className="bg-navy-base text-white pt-16 pb-8 border-t-4 border-tangerine-accent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          
          {/* COLUMN 1: BRANDING & SOCIALS */}
          <div className="lg:col-span-4 space-y-8">
            <div className="flex items-center gap-4">
              <img src={logo} alt="Hobby Corner" className="h-12 w-auto object-contain" />
              <div className="flex flex-col">
                <h2 className="text-2xl font-black tracking-tight uppercase leading-none">
                  Hobby Corner
                </h2>
                <p className="text-[10px] text-soft-gray-blue font-sans font-bold uppercase tracking-[0.25em] mt-2 opacity-90">
                  Find Your Hobby
                </p>
              </div>
            </div>
            
            <p className="font-serif text-soft-gray-blue text-base leading-relaxed max-w-sm">
              Serving the Iowa City community since 1976. Your foundational hub for model builders, 
              tabletop gamers, and RC enthusiasts.
            </p>

            <div className="flex items-center gap-5 text-soft-gray-blue">
              <a href="https://discord.gg/XW3FRhNhda" className="hover:text-tangerine-accent transition-all duration-300 transform hover:-translate-y-1">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.196.373.291a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
              </a>
              <a href="https://www.youtube.com/@thehobbycorner208" className="hover:text-tangerine-accent transition-all duration-300 transform hover:-translate-y-1"><Youtube size={22} /></a>
              <a href="https://www.instagram.com/thehobbycorner/" className="hover:text-tangerine-accent transition-all duration-300 transform hover:-translate-y-1"><Instagram size={21} /></a>
              <a href="https://www.facebook.com/Thehobbycorner/" className="hover:text-tangerine-accent transition-all duration-300 transform hover:-translate-y-1"><Facebook size={21} /></a>
            </div>
          </div>

          {/* COLUMN 2: QUICK LINKS */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white mb-6 border-b border-muted-cerulean/30 pb-2">
              Navigation
            </h4>
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-[11px] font-bold uppercase tracking-widest text-soft-gray-blue hover:text-tangerine-accent transition-colors flex items-center group"
                >
                  <ArrowRight size={10} className="mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  {item.name}
                </a>
              ))}
            </nav>
          </div>

          {/* COLUMN 3: STORE INFO */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white mb-6 border-b border-muted-cerulean/30 pb-2">
              Visit The Shop
            </h4>
            <div className="space-y-4">
              <p className="font-serif text-soft-gray-blue text-base">
                1606 Sycamore St.<br />
                Iowa City, IA 52240
              </p>
              <p className="text-[10px] font-black uppercase tracking-widest text-tangerine-accent leading-tight">
                Located inside the Iowa City Marketplace
              </p>
              <div className="flex items-center gap-3 pt-2 text-white">
                <div className="bg-navy-base border border-muted-cerulean/30 p-2">
                  <Phone size={14} className="text-tangerine-accent" />
                </div>
                <span className="text-sm font-bold tracking-wider">319-338-1788</span>
              </div>
            </div>
          </div>

          {/* COLUMN 4: HOURS */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white mb-6 border-b border-muted-cerulean/30 pb-2">
              Store Hours
            </h4>
            <ul className="text-[11px] font-bold uppercase tracking-widest space-y-3 text-soft-gray-blue">
              <li className="flex justify-between border-b border-white/5 pb-1">
                <span>Mon - Fri</span>
                <span className="text-white">10:00 - 7:00</span>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-1">
                <span>Saturday</span>
                <span className="text-white">10:00 - 5:30</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span className="text-white">12:00 - 5:00</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* BOTTOM BAR */}
        <div className="pt-8 border-t border-muted-cerulean/20 flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] uppercase tracking-[0.3em] font-black text-soft-gray-blue/60">
          <p>© 2026 The Hobby Corner. Established 1976.</p>
          <div className="flex space-x-8">
            <a href="/privacy" className="hover:text-tangerine-accent transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-tangerine-accent transition-colors">Terms of Service</a>
            <span className="text-muted-cerulean/40">Design by Vinay Patil</span>
          </div>
        </div>
      </div>
    </footer>
  );
};