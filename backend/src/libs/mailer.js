import nodemailer from 'nodemailer';

export const getMailer = async () => {
  try {
    let mailer;
    if (!mailer) {
      mailer = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: true,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      });
    }
    return mailer;
  } catch (err) {
    console.log('mailer err', err);
    throw err;
  }
};

export function sendMail(mailer, toEmail, subject, body) {
  return mailer.sendMail({
    from: process.env.SMTP_USER, // sender address
    to: toEmail, // list of receivers
    subject: subject, // Subject line
    text: body, // plain text body
    html: body, // html body
  });
}
