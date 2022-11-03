import { FastifyInstance } from 'fastify'

import { authenticate } from '../plugins/authenticate'

import { AuthController } from '../controllers/auth-controller'

export async function authRoutes(fastify: FastifyInstance) {
  fastify.get(
    '/me', 
    { onRequest: [authenticate] },
    async (request) => {
      const authController = new AuthController(fastify)
  
      return await authController.show(request)
    }
  )

  fastify.post('/users', async (request) => {
    const authController = new AuthController(fastify)

    return await authController.store(request)
  })
}