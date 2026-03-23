import { useState, useEffect, useRef } from 'react';
import { 
  CalendarDays, Clock, 
  Dices, Rocket, Sword, Users, 
  Coffee, Info, ChevronRight, 
  ChevronLeft, Sparkles 
} from 'lucide-react';

import BGN2 from '../assets/BGN2.png';
import BT2 from '../assets/BT2.png';
import SWL from '../assets/SWL.png';
import WH from '../assets/WH.png';


const gamingEvents = [
  {
    title: "Board Game Night",
    dayBadge: "THURSDAYS",
    schedule: "5:00 PM – 11:00 PM",
    price: "$5.00 Entry (Store Credit)",
    description: "Play the greatest and newest games out there every Thursday. Board game night is the best time to try out a new game or play a game you already love.",
    note: "Entry fee is credited back to your account.",
    icon: <Dices className="text-tangerine-accent" size={32} />,
    image: BGN2 
  },
  {
    title: "BattleTech",
    dayBadge: "SATURDAYS",
    schedule: "10:00 AM – 3:30 PM",
    price: "Free to Play",
    description: "Leap into the world’s greatest armored combat game. Experience everything from miniatures and RPG play to hobby painting and lore-driven fiction.",
    icon: <Rocket className="text-tangerine-accent" size={32} />,
    image: BT2 
  },
  {
    title: "Star Wars: Legion",
    dayBadge: "2nd SUNDAY",
    schedule: "12:00 PM – 4:30 PM",
    price: "Free to Play",
    description: "Lead your troops to victory in a two-player miniatures game of thrilling infantry battles set in the Star Wars universe. Build! Command! Conquer!",
    icon: <Sword className="text-tangerine-accent" size={32} />,
    image: SWL 
  },
  {
    title: "Warhammer 40K",
    dayBadge: "3rd & 4th SUN",
    schedule: "12:00 PM – 4:30 PM",
    price: "Free to Play",
    description: "Battle for survival in a galaxy riven by unceasing conflict. Stand as the last line of defense between humanity and the ravenous alien menace.",
    icon: <Users className="text-tangerine-accent" size={32} />,
    image: WH 
  }
];

// UPDATED: High-contrast colors and borders for the calendar pills
const eventDetails = {
  boardGames: {
    title: "Board Game Night",
    time: "5:00 PM – 11:00 PM",
    color: "bg-tangerine-accent text-white",
    description: "The best time to try out a new game or play a favorite. Our community is friendly and inviting to everyone.",
    price: "$5.00 Store Credit Entry"
  },
  battleTech: {
    title: "BattleTech",
    time: "10:00 AM – 3:30 PM",
    color: "bg-navy-base text-white",
    description: "World’s greatest armored combat game. Miniatures, RPG play, and hobby painting.",
    price: "Free to Play"
  },
  starWars: {
    title: "Star Wars: Legion",
    time: "12:00 PM – 4:30 PM",
    color: "bg-[#c1121f] text-white", // Deep Red
    description: "Lead your troops to victory in a two-player miniatures game of thrilling infantry battles.",
    price: "Free to Play"
  },
  warhammer: {
    title: "Warhammer 40K",
    time: "12:00 PM – 4:30 PM",
    color: "bg-[#2d6a4f] text-white", // Deep Green
    description: "The armies of Humanity battle for survival against ravenous alien menaces.",
    price: "Free to Play"
  }
};

const InteractiveCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 2, 1));
  const [hoveredEvent, setHoveredEvent] = useState<any>(null);
  
  const todayRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const today = new Date(); 
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); 
  const monthName = currentDate.toLocaleString('default', { month: 'long' });

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const getHolidays = (y: number, m: number) => {
    const fixedHolidays: Record<number, Record<number, string>> = {
      0: { 1: "New Year's Day" },
      1: { 14: "Valentine's Day" },
      2: { 17: "St. Patrick's Day" },
      3: { 1: "April Fools' Day" },
      4: { 5: "Cinco de Mayo" },
      5: { 19: "Juneteenth" },
      6: { 4: "Independence Day" },
      9: { 31: "Halloween" },
      10: { 11: "Veterans Day" },
      11: { 24: "Christmas Eve", 25: "Christmas Day", 31: "New Year's Eve" }
    };

    if (y === 2026) {
      if (!fixedHolidays[4]) fixedHolidays[4] = {};
      fixedHolidays[4][25] = "Memorial Day"; 
      if (!fixedHolidays[8]) fixedHolidays[8] = {};
      fixedHolidays[8][7] = "Labor Day";     
      if (!fixedHolidays[10]) fixedHolidays[10] = {};
      fixedHolidays[10][26] = "Thanksgiving"; 
    }
    return fixedHolidays[m] || {};
  };

  const holidays = getHolidays(year, month);

  const schedule: Record<number, any[]> = {};
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d);
    const dayOfWeek = date.getDay(); 
    const weekOfMonth = Math.ceil(d / 7); 

    const dailyEvents = [];
    if (dayOfWeek === 4) dailyEvents.push(eventDetails.boardGames);
    if (dayOfWeek === 6) dailyEvents.push(eventDetails.battleTech);
    if (dayOfWeek === 0 && weekOfMonth === 2) dailyEvents.push(eventDetails.starWars);
    if (dayOfWeek === 0 && (weekOfMonth === 3 || weekOfMonth === 4)) dailyEvents.push(eventDetails.warhammer);

    if (dailyEvents.length > 0) schedule[d] = dailyEvents;
  }

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const dayCells = [];
  
  for (let i = 0; i < firstDayOfMonth; i++) {
    dayCells.push(<div key={`pad-${i}`} className="min-h-[100px] lg:min-h-[120px] bg-soft-gray-blue/50" />);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dailyEvents = schedule[day] || [];
    const holidayName = holidays[day];
    
    const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();

    dayCells.push(
      <div 
        key={`day-${day}`} 
        ref={isToday ? todayRef : null} // 2. ADDED: We attach the "target" here if this cell is today!
        className={`min-h-[100px] lg:min-h-[120px] p-2 transition-colors group flex flex-col relative ${isToday ? 'bg-tangerine-accent/10 shadow-inner' : 'bg-white hover:bg-soft-gray-blue/20'}`}
      >
        <div className="flex justify-between items-start mb-2">
          <span className={`text-sm font-black transition-colors ${isToday ? 'text-tangerine-accent' : 'text-navy-base group-hover:text-tangerine-accent'}`}>
            {day}
          </span>
          {holidayName && (
            <div className="text-right">
              <span className="hidden lg:block text-[8px] font-bold uppercase text-navy-base/40 tracking-tighter leading-none max-w-[50px]">
                {holidayName}
              </span>
              <Sparkles className="lg:hidden text-tangerine-accent/50 w-3 h-3 ml-auto" />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-1.5 overflow-hidden">
          {dailyEvents.map((ev, i) => (
            <div 
              key={i}
              onMouseEnter={() => setHoveredEvent({ ...ev, day, monthName, year })}
              onClick={() => setHoveredEvent({ ...ev, day, monthName, year })} 
              className={`w-full ${ev.color} border-2 border-navy-base px-2 py-1 cursor-pointer lg:cursor-help flex items-center shadow-[2px_2px_0px_0px_rgba(10,35,66,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all`}
            >
              <span className="text-[9px] font-black uppercase leading-[1.1] line-clamp-2 tracking-tight">
                {ev.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const totalCells = dayCells.length;
  const remainingCells = 42 - totalCells; 
  if (remainingCells > 0 && remainingCells < 7) {
      for (let i = 0; i < remainingCells; i++) {
        dayCells.push(<div key={`pad-end-${i}`} className="min-h-[100px] lg:min-h-[120px] bg-soft-gray-blue/50" />);
      }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (todayRef.current && scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const target = todayRef.current;
        
        const scrollPosition = target.offsetLeft - (container.clientWidth / 2) + (target.clientWidth / 2);
        
        container.scrollTo({
          left: scrollPosition,
          behavior: 'smooth'
        });
      }
    }, 150); 
    return () => clearTimeout(timer);
  }, [currentDate]);

  const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const handleToday = () => setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1));

  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row bg-white border-2 border-navy-base shadow-[8px_8px_0px_0px_#0a2342] overflow-hidden">
        
        <div className="flex-1 flex flex-col border-b-2 lg:border-b-0 lg:border-r-2 border-navy-base">
          
          <div className="bg-navy-base text-white p-4 lg:p-6 flex flex-col sm:flex-row justify-between items-center gap-4 border-b-2 border-navy-base">
            <div className="flex items-center justify-between w-full sm:w-auto gap-6">
              <button onClick={handlePrevMonth} className="p-2 hover:bg-white/10 hover:text-tangerine-accent transition-all rounded-full group">
                <ChevronLeft size={28} className="group-active:-translate-x-1 transition-transform" />
              </button>
              <h3 className="text-xl lg:text-3xl font-black uppercase italic tracking-widest min-w-[150px] lg:min-w-[200px] text-center">
                {monthName} {year}
              </h3>
              <button onClick={handleNextMonth} className="p-2 hover:bg-white/10 hover:text-tangerine-accent transition-all rounded-full group">
                <ChevronRight size={28} className="group-active:translate-x-1 transition-transform" />
              </button>
            </div>
            <button 
              onClick={handleToday} 
              className="text-[10px] font-black uppercase tracking-widest text-navy-base bg-white hover:bg-tangerine-accent transition-colors border-2 border-transparent hover:border-navy-base px-4 py-2 w-full sm:w-auto"
            >
              Go To Today
            </button>
          </div>

          <div className="w-full overflow-x-auto no-scrollbar scroll-smooth">
            <div className="min-w-[700px] lg:min-w-full flex flex-col h-full">
              
              <div className="grid grid-cols-7 gap-[2px] bg-navy-base border-b-[2px] border-navy-base">
                {daysOfWeek.map(day => (
                  <div key={day} className="bg-white text-[9px] lg:text-[10px] font-black text-navy-base uppercase tracking-[0.2em] py-3 text-center">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-[2px] bg-navy-base flex-1">
                {dayCells}
              </div>

            </div>
          </div>

        </div>

        <div className="w-full lg:w-[380px] xl:w-[420px] bg-[#fdfcf5] relative flex flex-col">
          {hoveredEvent ? (
            <div className="p-8 lg:p-10 animate-in fade-in slide-in-from-right-4 duration-300 h-full flex flex-col">
              <div className="flex justify-between items-start mb-6 border-b-4 border-double border-navy-base pb-4">
                <div>
                  <h4 className="text-3xl font-black text-navy-base uppercase tracking-tighter leading-none mb-2">{hoveredEvent.title}</h4>
                  <p className="text-[10px] font-black text-tangerine-accent uppercase tracking-widest">
                    {hoveredEvent.monthName} {hoveredEvent.day}, {hoveredEvent.year}
                  </p>
                </div>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-navy-base bg-soft-gray-blue/30 p-3 border-l-4 border-tangerine-accent">
                  <Clock size={16} strokeWidth={3} />
                  <span className="text-xs font-black uppercase tracking-widest">{hoveredEvent.time}</span>
                </div>
                <p className="font-serif text-muted-cerulean text-lg italic leading-relaxed pt-2">
                  "{hoveredEvent.description}"
                </p>
              </div>

              <div className="bg-white border-2 border-navy-base shadow-[4px_4px_0px_0px_#0a2342] p-5 mt-auto">
                <p className="text-[10px] font-black uppercase text-navy-base/60 tracking-widest mb-1">Entry Details</p>
                <p className="text-base font-black uppercase text-navy-base tracking-tight">{hoveredEvent.price}</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-12 text-center opacity-60 min-h-[300px]">
              <Info className="text-navy-base mb-4" size={48} strokeWidth={1.5} />
              <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-navy-base">
                Tap an event <br />to view details
              </h4>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export const EventsPage = () => {
  return (
    <div className="min-h-screen bg-soft-gray-blue font-sans selection:bg-tangerine-accent selection:text-navy-base pb-20">
      
      <section className="py-12 lg:py-16 border-b-2 border-navy-base relative overflow-hidden bg-white/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="inline-block px-3 py-1 bg-white border-2 border-navy-base text-navy-base text-[9px] font-black uppercase tracking-[0.2em] mb-5 shadow-[3px_3px_0px_0px_rgba(10,35,66,1)]">
                Iowa City Community
              </div>
              <h1 className="text-3xl lg:text-4xl font-black text-navy-base uppercase tracking-tighter leading-[1.0] mb-6">
                Gaming <span className="text-tangerine-accent italic">Schedule</span>
              </h1>
              <p className="font-serif text-muted-cerulean text-lg leading-relaxed max-w-7xll">
                Find your tribe and roll some dice at The Hobby Corner. Our tables are open every single day for casual play and organized leagues.
              </p>
            </div>
            <div className="lg:col-span-5 flex justify-start lg:justify-end">
              <div className="bg-navy-base border-2 border-navy-base px-10 py-8 shadow-[6px_6px_0px_0px_#ff6a00] -rotate-2 w-full max-w-[340px]">
                <h3 className="text-2xl font-black text-white uppercase tracking-tighter leading-none mb-2 italic">Open Play.</h3>
                <p className="font-black text-tangerine-accent uppercase tracking-widest text-[11px] leading-tight">
                  Tables available <br />during all store hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-soft-gray-blue border-b-2 border-navy-base/10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-navy-base/40">
            Upcoming Events
          </h2>
        </div>

        <div className="w-full overflow-x-auto pb-12 no-scrollbar cursor-grab active:cursor-grabbing">
          <div className="flex w-max">
            <div className="w-4 sm:w-6 lg:w-8 xl:w-[calc((100vw-1300px)/2+2rem)] shrink-0" />

            {gamingEvents.map((event, idx) => (
              <div 
                key={idx} 
                className="mr-8 group bg-white border-2 border-navy-base shadow-[8px_8px_0px_0px_#0a2342] hover:shadow-[10px_10px_0px_0px_#ff6a00] transition-all min-w-[350px] max-w-[350px] flex-shrink-0 flex flex-col"
              >
                <div className="relative h-48 overflow-hidden border-b-2 border-navy-base">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-white border-2 border-navy-base px-3 py-1 text-navy-base text-[10px] font-black uppercase tracking-widest shadow-[3px_3px_0px_0px_#0a2342]">
                    {event.dayBadge}
                  </div>
                </div>

                <div className="p-8 flex-1 flex flex-col bg-[#fdfcf5]">
                  <div className="mb-6 border-b-2 border-dashed border-navy-base/20 pb-4">
                    <h3 className="text-2xl font-black text-navy-base uppercase tracking-tighter mb-2 group-hover:text-tangerine-accent transition-colors">
                      {event.title}
                    </h3>
                    <div className="flex items-center gap-2 text-[10px] font-black text-tangerine-accent uppercase tracking-widest">
                      <Clock size={12} strokeWidth={3} /> {event.schedule}
                    </div>
                  </div>

                  <p className="font-serif text-muted-cerulean text-sm leading-relaxed mb-8 italic">
                    "{event.description}"
                  </p>

                  <div className="mt-auto pt-6 border-t-2 border-navy-base flex items-center justify-between">
                     <div className="flex items-center gap-2 text-navy-base">
                        <Info size={14} strokeWidth={3} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Details</span>
                     </div>
                     <p className="text-[10px] font-black uppercase text-navy-base/40">
                       {event.price}
                     </p>
                  </div>
                </div>
              </div>
            ))}
            <div className="w-4 sm:w-6 lg:w-8 xl:w-[calc((100vw-1300px)/2+2rem)] shrink-0" />
          </div>
        </div>
      </section>

      <section className="py-16 bg-white border-b-2 border-navy-base">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            <div className="lg:col-span-7 space-y-8">
               <h2 className="text-3xl font-black text-navy-base uppercase tracking-tighter italic">House Rules</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-8 bg-soft-gray-blue/20 border-2 border-navy-base shadow-[4px_4px_0px_0px_#0a2342]">
                    <Coffee className="text-tangerine-accent mb-4" size={24} />
                    <h4 className="font-black uppercase text-navy-base text-sm mb-2">No Outside Snacks</h4>
                    <p className="font-serif text-muted-cerulean text-sm leading-relaxed">We sell snacks and drinks at the front counter to help keep our tables free for gaming.</p>
                  </div>
                  <div className="p-8 bg-soft-gray-blue/20 border-2 border-navy-base shadow-[4px_4px_0px_0px_#0a2342]">
                    <Users className="text-tangerine-accent mb-4" size={24} />
                    <h4 className="font-black uppercase text-navy-base text-sm mb-2">Be Friendly</h4>
                    <p className="font-serif text-muted-cerulean text-sm leading-relaxed">We pride ourselves on being the most inviting shop in Iowa. Toxic behavior stays outside.</p>
                  </div>
               </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-tangerine-accent border-2 border-navy-base p-10 shadow-[6px_6px_0px_0px_#0a2342] rotate-1">
                <h3 className="text-xl font-black text-navy-base uppercase tracking-tighter mb-4">Need a Calendar?</h3>
                <p className="font-black text-white text-[11px] uppercase tracking-widest leading-relaxed mb-8">
                  Sync our Google Calendar to never miss a game night at the Marketplace.
                </p>
                <a 
                  href="https://calendar.google.com/calendar?cid=aG9iYnljb3JuZXIuaWNAZ21haWwuY29t"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-block text-center bg-navy-base text-white px-6 py-4 font-black uppercase text-[10px] tracking-widest hover:bg-white hover:text-navy-base transition-all border-2 border-transparent hover:border-navy-base"
                >
                  Sync To My Calendar
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="bg-soft-gray-blue border-t-2 border-navy-base/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          
          <div className="flex items-center gap-5 mb-10">
            <div className="w-16 h-16 bg-white border-2 border-navy-base shadow-[4px_4px_0px_0px_#ff6a00] flex items-center justify-center rotate-[-2deg]">
              <CalendarDays className="text-navy-base" size={32} strokeWidth={1.5} />
            </div>
            <div>
              <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-tangerine-accent mb-1">
                Plan Your Visit
              </h2>
              <h3 className="text-4xl lg:text-5xl font-black text-navy-base uppercase tracking-tighter leading-none">
                Monthly <span className="text-white italic" style={{ WebkitTextStroke: '2px #0a2342' }}>Schedule</span>
              </h3>
            </div>
          </div>

          <InteractiveCalendar />
          
        </div>
      </section>

    </div>
  );
};

export default EventsPage;