export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send();

  const { customer_name, item_name, phone, brand } = req.body;
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL; 

  const payload = {
    content: "@here 📦 New Special Order Request!", 
    username: "The Hobby Corner Bot",
    avatar_url: "https://hobby-corner-website.vercel.app/logo.png",
    embeds: [{
      title: "📦 New Special Order Request",
      color: 16738816, 
      fields: [
        { name: "Customer", value: customer_name, inline: true },
        { name: "Phone", value: phone, inline: true },
        { name: "Item", value: `${brand || ''} ${item_name}`, inline: false }
      ],
      footer: { text: "Check the Hobby Terminal to update status." },
      timestamp: new Date().toISOString()
    }]
  };

  await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  return res.status(200).json({ success: true });
}