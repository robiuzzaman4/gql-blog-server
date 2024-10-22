import { PrismaClient } from "@prisma/client";
import { SigninPayload, SignupPayload } from "../types";
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
    // === SIGNUP MUTATION ===
    signup: async (_parent: any, args: SignupPayload, _context: any) => {
      // hash entered password
      const hashedPassword = await bcrypt.hash(args?.password, 12);

      // define payload
      const payload = {
        name: args?.name,
        email: args?.email,
        password: hashedPassword,
      };

      // create new user
      const newUser = await prisma.user.create({
        data: payload,
      });

      // generate token
      const token = jwt.sign({ userId: newUser?.id }, "SECRET_CODE", {
        expiresIn: "1d",
      });

      // return success response
      return {
        token: token,
        message: "Signup successfull.",
      };
    },
    // === SIGNIN MUTATION ===
    signin: async (_parent: any, args: SigninPayload, _context: any) => {
      // check if existing user exist
      const existingUser = await prisma.user.findFirst({
        where: {
          email: args?.email,
        },
      });

      // throw error if user not found
      if (!existingUser) {
        return {
          token: null,
          message: "User not found.",
        };
      }

      // compare password
      const comparePassword = await bcrypt.compare(
        args?.password,
        existingUser?.password
      );

      // generate token
      const token = jwt.sign({ userId: existingUser?.id }, "SECRET_CODE", {
        expiresIn: "1d",
      });

      // if password is not matched then throw error
      if (!comparePassword) {
        return {
          token: null,
          message: "Incorrect password.",
        };
      }

      // return success response
      return {
        token: token,
        message: "Signin successfull.",
      };
    },
  },
};
