import bcrypt from "bcrypt";
import { SigninPayload, SignupPayload } from "../../types";
import { generateToken } from "../../utils";
import { Context } from "../..";

export const authMutations = {
  // === SIGNUP MUTATION ===
  signup: async (_parent: any, args: SignupPayload, { prisma }: Context) => {
    // check if user exist
    const existingUser = await prisma.user.findFirst({
      where: {
        email: args?.email,
      },
    });

    // throw error if user exist
    if (existingUser) {
      return {
        token: null,
        message: "User Already Exist!",
      };
    }

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

    // if bio is available then create profile
    if (args?.bio) {
      await prisma.profile.create({
        data: {
          bio: args?.bio,
          userId: newUser?.id,
        },
      });
    }

    // get token
    const token = generateToken({ userId: newUser?.id });

    // return success response
    return {
      token: token,
      message: "Signup Successfull!",
    };
  },

  // === SIGNIN MUTATION ===
  signin: async (_parent: any, args: SigninPayload, { prisma }: Context) => {
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
        message: "User Not Found!",
      };
    }

    // compare password
    const comparePassword = await bcrypt.compare(
      args?.password,
      existingUser?.password
    );

    // get token
    const token = generateToken({ userId: existingUser?.id });

    // if password is not matched then throw error
    if (!comparePassword) {
      return {
        token: null,
        message: "Incorrect Password!",
      };
    }

    // return success response
    return {
      token: token,
      message: "Signin Successfull!",
    };
  },
};
