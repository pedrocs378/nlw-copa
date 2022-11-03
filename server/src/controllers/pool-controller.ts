import { FastifyReply, FastifyRequest } from 'fastify';
import ShortUniqueId from 'short-unique-id';
import { z as zod } from 'zod';

import { prisma } from '../lib/prisma';

class PoolController {
  async index(request: FastifyRequest) {
    const pools = await prisma.pool.findMany({
      where: {
        participants: {
          some: {
            userId: request.user.sub
          }
        }
      },
      include: {
        _count: {
          select: {
            participants: true
          }
        },
        participants: {
          select: {
            id: true,
            user: {
              select: {
                avatarUrl: true
              }
            }
          },
          take: 4
        },
        owner: {
          select: {
            id: true,
            name: true,
          }
        }
      }
    })

    return { pools }
  }

  async store(request: FastifyRequest, reply: FastifyReply) {
    const createPoolBody = zod.object({
      title: zod.string()
    })
  
    const { title } = createPoolBody.parse(request.body)
  
    const generate = new ShortUniqueId({ length: 6 })
    const code = String(generate()).toUpperCase()

    try {
      await request.jwtVerify()

      await prisma.pool.create({
        data: {
          title,
          code,
          ownerId: request.user.sub,

          participants: {
            create: {
              userId: request.user.sub
            }
          }
        }
      })
    } catch {
      await prisma.pool.create({
        data: {
          title,
          code
        }
      })
    }
    
    return reply.status(201).send({ code })
  }

  async show(request: FastifyRequest) {
    const getPoolParams = zod.object({
      id: zod.string()
    })

    const { id } = getPoolParams.parse(request.params)

    const pool = await prisma.pool.findUnique({
      where: {
        id
      },
      include: {
        _count: {
          select: {
            participants: true
          }
        },
        participants: {
          select: {
            id: true,
            user: {
              select: {
                avatarUrl: true
              }
            }
          },
          take: 4
        },
        owner: {
          select: {
            id: true,
            name: true,
          }
        }
      }
    })

    return { pool }
  }
}

export const poolController = new PoolController()
