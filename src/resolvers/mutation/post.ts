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
  updatePost: async (_parent: any, args: any, { prisma, userId }: Context) => {
    // check if user exist
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    // throw error if user not found
    if (!user) {
      return {
        message: "User Not Found!",
        post: null,
      };
    }

    const post = await prisma.post.findUnique({
      where: {
        id: Number(args?.postId),
      },
    });

    // throw error if post not found
    if (!post) {
      return {
        message: "Post Not Found!",
        post: null,
      };
    }

    // throw error if user id and author id are not the same
    if (Number(user?.id) !== Number(post?.authorId)) {
      return {
        message: "Unauthorized Access!",
        post: null,
      };
    }

    // update post logic
    const updatedPost = await prisma.post.update({
      where: {
        id: Number(args?.postId),
      },
      data: {
        title: args?.post?.title || post?.title,
        content: args?.post?.content || post?.content,
        published: args?.published !== undefined ? args?.published : post?.published,
      },
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
