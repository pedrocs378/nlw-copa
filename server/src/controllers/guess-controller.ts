import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { prisma } from '../lib/prisma';

class GuessController {
  async store(request: FastifyRequest, reply: FastifyReply) {
    const createGuessParams = z.object({
      poolId: z.string(),
      gameId: z.string()
    })

    const createGuessBody = z.object({
      firstTeamPoints: z.number(),
      secondTeamPoints: z.number()
    })

    const { gameId, poolId } = createGuessParams.parse(request.params)
    const { firstTeamPoints, secondTeamPoints } = createGuessBody.parse(request.body)

    const participant = await prisma.participant.findUnique({
      where: {
        userId_poolId: {
          poolId,
          userId: request.user.sub
        }
      }
    })

    if (!participant) {
      return reply.status(400).send({ message: "You're not allowed to create a guess inside this pool" })
    }

    const guess = await prisma.guess.findUnique({ 
      where: {
        participantId_gameId: {
          participantId: participant.id,
          gameId
        }
      }
    })

    if (guess) {
      return reply.status(400).send({ message: "You're already sent a guess to this game on this pool" })
    }

    const game = await prisma.game.findUnique({
      where: {
        id: gameId
      }
    })

    if (!game) {
      return reply.status(400).send({ message: "Game not found" })
    }

    if (game.date < new Date()) {
      return reply.status(400).send({ message: "You cannot send guesses after the game" })
    }

    await prisma.guess.create({
      data: {
        gameId,
        participantId: participant.id,
        firstTeamPoints,
        secondTeamPoints
      }
    })

    return reply.status(201).send()
  }
}

export const guessController = new GuessController()