import { Link } from 'react-router-dom';
import { Search, Home } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-soft-gray-blue p-8 selection:bg-tangerine-accent selection:text-navy-base">
      
      <div className="bg-white border-2 border-navy-base p-10 lg:p-14 shadow-[8px_8px_0px_0px_#ff6a00] text-center max-w-lg -rotate-1 relative">
        
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white border-2 border-navy-base px-4 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-navy-base shadow-[2px_2px_0px_0px_rgba(10,35,66,1)]">
          Error 404
        </div>

        <div className="inline-flex items-center justify-center w-20 h-20 bg-soft-gray-blue/50 border-2 border-navy-base rounded-full mb-6 mt-4">
          <Search className="text-tangerine-accent" size={32} strokeWidth={2.5} />
        </div>

        <h1 className="text-4xl md:text-5xl font-black text-navy-base uppercase mb-4 tracking-tighter">
          We looked everywhere.
        </h1>

        <div className="font-serif text-muted-cerulean text-lg mb-10 leading-relaxed space-y-4">
          <p>
            We checked the back room, looked under the register, and dug through the spare parts bin. Whatever page you're looking for just isn't here.
          </p>
          <p className="text-sm italic opacity-80 border-t-2 border-dashed border-navy-base/20 pt-4 mt-4">
            (If you typed the link manually, double-check your spelling. Otherwise, the carpet monster probably ate it along with that one specific screw you dropped last night.)
          </p>
        </div>

        <Link
          to="/"
          className="group relative flex items-center justify-center gap-3 w-full bg-navy-base text-white border-2 border-navy-base px-8 py-4 font-black uppercase text-[11px] tracking-[0.2em] transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(255,106,0,1)] hover:bg-tangerine-accent"
        >
          <Home size={16} className="group-hover:-translate-y-0.5 transition-transform" />
          Head back to the front page
        </Link>
      </div>

    </div>
  );
};