import { Context } from "../..";

export const Post = {
  author: async (parent: any, _args: any, { prisma }: Context) => {
    return await prisma.user.findUnique({
      where: {
        id: parent?.authorId,
      },
    });
  },
};
