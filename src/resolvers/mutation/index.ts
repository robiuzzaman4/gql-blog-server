import { CreatePostPayload } from "../../types";
import { Context } from "../..";
import { authMutations } from "./auth";

export const Mutation = {
  // === AUTH MUTATIONS ===
  ...authMutations,

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
