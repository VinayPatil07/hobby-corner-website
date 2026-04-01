export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send();

  const { customer_name, item_name, phone, brand } = req.body;

  // 1. GET KEYS FROM ENVIRONMENT
  const botToken = process.env.DISCORD_BOT_TOKEN;
  const channelId = process.env.DISCORD_CHANNEL_ID;
  const adminUrl = "https://hobbycorner.net/admin/terminal"; // Updated to your new domain

  if (!botToken || !channelId) {
    console.error("❌ Discord keys missing in environment variables");
    return res.status(500).json({ error: 'Discord configuration missing' });
  }

  const discordApiUrl = `https://discord.com/api/v10/channels/${channelId}/messages`;

  const payload = {
    content: "@here 📦 New Special Order Request!", 
    embeds: [{
      title: "📦 New Special Order Request",
      description: `**[➡️ Open Admin Dashboard](${adminUrl})**`,
      color: 16738816, 
      fields: [
        { name: "Customer", value: customer_name || "N/A", inline: true },
        { name: "Phone", value: phone || "N/A", inline: true },
        { name: "Item", value: `${brand || ''} ${item_name || 'Unknown Item'}`.trim(), inline: false }
      ],
      footer: { text: "Check the Hobby Terminal to update status." },
      timestamp: new Date().toISOString()
    }]
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
      console.error("❌ Discord Bot Error:", errorData);
      throw new Error('Failed to send message via Discord Bot');
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("❌ Server Error:", error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}