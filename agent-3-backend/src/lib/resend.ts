import { Resend } from 'resend';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

export const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail(email: string, schoolName: string): Promise<void> {
  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to: email,
    subject: `You're on the DormReady list for ${schoolName}!`,
    html: `
      <h2>Welcome to DormReady!</h2>
      <p>You're now on the early access list for <strong>${schoolName}</strong>.</p>
      <p>We'll notify you the moment DormReady launches for your school.</p>
      <p>— The DormReady Team</p>
    `,
  });
}
