import { PrismaClient } from "@prisma/client";
import { CreateUserPayload } from "../types";

const prisma = new PrismaClient();

export const resolvers = {
  Query: {},
  Mutation: {
    createUser: async (parent: any, args: CreateUserPayload, context: any) => {
      return await prisma.user.create({
        data: args,
      });
    },
  },
};
