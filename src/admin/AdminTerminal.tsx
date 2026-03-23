import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import AdminLogin from './AdminLogin';
import Sidebar from './Sidebar';
import FAQModule from './FAQModule';
import OrderModule from './OrderModule';
import EditorPanel from './EditorPanel';
import BlogModule from './BlogModule'; 

export default function AdminTerminal() {
  const [session, setSession] = useState<any>(null);
  const [activeModule, setActiveModule] = useState<'faqs' | 'orders' | 'blog'>('faqs');
  const [selectedItem, setSelectedItem] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  const refreshData = () => {
    setSelectedItem(null);
  };

  if (!session) return <AdminLogin />;

  return (
    <div className="flex min-h-screen bg-[#f0f2f5] font-sans text-[#0a2342]">
      <Sidebar 
        activeModule={activeModule} 
        setActiveModule={setActiveModule} 
        onLogout={() => supabase.auth.signOut()} 
      />
      
      <main className="flex-1 p-12 overflow-y-auto">
        {activeModule === 'faqs' && (
          <FAQModule onSelect={setSelectedItem} selectedId={selectedItem?.id} />
        )}
        {activeModule === 'orders' && (
          <OrderModule onSelect={setSelectedItem} selectedId={selectedItem?.id} />
        )}
        {activeModule === 'blog' && (
          <BlogModule onSelect={setSelectedItem} />
        )}
      </main>

      {selectedItem && (
        <EditorPanel 
          item={selectedItem} 
          type={activeModule} 
          onClose={() => setSelectedItem(null)} 
          onRefresh={refreshData} 
        />
      )}
    </div>
  );
}