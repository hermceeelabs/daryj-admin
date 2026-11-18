const nodemailer = require('nodemailer');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const smtpUser = process.env.SENDBYTE_SMTP_USER || process.env.SMTP_USER;
  const smtpPass = process.env.SENDBYTE_SMTP_PASS || process.env.SMTP_PASS;
  if (!smtpUser || !smtpPass) {
    return res.status(503).json({
      ok: false,
      configured: false,
      error: 'SendByte SMTP credentials (SMTP_USER / SMTP_PASS) are not configured.'
    });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const { to, clientName, orderId, subject, text, pdfBase64, filename } = body;

    if (!to || !pdfBase64) {
      return res.status(400).json({ ok: false, error: 'Missing recipient email (to) or pdfBase64.' });
    }

    const host = process.env.SMTP_HOST || 'smtp.sendbyte.africa';
    const port = Number(process.env.SMTP_PORT || 587);
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass
      }
    });

    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || `Dary J Electromech <${smtpUser}>`,
      to,
      subject: subject || `Dary J Electromech Payment Receipt — ${orderId || ''}`,
      text: text || `Dear ${clientName || 'Valued Client'},\n\nPlease find attached your official payment receipt.\n\nThank you,\nDary J Electromech Nig Ltd`,
      attachments: [
        {
          filename: filename || `DaryJ-Receipt-${orderId || 'order'}.pdf`,
          content: Buffer.from(pdfBase64, 'base64'),
          contentType: 'application/pdf'
        }
      ]
    });

    return res.status(200).json({ ok: true, messageId: info.messageId });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message || 'Failed to send email via SendByte.' });
  }
};
