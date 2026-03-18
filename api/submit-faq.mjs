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

  // The official Discord API endpoint for sending a message
  const discordApiUrl = `https://discord.com/api/v10/channels/${channelId}/messages`;

  // Format the message with our new Interactive Buttons
  const payload = {
    embeds: [
      {
        title: "🚨 New FAQ Question Submitted",
        color: 16738816, // Tangerine Accent
        fields: [
          { name: "Customer Email", value: email || "No email provided", inline: false },
          { name: "Question", value: question, inline: false }
        ],
        timestamp: new Date().toISOString()
      }
    ],
    components: [
      {
        type: 1, // Action Row (a container for buttons)
        components: [
          {
            type: 2, // Button
            style: 3, // Green button
            label: "Answer Question",
            custom_id: `answer_faq`, // We will use this ID to listen for the click later!
          },
          {
            type: 2, // Button
            style: 4, // Red button
            label: "Ignore",
            custom_id: `ignore_faq`,
          }
        ]
      }
    ]
  };

  try {
    const discordRes = await fetch(discordApiUrl, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bot ${botToken}` // Bots must authorize like this!
      },
      body: JSON.stringify(payload)
    });

    if (!discordRes.ok) {
      const errorData = await discordRes.text();
      console.error("Discord API Error:", errorData);
      throw new Error('Failed to send message via Discord Bot');
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}