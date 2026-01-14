import nodemailer from "nodemailer";
import { env } from "./env";

export async function sendResetPasswordEmail(to: string, token: string) {
  const frontend = env.FRONTEND_URL ?? null;
  const resetUrl = frontend
    ? `${frontend.replace(/\/$/, "")}/reset-password?token=${token}`
    : `?token=${token}`;

  // If SMTP not configured, just log the link for development
  if (!env.SMTP_HOST || !env.SMTP_USER || !env.SMTP_PASS) {
    console.warn("SMTP not configured. Password reset link:", resetUrl);
    return;
  }

  const transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT ?? 587,
    secure: (env.SMTP_PORT ?? 587) === 465,
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: env.SMTP_USER,
    to,
    subject: "Recuperação de senha",
    text: `Para redefinir sua senha, acesse: ${resetUrl}`,
    html: `<p>Para redefinir sua senha, clique no link abaixo:</p><p><a href="${resetUrl}">${resetUrl}</a></p>`,
  };

  await transporter.sendMail(mailOptions);
}

export default sendResetPasswordEmail;
