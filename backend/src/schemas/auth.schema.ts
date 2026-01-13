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

export { loginBodySchema, registerBodySchema };
