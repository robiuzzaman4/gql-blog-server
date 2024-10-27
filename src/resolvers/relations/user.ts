import { Context } from "../..";

export const User = {
  posts: async (parent: any, args: any, { prisma, userId }: Context) => {
    const isMyProfile = parent?.id === userId;

    if (isMyProfile) {
      return await prisma.post.findMany({
        where: {
          authorId: parent?.id,
        },
      });
    } else {
      return prisma.post.findMany({
        where: {
          authorId: parent?.id,
          published: true,
        },
      });
    }
  },
};
