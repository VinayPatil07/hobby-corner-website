export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send();

  const { to, subject, question, answer } = req.body;
  const resendApiKey = process.env.RESEND_API_KEY;

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${resendApiKey}`,
    },
    body: JSON.stringify({
      from: 'Hobby Corner <sales@hobbycorner.biz>', 
      to: [to],
      subject: subject,
      html: `
        <h1>Hobby Corner FAQ</h1>
        <p>Hi there! Your question has been answered by our team.</p>
        <hr />
        <p><strong>Your Question:</strong> ${question}</p>
        <p><strong>Our Answer:</strong> ${answer}</p>
        <hr />
        <p>Thanks for reaching out!</p>
      `,
    }),
  });

  if (response.ok) {
    return res.status(200).json({ success: true });
  } else {
    const err = await response.text();
    return res.status(500).json({ error: err });
  }
}