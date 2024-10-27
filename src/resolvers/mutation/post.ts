import { Context } from "../..";
import { CreatePostPayload } from "../../types";
import { checkUserAccess } from "../../utils";

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
  updatePost: async (_parent: any, args: any, { prisma, userId }: Context) => {
    const accessError = await checkUserAccess(prisma, userId as number, args);
    
    if (accessError) {
      return accessError;
    }

    // update post logic
    const updatedPost = await prisma.post.update({
      where: {
        id: Number(args?.postId),
      },
      data: args?.post,
    });

    // throw error if post is not updated
    if (!updatedPost) {
      return {
        message: "Failed to Update Post!",
        post: null,
      };
    }

    // success response
    return {
      message: "Post Updated!",
      post: updatedPost,
    };
  },
};
