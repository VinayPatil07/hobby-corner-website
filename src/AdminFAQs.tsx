import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient'; // Update this path if necessary!

interface FAQ {
  id: number;
  question: string;
  email: string;
  created_at: string;
}

export default function AdminFAQs() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUnansweredFaqs();
  }, []);

  const fetchUnansweredFaqs = async () => {
    // Fetch all FAQs where the 'answer' column is currently empty (null)
    const { data, error } = await supabase
      .from('faqs')
      .select('*')
      .is('answer', null)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error("Error fetching FAQs:", error);
    } else if (data) {
      setFaqs(data);
    }
    setLoading(false);
  };

  const submitAnswer = async (id: number) => {
    const answerText = answers[id];
    if (!answerText) return alert("Please type an answer first!");

    // Update the database with the new answer
    const { error } = await supabase
      .from('faqs')
      .update({ answer: answerText })
      .eq('id', id);

    if (error) {
      console.error("Error saving answer:", error);
      alert("Failed to save answer.");
    } else {
      // Remove the answered question from the screen
      setFaqs(faqs.filter(faq => faq.id !== id));
      alert('Answer published to the website!');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h1>🛡️ Secret FAQ Admin Dashboard</h1>
      <p>Answer questions here, and they will instantly appear on the public FAQ page.</p>
      
      <hr style={{ margin: '20px 0' }}/>

      {loading && <p>Loading questions...</p>}
      {!loading && faqs.length === 0 && <p>🎉 All caught up! No unanswered questions.</p>}

      {faqs.map((faq) => (
        <div key={faq.id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', marginBottom: '20px', backgroundColor: '#f9f9f9' }}>
          <p style={{ margin: '0 0 10px 0', fontSize: '0.9rem', color: '#555' }}>
            <strong>From:</strong> {faq.email || 'Anonymous'} | <strong>Date:</strong> {new Date(faq.created_at).toLocaleDateString()}
          </p>
          <p style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '15px' }}>Q: {faq.question}</p>
          
          <textarea 
            rows={4} 
            style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
            placeholder="Type the official answer here..."
            value={answers[faq.id] || ''}
            onChange={(e) => setAnswers({ ...answers, [faq.id]: e.target.value })}
          />
          <button 
            onClick={() => submitAnswer(faq.id)}
            style={{ backgroundColor: '#ff8c00', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Publish Answer
          </button>
        </div>
      ))}
    </div>
  );
}