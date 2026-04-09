import { Resend } from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY!);

export async function sendWelcomeEmail(email: string, schoolName: string): Promise<void> {
  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to: email,
    subject: `Your DormReady guide for ${schoolName} is here`,
    html: `
      <h2>Welcome to DormReady!</h2>
      <p>You're getting the inside scoop on dorm room dimensions at <strong>${schoolName}</strong>.</p>
      <p>We'll send you room measurements, layout ideas, and gear that actually fits — before move-in day.</p>
      <p>— The DormReady Team</p>
    `,
  });
}
