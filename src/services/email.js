// import nodemailer from 'nodemailer';
// import { env } from '../utils/env.js';
// import { SMTP } from '../constants/index.js';

// const transporter = nodemailer.createTransport({
//   host: env(SMTP.SMTP_HOST),
//   port: Number(env(SMTP.SMTP_PORT)),
//   secure: false,
//   auth: {
//     user: env(SMTP.SMTP_USER),
//     pass: env(SMTP.SMTP_PASSWORD),
//   },
// });


// export const sendEmail = async ({ from, to, subject, text, html }) => {
//   return await transporter.sendMail({ from, to, subject, text, html });
// };


import fetch from 'node-fetch';
import { env } from '../utils/env.js';

export const sendEmail = async ({ subject, html }) => {
  const res = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': env('BREVO_API_KEY'),
    },
    body: JSON.stringify({
      sender: {
        email: env('BREVO_SENDER_EMAIL'),
        name: env('BREVO_SENDER_NAME'),
      },
      to: [
        {
          email: env('BREVO_RECEIVER_EMAIL'),
        },
      ],
      subject,
      htmlContent: html,
    }),
  });

  const text = await res.text(); // ⬅️ ВАЖЛИВО

  if (!res.ok) {
    console.error('BREVO ERROR RESPONSE:', text);
    throw new Error(text);
  }

  return JSON.parse(text);
};

