import { verifyKey } from 'discord-interactions';

export const config = {
  api: { bodyParser: false },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method not allowed');
  }

  const PUBLIC_KEY = process.env.DISCORD_PUBLIC_KEY;
  const signature = req.headers['x-signature-ed25519'];
  const timestamp = req.headers['x-signature-timestamp'];

  // Read the raw stream exactly as Discord sent it
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  const rawBody = Buffer.concat(chunks).toString('utf8');

  try {
    const isValidRequest = verifyKey(rawBody, signature, timestamp, PUBLIC_KEY);
    if (!isValidRequest) {
      console.error("❌ SIGNATURE VERIFICATION FAILED");
      return res.status(401).send('Bad request signature');
    }
  } catch (err) {
    console.error("❌ VERIFY_KEY ERROR:", err);
    return res.status(401).send('Verification failed');
  }

  const interaction = JSON.parse(rawBody);

  // 1. THE PING
  if (interaction.type === 1) {
    console.log("✅ PING RECEIVED AND VERIFIED! SENDING JSON.");
    // This is the magic fix! Vercel's .json() formats the headers perfectly for Discord.
    return res.status(200).json({ type: 1 });
  }

  // 2. BUTTON CLICKS
  if (interaction.type === 3) {
    const buttonId = interaction.data.custom_id;

    if (buttonId === 'answer_faq') {
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
                  type: 4, 
                  custom_id: "answer_text",
                  label: "Type your answer for the website:",
                  style: 2, 
                  required: true
                }
              ]
            }
          ]
        }
      });
    }

    if (buttonId === 'ignore_faq') {
      return res.status(200).json({
        type: 7, 
        data: {
          content: "❌ *Question ignored and archived.*",
          embeds: interaction.message.embeds,
          components: [] 
        }
      });
    }
  }

  return res.status(400).send('Unknown interaction type');
}