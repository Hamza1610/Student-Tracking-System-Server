// utils/mailer.ts
import nodemailer from 'nodemailer';
import dotenv from 'dotenv'


dotenv.config();

type EmailOptions = {
  to: string;
  subject: string;
  html: string;
};

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const sendEmail = async ({ to, subject, html }: EmailOptions) => {
    await transporter.sendMail({ from: process.env.EMAIL_USER, to, subject, html });
};
