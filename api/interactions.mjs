import { verifyKey } from 'discord-interactions';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const PUBLIC_KEY = process.env.DISCORD_PUBLIC_KEY;
  const signature = req.headers['x-signature-ed25519'];
  const timestamp = req.headers['x-signature-timestamp'];

  // Vercel parses the incoming data, but Discord requires a raw string to verify the security lock
  const bodyString = JSON.stringify(req.body);

  try {
    const isValidRequest = verifyKey(bodyString, signature, timestamp, PUBLIC_KEY);
    if (!isValidRequest) {
      return res.status(401).json({ error: 'Bad request signature' });
    }
  } catch (err) {
    return res.status(401).json({ error: 'Verification failed' });
  }

  const interaction = req.body;

  // 1. THE PING: Discord sends this once just to check if our server is alive
  if (interaction.type === 1) {
    return res.status(200).json({ type: 1 });
  }

  // 2. BUTTON CLICKS: Someone clicked one of our message components
  if (interaction.type === 3) {
    const buttonId = interaction.data.custom_id;

    if (buttonId === 'answer_faq') {
      // Tell Discord to pop up a Text Box Modal!
      return res.status(200).json({
        type: 9, // Type 9 means "Modal"
        data: {
          title: "Answer FAQ Question",
          custom_id: `submit_answer_modal`, 
          components: [
            {
              type: 1, // Action Row
              components: [
                {
                  type: 4, // Text Input Box
                  custom_id: "answer_text",
                  label: "Type your answer for the website:",
                  style: 2, // 2 = Paragraph style (multiline)
                  required: true
                }
              ]
            }
          ]
        }
      });
    }

    if (buttonId === 'ignore_faq') {
      // Tell Discord to update the message and remove the buttons
      return res.status(200).json({
        type: 7, // Type 7 means "Update Message"
        data: {
          content: "❌ *Question ignored and archived.*",
          embeds: interaction.message.embeds, // Keep the original question visible
          components: [] // Sending an empty array removes the buttons!
        }
      });
    }
  }

  return res.status(400).json({ error: 'Unknown interaction type' });
}