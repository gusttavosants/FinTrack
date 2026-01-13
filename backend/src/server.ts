import fastifyJwt from '@fastify/jwt'
import fastify from 'fastify'
import  { z  } from 'zod'
import bcrypt from 'bcryptjs'




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

  if (email === 'admin@email.com' && password === 'admin@') {
    const token = await reply.jwtSign({}, {
      sign: {
        sub:'123456789',
        
      }
    })
    return reply.status(200).send({ token })
  } else {
      return reply.status(401).send({ error: 'Credentials incorrect' })
  }
})

// Register
app.post('/register', async (request, reply) => {

  const registerBodySchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6).regex(/^[a-zA-Z0-9_]*$/),
  })
  const { name, email, password } = registerBodySchema.parse (request.body)

  if (email === 'admin@email.com') {
    return reply.status(400).send({ error: 'Email already exists' })
  }

  const passwordHash = await bcrypt.hash(password, 8)  

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
