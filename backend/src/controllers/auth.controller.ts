import { FastifyReply, FastifyRequest } from "fastify";
import { loginBodySchema, registerBodySchema } from "../schemas/auth.schema";
import * as userService from "../services/user.service";

export async function login(request: FastifyRequest, reply: FastifyReply) {
  // 1. Validar body
  const { email, password } = loginBodySchema.parse(request.body);

  // 2. Buscar usuário
  const user = await userService.findUserByEmail(email);

  // 3. Verificar se existe
  if (!user) {
    return reply.status(401).send({ error: "Credenciais incorretas" });
  }

  // 4. Verificar senha
  const doesPasswordMatch = await userService.verifyPassword(
    password,
    user.password_hash
  );

  // 5. Verificar se senha está correta
  if (!doesPasswordMatch) {
    return reply.status(401).send({ error: "Senha Incorreta" });
  }

  // 6. Gerar token
  const token = await reply.jwtSign(
    {},
    {
      sign: {
        sub: user.id,
      },
    }
  );

  // 7. Retornar token
  return reply.status(200).send({ token });
}

export async function register(request: FastifyRequest, reply: FastifyReply) {
  // 1. Validar body
  const { name, email, password } = registerBodySchema.parse(request.body);

  // 2. Verificar se email já existe
  const userAlreadyExists = await userService.findUserByEmail(email);

  // 3. Se existir, retornar erro
  if (userAlreadyExists) {
    return reply.status(400).send({ error: "Email ja cadastrado" });
  }

  // 4. Criar hash da senha
  const passwordHash = await userService.hashPassword(password);

  // 5. Criar usuário
  await userService.createUser({
    name,
    email,
    passwordHash,
  });

  // 6. Retornar sucesso
  return reply.status(201).send();
}
