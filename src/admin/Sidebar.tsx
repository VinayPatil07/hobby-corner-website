import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { MessageSquare, ShoppingCart, LogOut, BookOpen } from 'lucide-react';

interface SidebarProps {
  activeModule: 'faqs' | 'orders' | 'blog';
  setActiveModule: (module: 'faqs' | 'orders' | 'blog') => void;
  onLogout: () => void;
}

export default function Sidebar({ activeModule, setActiveModule, onLogout }: SidebarProps) {
  const [unread, setUnread] = useState({ faqs: 0, orders: 0 });

  const fetchUnread = async () => {
    const { count: faqCount } = await supabase
      .from('faqs')
      .select('*', { count: 'exact', head: true })
      .eq('is_read', false)
      .eq('status', 'pending');

    const { count: orderCount } = await supabase
      .from('special_orders')
      .select('*', { count: 'exact', head: true })
      .eq('is_read', false)
      .eq('status', 'pending');

    setUnread({ faqs: faqCount || 0, orders: orderCount || 0 });
  };

  useEffect(() => {
    fetchUnread();

    const channel = supabase.channel('terminal-notifications')
      .on('postgres_changes', { event: '*', schema: 'public' }, () => fetchUnread())
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const navItems = [
    { id: 'faqs', label: 'FAQ Moderation', icon: <MessageSquare size={18}/>, count: unread.faqs },
    { id: 'orders', label: 'Special Orders', icon: <ShoppingCart size={18}/>, count: unread.orders },
    { id: 'blog', label: 'Store Blog', icon: <BookOpen size={18}/>, count: 0 },
  ];

  return (
    <aside className="w-72 bg-[#0a2342] text-white p-8 flex flex-col gap-10 border-r-4 border-[#0a2342] h-screen sticky top-0">
      <div className="flex flex-col gap-2">
        <span className="font-black uppercase tracking-tighter text-xl italic leading-none">Employee</span>
        <span className="font-black uppercase tracking-tighter text-xl italic leading-none">Terminal</span>
        <div className="h-1 w-full bg-[#ff6a00] mt-2"></div>
      </div>
      
      <nav className="flex flex-col gap-3">
        {navItems.map((item) => (
          <button 
            key={item.id}
            onClick={() => setActiveModule(item.id as any)}
            className={`flex items-center justify-between p-4 border-2 font-black uppercase tracking-widest text-[10px] transition-all relative group
              ${activeModule === item.id 
                ? 'bg-[#ff6a00] border-white text-[#0a2342] translate-x-1 translate-y-1 shadow-none' 
                : 'bg-white/5 border-white/10 text-white/40 hover:text-white hover:border-white/40'}`}
          >
            <div className="flex items-center gap-3">
              {item.icon} {item.label}
            </div>

            {item.count > 0 && (
              <span className="bg-white text-[#0a2342] px-2 py-1 text-[10px] border-2 border-[#0a2342] shadow-[2px_2px_0px_0px_#0a2342] group-hover:bg-[#ff6a00] transition-colors">
                {item.count}
              </span>
            )}
          </button>
        ))}
      </nav>

      <button 
        onClick={onLogout} 
        className="mt-auto flex items-center justify-center gap-2 p-4 border-2 border-red-500/30 text-red-500 font-black uppercase tracking-widest text-[10px] hover:bg-red-500 hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(220,38,38,0.1)] active:shadow-none active:translate-x-1 active:translate-y-1"
      >
        <LogOut size={16}/> Terminate Session
      </button>
    </aside>
  );
}