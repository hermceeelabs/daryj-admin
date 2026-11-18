const nodemailer = require('nodemailer');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const { to, clientName, orderId, subject, text, pdfBase64, filename } = body;

    if (!to || !pdfBase64) {
      return res.status(400).json({ ok: false, error: 'Missing recipient email (to) or pdfBase64.' });
    }

    const emailSubject = subject || `Dary J Electromech Payment Receipt — ${orderId || ''}`;
    const emailText = text || `Dear ${clientName || 'Valued Client'},\n\nPlease find attached your official payment receipt.\n\nThank you,\nDary J Electromech Nig Ltd`;
    const pdfFilename = filename || `DaryJ-Receipt-${orderId || 'order'}.pdf`;

    // Primary: SendByte REST API (only requires SENDBYTE_API_KEY + SENDBYTE_FROM)
    const apiKey = process.env.SENDBYTE_API_KEY;
    const fromAddress = process.env.SENDBYTE_FROM || process.env.SMTP_FROM;

    if (apiKey) {
      if (!fromAddress) {
        return res.status(503).json({
          ok: false,
          configured: false,
          error: 'SENDBYTE_FROM (e.g. Dary J Electromech <receipts@yourdomain.com>) is not configured.'
        });
      }

      const apiRes = await fetch('https://api.sendbyte.africa/v1/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: fromAddress,
          to: [to],
          subject: emailSubject,
          text: emailText,
          attachments: [
            {
              filename: pdfFilename,
              content: pdfBase64
            }
          ]
        })
      });

      const data = await apiRes.json().catch(() => ({}));
      if (!apiRes.ok) {
        return res.status(apiRes.status).json({
          ok: false,
          error: data.message || data.error || 'SendByte API rejected the email request.'
        });
      }

      return res.status(200).json({ ok: true, id: data.id || null });
    }

    // Fallback: SMTP via Nodemailer
    const smtpUser = process.env.SENDBYTE_SMTP_USER || process.env.SMTP_USER;
    const smtpPass = process.env.SENDBYTE_SMTP_PASS || process.env.SMTP_PASS;
    if (!smtpUser || !smtpPass) {
      return res.status(503).json({
        ok: false,
        configured: false,
        error: 'SENDBYTE_API_KEY + SENDBYTE_FROM (or SMTP_USER + SMTP_PASS) are not configured.'
      });
    }

    const host = process.env.SMTP_HOST || 'smtp.sendbyte.africa';
    const port = Number(process.env.SMTP_PORT || 587);
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user: smtpUser, pass: smtpPass }
    });

    const info = await transporter.sendMail({
      from: fromAddress || `Dary J Electromech <${smtpUser}>`,
      to,
      subject: emailSubject,
      text: emailText,
      attachments: [
        {
          filename: pdfFilename,
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
