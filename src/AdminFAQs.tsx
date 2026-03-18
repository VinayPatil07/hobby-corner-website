import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient'; // Adjust path if needed!

interface FAQ {
  id: string; // Updated to match your new UUID!
  question: string;
  email: string;
  created_at: string;
  answer: string | null;
  category: string | null;
  status: string;
}

const CATEGORIES = ["Store Info", "Products", "Shipping & Returns", "Events", "Other"];

export default function AdminFAQs() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [activeTab, setActiveTab] = useState<'pending' | 'answered' | 'denied'>('pending');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [categories, setCategories] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFaqs();
  }, [activeTab]); // Re-fetch when the tab changes

  const fetchFaqs = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('faqs')
      .select('*')
      .eq('status', activeTab)
      .order('created_at', { ascending: false });
    
    if (error) console.error("Error fetching FAQs:", error);
    else setFaqs(data || []);
    
    setLoading(false);
  };

  const handlePublish = async (id: string, email: string) => {
    const answerText = answers[id];
    const categoryText = categories[id];

    if (!answerText || !categoryText) {
      return alert("Please select a category and type an answer!");
    }

    // 1. Update Supabase
    const { error: dbError } = await supabase
      .from('faqs')
      .update({ answer: answerText, category: categoryText, status: 'answered' })
      .eq('id', id);

    if (dbError) return alert("Database update failed.");

    // 2. Trigger the Email via our new API
    if (email && email !== "No email provided") {
      try {
        await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: email,
            subject: "Your question has been answered!",
            question: faqs.find(f => f.id === id)?.question,
            answer: answerText
          })
        });
        alert("Published and Email Sent!");
      } catch (err) {
        console.error("Email failed to send:", err);
        alert("Answer published, but email notification failed.");
      }
    } else {
      alert("Answer published! (No email was provided by the user)");
    }

    setFaqs(faqs.filter(faq => faq.id !== id));
  };

  const handleDeny = async (id: string) => {
    const { error } = await supabase.from('faqs').update({ status: 'denied' }).eq('id', id);
    if (!error) setFaqs(faqs.filter(faq => faq.id !== id));
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to permanently delete this?")) return;
    const { error } = await supabase.from('faqs').delete().eq('id', id);
    if (!error) setFaqs(faqs.filter(faq => faq.id !== id));
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h1>🛡️ FAQ Management System</h1>
      
      {/* TABS */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        {(['pending', 'answered', 'denied'] as const).map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '10px 20px', 
              fontWeight: 'bold',
              cursor: 'pointer',
              backgroundColor: activeTab === tab ? '#ff8c00' : '#eee',
              color: activeTab === tab ? 'white' : 'black',
              border: 'none', borderRadius: '4px'
            }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <hr style={{ margin: '20px 0' }}/>

      {loading ? <p>Loading...</p> : faqs.length === 0 ? <p>No {activeTab} questions found.</p> : null}

      {faqs.map((faq) => (
        <div key={faq.id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', marginBottom: '20px', backgroundColor: '#f9f9f9' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.9rem', color: '#555' }}>
              <strong>From:</strong> {faq.email || 'Anonymous'} | <strong>Date:</strong> {new Date(faq.created_at).toLocaleDateString()}
            </span>
            <button onClick={() => handleDelete(faq.id)} style={{ backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', padding: '5px 10px' }}>Delete</button>
          </div>
          
          <p style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '15px' }}>Q: {faq.question}</p>
          
          <select 
            style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '4px' }}
            value={categories[faq.id] || faq.category || ""}
            onChange={(e) => setCategories({ ...categories, [faq.id]: e.target.value })}
          >
            <option value="" disabled>-- Select a Category --</option>
            {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>

          <textarea 
            rows={4} 
            style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
            placeholder="Type the official answer here..."
            value={answers[faq.id] !== undefined ? answers[faq.id] : (faq.answer || '')}
            onChange={(e) => setAnswers({ ...answers, [faq.id]: e.target.value })}
          />
          
          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              onClick={() => handlePublish(faq.id, faq.email)}
              style={{ flex: 1, backgroundColor: '#28a745', color: 'white', padding: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              {activeTab === 'answered' ? 'Update Published Answer' : 'Publish & Answer'}
            </button>
            {activeTab === 'pending' && (
              <button 
                onClick={() => handleDeny(faq.id)}
                style={{ flex: 1, backgroundColor: '#6c757d', color: 'white', padding: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
              >
                Deny (Hide)
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}