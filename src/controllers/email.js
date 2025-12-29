// import { sendEmail } from '../services/email.js';
// import { env } from '../utils/env.js';
// import { SMTP } from '../constants/index.js';

// export const contactForm = async (req, res) => {
//     try {
//         const { name, email, phone, comment } = req.body;

//         if (!name || !email || !phone) {
//             return res.status(400).json({ message: 'Wymagane pola nie zostały wypełnione' });
//         }

//         await sendEmail({
//             from: env(SMTP.SMTP_MAIL),
//             to: env(SMTP.SMTP_MAIL),
//             subject: `Nowa wiadomość od ${name}`,
//             text: `Imię i nazwisko: ${name}\nEmail: ${email}\nTelefon: ${phone}\nWiadomość: ${comment}`,
//             html: `<p><strong>Imię i nazwisko:</strong> ${name}</p>
//              <p><strong>Email:</strong> ${email}</p>
//              <p><strong>Telefon:</strong> ${phone}</p>
//              <p><strong>Wiadomość:</strong> ${comment}</p>`
//         });

//         return res.status(200).json({ success: true, message: 'Email wysłany!' });
//     } catch (error) {
//         console.error("Nodemailer error:", error);
//         return res.status(500).json({ success: false, message: error.message });
//     }
// };

import { sendEmail } from '../services/email.js';

export const contactForm = async (req, res) => {
  try {
    const { name, email, phone, comment } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Wymagane pola nie zostały wypełnione',
      });
    }

    const html = `
      <h3>Nowa wiadomość z formularza</h3>
      <p><strong>Imię i nazwisko:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Telefon:</strong> ${phone}</p>
      <p><strong>Wiadomość:</strong><br/>${comment || '-'}</p>
    `;

    await sendEmail({
      subject: `Nowa wiadomość od ${name}`,
      html,
    });

    return res.status(200).json({
      success: true,
      message: 'Email wysłany!',
    });
  } catch (error) {
    console.error('Brevo API error:', error.message);

    return res.status(500).json({
      success: false,
      message: 'Nie udało się wysłać wiadomości',
    });
  }
};
