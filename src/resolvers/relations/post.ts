import { userLoader } from "../../data-loaders/user-loaders";

export const Post = {
  author: async (parent: any, _args: any) => {
    return userLoader.load(parent?.authorId);
  },
};
