import { FastifyInstance, FastifyRequest } from "fastify";
import { z as zod } from "zod";

import { prisma } from "../lib/prisma";

export class AuthController {
  private readonly fastify: FastifyInstance

  constructor(fastify: FastifyInstance) {
    this.fastify = fastify
  }

  async show(request: FastifyRequest) {
    return { user: request.user }
  }

  async store(request: FastifyRequest) {
    const createUserBody = zod.object({
      access_token: zod.string()
    })
 
    const { access_token } = createUserBody.parse(request.body)

    const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    })

    const userData = await userResponse.json()

    const userInfoSchema = zod.object({
      id: zod.string(),
      email: zod.string().email(),
      name: zod.string(),
      picture: zod.string().url()
    })

    const userInfo = userInfoSchema.parse(userData)

    let user = await prisma.user.findUnique({
      where: {
        googleId: userInfo.id
      }
    })

    if (!user) {
      user = await prisma.user.create({
        data: {
          googleId: userInfo.id,
          name: userInfo.name,
          email: userInfo.email,
          avatarUrl: userInfo.picture
        }
      })
    }

    const token = this.fastify.jwt.sign({
      name: user.name,
      avatarUrl: user.avatarUrl
    }, {
      sub: user.id,
      expiresIn: '7 days'
    })

    return { token }
  }
}
