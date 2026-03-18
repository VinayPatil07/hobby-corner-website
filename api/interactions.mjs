import { verifyKey } from 'discord-interactions';

// Tell Vercel to stay out of our way so we can read the raw data
export const config = {
  api: { bodyParser: false },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const signature = req.headers['x-signature-ed25519'];
  const timestamp = req.headers['x-signature-timestamp'];
  const PUBLIC_KEY = process.env.DISCORD_PUBLIC_KEY;

  if (!signature || !timestamp || !PUBLIC_KEY) {
    return res.status(401).json({ error: 'Missing security headers or keys' });
  }

  // The most rock-solid, old-school way to read raw bytes in Node.js
  const rawBody = await new Promise((resolve, reject) => {
    let data = '';
    req.on('data', chunk => { data += chunk; });
    req.on('end', () => resolve(data));
    req.on('error', reject);
  });

  try {
    const isValid = verifyKey(rawBody, signature, timestamp, PUBLIC_KEY);
    if (!isValid) {
      console.error("❌ SIGNATURE VERIFICATION FAILED");
      return res.status(401).json({ error: 'Invalid signature' });
    }
  } catch (error) {
    console.error("❌ VERIFICATION CRASHED:", error);
    return res.status(500).json({ error: 'Verification crashed' });
  }

  const interaction = JSON.parse(rawBody);

  // 1. THE PING
  if (interaction.type === 1) {
    console.log("✅ PING SUCCESSFUL! SENDING PROPER JSON.");
    return res.status(200).json({ type: 1 });
  }

  // 2. BUTTON CLICKS
  if (interaction.type === 3) {
    const buttonId = interaction.data?.custom_id;

    if (buttonId === 'answer_faq') {
      return res.status(200).json({
        type: 9, 
        data: {
          title: "Answer FAQ",
          custom_id: "submit_answer_modal", 
          components: [{
            type: 1,
            components: [{
              type: 4, 
              custom_id: "answer_text",
              label: "Type your answer for the website:",
              style: 2, 
              required: true
            }]
          }]
        }
      });
    }

    if (buttonId === 'ignore_faq') {
      return res.status(200).json({
        type: 7, 
        data: {
          content: "❌ *Question ignored and archived.*",
          embeds: interaction.message.embeds || [],
          components: [] 
        }
      });
    }
  }

  return res.status(400).json({ error: 'Unknown interaction type' });
}