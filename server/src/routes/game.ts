import { FastifyInstance } from 'fastify'

import { authenticate } from '../plugins/authenticate'

import { gameController } from '../controllers/game-controller'

export async function gameRoutes(fastify: FastifyInstance) {
  fastify.get('/pools/:id/games', { onRequest: [authenticate] }, gameController.index)
}