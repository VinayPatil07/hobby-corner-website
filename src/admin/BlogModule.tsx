import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { Plus, Image as ImageIcon, Trash2} from 'lucide-react';

// Added this interface to tell TypeScript about onSelect
interface BlogModuleProps {
  onSelect: (item: any) => void;
}

export default function BlogModule({ onSelect }: BlogModuleProps) {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    const { data } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
    setPosts(data || []);
    setLoading(false);
  };

  const deletePost = async (id: string, e: React.MouseEvent) => {
  e.stopPropagation(); // Prevents the editor from sliding out
  if (window.confirm("Are you sure? This will delete the post and the image forever.")) {
    const { error } = await supabase.from('blog_posts').delete().eq('id', id);
    if (!error) fetchPosts(); // Refresh the list
  }
  };

  return (
    <div className="animate-in fade-in duration-500">
      <header className="mb-10 flex items-end justify-between">
        <div>
          <h2 className="text-4xl font-black uppercase tracking-tighter italic text-[#0a2342]">Store <span className="text-[#ff6a00]">Blog.</span></h2>
          <p className="font-serif text-[#0a2342]/50 italic">Announcements, RC Arrivals, & Event Recaps</p>
        </div>
        <button 
          onClick={() => onSelect({ title: '', content: '', image_url: null })} 
          className="bg-[#ff6a00] border-2 border-[#0a2342] px-6 py-3 font-black uppercase text-[10px] tracking-widest shadow-[4px_4px_0px_0px_#0a2342] flex items-center gap-2 hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
        >
          <Plus size={16}/> Create New Post
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? <div className="font-black uppercase opacity-10 text-2xl italic">Loading Feed...</div> :
          posts.map(post => (
            <div 
              key={post.id} 
              onClick={() => onSelect(post)}
              className="bg-white border-2 border-[#0a2342] shadow-[6px_6px_0px_0px_#0a2342] overflow-hidden group cursor-pointer transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_#ff6a00]"
            >
              {post.image_url ? (
                <img src={post.image_url} alt="" className="w-full h-48 object-cover border-b-2 border-[#0a2342]" />
              ) : (
                <div className="w-full h-48 bg-[#f0f2f5] flex items-center justify-center text-[#0a2342]/10"><ImageIcon size={48}/></div>
              )}
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-[8px] font-black uppercase px-2 py-1 border border-[#0a2342] ${post.is_published ? 'bg-green-500 text-white' : 'bg-white text-[#0a2342]/40'}`}>
                    {post.is_published ? 'Live' : 'Draft'}
                  </span>
                  <span className="text-[9px] font-bold opacity-30 uppercase">{new Date(post.created_at).toLocaleDateString()}</span>
                </div>
                <h3 className="font-black text-xl uppercase tracking-tight mb-4 line-clamp-2">{post.title}</h3>
                <div className="flex gap-2 mt-4 pt-4 border-t border-[#0a2342]/5">
                  <button className="flex-1 border-2 border-[#0a2342] py-2 text-[9px] font-black uppercase hover:bg-[#0a2342] hover:text-white transition-all">Edit Post</button>
                  <button onClick={(e) => deletePost(post.id, e)} className="p-2 text-red-500 hover:bg-red-50 transition-colors"><Trash2 size={16}/></button>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}