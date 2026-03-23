import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { ChevronRight } from 'lucide-react';

interface FAQModuleProps {
  onSelect: (item: any) => void;
  selectedId?: string;
}

export default function FAQModule({ onSelect, selectedId }: FAQModuleProps) {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [statusFilter, setStatusFilter] = useState('pending');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaqs = async () => {
      setLoading(true);
      const { data } = await supabase
        .from('faqs')
        .select('*')
        .eq('status', statusFilter)
        .order('created_at', { ascending: false });
      setFaqs(data || []);
      setLoading(false);
    };
    fetchFaqs();
  }, [statusFilter, selectedId]);

  return (
    <div className="animate-in fade-in duration-500">
      <header className="mb-10 flex items-end justify-between">
        <h2 className="text-4xl font-black uppercase tracking-tighter italic text-[#0a2342]">
          FAQ <span className="text-[#ff6a00]">Moderation.</span>
        </h2>
        <div className="flex bg-white border-2 border-[#0a2342] p-1 shadow-[4px_4px_0px_0px_#0a2342]">
          {['pending', 'answered'].map((s) => (
            <button 
              key={s} 
              onClick={() => setStatusFilter(s)}
              className={`px-4 py-2 text-[9px] font-black uppercase tracking-widest ${statusFilter === s ? 'bg-[#0a2342] text-white' : 'text-[#0a2342]/40 hover:text-[#0a2342]'}`}
            >
              {s}
            </button>
          ))}
        </div>
      </header>

      <div className="space-y-4">
        {loading ? (
          <div className="font-black uppercase opacity-10 text-4xl italic">Scanning Database...</div>
        ) : (
          faqs.map((faq: any) => ( 
            <div 
              key={faq.id} 
              onClick={() => onSelect(faq)}
              className={`bg-white p-6 border-2 border-[#0a2342] cursor-pointer flex items-center justify-between transition-all relative
                ${!faq.is_read ? 'border-l-[12px] border-l-[#ff6a00]' : ''}
                ${selectedId === faq.id ? 'shadow-[8px_8px_0px_0px_#ff6a00] -translate-y-1' : 'shadow-[4px_4px_0px_0px_#0a2342] hover:shadow-[6px_6px_0px_0px_#0a2342]'}`}
            >
              <div className="flex items-center gap-4">
                {!faq.is_read && (
                  <div className="bg-[#ff6a00] text-[#0a2342] border-2 border-[#0a2342] text-[8px] font-black px-1 uppercase shadow-[2px_2px_0px_0px_#0a2342] h-fit">
                    New
                  </div>
                )}
                <div>
                  <h3 className="font-black text-lg uppercase leading-none mb-2">{faq.question}</h3>
                  <p className="text-[10px] font-bold text-[#0a2342]/40 uppercase tracking-widest italic">{faq.email || 'Anonymous'}</p>
                </div>
              </div>
              <ChevronRight className={selectedId === faq.id ? 'text-[#ff6a00] rotate-90' : 'text-[#0a2342]/20'} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}