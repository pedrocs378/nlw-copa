import { FastifyRequest } from 'fastify';
import { z as zod } from 'zod';

import { prisma } from '../lib/prisma';

class GameController {
  async index(request: FastifyRequest) {
    const getPoolParams = zod.object({
      id: zod.string()
    })

    const { id } = getPoolParams.parse(request.params)

    const games = await prisma.game.findMany({
      orderBy: {
        date: 'desc'
      },
      include: {
        guesses: {
          where: {
            participant: {
              userId: request.user.sub,
              poolId: id
            }
          }
        }
      }
    })

    return {
      games: games.map((game) => {
        return {
          ...game,
          guess: game.guesses.length > 0 ? game.guesses[0] : null,
          guesses: undefined
        }
      })
    }
  }
}

export const gameController = new GameController()