import { useState, useEffect } from 'react';
import { ShoppingBag, ExternalLink, MapPin, ChevronLeft, ChevronRight, Compass } from 'lucide-react';

import hobbyRisingLogo from '../assets/hobbyrising.png';
import store1 from '../assets/slideshow/store1.png';
import store2 from '../assets/slideshow/store2.png';
import store3 from '../assets/slideshow/store3.png';
import store4 from '../assets/slideshow/store4.png';
import store5 from '../assets/slideshow/store5.png';
import store6 from '../assets/slideshow/store6.png';
import store7 from '../assets/slideshow/store7.png';
import store8 from '../assets/slideshow/store8.png';

const storeImages = [store1, store2, store3, store4, store5, store6, store7, store8];

export const FeaturesAndCommunity = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % storeImages.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + storeImages.length) % storeImages.length);

  useEffect(() => {
    const timer = setInterval(nextImage, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-soft-gray-blue">
      {/* SECTION 1: SHOP EXPERIENCE */}
      <section className="py-16 border-b-2 border-navy-base">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            
            {/* LEFT SIDE: IN-STORE SLIDESHOW & TEXT */}
            {/* FIX: Added order-2 lg:order-1 to push it down on mobile, but keep it left on desktop */}
            <div className="order-2 lg:order-1 flex flex-col border-2 border-navy-base bg-white shadow-[4px_4px_0px_0px_rgba(10,35,66,1)] overflow-hidden">
              {/* Slideshow Area */}
              <div className="h-56 lg:h-60 relative bg-navy-base border-b-2 border-navy-base">
                {storeImages.map((img, index) => (
                  <img 
                    key={index}
                    src={img} 
                    alt={`Hobby Corner Interior ${index + 1}`} 
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${index === currentImage ? 'opacity-100' : 'opacity-0'}`}
                  />
                ))}
                
                {/* Indicators */}
                <div className="absolute bottom-4 left-6 flex gap-1.5 z-20">
                  {storeImages.map((_, i) => (
                    <div key={i} className={`h-1.5 w-5 lg:w-6 border border-navy-base/20 transition-all ${i === currentImage ? 'bg-tangerine-accent' : 'bg-white/40'}`} />
                  ))}
                </div>

                {/* Nav Arrows */}
                <div className="absolute inset-0 flex items-center justify-between px-3 opacity-0 hover:opacity-100 transition-opacity z-10">
                  <button onClick={prevImage} className="bg-white border-2 border-navy-base p-1 hover:bg-tangerine-accent transition-colors">
                    <ChevronLeft size={20} className="text-navy-base" />
                  </button>
                  <button onClick={nextImage} className="bg-white border-2 border-navy-base p-1 hover:bg-tangerine-accent transition-colors">
                    <ChevronRight size={20} className="text-navy-base" />
                  </button>
                </div>
              </div>

              {/* In-Store Text Area */}
              <div className="p-6 lg:p-7 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-2 text-tangerine-accent">
                  <MapPin size={14} strokeWidth={3} />
                  <span className="text-[9px] font-black uppercase tracking-[0.2em]">Iowa City Marketplace</span>
                </div>
                <h3 className="text-xl lg:text-2xl font-black text-navy-base uppercase tracking-tighter leading-[1.0] mb-3">
                  Visit us in Person
                </h3>
                
                <p className="font-serif text-muted-cerulean text-lg leading-relaxed mb-6">
                  We've got everything you need for your next project, build, or game night. Stop by the shop to say hi or browse our inventory online.
                </p>

                {/* VIRTUAL TOUR BUTTON */}
                <a 
                  href="https://www.google.com/local/place/fid/0x87e46a70197a6217:0x51fb6854769d020b/photosphere?iu=https://lh3.googleusercontent.com/gps-cs-s/AHVAweoNg7E2CvweQOilENDwNes7SrJycpPiGw-4rhOzsosDni1HA0lC1S1QE2Mn9GleO_TcymFgte7RC2d3B7O6P-px_cOk6dYBQusXCEwwVZ70YIP07iI2eq8xEzDDb10kdU0s5N89%3Dw160-h106-k-no-pi-10-ya233.44-ro0-fo100&ik=CAoSFkNJSE0wb2dLRUlDQWdJQ3MtSlc5U2c%3D" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-tangerine-accent text-navy-base border-2 border-navy-base px-5 py-2.5 font-black uppercase tracking-[0.12em] text-[11px] transition-all duration-200 shadow-[4px_4px_0px_0px_rgba(10,35,66,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(10,35,66,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none mb-5"
                >
                  <Compass size={14} strokeWidth={3} />
                  Take a Virtual Tour
                </a>

                {/* Dashed Border */}
                <div className="mt-auto pt-4 border-t-2 border-dashed border-navy-base/20 flex items-center justify-between">
                   <span className="text-[9px] font-black uppercase tracking-[0.2em] text-navy-base">1660 Sycamore St</span>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE: HEADER & ONLINE STORE BOX */}
            {/* FIX: Added order-1 lg:order-2 to make this show up FIRST on mobile screens */}
            <div className="order-1 lg:order-2 flex flex-col justify-between h-full">
              {/* Top Text Block */}
              <div className="mb-6 lg:mb-0">
                
                <div className="inline-block self-start px-3 py-1 bg-white border-2 border-navy-base text-navy-base text-[9px] font-black uppercase tracking-[0.2em] mb-6 shadow-[2px_2px_0px_0px_rgba(10,35,66,1)]">
                  Two Ways to Shop • Local & Online
                </div>

                <h2 className="text-3xl lg:text-4xl font-black text-navy-base uppercase tracking-tighter leading-[1.0] mb-5">
                  Shop Locally in Iowa City 
                  <span className="font-serif italic lowercase text-muted-cerulean text-2xl lg:text-3xl mx-2">or</span> 
                  <br />
                  <span className="text-tangerine-accent italic">at our online store.</span>
                </h2>
                
                <p className="font-serif text-muted-cerulean text-lg leading-relaxed mb-6">
                  We've got great deals available on a selection of our newest arrivals and clearance items. 
                  Browse through our online catalog today, make your purchase online and pick it up in the store or have it shipped.
                </p>
                
                <p className="font-serif text-muted-cerulean text-lg leading-relaxed">
                  We're always looking to improve the shopping experience for our customers, so please don't hesitate to let us know if there's anything more we can do to help.
                </p>
              </div>

              {/* Online Store Card */}
              <div className="bg-white border-2 border-navy-base p-6 lg:p-7 shadow-[4px_4px_0px_0px_rgba(255,155,84,1)] mt-auto">
                <div className="flex items-center justify-between mb-6">
                  <img src={hobbyRisingLogo} alt="Hobby Rising" className="h-12 lg:h-14 w-auto object-contain" />
                  <div className="flex items-center gap-2 text-tangerine-accent font-black text-[9px] uppercase tracking-[0.2em]">
                    <ShoppingBag size={14} strokeWidth={3} />
                    24/7
                  </div>
                </div>

                {/* ONLINE STORE BUTTON */}
                <a 
                  href="https://hobbyrising.com" 
                  target="_blank"
                  className="w-full flex items-center justify-center gap-2 bg-navy-base text-white border-2 border-navy-base px-5 py-3 font-black uppercase tracking-[0.12em] text-[11px] transition-all duration-200 shadow-[4px_4px_0px_0px_rgba(10,35,66,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(10,35,66,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
                >
                  Shop Hobby Rising
                  <ExternalLink size={14} className="text-tangerine-accent" />
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};