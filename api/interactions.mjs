import { verifyKey } from 'discord-interactions';

// Tell Vercel to bypass Node.js and run this on the ultra-fast Edge Network
export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  // Edge functions use standard Web API Responses
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const signature = req.headers.get('x-signature-ed25519');
  const timestamp = req.headers.get('x-signature-timestamp');
  const PUBLIC_KEY = process.env.DISCORD_PUBLIC_KEY;

  // Edge gets the raw body cleanly in one line!
  const rawBody = await req.text();

  try {
    const isValidRequest = verifyKey(rawBody, signature, timestamp, PUBLIC_KEY);
    if (!isValidRequest) {
      console.error("❌ SIGNATURE VERIFICATION FAILED");
      return new Response('Bad request signature', { status: 401 });
    }
  } catch (err) {
    return new Response('Verification failed', { status: 401 });
  }

  const interaction = JSON.parse(rawBody);

  // 1. THE PING
  if (interaction.type === 1) {
    console.log("✅ EDGE PING VERIFIED! SENDING JSON.");
    
    // Pure, untampered JSON response
    return new Response(JSON.stringify({ type: 1 }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // 2. BUTTON CLICKS
  if (interaction.type === 3) {
    const buttonId = interaction.data?.custom_id;

    if (buttonId === 'answer_faq') {
      return new Response(JSON.stringify({
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
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (buttonId === 'ignore_faq') {
      return new Response(JSON.stringify({
        type: 7, 
        data: {
          content: "❌ *Question ignored and archived.*",
          embeds: interaction.message.embeds,
          components: [] 
        }
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }

  return new Response('Unknown interaction type', { status: 400 });
}