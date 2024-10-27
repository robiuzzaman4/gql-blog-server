export const Query = {
  // === USERS QUERY ===
  users: async (_parent: any, _args: any, { prisma }: any) => {
    return await prisma.user.findMany();
  },

  // === PROFLIE QUERY ===
  profile: async (_parent: any, args: any, { prisma }: any) => {
    const profile = await prisma.profile.findUnique({
      where: {
        userId: Number(args?.userId),
      },
    });

    return profile;
  },

  // === POSTS QUERY ===
  posts: async (_parent: any, _args: any, { prisma }: any) => {
    return await prisma.post.findMany({
      where: {
        published: true,
      },
      orderBy: {
        createdAt: "desc",
      }
    });
  },
};
