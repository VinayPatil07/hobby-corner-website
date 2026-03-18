import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { 
  HelpCircle, Phone, Mail, 
  MapPin, ChevronDown, MessageSquare, 
  Send
} from 'lucide-react';

// --- INITIAL FAQ DATA ---
const faqs = [
  {
    category: "Store Policies",
    questions: [
      {
        q: "What is your return policy?",
        a: "We accept returns on unopened, unused items in their original packaging within 30 days of purchase with a receipt. Defective merchandise can be exchanged for the exact same item. Used games sold through our Exchange Program have a 3-day return window for missing pieces."
      },
      {
        q: "Can you hold an item for me?",
        a: "Absolutely! If you see something you want or call ahead, we can place an item on hold behind the counter for up to 24 hours. After that, it goes back on the shelf."
      },
      {
        q: "Do you buy used RC cars or models?",
        a: "At this time, we only buy and sell used board games through our Used Game Exchange. We do not buy used RC vehicles, parts, or partially assembled model kits."
      }
    ]
  },
  {
    category: "Services & Orders",
    questions: [
      {
        q: "How much does it cost to special order something?",
        a: "Zero! There are no extra fees to use our Special Order service. You pay the standard retail price for the item, just as if it were sitting on our shelf."
      },
      {
        q: "How long is the wait for RC repairs?",
        a: "Wait times fluctuate depending on the season and parts availability. Standard turnaround is 1-2 weeks. We will call you with a diagnostic estimate before performing any major paid labor."
      }
    ]
  },
  {
    category: "Events & Gaming",
    questions: [
      {
        q: "Do I need to pay to use the gaming tables?",
        a: "Open gaming is completely free! If there is not a scheduled tournament or league event happening, you are welcome to use our tables. Certain organized events (like Thursday Board Game Night) have a $5 entry fee, which is immediately returned to you as store credit."
      },
      {
        q: "Can I bring my own food and drinks?",
        a: "We kindly ask that you leave outside snacks and drinks at home. We sell a variety of sodas, water, and snacks at the front counter to help keep our tables clean and our gaming space open to the community."
      }
    ]
  }
];

export const FAQPage = () => {
  // State to track which accordion is currently open
  const [openIndex, setOpenIndex] = useState<string | null>("Store Policies-0");
  const [liveFaqs, setLiveFaqs] = useState<any[]>([]);
  
  // Form State
  const [questionText, setQuestionText] = useState("");
  const [emailText, setEmailText] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Fetch answered FAQs from Supabase when the page loads
  useEffect(() => {
    const fetchFAQs = async () => {
      const { data, error } = await supabase
        .from('faqs')
        .select('*')
        .eq('status', 'answered') // Only get answered questions
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Error fetching FAQs:", error);
      } else if (data) {
        setLiveFaqs(data);
      }
    };

    fetchFAQs();
  }, []);

  // Merge hardcoded FAQs with live FAQs from the database
  const displayFaqs = faqs.map(section => {
    // Find any live FAQs that match the current category loop
    const dynamicQuestions = liveFaqs
      .filter(faq => faq.category === section.category)
      .map(faq => ({ q: faq.question, a: faq.answer })); // Map them to match the { q, a } structure

    return {
      ...section,
      questions: [...section.questions, ...dynamicQuestions]
    };
  });

  const toggleFAQ = (id: string) => {
    setOpenIndex(openIndex === id ? null : id);
  };

const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // 1. Save the question to Supabase
      const { error: dbError } = await supabase
        .from('faqs')
        .insert([
          { 
            email: emailText || null, // Changed from customer_email to email
            question: questionText,
            status: 'pending' 
          }
        ]);

      if (dbError) throw dbError;

      // 2. Ping Discord via Vercel Function
      // We use the local state variables (emailText/questionText) here
      const response = await fetch('/api/submit-faq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: emailText, 
          question: questionText 
        }), 
      });

      if (!response.ok) {
        throw new Error('Failed to send Discord notification');
      }

      // 3. Show Success State
      setIsSubmitted(true);
      setQuestionText("");
      setEmailText("");
      
      setTimeout(() => setIsSubmitted(false), 5000);

    } catch (error) {
      console.error('Failed to submit question:', error);
      alert("Oops! Something went wrong saving your message. Please try calling the store.");
    }
  };

  return (
    <div className="min-h-screen bg-soft-gray-blue font-sans selection:bg-tangerine-accent selection:text-navy-base pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="py-12 lg:py-16 border-b-2 border-navy-base relative overflow-hidden bg-white/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            <div className="lg:col-span-7">
              <div className="inline-block px-3 py-1 bg-white border-2 border-navy-base text-navy-base text-[9px] font-black uppercase tracking-[0.2em] mb-5 shadow-[3px_3px_0px_0px_rgba(10,35,66,1)]">
                Customer Support
              </div>
              
              <h1 className="text-3xl lg:text-4xl font-black text-navy-base uppercase tracking-tighter leading-[1.0] mb-6">
                Frequently Asked <br />
                <span className="text-tangerine-accent italic">Questions.</span>
              </h1>
              
              <p className="font-serif text-muted-cerulean text-lg leading-relaxed max-w-xl">
                Everything you need to know about our return policies, RC repair bench, and open gaming rules at the Iowa City Marketplace.
              </p>
            </div>
            
            <div className="lg:col-span-5 flex justify-start lg:justify-end">
              <div className="bg-navy-base border-2 border-navy-base px-10 py-8 shadow-[6px_6px_0px_0px_#ff6a00] -rotate-2 w-full max-w-[340px]">
                <h3 className="text-3xl font-black text-white uppercase tracking-tighter leading-none mb-2">Help.</h3>
                <p className="font-black text-tangerine-accent uppercase tracking-widest text-[11px] leading-tight text-stroke-thin">
                  Get answers quickly <br />from our staff.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. MAIN CONTENT */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* LEFT: FAQ ACCORDIONS & FORM */}
            <div className="lg:col-span-7 space-y-12">
              
              {/* Accordions */}
              <div>
                {displayFaqs.map((section, sIdx) => (
                  <div key={sIdx} className="mb-12 last:mb-0">
                    <div className="flex items-center gap-3 mb-6 border-b-4 border-double border-navy-base pb-2">
                      <HelpCircle className="text-tangerine-accent" size={24} strokeWidth={2.5} />
                      <h2 className="text-2xl font-black text-navy-base uppercase tracking-tighter">{section.category}</h2>
                    </div>
                    
                    <div className="space-y-4">
                      {section.questions.map((faq, qIdx) => {
                        const id = `${section.category}-${qIdx}`;
                        const isOpen = openIndex === id;
                        
                        return (
                          <div 
                            key={qIdx} 
                            className={`bg-white border-2 border-navy-base transition-all duration-300 overflow-hidden cursor-pointer
                              ${isOpen ? 'shadow-[6px_6px_0px_0px_#ff6a00]' : 'shadow-[4px_4px_0px_0px_#0a2342] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#0a2342]'}`}
                            onClick={() => toggleFAQ(id)}
                          >
                            <div className={`p-5 lg:p-6 flex justify-between items-center gap-4 transition-colors ${isOpen ? 'bg-[#fdfcf5]' : 'bg-white'}`}>
                              <h3 className={`font-black uppercase tracking-tight text-sm lg:text-base transition-colors ${isOpen ? 'text-tangerine-accent' : 'text-navy-base'}`}>
                                {faq.q}
                              </h3>
                              <ChevronDown 
                                className={`text-navy-base transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180' : ''}`} 
                                size={20} 
                              />
                            </div>
                            
                            <div 
                              className={`px-5 lg:px-6 font-serif text-muted-cerulean text-base leading-relaxed transition-all duration-300 ease-in-out origin-top
                                ${isOpen ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 py-0 opacity-0'}`}
                            >
                              <div className="pt-4 border-t-2 border-dashed border-navy-base/10">
                                {faq.a}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Ask A Question Form */}
              <div className="bg-white border-2 border-navy-base p-8 lg:p-10 shadow-[8px_8px_0px_0px_rgba(10,35,66,1)] mt-16 relative">
                {/* Visual Tape */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-white/60 border border-navy-base/10 shadow-sm rotate-1 z-20"></div>
                
                <div className="flex items-center gap-3 mb-6 border-b-2 border-navy-base pb-4">
                  <MessageSquare className="text-tangerine-accent" size={24} strokeWidth={2.5} />
                  <h3 className="text-xl font-black text-navy-base uppercase tracking-tighter">Don't see your answer?</h3>
                </div>

                {isSubmitted ? (
                  <div className="bg-tangerine-accent/10 border-2 border-tangerine-accent p-8 text-center animate-in fade-in duration-500">
                    <h4 className="font-black text-navy-base uppercase tracking-widest text-sm mb-2">Message Received!</h4>
                    <p className="font-serif text-muted-cerulean text-sm">Thanks for asking! If you left your email, we will notify you as soon as our staff replies.</p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-5">
                    <div>
                      <label htmlFor="question" className="block text-[10px] font-black uppercase tracking-widest text-navy-base/70 mb-2">
                        What's your question?
                      </label>
                      <textarea 
                        id="question"
                        required
                        rows={3}
                        value={questionText}
                        onChange={(e) => setQuestionText(e.target.value)}
                        placeholder="Type your question here..."
                        className="w-full bg-[#fdfcf5] border-2 border-navy-base p-4 font-serif text-navy-base placeholder:text-navy-base/30 focus:outline-none focus:ring-2 focus:ring-tangerine-accent resize-none"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-[10px] font-black uppercase tracking-widest text-navy-base/70 mb-2 flex items-center gap-2">
                        Email Address <span className="text-tangerine-accent">(Optional)</span>
                      </label>
                      <input 
                        type="email" 
                        id="email"
                        value={emailText}
                        onChange={(e) => setEmailText(e.target.value)}
                        placeholder="Enter email to get notified"
                        className="w-full bg-[#fdfcf5] border-2 border-navy-base p-4 font-serif text-navy-base placeholder:text-navy-base/30 focus:outline-none focus:ring-2 focus:ring-tangerine-accent"
                      />
                    </div>

                    <button 
                      type="submit"
                      className="w-full group relative inline-flex items-center justify-center gap-2 bg-tangerine-accent text-navy-base border-2 border-navy-base px-6 py-4 font-black uppercase tracking-[0.12em] text-[11px] transition-all duration-200 shadow-[4px_4px_0px_0px_rgba(10,35,66,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(10,35,66,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
                    >
                      Submit Question
                      <Send size={14} strokeWidth={3} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                  </form>
                )}
              </div>

            </div>

            {/* RIGHT: CONTACT SIDEBAR */}
            <div className="lg:col-span-5 space-y-8 sticky top-32">
              
              {/* Need More Help Box */}
              <div className="bg-tangerine-accent border-2 border-navy-base p-10 shadow-[6px_6px_0px_0px_#0a2342] rotate-1">
                <div className="flex items-center gap-3 mb-4">
                  <Phone className="text-navy-base" size={28} />
                  <h3 className="text-2xl font-black text-navy-base uppercase tracking-tighter">Give Us A Call</h3>
                </div>
                <p className="font-black text-white text-[11px] uppercase tracking-widest leading-relaxed mb-8">
                  Need an immediate answer? Reach out to the store counter directly during our normal business hours.
                </p>
                
                <div className="space-y-4">
                  <a href="tel:319-338-1788" className="w-full flex items-center justify-center gap-3 bg-navy-base text-white px-6 py-4 font-black uppercase text-[11px] tracking-widest hover:bg-white hover:text-navy-base transition-colors border-2 border-transparent hover:border-navy-base group">
                    <Phone size={16} className="group-hover:animate-bounce" /> 319-338-1788
                  </a>
                  <a href="mailto:info@hobbycorner.biz" className="w-full flex items-center justify-center gap-3 bg-white text-navy-base border-2 border-navy-base px-6 py-4 font-black uppercase text-[11px] tracking-widest hover:bg-navy-base hover:text-white transition-colors group">
                    <Mail size={16} className="group-hover:scale-110 transition-transform" /> info@hobbycorner.biz
                  </a>
                </div>
              </div>

              {/* Store Location Info */}
              <div className="bg-[#fdfcf5] border-2 border-navy-base p-8 shadow-[6px_6px_0px_0px_#0a2342] -rotate-1">
                <div className="flex items-center gap-3 mb-6 border-b-2 border-navy-base pb-4">
                  <MapPin className="text-tangerine-accent" size={24} />
                  <h4 className="font-black uppercase text-navy-base text-lg tracking-tight">Location</h4>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h5 className="text-[10px] font-black uppercase tracking-widest text-navy-base/40 mb-1">Address</h5>
                    <p className="font-serif text-muted-cerulean text-base">
                      1606 Sycamore St.<br />
                      Iowa City, IA 52240
                    </p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-tangerine-accent mt-2">
                      Inside the Iowa City Marketplace
                    </p>
                  </div>

                  <div>
                    <h5 className="text-[10px] font-black uppercase tracking-widest text-navy-base/40 mb-2">Store Hours</h5>
                    <ul className="text-xs font-bold uppercase tracking-widest space-y-2 text-navy-base">
                      <li className="flex justify-between items-center border-b border-dashed border-soft-gray-blue pb-1">
                        <span>Mon - Fri</span>
                        <span className="text-tangerine-accent">10:00 AM - 7:00 PM</span>
                      </li>
                      <li className="flex justify-between items-center border-b border-dashed border-soft-gray-blue pb-1">
                        <span>Saturday</span>
                        <span className="text-tangerine-accent">10:00 AM - 5:30 PM</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span>Sunday</span>
                        <span className="text-tangerine-accent">12:00 PM - 5:00 PM</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default FAQPage;