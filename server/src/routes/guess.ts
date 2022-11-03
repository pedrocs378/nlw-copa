import { FastifyInstance } from 'fastify'

import { prisma } from '../lib/prisma'

import { authenticate } from '../plugins/authenticate'

import { guessController } from '../controllers/guess-controller'

export async function guessRoutes(fastify: FastifyInstance) {
  fastify.get('/guesses/count', async () => {
    const count = await prisma.guess.count()

    return { count }
  })

  fastify.post('/pools/:poolId/games/:gameId/guesses', { onRequest: [authenticate] }, guessController.store)
}