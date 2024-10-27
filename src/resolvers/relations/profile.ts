import { Context } from "../..";

export const Profile = {
  user: async (parent: any, _args: any, { prisma }: Context) => {
    return await prisma.user.findUnique({
      where: {
        id: parent?.userId,
      },
    });
  },
};
