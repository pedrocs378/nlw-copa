import { FastifyInstance } from 'fastify'

import { prisma } from '../lib/prisma'

import { authenticate } from '../plugins/authenticate'

import { poolController } from '../controllers/pool-controller'
import { participantController } from '../controllers/participant-controller'

export async function poolRoutes(fastify: FastifyInstance) {
  fastify.get('/pools/count', async () => {
    const count = await prisma.pool.count()
  
    return { count }
  })

  fastify.get('/pools', { onRequest: [authenticate] }, poolController.index)
  fastify.get('/pools/:id', { onRequest: [authenticate] }, poolController.show)
  
  fastify.post('/pools', poolController.store)
  fastify.post('/pools/join', { onRequest: [authenticate] }, participantController.store)
}
