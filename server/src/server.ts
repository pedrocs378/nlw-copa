import Fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'

import {
  poolRoutes,
  guessRoutes,
  authRoutes,
  gameRoutes,
  userRoutes
} from './routes'

const SECRET = process.env.JWT_SECRET ?? ''

async function bootstrap() {
  const fastify = Fastify({
    logger: true
  })

  await fastify.register(cors, {
    origin: true
  })

  await fastify.register(jwt, {
    secret: SECRET
  })

  await fastify.register(poolRoutes)
  await fastify.register(authRoutes)
  await fastify.register(gameRoutes)
  await fastify.register(guessRoutes)
  await fastify.register(userRoutes)
  
  await fastify.listen({ port: 3333, /** host: '0.0.0.0' */ })
}

bootstrap()