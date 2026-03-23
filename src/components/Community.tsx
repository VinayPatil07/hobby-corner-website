import { ArrowRight, CalendarDays, Users, Swords, Gamepad2, Bookmark } from 'lucide-react';
import { Link } from 'react-router-dom';

import BGN from '../assets/BGN.png';
import BT from '../assets/BT.png';
import OG from '../assets/OG.png';

export const Community = () => {
  const blogs = [
    { title: "A Gamer's Glossary", desc: "Decoding the lingo of the table." },
    { title: "Special Orders", desc: "How to get that rare kit you've been hunting." },
    { title: "32,000 Pieces of Fun", desc: "Our journey through the world's largest puzzle." }
  ];

  return (
    <section className="bg-soft-gray-blue py-16 border-b-2 border-navy-base relative overflow-hidden z-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          <div className="lg:col-span-5 flex flex-col items-start">
            
            <div className="inline-block px-3 py-1 bg-white border-2 border-navy-base text-navy-base text-[9px] font-black uppercase tracking-[0.2em] mb-6 shadow-[3px_3px_0px_0px_rgba(10,35,66,1)]">
              More Than Just A Store
            </div>
            
            <h2 className="text-3xl lg:text-4xl font-black text-navy-base uppercase tracking-tighter leading-[1.0] mb-5">
              Pull up a chair 
              <span className="font-serif italic lowercase text-muted-cerulean text-2xl lg:text-3xl mx-2">and</span>
              <br className="hidden lg:block" />
              <span className="text-tangerine-accent italic">Join the Community.</span>
            </h2>
            
            <p className="font-serif text-muted-cerulean text-lg leading-relaxed mb-8">
              Our dedicated game room hosts a weekly schedule of tabletop campaigns, board game nights, and collaborative building sessions. Whether you're a veteran or just starting out, there's a seat at the table for you.
            </p>

            <Link 
              to="/events" 
              className="group relative inline-flex items-center justify-center gap-2 bg-tangerine-accent text-navy-base border-2 border-navy-base px-5 py-3 font-black uppercase tracking-[0.12em] text-[11px] transition-all duration-200 shadow-[4px_4px_0px_0px_rgba(10,35,66,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(10,35,66,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none w-full sm:w-auto mb-12"
            >
              <CalendarDays size={14} strokeWidth={3} />
              View More Events & Calendar
              <ArrowRight size={14} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
            </Link>

            <div className="relative w-full max-w-sm group">
              <div className="absolute -top-3 left-12 w-16 h-7 bg-white/60 border border-navy-base/10 shadow-sm rotate-[-3deg] z-20"></div>
              
              <div className="bg-[#fdfcf5] border-2 border-navy-base p-6 shadow-[4px_4px_0px_0px_rgba(10,35,66,1)] rotate-[-1deg] group-hover:rotate-0 transition-all duration-300">
                
                <div className="relative inline-block mb-6">
                  <div className="absolute inset-x-0 bottom-0 h-3 bg-tangerine-accent/20 -rotate-1"></div>
                  <div className="relative flex items-center gap-2 px-1">
                    <Bookmark size={14} strokeWidth={3} className="text-tangerine-accent" />
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-navy-base">
                      The Hobby Blog
                    </h4>
                  </div>
                </div>
                
                <div className="flex flex-col gap-5">
                  {blogs.map((blog, idx) => (
                    <a key={idx} href="#" className="group/item block transition-all">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex flex-col">
                          <span className="font-serif italic text-navy-base text-lg group-hover/item:text-tangerine-accent transition-colors leading-tight">
                            {blog.title}
                          </span>
                        </div>
                        <ArrowRight size={14} strokeWidth={3} className="text-tangerine-accent opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all shrink-0" />
                      </div>
                      {idx < blogs.length - 1 && (
                        <div className="w-full mt-5 border-b border-navy-base/10"></div>
                      )}
                    </a>
                  ))}
                </div>

                <div className="mt-8 flex justify-between items-center opacity-30 border-t border-navy-base/10 pt-2">
                   <span className="text-[7px] font-black uppercase tracking-widest italic leading-none">The Morning Dispatch</span>
                   <span className="text-[7px] font-black uppercase tracking-widest leading-none">Page 04</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 pt-10 lg:pt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-10 relative items-start">
              
              <div className="group relative bg-white border-2 border-navy-base shadow-[6px_6px_0px_0px_rgba(10,35,66,1)] flex flex-col rotate-[-2deg] hover:rotate-0 hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_rgba(10,35,66,1)] transition-all duration-300 z-10 origin-bottom-left cursor-pointer">
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-tangerine-accent border-2 border-navy-base shadow-[2px_2px_0px_0px_rgba(10,35,66,1)] z-30 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/60 blur-[0.5px] -mt-1 -ml-1"></div>
                </div>
                <div className="h-36 w-full border-b-2 border-navy-base overflow-hidden relative">
                  <img src={BGN} alt="Board Game Night" className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" />
                </div>
                <div className="p-5 flex flex-col">
                  <div className="flex items-center gap-2 text-tangerine-accent mb-2">
                     <Users size={14} strokeWidth={3} /><span className="text-[9px] font-black uppercase tracking-[0.2em] text-navy-base">Thursdays</span>
                  </div>
                  <h3 className="text-xl font-black text-navy-base uppercase tracking-tighter leading-[1.0] mb-2">Board Game Night</h3>
                  <p className="font-serif text-muted-cerulean text-sm mb-4 leading-snug">The gaming community here is friendly and inviting to everyone.</p>
                  <div className="mt-auto pt-3 border-t border-dashed border-navy-base/20 text-[9px] font-black uppercase text-navy-base">5:00 PM - 11:00 PM</div>
                </div>
              </div>

              <div className="group relative bg-white border-2 border-navy-base shadow-[6px_6px_0px_0px_rgba(10,35,66,1)] flex flex-col rotate-[2deg] sm:mt-12 hover:rotate-0 hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_rgba(10,35,66,1)] transition-all duration-300 z-10 origin-bottom-right cursor-pointer">
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-muted-cerulean border-2 border-navy-base shadow-[2px_2px_0px_0px_rgba(10,35,66,1)] z-30 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/60 blur-[0.5px] -mt-1 -ml-1"></div>
                </div>
                <div className="h-36 w-full border-b-2 border-navy-base overflow-hidden relative">
                  <img src={BT} alt="BattleTech" className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" />
                </div>
                <div className="p-5 flex flex-col">
                  <div className="flex items-center gap-2 text-tangerine-accent mb-2">
                     <Swords size={14} strokeWidth={3} /><span className="text-[9px] font-black uppercase tracking-[0.2em] text-navy-base">Saturdays</span>
                  </div>
                  <h3 className="text-xl font-black text-navy-base uppercase tracking-tighter leading-[1.0] mb-2">BattleTech</h3>
                  <p className="font-serif text-muted-cerulean text-sm mb-4 leading-snug">Armored combat filled with epic stories and gaming experiences.</p>
                  <div className="mt-auto pt-3 border-t border-dashed border-navy-base/20 text-[9px] font-black uppercase text-navy-base">10:00 AM - 3:30 PM</div>
                </div>
              </div>

              <div className="group relative bg-white border-2 border-navy-base shadow-[6px_6px_0px_0px_rgba(10,35,66,1)] flex flex-col rotate-[-1deg] sm:col-span-2 sm:w-[65%] sm:mx-auto sm:-mt-6 hover:rotate-0 hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_rgba(10,35,66,1)] transition-all duration-300 z-20 origin-center cursor-pointer">
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-tangerine-accent border-2 border-navy-base shadow-[2px_2px_0px_0px_rgba(10,35,66,1)] z-30 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/60 blur-[0.5px] -mt-1 -ml-1"></div>
                </div>
                <div className="h-36 w-full border-b-2 border-navy-base overflow-hidden relative">
                  <img src={OG} alt="Open Gaming" className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" />
                </div>
                <div className="p-5 flex flex-col">
                  <div className="flex items-center gap-2 text-tangerine-accent mb-2">
                     <Gamepad2 size={14} strokeWidth={3} /><span className="text-[9px] font-black uppercase tracking-[0.2em] text-navy-base">Every Day</span>
                  </div>
                  <h3 className="text-xl font-black text-navy-base uppercase tracking-tighter leading-[1.0] mb-2">Open Gaming</h3>
                  <p className="font-serif text-muted-cerulean text-sm mb-4 leading-snug">Enjoy our Game Library any time we are open—perfect for trying new games.</p>
                  <div className="mt-auto pt-3 border-t border-dashed border-navy-base/20 text-[9px] font-black uppercase text-navy-base">All Day</div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};