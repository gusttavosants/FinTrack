import fastifyJwt from '@fastify/jwt'
import fastify from 'fastify'
import  { z  } from 'zod'
import bcrypt from 'bcryptjs'
import {prisma} from './lib/prisma'




const app = fastify()

app.register(fastifyJwt, {
  secret: 'secretKey'
})

app.get('/', async () => {
  return { hello: 'world' }
})

//Login
app.post('/login', async (request, reply) => {

  const loginBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = loginBodySchema.parse (request.body)

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    }
  })

  if (!user) {
    return reply.status(401).send({ error: 'Credentials incorrect' })
  }

  const doesPasswordMatch = await bcrypt.compare(password, user.password_hash)

  if (!doesPasswordMatch) {
    return reply.status(401).send({ error: 'Credentials incorrect' })
  }
  
    const token = await reply.jwtSign({}, {
      sign: {
        sub:user.id,
        
      }
    })
    return reply.status(200).send({ token })
})

// Register
app.post('/register', async (request, reply) => {

  const registerBodySchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
    message: "Senha muito fraca! Precisa de maiúscula, minúscula, número e símbolo."
  })

  })
  const { name, email, password } = registerBodySchema.parse (request.body)

    

  const userAlreadyExists = await prisma.user.findUnique({
    where: {
      email: email,
    }
  })

  if (userAlreadyExists) {
    return reply.status(400).send({error: 'Email already exists'})
  }

  const passwordHash = await bcrypt.hash(password, 8)

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash: passwordHash,
    }
  })

  return reply.status(201).send()
})
    

const start = async () => {
  try {
    await app.listen({ port: 3333 })
    console.log('Server running at http://localhost:3333')
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()
