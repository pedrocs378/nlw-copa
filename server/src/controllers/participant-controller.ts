import { FastifyReply, FastifyRequest } from 'fastify';
import { z as zod } from 'zod';

import { prisma } from '../lib/prisma';

class ParticipantController {
  async store(request: FastifyRequest, reply: FastifyReply) {
    const joinPoolBody = zod.object({
      code: zod.string()
    })

    const { code } = joinPoolBody.parse(request.body)

    const pool = await prisma.pool.findUnique({
      where: {
        code
      },
      include: {
        participants: {
          where: {
            userId: request.user.sub
          }
        }
      }
    })

    if (!pool) {
      return reply.status(400).send({ message: 'Pool not found' })
    }

    if (pool.participants.length > 0) {
      return reply.status(400).send({ message: 'You already joined this pool' })
    }

    if (!pool.ownerId) {
      await prisma.pool.update({
        where: {
          id: pool.id,
        },
        data: {
          ownerId: request.user.sub
        }
      })
    }

    await prisma.participant.create({
      data: {
        poolId: pool.id,
        userId: request.user.sub
      }
    })

    return reply.status(201).send()
  }
}

export const participantController = new ParticipantController()
