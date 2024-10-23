import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const Query = {
  // === USERS QUERY ===
  users: async () => {
    return await prisma.user.findMany();
  },

  // === PROFLIE QUERY ===
  profile: async (_parent: any, args: any, _context: any) => {
    const profile = await prisma.profile.findUnique({
      where: {
        userId: Number(args?.userId),
      },
    });

    return profile;
  },
};
