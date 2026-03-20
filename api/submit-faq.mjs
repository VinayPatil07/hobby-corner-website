export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, question } = req.body;

  if (!question) {
    return res.status(400).json({ error: 'Question is required' });
  }

  // 1. SAVE TO SUPABASE (Strict Version)
  const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

  try {
    const dbRes = await fetch(`${supabaseUrl}/rest/v1/faqs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Profile': 'public',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({ 
        email: email,      // Make sure this matches your 'email' column
        question: question, 
        status: 'pending' 
      })
    });

    if (!dbRes.ok) {
      const dbErrorLog = await dbRes.text();
      console.error("❌ Supabase Rejected Save:", dbErrorLog);
      throw new Error(`Supabase Error: ${dbRes.status}`);
    }
    console.log("✅ Actually Saved to Supabase");
  } catch (dbError) {
    console.error("❌ Database Connection Failed:", dbError);
    return res.status(500).json({ error: "Database Save Failed" });
  }

  // 2. SEND THE DISCORD ALERT
  const botToken = process.env.DISCORD_BOT_TOKEN;
  const channelId = process.env.DISCORD_CHANNEL_ID;

  if (!botToken || !channelId) {
    return res.status(500).json({ error: 'Discord keys missing' });
  }

  const adminUrl = `https://hobby-corner-website.vercel.app/admin/faqs`;
  const discordApiUrl = `https://discord.com/api/v10/channels/${channelId}/messages`;

  const payload = {
    content: "@here 🚨 New FAQ Question Submitted!", // <-- Add this line to trigger the ping
    embeds: [
      {
        title: "🚨 New FAQ Question Submitted",
        description: `**[➡️ Open Admin Dashboard](${adminUrl})**`,
        color: 16738816, 
        fields: [
          { name: "Customer Email", value: email || "No email provided", inline: false },
          { name: "Question", value: question || "Empty Question", inline: false }
        ],
        timestamp: new Date().toISOString()
      }
    ]
  };

  try {
    const discordRes = await fetch(discordApiUrl, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bot ${botToken}` 
      },
      body: JSON.stringify(payload)
    });

    if (!discordRes.ok) {
      const errorData = await discordRes.text();
      console.error("Discord API Error Reason:", errorData);
      throw new Error('Failed to send message via Discord Bot');
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}