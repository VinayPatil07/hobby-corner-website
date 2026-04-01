import { 
  CalendarDays, MapPin, Ticket, HeartHandshake, 
  Gamepad2, FileDown, ExternalLink, Clock, Wrench, Phone, Mail
} from 'lucide-react';

import commUnityImg from '../assets/commUnityCS.png';
import gundamImg from '../assets/Gundam.png';

export const HobbyCon = () => {
  const hours = [
    { days: 'Friday', time: '4:00 PM – 9:00 PM' },
    { days: 'Saturday', time: '10:00 AM – 6:00 PM' },
    { days: 'Sunday', time: '12:00 PM – 5:00 PM' },
    { days: 'Monday', time: '10:00 AM – 7:00 PM' },
  ];

  return (
    <div className="min-h-screen bg-soft-gray-blue font-sans selection:bg-tangerine-accent selection:text-navy-base pb-0 overflow-hidden">
      <section className="py-12 lg:py-16 relative bg-white/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-8">
              <div className="inline-block px-3 py-1 bg-white border-2 border-navy-base text-navy-base text-[9px] font-black uppercase tracking-[0.2em] mb-5 shadow-[3px_3px_0px_0px_rgba(10,35,66,1)]">
                Annual Event
              </div>
              <h1 className="text-4xl lg:text-6xl font-black text-navy-base uppercase tracking-tighter leading-[0.9] mb-4">
                Hobby Con <span className="text-tangerine-accent italic text-5xl lg:text-7xl">2026</span>
              </h1>
              <p className="text-xl font-black uppercase tracking-widest text-navy-base/60 mb-6">
                Friday May 22nd — Monday May 25th
              </p>
              <p className="font-serif text-muted-cerulean text-lg leading-relaxed max-w-2xl">
                Get ready for a weekend of immersive fun at Hobby Con! Dive into the exciting world of board games, from classic strategy to the latest releases. Unleash your creativity, join a one-shot session, and connect with fellow storytellers and adventurers.
              </p>
            </div>
            
            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <div className="bg-tangerine-accent border-2 border-navy-base px-8 py-10 shadow-[6px_6px_0px_0px_#0a2342] rotate-2 w-full max-w-[340px]">
                <h3 className="text-4xl font-black text-navy-base uppercase tracking-tighter leading-none mb-4 italic">Free<br/>Admission</h3>
                <p className="font-black text-white uppercase tracking-widest text-[12px] leading-relaxed">
                  Join us for a weekend of tabletop gaming, miniature building, and community fun!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ATTEND & REGISTER ROW */}
      <section className="py-20 lg:py-24 border-y-4 border-navy-base bg-[#fdfcf5] relative z-10">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#0a2342 1.5px, transparent 1.5px)', backgroundSize: '16px 16px' }}></div>
        <CalendarDays className="absolute -right-10 -top-4 text-tangerine-accent/10 rotate-12" size={240} strokeWidth={1} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="bg-white border-4 border-navy-base p-8 lg:p-12 shadow-[8px_8px_0px_0px_#0a2342] flex flex-col lg:flex-row gap-8 items-center justify-between relative">
            
            {/* Faux Tape Graphic */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-tangerine-accent/40 -rotate-2 border-2 border-dashed border-tangerine-accent/60 mix-blend-multiply"></div>

            <div className="max-w-2xl">
              <h2 className="text-4xl lg:text-5xl font-black text-navy-base uppercase tracking-tighter leading-none mb-6">
                Attend & <span className="italic text-tangerine-accent">Register</span>
              </h2>
              <p className="font-serif text-muted-cerulean text-lg leading-relaxed mb-6">
                Hobby Con is free to attend and registration is optional. However, if you decide to register, we'll include you in our registration raffle! It also helps us plan our event space, so we really appreciate it.
              </p>
              <div className="inline-block bg-tangerine-accent px-4 py-2 border-2 border-navy-base rotate-1 shadow-[4px_4px_0px_0px_#0a2342]">
                <p className="font-black uppercase tracking-widest text-navy-base text-xs">
                  Prizes increase with more registrations!
                </p>
              </div>
            </div>
            
            <div className="w-full lg:w-auto shrink-0 flex justify-center mt-6 lg:mt-0">
              <a 
                href="https://forms.office.com/r/fBH9Gt2PHb" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-center bg-tangerine-accent text-navy-base px-8 py-5 font-black uppercase tracking-[0.2em] text-sm hover:bg-navy-base hover:text-white transition-all border-4 border-navy-base shadow-[6px_6px_0px_0px_#0a2342] hover:shadow-none hover:translate-y-[6px] hover:translate-x-[6px]"
              >
                Ready to attend?
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* 3. EVENTS & GAMES ROW */}
      <section className="py-20 lg:py-28 border-b-4 border-navy-base bg-[#fdfcf5] relative overflow-hidden">
        {/* Blueprint Grid Background */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#0a2342 1px, transparent 1px), linear-gradient(90deg, #0a2342 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        <Gamepad2 className="absolute -left-12 top-10 text-tangerine-accent/10 -rotate-[15deg]" size={220} strokeWidth={1} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            <div className="lg:col-span-7 bg-white p-8 lg:p-10 border-4 border-navy-base shadow-[8px_8px_0px_0px_#0a2342] rotate-1">
              <div className="inline-block px-3 py-1 bg-navy-base text-tangerine-accent font-black uppercase tracking-[0.2em] text-[10px] mb-4 border-2 border-navy-base -rotate-3 shadow-[2px_2px_0px_0px_#ff6a00]">
                Host or Play
              </div>
              <h2 className="text-4xl lg:text-5xl font-black text-navy-base uppercase tracking-tighter leading-none mb-6">
                Events <span className="text-tangerine-accent italic">& Games</span>
              </h2>
              <p className="font-serif text-navy-base text-lg leading-relaxed border-l-4 border-tangerine-accent pl-5">
                Want to run a game at Hobby Con? Sounds great to us! All volunteers will be entered into a raffle for various prizes, each successful game or event run counts as an entry.
              </p>
            </div>

            <div className="lg:col-span-5 space-y-6 relative">
              {/* 3D Physical-Looking Block for Sign Ups */}
              <div className="bg-white border-4 border-navy-base p-6 shadow-[8px_8px_0px_0px_#0a2342] -rotate-1 relative">
                {/* Physical Pin */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-soft-gray-blue border-2 border-navy-base shadow-[2px_2px_0px_0px_#0a2342]"></div>
                
                <button disabled className="w-full bg-gray-200 text-gray-500 border-4 border-gray-400 px-6 py-4 font-black uppercase tracking-[0.2em] text-xs cursor-not-allowed mb-3 shadow-[inset_4px_4px_0px_0px_rgba(0,0,0,0.1)]">
                  Event Sign Ups
                </button>
                <p className="font-serif text-navy-base/70 text-sm text-center italic font-bold">
                  Sign ups are currently closed. Check back late April/early May.
                </p>
              </div>

              {/* Action Button */}
              <a href="https://discord.gg/U87pZwUSeY" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between w-full bg-tangerine-accent text-navy-base border-4 border-navy-base px-6 py-5 hover:bg-navy-base hover:text-white transition-all group shadow-[8px_8px_0px_0px_#0a2342] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[4px_4px_0px_0px_#0a2342] rotate-1">
                <span className="font-black uppercase tracking-[0.2em] text-xs">Ready To Run? Join Discord</span>
                <ExternalLink size={20} className="group-hover:translate-x-2 transition-transform" />
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* 4. COMMUNITY RAFFLE ROW (Giant Ticket Vibe) */}
      <section className="py-20 lg:py-28 border-b-4 border-navy-base bg-navy-base text-white relative z-10 overflow-hidden">
        {/* Navy candy stripes */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(-45deg, #0a2342, #0a2342 20px, #0f3059 20px, #0f3059 40px)' }}></div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          {/* Giant Ticket Container */}
          <div className="bg-white text-navy-base border-[6px] border-tangerine-accent p-8 lg:p-12 shadow-[12px_12px_0px_0px_#ff6a00] flex flex-col lg:flex-row gap-12 lg:gap-16 items-center justify-between relative border-dashed">
            
            {/* Cutout edges to make it look like a ticket */}
            <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-navy-base rounded-full border-r-[6px] border-tangerine-accent border-dashed"></div>
            <div className="absolute -right-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-navy-base rounded-full border-l-[6px] border-tangerine-accent border-dashed"></div>

            <div className="lg:w-2/3 relative z-10">
              <div className="flex items-center gap-5 mb-6">
                <div className="bg-navy-base p-3 border-4 border-tangerine-accent shadow-[4px_4px_0px_0px_#0a2342] -rotate-6 shrink-0">
                   <img src={commUnityImg} alt="CommUnity Crisis Services" className="h-10 lg:h-12 w-auto object-contain brightness-0 invert" />
                </div>
                <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter leading-none">
                  CommUnity <span className="italic text-tangerine-accent">Raffle</span>
                </h2>
              </div>
              
              <p className="font-serif text-navy-base/90 text-lg leading-relaxed max-w-2xl font-bold">
                Enter to win various prizes for just $2 a ticket! Help us support local services with a donation to CommUnity. Hobby Con is completely free to attend, however we recommend a $5 donation.
              </p>
            </div>
            
            <div className="w-full lg:w-1/3 flex flex-col gap-4 relative z-10">
              <a href="https://givebutter.com/hobbycon25" target="_blank" rel="noopener noreferrer" className="w-full text-center bg-tangerine-accent text-navy-base border-4 border-navy-base px-8 py-5 font-black uppercase tracking-[0.2em] text-xs shadow-[6px_6px_0px_0px_#0a2342] hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_#0a2342] transition-all">
                Donate Here
              </a>
              <a href="https://builtbycommunity.org/about/" target="_blank" rel="noopener noreferrer" className="w-full text-center bg-[#fdfcf5] border-4 border-navy-base text-navy-base px-8 py-5 font-black uppercase tracking-[0.2em] text-xs shadow-[6px_6px_0px_0px_#0a2342] hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_#0a2342] transition-all">
                Learn More
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* 5. USED GAME SALE ROW */}
      <section className="py-20 lg:py-28 border-b-4 border-navy-base bg-tangerine-accent relative z-10 overflow-hidden">
        {/* Comic Halftone Dots */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#0a2342 3px, transparent 3px)', backgroundSize: '16px 16px' }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
            
            <div className="lg:col-span-7 flex flex-col justify-center">
              <h2 className="text-4xl lg:text-6xl font-black text-navy-base uppercase tracking-tighter leading-none mb-8 bg-white inline-block w-fit px-6 py-2 border-4 border-navy-base shadow-[6px_6px_0px_0px_#0a2342] -rotate-2">
                Used Game <span className="text-tangerine-accent italic">Sale!</span>
              </h2>
              
              {/* Physical Price Tag Box */}
              <div className="bg-[#fdfcf5] border-4 border-navy-base p-8 lg:p-10 shadow-[12px_12px_0px_0px_#0a2342] rotate-1 relative rounded-tl-3xl">
                {/* Tag Hole */}
                <div className="absolute top-4 left-4 w-6 h-6 bg-tangerine-accent rounded-full border-4 border-navy-base shadow-[inset_2px_2px_0px_rgba(10,35,66,0.3)]"></div>
                {/* Sticker badge */}
                <div className="absolute -top-6 -right-6 bg-navy-base text-tangerine-accent w-24 h-24 rounded-full flex items-center justify-center font-black italic text-2xl border-4 border-white shadow-[6px_6px_0px_0px_#0a2342] rotate-12 z-10">
                  10%<br/>OFF
                </div>

                <p className="font-serif text-navy-base text-lg font-bold leading-relaxed mb-6 border-b-4 border-dashed border-navy-base/20 pb-6 pr-12 mt-6">
                  Looking to pick up some budget-friendly games or puzzles? During Hobby Con, all used games and puzzles are discounted!
                </p>
                <p className="font-serif text-muted-cerulean text-base leading-relaxed">
                  Need to clean out old games? Bring them in and let us sell them for you. Pick your price and once it sells you get <strong className="text-navy-base font-black text-lg bg-tangerine-accent/30 px-2 py-0.5">80% in store credit</strong>!
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-center gap-6">
              <div className="inline-block px-4 py-2 bg-white text-navy-base font-black uppercase tracking-[0.2em] text-[10px] w-fit border-4 border-navy-base shadow-[4px_4px_0px_0px_#0a2342] rotate-2">
                Forms & Downloads
              </div>
              <a 
                href="https://www.hobbycorner.net/_files/ugd/da9a2b_58b8c58100c744bfb48e28daea688d63.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-navy-base text-white border-4 border-navy-base px-6 py-6 font-black uppercase tracking-[0.2em] text-xs hover:bg-white hover:text-navy-base transition-colors shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
              >
                <FileDown size={24} /> Download Game Form
              </a>
              <a 
                href="https://www.hobbycorner.net/_files/ugd/da9a2b_fabef02f67e24624a82fd91f8c6898ab.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-white text-navy-base border-4 border-navy-base px-6 py-6 font-black uppercase tracking-[0.2em] text-xs hover:bg-soft-gray-blue transition-colors shadow-[8px_8px_0px_0px_#0a2342] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[4px_4px_0px_0px_#0a2342]"
              >
                <FileDown size={24} /> Download Puzzle Form
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* 6. GUNDAM & LEGO ROW (Heavy 3D Image Fix) */}
      <section className="py-20 lg:py-28 border-b-4 border-navy-base bg-white relative overflow-hidden">
        <Wrench className="absolute -right-16 -bottom-10 text-soft-gray-blue/20 rotate-[20deg]" size={400} strokeWidth={1} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
            
            <div className="w-full lg:w-[350px] shrink-0">
              <div className="relative flex justify-center items-center">
                {/* Vibrant Background Circle behind the transparent PNG */}
                <div className="absolute w-56 h-56 lg:w-72 lg:h-72 bg-tangerine-accent rounded-full border-4 border-navy-base shadow-[8px_8px_0px_0px_#0a2342] -translate-x-4 translate-y-4"></div>
                <div className="absolute w-56 h-56 lg:w-72 lg:h-72 bg-[#fdfcf5] rounded-full border-4 border-navy-base border-dashed -rotate-12"></div>
                
                {/* 3D Drop Shadow applied directly to the transparent Image */}
                <img 
                  src={gundamImg} 
                  alt="Gundam Model" 
                  className="relative z-20 w-48 lg:w-64 h-auto drop-shadow-[12px_12px_0px_#0a2342] hover:-translate-y-4 hover:drop-shadow-[16px_16px_0px_#ff6a00] transition-all duration-300 origin-bottom"
                />
              </div>
            </div>

            <div className="flex-1 w-full mt-10 lg:mt-0">
              <h2 className="text-4xl lg:text-6xl font-black text-navy-base uppercase tracking-tighter leading-none mb-8">
                Gundam <span className="text-muted-cerulean italic">& LEGO</span>
              </h2>
              
              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                {/* Industrial Runner Blocks */}
                <div className="bg-[#fdfcf5] border-4 border-navy-base p-5 shadow-[6px_6px_0px_0px_#0a2342] flex flex-col justify-center relative">
                  <div className="absolute top-0 left-0 w-full h-2 bg-tangerine-accent border-b-4 border-navy-base"></div>
                  <span className="block font-black uppercase tracking-[0.2em] text-navy-base text-[10px] mt-2 mb-2">Build Event</span>
                  <span className="block font-black uppercase text-navy-base text-xl leading-none mb-1">Sunday 25th</span>
                  <span className="block font-black uppercase text-tangerine-accent text-sm">Noon - 5 PM</span>
                </div>
                <div className="bg-[#fdfcf5] border-4 border-navy-base p-5 shadow-[6px_6px_0px_0px_#0a2342] flex flex-col justify-center relative">
                  <div className="absolute top-0 left-0 w-full h-2 bg-tangerine-accent border-b-4 border-navy-base"></div>
                  <span className="block font-black uppercase tracking-[0.2em] text-navy-base text-[10px] mt-2 mb-2">Build Event</span>
                  <span className="block font-black uppercase text-navy-base text-xl leading-none mb-1">Monday 26th</span>
                  <span className="block font-black uppercase text-tangerine-accent text-sm">Noon - 5 PM</span>
                </div>
              </div>

              <p className="font-serif text-muted-cerulean text-lg leading-relaxed mb-8 max-w-2xl border-l-4 border-navy-base pl-5">
                Take some time out of your day to build a Gundam or LEGO Kit! Buy a kit or bring your own and build, share, socialize and swap techniques.
              </p>
              
              <div className="bg-navy-base border-4 border-navy-base py-3 px-5 inline-block shadow-[6px_6px_0px_0px_#ff6a00] -rotate-1">
                <p className="font-black uppercase tracking-[0.1em] text-white text-xs">
                  Free soda or water included with kit purchase!
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. CONVENTION SPECIALS ROW */}
      <section className="py-20 lg:py-28 bg-soft-gray-blue border-b-4 border-navy-base relative z-10">
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(#0a2342 2px, transparent 2px), linear-gradient(90deg, #0a2342 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          
          <div className="flex justify-center mb-12 lg:mb-16">
            <h2 className="text-4xl lg:text-5xl font-black text-navy-base uppercase tracking-tighter leading-none italic bg-white inline-block px-8 py-4 border-4 border-navy-base shadow-[8px_8px_0px_0px_#0a2342] -rotate-2">
              Convention Specials
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Coupon 1 */}
            <div className="bg-white border-4 border-dashed border-navy-base p-8 text-center hover:-translate-y-2 transition-transform duration-300 relative">
              <div className="absolute -top-3 -left-3 w-6 h-6 bg-soft-gray-blue border-r-4 border-b-4 border-navy-base rounded-full"></div>
              <div className="absolute -top-3 -right-3 w-6 h-6 bg-soft-gray-blue border-l-4 border-b-4 border-navy-base rounded-full"></div>
              
              <div className="text-4xl lg:text-6xl font-black text-tangerine-accent uppercase tracking-tighter leading-none mb-4 italic drop-shadow-[2px_2px_0px_#0a2342]">10% OFF</div>
              <div className="font-black uppercase text-navy-base text-lg tracking-tight leading-snug">Used games<br/>and Puzzles</div>
            </div>
            
            {/* Coupon 2 */}
            <div className="bg-navy-base border-4 border-dashed border-tangerine-accent p-8 text-center hover:-translate-y-2 transition-transform duration-300 relative mt-2 lg:mt-6">
              <div className="absolute -top-3 -left-3 w-6 h-6 bg-soft-gray-blue border-r-4 border-b-4 border-tangerine-accent rounded-full"></div>
              <div className="absolute -top-3 -right-3 w-6 h-6 bg-soft-gray-blue border-l-4 border-b-4 border-tangerine-accent rounded-full"></div>
              
              <div className="text-4xl lg:text-6xl font-black text-white uppercase tracking-tighter leading-none mb-4 italic drop-shadow-[2px_2px_0px_#ff6a00]">20% OFF</div>
              <div className="font-black uppercase text-tangerine-accent text-lg tracking-tight leading-snug">Any game you<br/>played in</div>
            </div>
            
            {/* Coupon 3 */}
            <div className="bg-white border-4 border-dashed border-navy-base p-8 text-center hover:-translate-y-2 transition-transform duration-300 relative">
              <div className="absolute -top-3 -left-3 w-6 h-6 bg-soft-gray-blue border-r-4 border-b-4 border-navy-base rounded-full"></div>
              <div className="absolute -top-3 -right-3 w-6 h-6 bg-soft-gray-blue border-l-4 border-b-4 border-navy-base rounded-full"></div>
              
              <div className="text-4xl lg:text-6xl font-black text-tangerine-accent uppercase tracking-tighter leading-none mb-4 italic drop-shadow-[2px_2px_0px_#0a2342]">10% OFF</div>
              <div className="font-black uppercase text-navy-base text-lg tracking-tight leading-snug">Dice<br/>Accessories</div>
            </div>
          </div>
          
          <div className="flex justify-center mt-12">
            <p className="text-[10px] font-black uppercase text-navy-base/60 bg-white inline-block px-4 py-2 tracking-[0.2em] border-4 border-navy-base">
              *Discounts can not be combined with other discounts.
            </p>
          </div>
          
        </div>
      </section>

      {/* 8. INFO FOOTER SECTION (REDESIGNED STOREINFO STYLE) */}
      <section className="bg-white py-20 lg:py-28 border-b-4 border-navy-base relative overflow-hidden z-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* LEFT SIDE: TEXT & INFO */}
            <div className="lg:col-span-5 flex flex-col relative z-20">
              
              {/* Header */}
              <h2 className="text-4xl lg:text-5xl font-black text-navy-base uppercase tracking-tighter leading-none mb-10">
                Venue <span className="font-serif italic lowercase text-muted-cerulean text-4xl lg:text-5xl mx-1">&</span>
                <br />
                <span className="text-tangerine-accent italic">Dates</span>
              </h2>
              
              {/* INFO BLOCKS */}
              <div className="flex flex-col gap-6">
                
                {/* ADDRESS BLOCK */}
                <div className="bg-[#fdfcf5] border-4 border-navy-base p-6 shadow-[6px_6px_0px_0px_#0a2342]">
                  <div className="flex items-center gap-3 mb-4 border-b-2 border-dashed border-navy-base/20 pb-3">
                     <MapPin size={20} strokeWidth={2.5} className="text-tangerine-accent" />
                     <span className="text-xs font-black uppercase tracking-[0.2em] text-navy-base">Address</span>
                  </div>
                  <p className="font-serif text-navy-base text-lg leading-relaxed font-bold">
                    1606 Sycamore St, <br />
                    Iowa City, IA 52240
                  </p>
                  <a href="https://www.google.com/maps/search/?api=1&query=The%20Hobby%20Corner%201606%20Sycamore%20St%2C%20Iowa%20City%2C%20IA%2052240" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.1em] text-white bg-tangerine-accent px-4 py-3 mt-4 hover:bg-navy-base transition-colors border-4 border-navy-base shadow-[4px_4px_0px_0px_#0a2342]">
                    Get Directions <ExternalLink size={14} strokeWidth={2.5} />
                  </a>
                </div>

                {/* HOURS BLOCK */}
                <div className="bg-white border-4 border-navy-base p-6 shadow-[6px_6px_0px_0px_#0a2342]">
                  <div className="flex items-center gap-3 mb-4 border-b-2 border-dashed border-navy-base/20 pb-3">
                     <Clock size={20} strokeWidth={2.5} className="text-tangerine-accent" />
                     <span className="text-xs font-black uppercase tracking-[0.2em] text-navy-base">Operating Hours</span>
                  </div>
                  <div className="w-full">
                    {hours.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center py-2.5 border-b border-dashed border-navy-base/10 last:border-0 last:pb-0">
                        <span className="font-black text-navy-base uppercase tracking-[0.1em] text-xs">{item.days}</span>
                        <span className="font-serif text-muted-cerulean text-sm font-bold">{item.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CONTACT BLOCK */}
                <div className="bg-navy-base text-white border-4 border-navy-base p-6 shadow-[6px_6px_0px_0px_#ff6a00]">
                  <div className="flex items-center gap-3 mb-4 border-b-2 border-dashed border-white/20 pb-3">
                     <Phone size={20} strokeWidth={2.5} className="text-tangerine-accent" />
                     <span className="text-xs font-black uppercase tracking-[0.2em] text-white">Contact</span>
                  </div>
                  <p className="font-serif text-white/90 text-lg mb-3 font-bold">
                    (319) 338-1788
                  </p>
                  <div className="flex items-center gap-3">
                    <Mail size={18} strokeWidth={2.5} className="text-tangerine-accent" />
                    <a href="mailto:info@hobbycorner.biz" className="font-serif text-white/90 text-base hover:text-tangerine-accent transition-colors">
                      info@hobbycorner.biz
                    </a>
                  </div>
                </div>

              </div>

              {/* FEEDBACK STICKER */}
              <div className="mt-8 lg:absolute lg:-right-12 xl:-right-16 lg:top-10 w-full sm:w-64 lg:w-56 rotate-[-2deg] lg:rotate-[6deg] bg-tangerine-accent border-4 border-navy-base p-6 shadow-[8px_8px_0px_0px_rgba(10,35,66,1)] flex flex-col z-30 hover:rotate-0 hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_rgba(10,35,66,1)] transition-all duration-300">
                {/* Faux Tape */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-white/40 -rotate-3 border-2 border-dashed border-white/60"></div>
                
                <span className="font-black text-navy-base uppercase tracking-[0.2em] text-xs mb-2">Feedback</span>
                <p className="font-serif text-navy-base text-sm leading-snug mb-4 font-bold">
                  Have any feedback for us? Let us know!
                </p>
                <a href="https://forms.office.com/r/VHdyY2n3LX" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 font-black uppercase tracking-[0.1em] text-[10px] text-white bg-navy-base px-4 py-3 hover:bg-white hover:text-navy-base border-4 border-navy-base transition-colors shadow-[4px_4px_0px_0px_#ffffff]">
                  Feedback Form <ExternalLink size={14} strokeWidth={2.5} />
                </a>
              </div>

            </div>

            {/* RIGHT SIDE: MAP */}
            <div className="lg:col-span-7 w-full h-[450px] lg:h-full min-h-[550px] border-4 border-navy-base shadow-[12px_12px_0px_0px_rgba(10,35,66,1)] relative bg-navy-base z-10 mt-10 lg:mt-0">
              <iframe 
                src="https://maps.google.com/maps?q=The+Hobby+Corner+1660+Sycamore+St,+Iowa+City,+IA+52240&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="absolute inset-0 w-full h-full opacity-90 mix-blend-luminosity hover:mix-blend-normal transition-all duration-500"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              {/* Map Tag Overlay */}
              <div className="absolute top-6 right-6 bg-white border-4 border-navy-base px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-navy-base shadow-[6px_6px_0px_0px_rgba(10,35,66,1)] pointer-events-none rotate-2">
                Iowa City Marketplace
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default HobbyCon;