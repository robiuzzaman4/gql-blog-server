import { PrismaClient } from "@prisma/client";
import { CreateUserPayload } from "../types";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    users: async () => {
      return await prisma.user.findMany();
    },
  },
  Mutation: {
    createUser: async (parent: any, args: CreateUserPayload, context: any) => {
      const hashedPassword = await bcrypt.hash(args?.password, 12);
      const payload = {
        name: args?.name,
        email: args?.email,
        password: hashedPassword,
      };

      const newUser = await prisma.user.create({
        data: payload,
      });

      const token = jwt.sign({ userId: newUser?.id }, "SECRET_CODE", {
        expiresIn: "1d",
      });

      return {
        token: token,
      };
    },
  },
};
