import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { sendResetPasswordEmail } from "../lib/email";

export async function findUserByEmail(email: string) {
  const normalizedEmail = email.toLowerCase().trim();

  return await prisma.user.findUnique({
    where: {
      email: normalizedEmail,
    },
  });
}
//VERIFIICA SENHA PARA LOGIN
export async function verifyPassword(password: string, passwordHash: string) {
  return await bcrypt.compare(password, passwordHash);
}
//SENHA NOVA
export async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10);
}
//CRIANDO USUARIO
export async function createUser(data: {
  name: string;
  email: string;
  passwordHash: string;
}) {
  const normalizedEmail = data.email.toLowerCase().trim();

  return await prisma.user.create({
    data: {
      name: data.name,
      email: normalizedEmail,
      password_hash: data.passwordHash,
    },
  });
}

export async function createPasswordResetToken(email: string) {
  const normalizedEmail = email.toLowerCase().trim();

  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  if (!user) return null;

  const token = crypto.randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

  await prisma.user.update({
    where: { id: user.id },
    data: {
      reset_password_token: token,
      reset_password_expires: expires,
    },
  });

  // Send email (will log in dev if SMTP not configured)
  await sendResetPasswordEmail(user.email, token);

  return token;
}

export async function resetPassword(token: string, newPassword: string) {
  const user = await prisma.user.findFirst({
    where: { reset_password_token: token },
  });

  if (!user || !user.reset_password_expires) return false;

  if (user.reset_password_expires < new Date()) return false;

  const newHash = await hashPassword(newPassword);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      password_hash: newHash,
      reset_password_token: null,
      reset_password_expires: null,
    },
  });

  return true;
}
