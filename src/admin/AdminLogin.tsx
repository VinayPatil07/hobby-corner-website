import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, Mail } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      alert(error.message);
    } else {
      navigate('/admin/terminal'); // <-- Add this redirect!
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5] flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-md bg-white border-4 border-[#0a2342] p-10 shadow-[12px_12px_0px_0px_#0a2342]">
        <div className="flex flex-col items-center mb-10">
          <div className="bg-[#ff6a00] p-4 border-2 border-[#0a2342] mb-4 shadow-[4px_4px_0px_0px_#0a2342]">
            <ShieldCheck size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-black uppercase tracking-tighter italic text-[#0a2342]">Hobby <span className="text-[#ff6a00]">Terminal.</span></h1>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0a2342]/40 mt-2 text-center">Authorized Personnel Only</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-[#0a2342]/60 flex items-center gap-2">
              <Mail size={12}/> Email
            </label>
            <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} 
              className="w-full border-2 border-[#0a2342] p-4 font-bold outline-none focus:ring-4 focus:ring-[#ff6a00]/20" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-[#0a2342]/60 flex items-center gap-2">
              <Lock size={12}/> Password
            </label>
            <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} 
              className="w-full border-2 border-[#0a2342] p-4 font-bold outline-none focus:ring-4 focus:ring-[#ff6a00]/20" />
          </div>
          <button type="submit" disabled={loading}
            className="w-full bg-[#0a2342] text-white font-black uppercase py-5 border-2 border-[#0a2342] shadow-[6px_6px_0px_0px_#ff6a00] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
            {loading ? 'Authenticating...' : 'Enter Terminal'}
          </button>
        </form>
      </div>
    </div>
  );
}