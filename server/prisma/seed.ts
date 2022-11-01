import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

async function main() {
  console.log('Removing db datas.....')

  await prisma.game.deleteMany()
  await prisma.guess.deleteMany()
  await prisma.participant.deleteMany()
  await prisma.pool.deleteMany()
  await prisma.user.deleteMany()

  console.log('All cleared!')

  console.log('Creating users.....')

  const createUsersPromises = Array.from({ length: 10 }).map(() => {
    return prisma.user.create({
      data: {
        name: faker.name.fullName(),
        email: faker.internet.email(),
        avatarUrl: faker.image.avatar()
      }
    })
  })

  const createdUsers = await Promise.all(createUsersPromises)

  console.log(`Users was been created!`)

  console.log('Creating pools.....')

  const createPoolsPromises = createdUsers.map((user, index) => {
    return prisma.pool.create({
      data: {
        title: 'Example pool',
        code: faker.random.alphaNumeric(6, { casing: 'upper' }),

        ownerId: createdUsers[index].id,

        participants: {
          create: {
            userId: user.id
          }
        }
      }
    })
  })

  const createdPools = await Promise.all(createPoolsPromises)

  console.log(`Pools was been created!`)

  console.log('Creating games and guesses.....')

  await prisma.game.create({
    data: {
      date: '2022-11-02T18:00:00.201Z',
      firstTeamCountryCode: 'DE',
      secondTeamCountryCode: 'BR'
    }
  })

  const createGamesPromises = createdPools.map((pool, index) => {
    return prisma.game.create({
      data: {
        date: faker.date.recent(),
        firstTeamCountryCode: 'BR',
        secondTeamCountryCode: 'AR',

        guesses: {
          create: {
            firstTeamPoints: faker.datatype.number({ min: 0, max: 10 }),
            secondTeamPoints: faker.datatype.number({ min: 0, max: 10 }),

            participant: {
              connect: {
                userId_poolId: {
                  poolId: pool.id,
                  userId: createdUsers[index].id
                }
              }
            }
          }
        }
      }
    })
  })

  await Promise.all(createGamesPromises)

  console.log('All finished!')
}

main()