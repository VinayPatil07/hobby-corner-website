import { verifyKey } from 'discord-interactions';

// Tell Vercel NOT to auto-format the incoming data so we don't break Discord's security check
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const PUBLIC_KEY = process.env.DISCORD_PUBLIC_KEY;
  if (!PUBLIC_KEY) {
    console.error("Missing DISCORD_PUBLIC_KEY");
    return res.status(500).json({ error: 'Missing configuration' });
  }

  const signature = req.headers['x-signature-ed25519'];
  const timestamp = req.headers['x-signature-timestamp'];

  // Manually grab the RAW data stream exactly as Discord sent it
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  const rawBody = Buffer.concat(chunks).toString('utf8');

  try {
    // Check the raw data against the security lock
    const isValidRequest = verifyKey(rawBody, signature, timestamp, PUBLIC_KEY);
    if (!isValidRequest) {
      return res.status(401).json({ error: 'Bad request signature' });
    }
  } catch (err) {
    return res.status(401).json({ error: 'Verification failed' });
  }

  // Once verified, we can safely parse the JSON ourselves
  const interaction = JSON.parse(rawBody);

  // 1. THE PING: Discord sends this when you hit "Save Changes" in the portal
  if (interaction.type === 1) {
    return res.status(200).json({ type: 1 });
  }

  // 2. BUTTON CLICKS: Someone clicked our Answer or Ignore button
  if (interaction.type === 3) {
    const buttonId = interaction.data.custom_id;

    if (buttonId === 'answer_faq') {
      // Tell Discord to pop up the Text Box Modal
      return res.status(200).json({
        type: 9, 
        data: {
          title: "Answer FAQ Question",
          custom_id: "submit_answer_modal", 
          components: [
            {
              type: 1,
              components: [
                {
                  type: 4, // Text Input
                  custom_id: "answer_text",
                  label: "Type your answer for the website:",
                  style: 2, // Paragraph style
                  required: true
                }
              ]
            }
          ]
        }
      });
    }

    if (buttonId === 'ignore_faq') {
      // Update the message to show it was archived
      return res.status(200).json({
        type: 7, 
        data: {
          content: "❌ *Question ignored and archived.*",
          embeds: interaction.message.embeds,
          components: [] // Empty array deletes the buttons!
        }
      });
    }
  }

  return res.status(400).json({ error: 'Unknown interaction type' });
}