import { 
  CalendarDays, ArrowRight, Tag, 
  Archive, Mail, Send 
} from 'lucide-react';

// --- ACTUAL STORE DATA ---
const featuredPost = {
  title: "A Gamer's Glossary",
  excerpt: "This glossary is designed for the board gamer new to the hobby who want to expand their vocabulary. It can also serve as a nice refresher for those already in the board game hobby. This list is by no means complete but here are a few of the more common terms that you are more likely to come across...\n\nAmerithrash/Ameritrash: There is more of a focus on storytelling and direct confrontation between players. An example is Risk.\n\nBeer and Pretzels: A catch-all term for any game that does not require large amounts of thought and plays relatively quickly.",
  category: "Board Games",
  date: "November 2019",
  author: "Vinay Patil",
  image: "https://images.unsplash.com/photo-1611891487122-2075bc9d09e5?auto=format&fit=crop&q=80&w=800"
};

const recentPosts = [
  {
    title: "Special Orders",
    excerpt: "One of the less used services that we offer at the Hobby Corner is how even if we do not have an item in stock we can order it in for you. Need a specific RC part? we can do that. Need a new expansion for your favorite board game? we can do that. Want a Melissa and Doug toy? we can do that.",
    category: "Store News",
    date: "November 2018",
    image: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&q=80&w=400"
  },
  {
    title: "32,000 Pieces of Fun",
    excerpt: "We are putting together this gigantic puzzle at the Iowa City Hobby Corner. 32,000 pieces will make up the iconic New York City Skyline. When it is completed, the puzzle will be glued and put up for display on the wall in the Iowa City store. So if you're a puzzler... swing by and help us complete it.",
    category: "Events",
    date: "May 2017",
    image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&q=80&w=400"
  }
];

const tags = [
  "Basher Ball", "Co-operative Play", "Events", "RPGs", 
  "Amerithrash", "Board Games", "Dice", "Euro", 
  "Puzzles", "RC", "Review", "Special Orders", "Toys"
];

const archives = [
  "November 2019", "November 2018", "May 2017", 
  "April 2017", "March 2017", "February 2017", "December 2016"
];

export const BlogPage = () => {
  return (
    <div className="min-h-screen bg-soft-gray-blue font-sans selection:bg-tangerine-accent selection:text-navy-base pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="py-12 lg:py-16 border-b-2 border-navy-base relative overflow-hidden bg-white/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            <div className="lg:col-span-7">
              <div className="inline-block px-3 py-1 bg-white border-2 border-navy-base text-navy-base text-[9px] font-black uppercase tracking-[0.2em] mb-5 shadow-[3px_3px_0px_0px_rgba(10,35,66,1)]">
                The Hobby Corner Dispatch
              </div>
              
              <h1 className="text-3xl lg:text-4xl font-black text-navy-base uppercase tracking-tighter leading-[1.0] mb-6">
                History, News, & <br />
                <span className="text-tangerine-accent italic">Community.</span>
              </h1>
              
              <p className="font-serif text-muted-cerulean text-lg leading-relaxed max-w-xl">
                Explore the archives of The Hobby Corner. From massive 32,000-piece puzzle builds to our comprehensive guides on tabletop gaming terminology.
              </p>
            </div>
            
            <div className="lg:col-span-5 flex justify-start lg:justify-end">
              <div className="bg-navy-base border-2 border-navy-base px-10 py-8 shadow-[6px_6px_0px_0px_#ff6a00] rotate-2 w-full max-w-[340px]">
                <h3 className="text-3xl font-black text-white uppercase tracking-tighter leading-none mb-2">Read.</h3>
                <p className="font-black text-tangerine-accent uppercase tracking-widest text-[11px] leading-tight text-stroke-thin">
                  Stories from inside <br />the Iowa City store.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. MAIN BLOG CONTENT */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* LEFT: ARTICLES FEED */}
            <div className="lg:col-span-8 space-y-12">
              
              {/* Featured Post (A Gamer's Glossary) */}
              <div>
                <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-navy-base/40 mb-4">Featured Article</h2>
                <article className="group bg-white border-2 border-navy-base shadow-[8px_8px_0px_0px_rgba(10,35,66,1)] hover:shadow-[10px_10px_0px_0px_#ff6a00] transition-all cursor-pointer">
                  <div className="relative h-64 sm:h-80 overflow-hidden border-b-2 border-navy-base">
                    <img src={featuredPost.image} alt={featuredPost.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute top-4 left-4 bg-tangerine-accent border-2 border-navy-base px-3 py-1 text-navy-base text-[10px] font-black uppercase tracking-widest shadow-[3px_3px_0px_0px_#0a2342]">
                      {featuredPost.category}
                    </div>
                  </div>
                  <div className="p-8 lg:p-10 bg-[#fdfcf5]">
                    <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-muted-cerulean mb-4">
                      <span className="flex items-center gap-2"><CalendarDays size={12} /> {featuredPost.date}</span>
                      <span className="text-navy-base/20">|</span>
                      <span>By {featuredPost.author}</span>
                    </div>
                    <h3 className="text-3xl font-black text-navy-base uppercase tracking-tighter mb-4 group-hover:text-tangerine-accent transition-colors leading-none">
                      {featuredPost.title}
                    </h3>
                    <p className="font-serif text-muted-cerulean text-base leading-relaxed mb-8 whitespace-pre-line">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-navy-base font-black uppercase tracking-widest text-[11px]">
                      Read Full Glossary <ArrowRight size={14} strokeWidth={3} className="group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </article>
              </div>

              {/* Recent Posts Grid */}
              <div>
                <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-navy-base/40 mb-4 mt-8">From the Archives</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {recentPosts.map((post, idx) => (
                    <article key={idx} className="group bg-white border-2 border-navy-base shadow-[6px_6px_0px_0px_#0a2342] hover:shadow-[8px_8px_0px_0px_#ff6a00] transition-all flex flex-col cursor-pointer">
                      <div className="relative h-48 overflow-hidden border-b-2 border-navy-base shrink-0">
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute top-3 left-3 bg-white border-2 border-navy-base px-2 py-1 text-navy-base text-[9px] font-black uppercase tracking-widest">
                          {post.category}
                        </div>
                      </div>
                      <div className="p-6 flex flex-col flex-1 bg-[#fdfcf5]">
                        <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-tangerine-accent mb-3">
                          <CalendarDays size={10} strokeWidth={3} /> {post.date}
                        </div>
                        <h4 className="text-xl font-black text-navy-base uppercase tracking-tighter mb-3 group-hover:text-tangerine-accent transition-colors leading-tight">
                          {post.title}
                        </h4>
                        <p className="font-serif text-muted-cerulean text-sm leading-relaxed mb-6 italic line-clamp-4">
                          "{post.excerpt}"
                        </p>
                        <div className="mt-auto pt-4 border-t-2 border-dashed border-navy-base/10 flex justify-end">
                          <ArrowRight size={18} className="text-navy-base group-hover:text-tangerine-accent transition-colors" />
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

            </div>

            {/* RIGHT: SIDEBAR */}
            <div className="lg:col-span-4 space-y-10">
              
              {/* Tags (Replaces standard categories) */}
              <div className="bg-white border-2 border-navy-base p-8 shadow-[6px_6px_0px_0px_rgba(10,35,66,1)] rotate-1">
                <div className="flex items-center gap-3 mb-6 border-b-2 border-navy-base pb-4">
                  <Tag className="text-tangerine-accent" size={20} />
                  <h4 className="font-black uppercase text-navy-base text-lg tracking-tight">Tags</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, i) => (
                    <a 
                      key={i} 
                      href="#" 
                      className="px-3 py-1.5 bg-soft-gray-blue/30 border border-navy-base/20 text-[10px] font-black uppercase tracking-widest text-navy-base hover:bg-tangerine-accent hover:border-tangerine-accent hover:text-white transition-colors"
                    >
                      {tag}
                    </a>
                  ))}
                </div>
              </div>

              {/* Archive */}
              <div className="bg-[#fdfcf5] border-2 border-navy-base p-8 shadow-[6px_6px_0px_0px_rgba(10,35,66,1)] -rotate-1">
                <div className="flex items-center gap-3 mb-6 border-b-2 border-navy-base pb-4">
                  <Archive className="text-tangerine-accent" size={20} />
                  <h4 className="font-black uppercase text-navy-base text-lg tracking-tight">Archive</h4>
                </div>
                <ul className="space-y-3">
                  {archives.map((date, i) => (
                    <li key={i}>
                      <a href="#" className="font-serif text-muted-cerulean text-sm hover:text-tangerine-accent hover:underline transition-colors">
                        {date}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Newsletter Box */}
              <div className="bg-tangerine-accent border-2 border-navy-base p-8 shadow-[6px_6px_0px_0px_#0a2342]">
                <div className="flex items-center gap-3 mb-4">
                  <Mail className="text-navy-base" size={24} />
                  <h3 className="text-xl font-black text-navy-base uppercase tracking-tighter">Stay Updated</h3>
                </div>
                <p className="font-black text-white text-[10px] uppercase tracking-widest leading-relaxed mb-6">
                  Get restock alerts and hobby news delivered straight to your inbox.
                </p>
                <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                  <input 
                    type="email" 
                    placeholder="ENTER EMAIL ADDRESS" 
                    className="w-full bg-white border-2 border-navy-base px-4 py-3 text-[10px] font-black uppercase tracking-widest text-navy-base placeholder:text-navy-base/30 outline-none focus:ring-2 focus:ring-white"
                  />
                  <button className="w-full flex items-center justify-center gap-2 bg-navy-base text-white px-4 py-3 font-black uppercase text-[10px] tracking-widest hover:bg-white hover:text-navy-base transition-colors border-2 border-transparent hover:border-navy-base">
                    Subscribe <Send size={12} />
                  </button>
                </form>
              </div>

            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default BlogPage;