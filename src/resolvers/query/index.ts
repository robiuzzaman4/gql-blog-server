import { Context } from "../..";

export const Query = {
  // === SINGLE USER QUERY ===
  user: async (_parent: any, _args: any, { prisma, userId }: Context) => {
    return await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  },

  // === USERS QUERY ===
  users: async (_parent: any, _args: any, { prisma }: Context) => {
    return await prisma.user.findMany();
  },

  // === PROFLIE QUERY ===
  profile: async (_parent: any, args: any, { prisma }: Context) => {
    const profile = await prisma.profile.findUnique({
      where: {
        userId: Number(args?.userId),
      },
    });

    return profile;
  },

  // === POSTS QUERY ===
  posts: async (_parent: any, _args: any, { prisma }: Context) => {
    return await prisma.post.findMany({
      where: {
        published: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  },
};
