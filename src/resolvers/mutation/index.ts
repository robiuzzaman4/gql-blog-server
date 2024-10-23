import bcrypt from "bcrypt";
import { CreatePostPayload, SigninPayload, SignupPayload } from "../../types";
import { generateToken } from "../../utils";
import { Context } from "../..";

export const Mutation = {
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

  // === CREATE POST MUTATION ===
  createPost: async (
    _parent: any,
    args: CreatePostPayload,
    { prisma, userId }: Context
  ) => {
    // if userId not found then thorw error
    if (!userId) {
      return {
        message: "Unauthorised Access!",
        post: null,
      };
    }

    // if title or content not found then throw error
    if (!args?.title || !args?.content) {
      return {
        message: "Title & Content is Required!",
        post: null,
      };
    }

    // create new post
    const newPost = await prisma.post.create({
      data: {
        title: args?.title,
        content: args?.content,
        authorId: userId,
      },
    });

    // return success response
    return {
      message: "Post Created!",
      post: newPost,
    };
  },
};
