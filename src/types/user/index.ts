import { Prisma } from '@prisma/client'

const BasicUserInfoArgs = Prisma.validator<Prisma.UserArgs>()({
  select: {
    id: true,
    createdAt: true,
    email: true,
    username: true,
    displayName: true,
  },
})

export type BasicUserInfoProps = Prisma.UserGetPayload<typeof BasicUserInfoArgs>
