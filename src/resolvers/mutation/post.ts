import { Context } from "../..";
import { CreatePostPayload } from "../../types";

export const postMutations = {
  // === CREATE POST MUTATION ===
  createPost: async (
    _parent: any,
    { post }: CreatePostPayload,
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
    if (!post?.title || !post?.content) {
      return {
        message: "Title & Content is Required!",
        post: null,
      };
    }

    // create new post
    const newPost = await prisma.post.create({
      data: {
        title: post?.title,
        content: post?.content,
        authorId: userId,
      },
    });

    // return success response
    return {
      message: "Post Created!",
      post: newPost,
    };
  },

  // === UPDATE POST MUTATION ===
  updatePost: async (parent: any, args: any, { prisma }: Context) => {
    console.log("update-post", args);
  },
};
