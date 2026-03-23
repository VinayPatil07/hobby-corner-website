import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { ChevronRight } from 'lucide-react';

interface OrderModuleProps {
  onSelect: (item: any) => void;
  selectedId?: string;
}

export default function OrderModule({ onSelect, selectedId }: OrderModuleProps) {
  const [orders, setOrders] = useState<any[]>([]);
  const [statusFilter, setStatusFilter] = useState('pending');

  useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await supabase
        .from('special_orders')
        .select('*')
        .eq('status', statusFilter)
        .order('created_at', { ascending: false });
      setOrders(data || []);
    };
    fetchOrders();
  }, [statusFilter, selectedId]);

  return (
    <div className="animate-in fade-in duration-500">
      <header className="mb-10 flex items-end justify-between">
        <h2 className="text-4xl font-black uppercase tracking-tighter italic text-[#0a2342]">
          Special <span className="text-[#ff6a00]">Orders.</span>
        </h2>
        <div className="flex bg-white border-2 border-[#0a2342] p-1 shadow-[4px_4px_0px_0px_#0a2342]">
          {['pending', 'ordered', 'arrived', 'picked_up'].map((s) => (
            <button 
              key={s} 
              onClick={() => setStatusFilter(s)}
              className={`px-4 py-2 text-[9px] font-black uppercase tracking-widest ${statusFilter === s ? 'bg-[#0a2342] text-white' : 'text-[#0a2342]/40 hover:text-[#0a2342]'}`}
            >
              {s.replace('_', ' ')}
            </button>
          ))}
        </div>
      </header>

      <div className="space-y-4">
        {orders.map((order: any) => ( 
          <div 
            key={order.id} 
            onClick={() => onSelect(order)}
            className={`bg-white p-6 border-2 border-[#0a2342] cursor-pointer flex items-center justify-between transition-all relative
              ${!order.is_read ? 'border-l-[12px] border-l-[#ff6a00]' : ''}
              ${selectedId === order.id ? 'shadow-[8px_8px_0px_0px_#ff6a00] -translate-y-1' : 'shadow-[4px_4px_0px_0px_#0a2342] hover:shadow-[6px_6px_0px_0px_#0a2342]'}`}
          >
            <div className="flex gap-6 items-center">
              <div className="relative">
                <div className="w-12 h-12 bg-[#0a2342] text-white flex items-center justify-center font-black italic">
                  #{order.id.slice(0,2)}
                </div>
                {!order.is_read && (
                  <div className="absolute -top-3 -left-5 bg-[#ff6a00] text-[#0a2342] border-2 border-[#0a2342] text-[8px] font-black px-1 uppercase rotate-[-12deg] shadow-[2px_2px_0px_0px_#0a2342]">
                    New
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-black text-lg uppercase leading-none mb-1">{order.item_name}</h3>
                <p className="text-[10px] font-black text-[#ff6a00] uppercase tracking-[0.2em]">{order.customer_name}</p>
              </div>
            </div>
            <ChevronRight className={selectedId === order.id ? 'text-[#ff6a00] rotate-90' : 'text-[#0a2342]/20'} />
          </div>
        ))}
      </div>
    </div>
  );
}