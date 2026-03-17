export default async function handler(req: any, res: any) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, question } = req.body;

  if (!question) {
    return res.status(400).json({ error: 'Question is required' });
  }

  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    return res.status(500).json({ error: 'Discord Webhook URL not configured on server' });
  }

  // Format the message for Discord
  const payload = {
    username: "Hobby Corner FAQ Bot",
    embeds: [
      {
        title: "🚨 New FAQ Question Submitted",
        color: 16738816, // Tangerine Accent
        fields: [
          {
            name: "Customer Email",
            value: email || "No email provided",
            inline: false
          },
          {
            name: "Question",
            value: question,
            inline: false
          }
        ],
        timestamp: new Date().toISOString()
      }
    ]
  };

  try {
    // Send to Discord
    const discordRes = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!discordRes.ok) {
      throw new Error('Failed to send message to Discord');
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Discord Webhook Error:", error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}