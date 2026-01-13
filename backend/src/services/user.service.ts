import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs";
import * as userService from "../services/user.service";

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
