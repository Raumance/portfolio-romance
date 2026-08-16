const nodemailer = require('nodemailer');

const escapeHtml = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const createTransporter = () => {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = Number(process.env.SMTP_PORT || 587);
  const user = (process.env.SMTP_EMAIL || '').trim();
  const pass = (process.env.SMTP_PASSWORD || '').trim();

  if (/gmail\.com$/i.test(host) || process.env.SMTP_SERVICE === 'gmail') {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass }
    });
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: process.env.SMTP_SECURE === 'true' || port === 465,
    auth: { user, pass }
  });
};

const sendEmail = async (options) => {
  const transporter = createTransporter();
  const name = escapeHtml(options.name);
  const email = escapeHtml(options.email);
  const message = escapeHtml(options.message).replace(/\n/g, '<br>');
  const fromAddress = (process.env.SMTP_EMAIL || '').trim();

  await transporter.sendMail({
    from: `"Portfolio Romance Nguema" <${fromAddress}>`,
    replyTo: options.email,
    to: process.env.CONTACT_RECEIVER_EMAIL,
    subject: `Nouveau message du Portfolio : ${options.subject}`,
    text: `${options.name} (${options.email})\n\n${options.message}`,
    html: `<p>Nouveau message de <strong>${name}</strong> (${email}) :</p><p>${message}</p>`
  });
};

module.exports = sendEmail;
module.exports.createTransporter = createTransporter;
