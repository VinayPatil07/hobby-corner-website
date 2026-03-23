import { MapPin, Clock, Phone, Mail, ExternalLink } from 'lucide-react';

export const StoreInfo = () => {
  const hours = [
    { days: 'Mon - Fri', time: '10:00 AM - 8:00 PM' },
    { days: 'Saturday', time: '10:00 AM - 5:30 PM' },
    { days: 'Sunday', time: '12:00 PM - 5:00 PM' },
  ];

  return (
    <section className="bg-soft-gray-blue py-16 border-b-2 border-navy-base relative overflow-hidden z-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT SIDE: TEXT & INFO */}
          <div className="lg:col-span-5 flex flex-col pr-0 relative z-20">
            
            {/* Tag */}
            <div className="inline-block self-start px-3 py-1 bg-white border-2 border-navy-base text-navy-base text-[9px] font-black uppercase tracking-[0.2em] mb-5 shadow-[2px_2px_0px_0px_rgba(10,35,66,1)]">
              Visit the Shop
            </div>
            
            {/* Header */}
            <h2 className="text-4xl font-black text-navy-base uppercase tracking-tighter leading-[1.05] mb-8">
              Location <span className="font-serif italic lowercase text-muted-cerulean text-4xl mx-1">&</span>
              <br />
              <span className="text-tangerine-accent italic">Hours.</span>
            </h2>
            
            {/* INFO BLOCKS */}
            <div className="flex flex-col gap-7">
              
              {/* ADDRESS */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                   <MapPin size={14} strokeWidth={2.5} className="text-navy-base" />
                   <span className="text-[10px] font-black uppercase tracking-[0.2em] text-navy-base">Address</span>
                </div>
                <p className="font-serif text-muted-cerulean text-base leading-relaxed">
                  1660 Sycamore St, <br />
                  Iowa City, IA 52240
                </p>
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=The%20Hobby%20Corner%201606%20Sycamore%20St%2C%20Iowa%20City%2C%20IA%2052240" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.1em] text-tangerine-accent mt-2 hover:underline"
                >
                  Get Directions <ExternalLink size={12} strokeWidth={2.5} />
                </a>
              </div>

              {/* HOURS */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                   <Clock size={14} strokeWidth={2.5} className="text-navy-base" />
                   <span className="text-[10px] font-black uppercase tracking-[0.2em] text-navy-base">Operating Hours</span>
                </div>
                <div className="w-full max-w-sm border-t border-dashed border-navy-base/30">
                  {hours.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center py-2.5 border-b border-dashed border-navy-base/30">
                      <span className="font-black text-navy-base uppercase tracking-[0.1em] text-[10px]">{item.days}</span>
                      <span className="font-serif text-muted-cerulean text-sm">{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CONTACT */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                   <Phone size={14} strokeWidth={2.5} className="text-navy-base" />
                   <span className="text-[10px] font-black uppercase tracking-[0.2em] text-navy-base">Contact</span>
                </div>
                <p className="font-serif text-muted-cerulean text-base mb-1">
                  (319) 338-1788
                </p>
                <div className="flex items-center gap-2">
                  <Mail size={14} strokeWidth={2.5} className="text-navy-base" />
                  <a href="mailto:info@hobbycorner.biz" className="font-serif text-muted-cerulean text-base hover:text-tangerine-accent transition-colors">
                    info@hobbycorner.biz
                  </a>
                </div>
              </div>

            </div>

            {/* THUMBTACKED NOTE */}
            <div className="mt-10 lg:mt-0 lg:absolute lg:right-4 xl:right-8 lg:top-24 w-full sm:w-64 lg:w-48 rotate-[-1deg] lg:rotate-[4deg] bg-white border-2 border-navy-base p-5 shadow-[4px_4px_0px_0px_rgba(10,35,66,1)] flex flex-col z-30 group hover:rotate-0 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(10,35,66,1)] transition-all duration-300">
              {/* Visual Thumbtack */}
              <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-tangerine-accent border-2 border-navy-base shadow-[2px_2px_0px_0px_rgba(10,35,66,1)] z-40 flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-white/60 blur-[0.5px] -mt-0.5 -ml-0.5"></div>
              </div>
              
              <span className="font-black text-tangerine-accent uppercase tracking-[0.2em] text-[10px] mb-1">Note</span>
              <p className="font-serif text-muted-cerulean text-sm leading-snug">
                We are located right through the main cinema doors!
              </p>
            </div>

          </div>

          {/* RIGHT SIDE: MAP */}
          <div className="lg:col-span-7 w-full h-[400px] lg:h-[480px] border-4 border-navy-base shadow-[6px_6px_0px_0px_rgba(10,35,66,1)] relative bg-soft-gray-blue z-10">
            <iframe 
              src="https://maps.google.com/maps?q=The+Hobby+Corner+1660+Sycamore+St,+Iowa+City,+IA+52240&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="absolute inset-0 w-full h-full"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            {/* Map Tag Overlay */}
            <div className="absolute top-4 right-4 bg-white border-2 border-navy-base px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] text-navy-base shadow-[2px_2px_0px_0px_rgba(10,35,66,1)] pointer-events-none">
              Iowa City Marketplace
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};