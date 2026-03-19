import React from 'react';

export const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-[#fdfcf5] py-16 px-4 sm:px-6 lg:px-8 font-sans text-[#0a2342]">
      <div className="max-w-4xl mx-auto bg-white border-4 border-[#0a2342] p-8 md:p-12 shadow-[12px_12px_0px_0px_#0a2342]">
        <h1 className="text-4xl font-black uppercase tracking-tighter italic mb-8">Privacy <span className="text-[#ff6a00]">Policy.</span></h1>
        
        <div className="prose prose-slate max-w-none font-serif text-lg leading-relaxed text-[#0a2342]/80 space-y-6">
          <p><strong>Last Updated: March 2026</strong></p>
          
          <p>The Hobby Corner ("we", "our", or "us") respects your privacy and is committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights.</p>

          <h3 className="text-2xl font-black uppercase font-sans tracking-tight text-[#0a2342] mt-8 mb-4">1. The Data We Collect</h3>
          <p>We may collect, use, store and transfer different kinds of personal data about you when you use our Special Order or FAQ submission forms, which includes:</p>
          <ul className="list-disc pl-6">
            <li><strong>Identity Data:</strong> First name and last name.</li>
            <li><strong>Contact Data:</strong> Email address and telephone numbers.</li>
            <li><strong>Transaction Data:</strong> Details about items you have requested us to order.</li>
          </ul>

          <h3 className="text-2xl font-black uppercase font-sans tracking-tight text-[#0a2342] mt-8 mb-4">2. How We Use Your Data</h3>
          <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
          <ul className="list-disc pl-6">
            <li>To respond to your direct inquiries and FAQ submissions.</li>
            <li>To process and fulfill Special Orders you have requested.</li>
            <li>To notify you via email or phone regarding the status of your orders.</li>
          </ul>

          <h3 className="text-2xl font-black uppercase font-sans tracking-tight text-[#0a2342] mt-8 mb-4">3. Third-Party Services</h3>
          <p>To provide our services, we share necessary data with trusted third-party platforms, including our database provider (Supabase), internal communication tools (Discord), and our email service provider. These services are bound by their own privacy policies to keep your data secure.</p>

          <h3 className="text-2xl font-black uppercase font-sans tracking-tight text-[#0a2342] mt-8 mb-4">4. Data Security</h3>
          <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed. Access to your personal data is limited to those employees who have a business need to know.</p>

          <h3 className="text-2xl font-black uppercase font-sans tracking-tight text-[#0a2342] mt-8 mb-4">5. Contact Us</h3>
          <p>If you have any questions about this privacy policy or our privacy practices, please contact us at:<br/>
          <strong>Hobby Corner</strong><br/>
          1606 Sycamore St, Iowa City, IA 52240<br/>
          info@hobbycorner.biz<br/>
          319-338-1788</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;