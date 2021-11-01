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
