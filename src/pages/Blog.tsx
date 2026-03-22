import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { Link } from 'react-router-dom';
import { 
  CalendarDays, ArrowRight, Tag, 
  Archive, Loader2, X, Search
} from 'lucide-react';

export const Blog = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTags, setActiveTags] = useState<string[]>([]);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(searchQuery), 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      let query = supabase
        .from('blog_posts')
        .select('id, title, content, created_at, image_url, tags')        
        .eq('is_published', true)
        .order('created_at', { ascending: false })
        .limit(12);

      if (activeTags.length > 0) {
        query = query.overlaps('tags', activeTags);
      }

      if (debouncedQuery) {
        query = query.or(`title.ilike.%${debouncedQuery}%,content.ilike.%${debouncedQuery}%`);
      }

      const { data } = await query;
      if (data) setPosts(data);
      setLoading(false);
    };

    fetchPosts();
  }, [activeTags, debouncedQuery]);

  const toggleTag = (tag: string) => {
    setActiveTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setActiveTags([]);
    setSearchQuery('');
  };

  const archives = ["November 2019", "November 2018", "May 2017", "April 2017", "March 2017", "February 2017", "December 2016"];
  const staticTags = ["Board Games", "RC", "Events", "Special Orders", "Review", "Puzzles"];

  if (loading && posts.length === 0) return (
    <div className="min-h-screen flex items-center justify-center bg-soft-gray-blue">
      <Loader2 className="animate-spin text-navy-base" size={48} />
    </div>
  );

  return (
    <div className="min-h-screen bg-soft-gray-blue font-sans selection:bg-tangerine-accent selection:text-navy-base pb-32">
      
      {/* 1. HERO SECTION */}
      <section className="py-12 lg:py-16 border-b-2 border-navy-base relative overflow-hidden bg-white/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="inline-block px-3 py-1 bg-white border-2 border-navy-base text-navy-base text-[9px] font-black uppercase tracking-[0.2em] mb-5 shadow-[3px_3px_0px_0px_rgba(10,35,66,1)]">
                The Hobby Corner Dispatch
              </div>
              
              <h1 className="text-3xl lg:text-4xl font-black text-navy-base uppercase tracking-tighter leading-[1.0] mb-6">
                {searchQuery ? (
                  <>Search: <span className="text-tangerine-accent italic">"{searchQuery}"</span></>
                ) : activeTags.length > 0 ? (
                  <>Topic: <span className="text-tangerine-accent italic">{activeTags.join(' + ')}</span></>
                ) : (
                  <>History, News, & <br /><span className="text-tangerine-accent italic">Community Stories.</span></>
                )}
              </h1>
              
              <p className="font-serif text-muted-cerulean text-lg leading-relaxed max-w-xl italic">
                {(activeTags.length > 0 || searchQuery) 
                  ? "Showing dispatches matching your current filters." 
                  : "Explore terminology guides, store news, and hobbyist highlights."}
              </p>

              {(activeTags.length > 0 || searchQuery) && (
                <button 
                  onClick={clearFilters}
                  className="mt-10 flex items-center justify-center gap-3 bg-navy-base text-white border-2 border-navy-base px-6 py-3 font-black uppercase tracking-[0.2em] text-[11px] shadow-[4px_4px_0px_0px_#ff6a00] hover:translate-x-[-2px] transition-all"
                >
                  <X size={16} strokeWidth={3} /> Clear All Filters
                </button>
              )}
            </div>
            
            <div className="lg:col-span-5 flex justify-end">
              <div className="bg-navy-base border-2 border-navy-base px-10 py-8 shadow-[6px_6px_0px_0px_#ff6a00] rotate-2 w-full max-w-[340px]">
                <h3 className="text-3xl font-black text-white uppercase tracking-tighter leading-none mb-2">Read.</h3>
                <p className="font-black text-tangerine-accent uppercase tracking-widest text-[11px] text-stroke-thin">Stories from inside <br />the Iowa City store.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN FEED */}
   {/* 2. MAIN FEED */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* SIDEBAR (Left Side) */}
            <aside className="lg:col-span-4 space-y-10 order-2 lg:order-1 sticky top-12">
              {/* CATEGORIES BOX */}
              <div className="bg-white border-2 border-navy-base p-8 shadow-[8px_8px_0px_0px_rgba(10,35,66,1)]">
                <div className="flex items-center gap-3 mb-6 border-b-2 border-navy-base pb-2 italic">
                  <Tag className="text-tangerine-accent" size={20} />
                  <h4 className="font-black uppercase text-navy-base text-lg tracking-tight">Categories</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {staticTags.map((tag) => (
                    <button 
                      key={tag} 
                      onClick={() => toggleTag(tag)} 
                      className={`px-3 py-1.5 border-2 border-navy-base text-[9px] font-black uppercase tracking-widest transition-all ${activeTags.includes(tag) ? 'bg-tangerine-accent text-navy-base shadow-none translate-x-1 translate-y-1' : 'bg-soft-gray-blue/50 text-navy-base shadow-[3px_3px_0px_0px_#0a2342] hover:bg-white hover:-translate-y-[1px]'}`}
                    >
                      {tag} {activeTags.includes(tag) && "✓"}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* ARCHIVES BOX */}
              <div className="bg-[#fdfcf5] border-2 border-navy-base p-8 shadow-[8px_8px_0px_0px_#0a2342] -rotate-1">
                <div className="flex items-center gap-3 mb-6 border-b-2 border-navy-base pb-2 italic text-tangerine-accent">
                  <Archive size={20} />
                  <h4 className="font-black uppercase text-navy-base text-lg tracking-tight">Archives</h4>
                </div>
                <ul className="space-y-3">
                  {archives.map((date, i) => (
                    <li key={i} className="font-serif text-muted-cerulean text-sm italic hover:text-tangerine-accent hover:underline cursor-pointer transition-all">
                      {date}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* ARTICLES FEED & SEARCH (Right Side) */}
            <div className="lg:col-span-8 order-1 lg:order-2">
              
              {/* SEARCH BAR - Now neatly contained above the articles */}
              <div className="mb-12 bg-white border-2 border-navy-base p-1 flex items-center shadow-[6px_6px_0px_0px_rgba(10,35,66,1)] focus-within:shadow-[6px_6px_0px_0px_#ff6a00] focus-within:-translate-y-1 transition-all group">
                <div className="pl-5 pr-3">
                  <Search className="text-navy-base/40 group-focus-within:text-tangerine-accent transition-colors" size={24} />
                </div>
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="SEARCH ARTICLES, TOPICS, OR KEYWORDS..." 
                  className="w-full p-4 bg-transparent font-black uppercase text-xs tracking-widest outline-none text-navy-base placeholder:text-navy-base/30"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')} 
                    className="p-3 mr-2 text-navy-base/40 hover:text-tangerine-accent transition-colors"
                    title="Clear Search"
                  >
                    <X size={20} strokeWidth={3} />
                  </button>
                )}
              </div>

              <div className="space-y-16">
                {loading && posts.length > 0 && (
                  <div className="flex justify-center mb-8">
                    <Loader2 className="animate-spin text-tangerine-accent" size={32} />
                  </div>
                )}
                
                {posts.length > 0 ? (
                  posts.map((post) => (
                    <article key={post.id} className="group bg-white border-2 border-navy-base shadow-[8px_8px_0px_0px_rgba(10,35,66,1)] hover:shadow-[12px_12px_0px_0px_#ff6a00] hover:-translate-y-1 transition-all overflow-hidden">
                      {post.image_url && (
                        <div className="relative h-56 lg:h-72 border-b-2 border-navy-base overflow-hidden">
                          <img src={post.image_url} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt="" />
                          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                            {post.tags?.slice(0, 3).map((t: string) => (
                              <span key={t} className="bg-white border-2 border-navy-base px-3 py-1 text-navy-base text-[9px] font-black uppercase shadow-[3px_3px_0px_0px_#0a2342]">{t}</span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Reduced padding to p-8 lg:p-10 to make cards tighter */}
                      <div className="p-8 lg:p-10 bg-[#fdfcf5]">
                        <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-muted-cerulean mb-5 italic border-b-2 border-navy-base/5 pb-3">
                          <CalendarDays size={14} className="text-tangerine-accent" /> 
                          {new Date(post.created_at).toLocaleDateString()}
                        </div>
                        <h2 className="text-2xl lg:text-3xl font-black text-navy-base uppercase tracking-tighter mb-6 leading-tight group-hover:text-tangerine-accent transition-colors">{post.title}</h2>
                        <div 
                          className="prose prose-slate font-serif text-muted-cerulean text-base lg:text-lg leading-relaxed mb-8 italic line-clamp-3 prose-p:mb-0" 
                          dangerouslySetInnerHTML={{ __html: post.content }} 
                        />
                        <Link to={`/blog/${post.id}`} className="inline-flex items-center gap-3 text-navy-base font-black uppercase tracking-widest text-[11px] group/link border-b-4 border-double border-tangerine-accent pb-1">
                          Full Dispatch <ArrowRight size={16} strokeWidth={3} className="group-hover/link:translate-x-2 transition-transform" />
                        </Link>
                      </div>
                    </article>
                  ))
                ) : (
                  <div className="py-20 text-center bg-white border-4 border-dashed border-navy-base/10">
                    <Search className="mx-auto text-navy-base/10 mb-4" size={40} />
                    <p className="font-black uppercase tracking-[0.2em] text-navy-base/20 text-lg italic">No dispatches match your search.</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};