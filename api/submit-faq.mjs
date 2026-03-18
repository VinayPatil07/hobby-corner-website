export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, question } = req.body;

  if (!question) {
    return res.status(400).json({ error: 'Question is required' });
  }

  const botToken = process.env.DISCORD_BOT_TOKEN;
  const channelId = process.env.DISCORD_CHANNEL_ID;

  if (!botToken || !channelId) {
    return res.status(500).json({ error: 'Discord Bot Token or Channel ID missing' });
  }

  // The secret URL to your new Admin Dashboard
  const adminUrl = `https://hobby-corner-website.vercel.app/admin/faqs`;

  const discordApiUrl = `https://discord.com/api/v10/channels/${channelId}/messages`;

  // Format the message with a clickable Magic Link instead of buttons!
  const payload = {
    embeds: [
      {
        title: "🚨 New FAQ Question Submitted",
        description: `**[➡️ Click here to open the Admin Dashboard and answer this question](${adminUrl})**`,
        color: 16738816, // Tangerine Accent
        fields: [
          { name: "Customer Email", value: email || "No email provided", inline: false },
          { name: "Question", value: question, inline: false }
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
      throw new Error('Failed to send message via Discord Bot');
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}