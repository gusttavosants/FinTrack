import { z } from "zod";

const loginBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const registerBodySchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z
    .string()
    .min(6)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
      message:
        "Senha muito fraca! Precisa de maiúscula, minúscula, número e símbolo.",
    }),
});

const forgotPasswordBodySchema = z.object({
  email: z.string().email(),
});

const resetPasswordBodySchema = z.object({
  token: z.string().min(1),
  password: z
    .string()
    .min(6)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
      message:
        "Senha muito fraca! Precisa de maiúscula, minúscula, número e símbolo.",
    }),
});

export {
  loginBodySchema,
  registerBodySchema,
  forgotPasswordBodySchema,
  resetPasswordBodySchema,
};
