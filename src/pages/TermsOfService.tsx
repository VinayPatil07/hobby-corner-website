import React from 'react';

export const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-[#fdfcf5] py-16 px-4 sm:px-6 lg:px-8 font-sans text-[#0a2342]">
      <div className="max-w-4xl mx-auto bg-white border-4 border-[#0a2342] p-8 md:p-12 shadow-[12px_12px_0px_0px_#ff6a00]">
        <h1 className="text-4xl font-black uppercase tracking-tighter italic mb-8">Terms of <span className="text-[#ff6a00]">Service.</span></h1>
        
        <div className="prose prose-slate max-w-none font-serif text-lg leading-relaxed text-[#0a2342]/80 space-y-6">
          <p><strong>Last Updated: March 2026</strong></p>
          
          <p>Please read these terms of service ("terms", "terms of service") carefully before using the Hobby Corner website operated by Hobby Corner ("us", 'we", "our").</p>

          <h3 className="text-2xl font-black uppercase font-sans tracking-tight text-[#0a2342] mt-8 mb-4">1. Conditions of Use</h3>
          <p>We will provide their services to you, which are subject to the conditions stated below in this document. Every time you visit this website or use its services (such as submitting an order request), you accept the following conditions.</p>

          <h3 className="text-2xl font-black uppercase font-sans tracking-tight text-[#0a2342] mt-8 mb-4">2. Special Orders & Availability</h3>
          <p>Submitting a "Special Order" request through our website does not guarantee the fulfillment of that order. Item availability is completely dependent on our distributors. We reserve the right to cancel or reject any special order request if the item is out of print, discontinued, or otherwise unavailable. Pricing provided upon item arrival is final.</p>

          <h3 className="text-2xl font-black uppercase font-sans tracking-tight text-[#0a2342] mt-8 mb-4">3. User Communications</h3>
          <p>Any questions or special order requests submitted through our website must not be illegal, obscene, threatening, defamatory, or invasive of privacy. We reserve the right to ban or ignore users who abuse the submission forms.</p>

          <h3 className="text-2xl font-black uppercase font-sans tracking-tight text-[#0a2342] mt-8 mb-4">4. Limitation of Liability</h3>
          <p>Hobby Corner is not liable for any damages that may occur to you as a result of your misuse of our website. We make no guarantees that the website will be error-free or uninterrupted.</p>

          <h3 className="text-2xl font-black uppercase font-sans tracking-tight text-[#0a2342] mt-8 mb-4">5. Applicable Law</h3>
          <p>By visiting this website, you agree that the laws of the State of Iowa, without regard to principles of conflict laws, will govern these terms of service, or any dispute of any sort that might come between Hobby Corner and you.</p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;