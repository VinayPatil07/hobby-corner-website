import { 
  Wrench, Zap, AlertTriangle, Clock, 
  RefreshCcw, FileText, ShieldCheck, 
  ArrowRight, CheckSquare, Package
} from 'lucide-react';

export const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-soft-gray-blue font-sans selection:bg-tangerine-accent selection:text-navy-base pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="py-12 lg:py-16 border-b-2 border-navy-base relative overflow-hidden bg-white/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            <div className="lg:col-span-7">
              <div className="inline-block px-3 py-1 bg-white border-2 border-navy-base text-navy-base text-[9px] font-black uppercase tracking-[0.2em] mb-5 shadow-[3px_3px_0px_0px_rgba(10,35,66,1)]">
                In-Store Expertise
              </div>
              
              <h1 className="text-3xl lg:text-4xl font-black text-navy-base uppercase tracking-tighter leading-[1.0] mb-6">
                Repair, Resell, <br />
                <span className="text-tangerine-accent italic">Keep Playing.</span>
              </h1>
              
              <p className="font-serif text-muted-cerulean text-lg leading-relaxed max-w-xl">
                Whether you need a motor re-soldered after a rough session or want to clear out your game shelf for store credit, our <span className="text-navy-base font-bold">in-house services</span> have you covered.
              </p>
            </div>
            
            <div className="lg:col-span-5 flex justify-start lg:justify-end">
              <div className="bg-navy-base border-2 border-navy-base px-10 py-8 shadow-[6px_6px_0px_0px_#ff6a00] -rotate-2 w-full max-w-[340px]">
                <h3 className="text-3xl font-black text-white uppercase tracking-tighter leading-none mb-2">Local.</h3>
                <p className="font-black text-tangerine-accent uppercase tracking-widest text-[11px] leading-tight text-stroke-thin">
                  Iowa City's trusted <br />hobby technicians.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. RC REPAIR BENCH */}
      <section className="py-16 border-b-2 border-navy-base/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14 bg-white border-2 border-navy-base shadow-[4px_4px_0px_0px_#ff6a00] flex items-center justify-center rotate-[-2deg]">
              <Wrench className="text-navy-base" size={28} strokeWidth={1.5} />
            </div>
            <div>
              <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-tangerine-accent mb-1">Technical Support</h2>
              <h3 className="text-3xl font-black text-navy-base uppercase tracking-tighter leading-none">RC Repair <span className="italic opacity-50">Bench</span></h3>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: Services & Pricing */}
            <div className="lg:col-span-7 bg-white border-2 border-navy-base p-8 lg:p-10 shadow-[8px_8px_0px_0px_rgba(10,35,66,1)]">
              <h4 className="text-xl font-black text-navy-base uppercase tracking-tighter mb-6 border-b-4 border-double border-navy-base pb-4">
                Labor & Diagnostics
              </h4>
              
              <p className="font-serif text-muted-cerulean text-base leading-relaxed mb-8">
                Our experienced RC staff can help get your car up and running after almost any crash. We make every attempt to fix vehicles promptly once parts arrive.
              </p>

              {/* Pricing Grid */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between p-5 bg-soft-gray-blue/20 border-2 border-navy-base hover:bg-tangerine-accent/10 transition-colors">
                  <div className="flex items-center gap-4">
                    <Clock className="text-navy-base" size={24} />
                    <div>
                      <p className="font-black uppercase text-navy-base text-sm tracking-tight">Standard Labor</p>
                      <p className="font-serif text-muted-cerulean text-[11px] italic">Billed in 15-minute increments ($30/hr)</p>
                    </div>
                  </div>
                  <p className="text-xl font-black text-navy-base">$7.50</p>
                </div>

                <div className="flex items-center justify-between p-5 bg-soft-gray-blue/20 border-2 border-navy-base hover:bg-tangerine-accent/10 transition-colors">
                  <div className="flex items-center gap-4">
                    <Zap className="text-navy-base" size={24} />
                    <div>
                      <p className="font-black uppercase text-navy-base text-sm tracking-tight">Simple Soldering</p>
                      <p className="font-serif text-muted-cerulean text-[11px] italic">Connector or motor lead reattachment</p>
                    </div>
                  </div>
                  <p className="text-xl font-black text-navy-base">$5.00</p>
                </div>
              </div>
              <p className="text-[10px] font-black uppercase text-navy-base/50 tracking-widest text-right">
                * Prices do not include parts or tax.
              </p>
            </div>

            {/* Right: Policies (Rotated Warning) */}
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-[#fdfcf5] border-2 border-navy-base p-10 shadow-[6px_6px_0px_0px_#0a2342] rotate-1">
                <div className="flex items-center gap-3 mb-6">
                  <Clock className="text-tangerine-accent" size={24} />
                  <h4 className="font-black uppercase text-navy-base text-lg tracking-tight">Wait Times</h4>
                </div>
                <p className="font-serif text-muted-cerulean text-sm leading-relaxed mb-8 border-b-2 border-dashed border-navy-base/20 pb-8">
                  During busy seasons, there may be a wait queue for the repair bench. Customers will be contacted via phone the moment service work is completed.
                </p>

                <div className="bg-red-50 border-2 border-red-600 p-6 -rotate-2">
                  <div className="flex items-center gap-2 text-red-600 mb-3">
                    <AlertTriangle size={20} strokeWidth={2.5} />
                    <h5 className="font-black uppercase tracking-widest text-[11px]">30-Day Policy</h5>
                  </div>
                  <p className="font-serif text-red-900 text-sm leading-relaxed italic">
                    All vehicles must be picked up within 30 days of final notice. Vehicles not picked up within the allotted time will be considered abandoned.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. USED GAME EXCHANGE */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14 bg-white border-2 border-navy-base shadow-[4px_4px_0px_0px_#ff6a00] flex items-center justify-center rotate-[-2deg]">
              <RefreshCcw className="text-navy-base" size={28} strokeWidth={1.5} />
            </div>
            <div>
              <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-tangerine-accent mb-1">In-Store Credit</h2>
              <h3 className="text-3xl font-black text-navy-base uppercase tracking-tighter leading-none">Used Game <span className="italic opacity-50">Exchange</span></h3>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left: How it works steps (Matches RC Repair Box) */}
            <div className="lg:col-span-7 bg-white border-2 border-navy-base p-8 lg:p-10 shadow-[8px_8px_0px_0px_rgba(10,35,66,1)]">
              <h4 className="text-xl font-black text-navy-base uppercase tracking-tighter mb-6 border-b-4 border-double border-navy-base pb-4">
                How It Works
              </h4>
              
              <p className="font-serif text-muted-cerulean text-base leading-relaxed mb-8">
                Have too many games cluttering up your house? Short on funds for that new release? Turn your old games into store credit in four simple steps.
              </p>

              <div className="space-y-6">
                <div className="flex gap-5 items-start">
                  <div className="w-8 h-8 shrink-0 bg-soft-gray-blue border-2 border-navy-base flex items-center justify-center text-navy-base font-black">1</div>
                  <div>
                    <h5 className="font-black uppercase tracking-widest text-navy-base text-xs mb-1">Fill Out the Form</h5>
                    <p className="font-serif text-muted-cerulean text-sm">Download and fill out a Used Game Submission Form to bring with your game.</p>
                  </div>
                </div>

                <div className="flex gap-5 items-start">
                  <div className="w-8 h-8 shrink-0 bg-soft-gray-blue border-2 border-navy-base flex items-center justify-center text-navy-base font-black">2</div>
                  <div>
                    <h5 className="font-black uppercase tracking-widest text-navy-base text-xs mb-1">You Set the Price</h5>
                    <p className="font-serif text-muted-cerulean text-sm">You have complete control over what you want the game to sell for on our shelf.</p>
                  </div>
                </div> 

                <div className="flex gap-5 items-start">
                  <div className="w-8 h-8 shrink-0 bg-soft-gray-blue border-2 border-navy-base flex items-center justify-center text-navy-base font-black">3</div>
                  <div>
                    <h5 className="font-black uppercase tracking-widest text-navy-base text-xs mb-1">We Protect It</h5>
                    <p className="font-serif text-muted-cerulean text-sm">We shrink-wrap your game to ensure no one tampers with the pieces while it's on display.</p>
                  </div>
                </div>

                <div className="flex gap-5 items-start p-4 bg-tangerine-accent/10 border-2 border-tangerine-accent mt-4">
                  <div className="w-8 h-8 shrink-0 bg-tangerine-accent border-2 border-navy-base flex items-center justify-center text-navy-base font-black">4</div>
                  <div>
                    <h5 className="font-black uppercase tracking-widest text-navy-base text-xs mb-1">Get Paid in Credit</h5>
                    <p className="font-serif text-navy-base/80 text-sm">If the game sells, you receive <span className="font-black border-b-2 border-tangerine-accent">80% of your asking price</span> applied directly to your store account.</p>
                  </div>
                </div>
              </div>

              <a 
                href="https://www.hobbycorner.net/_files/ugd/54da6d_2f5a86f3e06740ef8e4d8c072c03e5e8.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 w-full group relative flex items-center justify-center gap-3 bg-navy-base text-white border-2 border-navy-base px-6 py-4 font-black uppercase tracking-[0.2em] text-[11px] transition-all shadow-[4px_4px_0px_0px_rgba(255,155,84,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(255,155,84,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
              >
                <FileText size={16} />
                Download Submission Form
                <ArrowRight size={14} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Right: The Fine Print (Matches RC Repair Right Side) */}
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-[#fdfcf5] border-2 border-navy-base p-10 shadow-[6px_6px_0px_0px_#0a2342] rotate-1">
                <div className="flex items-center gap-3 mb-6">
                  <ShieldCheck className="text-tangerine-accent" size={24} />
                  <h4 className="font-black uppercase text-navy-base text-lg tracking-tight">The Fine Print</h4>
                </div>
                
                <ul className="space-y-6 font-serif text-muted-cerulean text-sm mb-8 border-b-2 border-dashed border-navy-base/20 pb-8">
                  <li className="flex gap-4 items-start">
                    <CheckSquare className="text-navy-base/40 shrink-0 mt-1" size={16} />
                    <span>The buyer has <strong>3 days</strong> to make a return after the sale for misrepresentation (missing pieces, etc).</span>
                  </li>
                  <li className="flex gap-4 items-start">
                    <CheckSquare className="text-navy-base/40 shrink-0 mt-1" size={16} />
                    <span>If no return is made, your credit is applied <strong>3 days</strong> after the sale.</span>
                  </li>
                  <li className="flex gap-4 items-start">
                    <CheckSquare className="text-navy-base/40 shrink-0 mt-1" size={16} />
                    <span>Games have <strong>60 days</strong> to sell on our shelves.</span>
                  </li>
                </ul>

                <div className="bg-white border-2 border-navy-base p-5 flex items-center gap-4 -rotate-1">
                   <Package className="text-tangerine-accent shrink-0" size={24} />
                   <p className="font-black uppercase text-[10px] tracking-widest text-navy-base leading-snug">
                     Limit of 5 games <br />per household at one time.
                   </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default ServicesPage;