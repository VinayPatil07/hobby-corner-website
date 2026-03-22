import { ArrowRight, ShoppingCart, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import store from '../assets/store.png';
import paint from '../assets/paint.png';
import figures from '../assets/figures.png';

export const Hero = () => {
  const shopCategories = ['Gunpla', 'Pokémon', 'TCG', 'RPGs', 'Model Kits', 'RC Cars'];

  return (
    <section className="relative bg-soft-gray-blue overflow-hidden border-b-4 border-navy-base">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 lg:pt-12 lg:pb-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 z-40">
            <div className="inline-block px-3 py-1 bg-white border-2 border-navy-base text-navy-base text-[9px] font-black uppercase tracking-[0.2em] mb-8 shadow-[2px_2px_0px_0px_rgba(10,35,66,1)]">
              Est. 1976 • Iowa City Marketplace
            </div>
            
            <h2 className="text-4xl lg:text-6xl font-black text-navy-base leading-[1.0] tracking-tighter uppercase mb-6">
              Discover Your Passion 
              <span className="font-serif italic lowercase text-muted-cerulean text-2xl lg:text-3xl mx-2">at</span> 
              <br />
              <span className="text-tangerine-accent italic">The Hobby Corner.</span>
            </h2>
            
            <p className="text-lg font-serif text-muted-cerulean leading-relaxed mb-10 max-w-md">
              We've got everything you need for your next project, build, or game night. 
              Stop by the shop to say hi or browse our inventory online.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link 
                to="/events"
                className="group relative inline-flex items-center justify-center gap-2 bg-tangerine-accent text-navy-base border-2 border-navy-base px-6 py-2.5 font-black uppercase tracking-[0.12em] text-[11px] transition-all duration-200 shadow-[4px_4px_0px_0px_rgba(10,35,66,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(10,35,66,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
              >
                <Calendar size={14} strokeWidth={3} />
                Events Calendar
                <ArrowRight size={14} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <a 
                href="https://hobbyrising.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center gap-2 bg-white text-navy-base border-2 border-navy-base px-6 py-2.5 font-black uppercase tracking-[0.12em] text-[11px] transition-all duration-200 shadow-[4px_4px_0px_0px_rgba(10,35,66,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(10,35,66,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
              >
                <ShoppingCart size={14} strokeWidth={3} />
                Online Store
              </a>
            </div>

            <div className="pt-8 border-t-2 border-dashed border-navy-base/20">
              {/* FIX: Removed flex-wrap, added overflow-x-auto, and hid the scrollbar */}
              <div 
                className="flex items-center overflow-x-auto whitespace-nowrap w-full pb-2"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {shopCategories.map((category, index) => (
                  <div key={category} className="flex items-center">
                    <span className="text-[10px] font-black uppercase tracking-[0.15em] text-navy-base/60 hover:text-navy-base transition-colors cursor-default">
                      {category}
                    </span>
                    {index < shopCategories.length - 1 && (
                      <span className="mx-3 text-tangerine-accent/40 text-xs">/</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* FIX: Added 'hidden lg:block' to hide the entire image section on mobile */}
          <div className="hidden lg:block lg:col-span-7 relative">
            <div className="relative h-[450px] lg:h-[580px] w-full lg:-mr-12">
              
              {/* IMAGE 1: MAIN SHOP */}
              <div className="absolute top-0 right-0 w-[85%] h-[65%] border-2 border-navy-base bg-white p-1 shadow-[12px_12px_0px_0px_rgba(10,35,66,1)] rotate-[-1deg] z-10 overflow-hidden group hover:rotate-0 hover:-translate-y-2 hover:shadow-[16px_16px_0px_0px_rgba(10,35,66,1)] transition-all duration-500 cursor-pointer">
                <img src={store} alt="Shop Front" className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" />
              </div>
              
              {/* IMAGE 2: FIGURES */}
              <div className="absolute bottom-4 left-0 w-[55%] h-[45%] border-2 border-navy-base bg-white p-1 shadow-[8px_8px_0px_0px_rgba(44,110,154,1)] z-30 rotate-[2deg] overflow-hidden group hover:rotate-0 hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_rgba(44,110,154,1)] transition-all duration-500 cursor-pointer">
                <img src={figures} alt="Technical Figures" className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" />
              </div>

              {/* IMAGE 3: PAINTING */}
              <div className="absolute bottom-16 right-[-10px] w-[40%] h-[35%] border-2 border-navy-base bg-white p-1 shadow-[6px_6px_0px_0px_rgba(255,155,84,1)] z-20 rotate-[-4deg] overflow-hidden hidden lg:block group hover:rotate-0 hover:-translate-y-2 hover:shadow-[10px_10px_0px_0px_rgba(255,155,84,1)] transition-all duration-500 cursor-pointer">
                <img src={paint} alt="Hobby Painting" className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" />
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};  