import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { 
  CalendarDays, User, ArrowLeft, Loader2, 
  Share2, Quote 
} from 'lucide-react';

export default function BlogPostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      const { data } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .single();
      
      if (data) setPost(data);
      setLoading(false);
    };
    fetchPost();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-soft-gray-blue">
      <Loader2 className="animate-spin text-navy-base" size={48} />
    </div>
  );

  if (!post) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-soft-gray-blue p-12 text-center">
      <h2 className="text-4xl font-black uppercase text-navy-base mb-6 italic tracking-tighter">Dispatch Missing.</h2>
      <Link to="/blog" className="text-tangerine-accent font-black uppercase tracking-widest flex items-center gap-3 border-b-2 border-tangerine-accent pb-1">
        <ArrowLeft size={20} /> Return to Dispatch
      </Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-soft-gray-blue font-sans selection:bg-tangerine-accent selection:text-navy-base pb-32">
      
      {/* 1. FIXED HEADER - Now using max-w-7xl to align with the article grid */}
      <header className="py-12 lg:py-16 bg-white border-b-2 border-navy-base">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col items-start gap-10 mb-10">
            <Link to="/blog" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-navy-base/40 hover:text-tangerine-accent transition-colors group">
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform"/> Back to Dispatch
            </Link>
            
            <div className="inline-block px-3 py-1 bg-tangerine-accent border-2 border-navy-base text-navy-base text-[9px] font-black uppercase tracking-[0.2em] shadow-[4px_4px_0px_0px_#0a2342]">
              {post?.tags?.[0] || 'Store News'}
            </div>
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-black text-navy-base uppercase tracking-tighter leading-[1.0] mb-12 italic">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-8 py-8 border-y-4 border-double border-navy-base/10">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-navy-base rounded-full flex items-center justify-center text-white shadow-[2px_2px_0px_0px_#ff6a00]">
                <User size={18} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-navy-base">Staff Writer</p>
                <p className="font-serif text-muted-cerulean text-[10px] italic leading-none mt-1">Hobby Corner Correspondent</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-cerulean">
              <CalendarDays size={16} className="text-tangerine-accent" />
              {new Date(post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </div>
          </div>
        </div>
      </header>

      {/* 2. MAIN CONTENT GRID - Now perfectly aligned with the header above */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        
        {/* ARTICLE BODY (Column 1 - Left) */}
        <main className="lg:col-span-8 order-1">
          {post.image_url && (
            <figure className="mb-20">
              <div className="bg-white border-2 border-navy-base shadow-[16px_16px_0px_0px_#0a2342] overflow-hidden">
                <img src={post.image_url} className="w-full h-auto object-cover" alt={post.title} />
              </div>
              <figcaption className="mt-6 font-serif text-sm italic text-muted-cerulean border-l-4 border-tangerine-accent pl-6">
                Official Hobby Corner Archives
              </figcaption>
            </figure>
          )}

          <div 
            className="font-serif text-navy-base leading-[2.1] italic whitespace-pre-wrap 
                       [&_p]:mb-10 [&_p]:block
                       [&_strong]:font-black [&_strong]:not-italic [&_strong]:block [&_strong]:mt-12 [&_strong]:text-xl [&_strong]:text-navy-base
                       [&_ul]:list-disc [&_ul]:pl-10 [&_ul]:mb-10
                       [&_li]:mb-4"
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />
          
          <footer className="mt-24 pt-16 border-t-8 border-double border-navy-base/10">
            <Link to="/blog" className="inline-block bg-navy-base text-white px-8 py-4 font-black uppercase text-xs tracking-widest hover:bg-tangerine-accent hover:text-navy-base transition-colors shadow-[6px_6px_0px_0px_#ff6a00]">
              Return to newsroom
            </Link>
          </footer>
        </main>

        {/* SIDEBAR (Column 2 - Right) */}
        <aside className="lg:col-span-4 space-y-10 order-2 sticky top-12">
          <div className="bg-white border-2 border-navy-base p-8 shadow-[8px_8px_0px_0px_rgba(10,35,66,1)] rotate-1">
            <h4 className="font-black uppercase text-[10px] tracking-widest text-navy-base/40 mb-6 border-b border-navy-base/10 pb-2 text-center">Share Dispatch</h4>
            <button 
              onClick={() => navigator.clipboard.writeText(window.location.href)}
              className="w-full flex items-center justify-center p-4 bg-tangerine-accent border-2 border-navy-base text-navy-base font-black uppercase text-[10px] tracking-widest hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_0px_#0a2342] transition-all bg-white shadow-[4px_4px_0px_0px_#0a2342]"
            >
              <Share2 size={16} className="mr-3" /> Copy Link
            </button>
          </div>

          <div className="bg-navy-base text-white p-8 shadow-[6px_6px_0px_0px_#ff6a00] -rotate-1">
            <Quote className="text-tangerine-accent mb-4" size={24} />
            <p className="font-serif text-sm italic leading-relaxed">
              Serving the Iowa City hobby community since 1976. Visit the shop at Sycamore Mall for the full experience.
            </p>
          </div>
        </aside>

      </div>
    </div>
  );
}
