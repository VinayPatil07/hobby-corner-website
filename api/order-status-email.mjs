import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send();

  const { email, customer_name, item_name, status, reason } = req.body;

  let subject = "";
  let message = "";

  switch (status) {
    case 'ordered':
      subject = `Order Update: ${item_name} has been requested!`;
      message = `Hi ${customer_name}, we've officially placed the order for your <strong>${item_name}</strong> with our distributor. We'll let you know the moment it arrives!`;
      break;
    case 'arrived':
      subject = `Your Hobby Corner order is ready for pickup!`;
      message = `Great news ${customer_name}! Your <strong>${item_name}</strong> has arrived at the store. Stop by the counter anytime during business hours to pick it up.`;
      break;
    case 'unavailable':
      subject = `Update regarding your order: ${item_name}`;
      
      const reasonHtml = reason 
        ? `<div style="background-color: #f0f2f5; border-left: 4px solid #ff6a00; padding: 12px; margin: 16px 0;">
             <strong style="text-transform: uppercase; font-size: 12px; letter-spacing: 0.1em; color: #0a2342;">Notes from the team:</strong><br/>
             <span style="font-style: italic; color: #0a2342;">"${reason}"</span>
           </div>` 
        : "";

      message = `Hi ${customer_name}, we looked into ordering your <strong>${item_name}</strong>, but unfortunately, we are unable to fulfill this request at this time.
                 ${reasonHtml}
                 Feel free to call us or stop by the shop to discuss alternatives!`;
      break;
    default:
      return res.status(200).json({ skipped: true });
  }

  try {
    await resend.emails.send({
      from: 'Hobby Corner <onboarding@resend.dev>', 
      to: email,
      subject: subject,
      html: `
        <div style="font-family: sans-serif; border: 4px solid #0a2342; padding: 24px; max-width: 600px; margin: 0 auto;">
          <h1 style="text-transform: uppercase; font-style: italic; color: #0a2342; margin-top: 0; font-size: 28px; font-weight: 900;">
            Hobby <span style="color: #ff6a00;">Corner.</span>
          </h1>
          <p style="font-size: 16px; color: #0a2342; line-height: 1.6;">${message}</p>
          <hr style="border: 0; border-top: 2px dashed rgba(10,35,66,0.2); margin: 30px 0 20px 0;" />
          <p style="font-size: 10px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.2em; color: #0a2342; opacity: 0.5;">
            Hobby Corner • 1606 Sycamore St, Iowa City, IA
          </p>
        </div>
      `
    });
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}