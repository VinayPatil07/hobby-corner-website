import { useRef, useState } from 'react';
import { useSpecialOrder } from '../hooks/useSpecialOrder';
import { 
  ArrowRight, Truck, Camera, Hash, Info, 
  ClipboardList, Package, PhoneCall, AlertCircle, CheckCircle2 
} from 'lucide-react';

export const SpecialOrders = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const { submitOrder, isSubmitting, submitted, error, setSubmitted } = useSpecialOrder();
  
  // NEW: State to hold the selected file so we can show the file name to the user
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submit Clicked! React State says the file is:", selectedFile); // The tracking beacon
    if (formRef.current) {
      submitOrder(formRef.current, selectedFile);
    }
  };

  // SUCCESS STATE: Replaces the form with a confirmation slip
  if (submitted) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-soft-gray-blue p-8">
        <div className="bg-white border-2 border-navy-base p-10 lg:p-14 shadow-[8px_8px_0px_0px_#ff6a00] text-center max-w-md rotate-1">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-soft-gray-blue border-2 border-navy-base rounded-full mb-6">
            <Truck className="text-tangerine-accent" size={32} />
          </div>
          <h2 className="text-3xl font-black text-navy-base uppercase mb-4 italic tracking-tighter">Slip Submitted!</h2>
          <p className="font-serif text-muted-cerulean text-lg mb-8 leading-relaxed">
            We've received your request. Our staff will coordinate with our distributors and contact you via phone within a week.
          </p>
          <button 
            onClick={() => {
              setSubmitted(false);
              setSelectedFile(null); // Reset file state when submitting another
            }}
            className="bg-navy-base text-white px-8 py-4 font-black uppercase text-[11px] tracking-[0.2em] hover:bg-tangerine-accent transition-all shadow-[4px_4px_0px_0px_#ff9b54]"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-soft-gray-blue font-sans selection:bg-tangerine-accent selection:text-navy-base">
      
      {/* 1. HERO SECTION */}
      <section className="py-12 lg:py-16 border-b-2 border-navy-base relative overflow-hidden bg-white/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            <div className="lg:col-span-7">
              <div className="inline-block px-3 py-1 bg-white border-2 border-navy-base text-navy-base text-[9px] font-black uppercase tracking-[0.2em] mb-5 shadow-[3px_3px_0px_0px_rgba(10,35,66,1)]">
                The Personal Concierge Service
              </div>
              
              <h1 className="text-3xl lg:text-4xl font-black text-navy-base uppercase tracking-tighter leading-[1.0] mb-6">
                If we don't have it, <br />
                <span className="text-tangerine-accent italic">we'll get it.</span>
              </h1>
              
              <p className="font-serif text-muted-cerulean text-lg leading-relaxed max-w-7xll">
                One of our best-kept secrets: If it’s not on the shelf, it doesn’t mean it’s out of reach. From specific <span className="text-navy-base font-bold">RC parts</span> to <span className="text-navy-base font-bold">Board Game expansions</span> or even <span className="text-navy-base font-bold">Melissa & Doug toys</span>—we can order it for you at no extra cost.
              </p>
            </div>
            
            <div className="lg:col-span-5 flex justify-start lg:justify-end">
              <div className="bg-tangerine-accent border-2 border-navy-base px-10 py-8 shadow-[6px_6px_0px_0px_rgba(10,35,66,1)] rotate-2 w-full max-w-[340px]">
                <h3 className="text-3xl font-black text-navy-base uppercase tracking-tighter leading-none mb-2">Zero.</h3>
                <p className="font-black text-white uppercase tracking-widest text-[11px] leading-tight">
                  Extra fees to <br />special order.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FORM & SIDEBAR SECTION */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* LEFT: THE FORM SLIP */}
            <div className="lg:col-span-7 bg-white border-2 border-navy-base p-8 lg:p-10 shadow-[8px_8px_0px_0px_rgba(10,35,66,1)] relative">
              <div className="flex justify-between items-start mb-8 border-b-4 border-double border-navy-base pb-6">
                <div>
                  <h2 className="text-xl font-black text-navy-base uppercase tracking-tighter">Order Request Slip</h2>
                  <p className="text-[9px] font-black uppercase text-tangerine-accent tracking-[0.2em] mt-1">Status: Open Request</p>
                </div>
                <Truck className="text-navy-base opacity-20" size={32} />
              </div>

              <form ref={formRef} className="space-y-6" onSubmit={handleSubmit} encType="multipart/form-data">
                {/* Error Notification */}
                {error && (
                  <div className="p-4 bg-red-50 border-2 border-red-600 text-red-600 text-xs font-black uppercase tracking-widest flex items-center gap-2">
                    <AlertCircle size={14} /> {error}
                  </div>
                )}

                {/* Required Contact Info */}
                <div className="space-y-5">
                   <div className="flex items-center gap-2 border-l-4 border-tangerine-accent pl-3">
                      <h3 className="text-[10px] font-black uppercase tracking-widest text-navy-base">Required Contact Info</h3>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-widest text-navy-base">Your Name *</label>
                      <input name="name" required type="text" className="w-full border-2 border-navy-base p-3 text-sm font-serif outline-none bg-soft-gray-blue/20 focus:bg-white transition-colors" placeholder="Full Name" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-widest text-navy-base">Phone Number *</label>
                      <input name="phone" required type="tel" className="w-full border-2 border-navy-base p-3 text-sm font-serif outline-none bg-soft-gray-blue/20 focus:bg-white transition-colors" placeholder="(319) 000-0000" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-navy-base">Email Address *</label>
                    <input name="email" required type="email" className="w-full border-2 border-navy-base p-3 text-sm font-serif outline-none bg-soft-gray-blue/20 focus:bg-white transition-colors" placeholder="email@address.com" />
                  </div>
                </div>

                {/* Item Identification */}
                <div className="space-y-5 pt-2">
                  <div className="flex items-center gap-2 border-l-4 border-navy-base pl-3">
                      <h3 className="text-[10px] font-black uppercase tracking-widest text-navy-base">Item Identification</h3>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-navy-base">Item Name / Description *</label>
                    <input name="itemName" required type="text" className="w-full border-2 border-navy-base p-3 text-sm font-serif outline-none bg-soft-gray-blue/20 focus:bg-white transition-colors" placeholder="e.g. Traxxas Slash Rear A-Arms" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-widest text-navy-base flex items-center gap-2">
                         SKU / UPC <span className="text-[8px] opacity-40 italic lowercase">(Optional)</span>
                      </label>
                      <div className="relative">
                        <Hash size={12} className="absolute left-3 top-4 text-navy-base/40" />
                        <input name="sku" type="text" className="w-full border-2 border-navy-base p-3 pl-10 text-sm font-serif outline-none bg-soft-gray-blue/10 focus:bg-white transition-colors" placeholder="000000000000" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-widest text-navy-base flex items-center gap-2">
                         Brand <span className="text-[8px] opacity-40 italic lowercase">(Optional)</span>
                      </label>
                      <div className="relative">
                        <Info size={12} className="absolute left-3 top-4 text-navy-base/40" />
                        <input name="brand" type="text" className="w-full border-2 border-navy-base p-3 pl-10 text-sm font-serif outline-none bg-soft-gray-blue/10 focus:bg-white transition-colors" placeholder="e.g. Bandai" />
                      </div>
                    </div>
                  </div>

                  {/* NEW: Additional Notes Field */}
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-navy-base flex items-center gap-2">
                       Additional Notes <span className="text-[8px] opacity-40 italic lowercase">(Optional)</span>
                    </label>
                    <textarea 
                      name="description" 
                      className="w-full border-2 border-navy-base p-3 text-sm font-serif outline-none bg-soft-gray-blue/20 focus:bg-white transition-colors min-h-[100px] resize-y" 
                      placeholder="Any extra details? e.g., 'Only looking for the blue version', 'Need it before Friday', etc." 
                    />
                  </div>

                  {/* UPDATED: Photo Upload with State Feedback and Name Attribute */}
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-navy-base flex items-center gap-2">
                      Reference Photo <span className="text-[8px] opacity-40 italic lowercase">(Optional)</span>
                    </label>
                    <div className={`relative border-2 border-dashed p-6 text-center group transition-all cursor-pointer ${selectedFile ? 'border-tangerine-accent bg-tangerine-accent/5' : 'border-navy-base/30 bg-soft-gray-blue/5 hover:bg-white hover:border-tangerine-accent'}`}>
                      <input 
                        type="file" 
                        name="image" 
                        className="absolute inset-0 opacity-0 cursor-pointer" 
                        accept="image/*" 
                        onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                      />
                      {selectedFile ? (
                        <>
                          <CheckCircle2 size={24} className="mx-auto text-tangerine-accent mb-2" />
                          <p className="text-[10px] font-black uppercase tracking-widest text-navy-base">Image Attached</p>
                          <p className="text-[9px] font-serif italic text-navy-base/60 mt-1">{selectedFile.name}</p>
                        </>
                      ) : (
                        <>
                          <Camera size={20} className="mx-auto text-navy-base/20 group-hover:text-tangerine-accent mb-2 transition-colors" />
                          <p className="text-[9px] font-black uppercase tracking-tighter text-navy-base/40">Click to upload or drag photo</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full group relative flex items-center justify-center gap-3 bg-navy-base text-white border-2 border-navy-base px-6 py-4 font-black uppercase tracking-[0.2em] text-[11px] transition-all shadow-[4px_4px_0px_0px_rgba(255,155,84,1)] 
                  ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(255,155,84,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none'}`}
                >
                  {isSubmitting ? 'Processing Order...' : 'Submit Special Order'}
                  <ArrowRight size={14} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>

            {/* RIGHT: STRETCHED SIDEBAR */}
            <div className="lg:col-span-5 space-y-10">
              <div className="relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 bg-white/60 border border-navy-base/10 shadow-sm rotate-1 z-20"></div>
                
                <div className="bg-[#fdfcf5] border-2 border-navy-base p-10 lg:p-12 shadow-[6px_6px_0px_0px_rgba(10,35,66,1)] rotate-1">
                  
                  <div className="space-y-12 mb-12">
                    <div className="flex gap-5">
                      <ClipboardList className="text-tangerine-accent shrink-0" size={24} />
                      <div>
                        <h4 className="text-base font-black uppercase text-navy-base leading-none mb-2 tracking-tight">The Info</h4>
                        <p className="font-serif text-muted-cerulean text-base leading-relaxed">
                          Give us your name, phone, and the item details.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-5">
                      <Package className="text-tangerine-accent shrink-0" size={24} />
                      <div>
                        <h4 className="text-base font-black uppercase text-navy-base leading-none mb-2 tracking-tight">The Wait</h4>
                        <p className="font-serif text-muted-cerulean text-base leading-relaxed">
                          A special order normally takes around one week to arrive.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-5">
                      <PhoneCall className="text-tangerine-accent shrink-0" size={24} />
                      <div>
                        <h4 className="text-base font-black uppercase text-navy-base leading-none mb-2 tracking-tight">The Call</h4>
                        <p className="font-serif text-muted-cerulean text-base leading-relaxed">
                          We'll call you the moment it lands for pickup or mail.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-10 border-t-2 border-dashed border-navy-base/20">
                    <div className="flex items-center gap-2 mb-6 text-navy-base">
                      <AlertCircle size={18} strokeWidth={3} />
                      <h4 className="text-[11px] font-black uppercase tracking-[0.2em]">Delivery Policy</h4>
                    </div>
                    
                    <ul className="space-y-6 font-serif text-muted-cerulean text-base leading-relaxed">
                      <li className="flex gap-3">
                        <span className="text-tangerine-accent font-black">01.</span>
                        <span>Immediate contact upon arrival.</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-tangerine-accent font-black">02.</span>
                        <span>Free in-store pickup or flat-rate shipping.</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-tangerine-accent font-black">03.</span>
                        <span>No extra cost for ordering service.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-8 border-2 border-dashed border-navy-base/30 bg-white/40">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-navy-base mb-4 text-tangerine-accent">Why provide a photo?</h4>
                <p className="font-serif text-muted-cerulean text-base italic leading-relaxed">
                  "Attaching a photo of the box or a screenshot of the part number helps our distributors ensure we get the exact version or revision you need for your project."
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};