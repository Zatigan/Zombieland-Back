import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
/*   logger: true,
  debug: true, */
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PWD,
  },
});

export const sendEmail = async (to, subject, html) => {
  const info = await transporter.sendMail({
  from: process.env.EMAIL_FROM,
  to: to,
  subject: subject,
  html: html,
})

return info ? info.messageId : null;
};