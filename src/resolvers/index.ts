import { Query } from "./query";
import { Mutation } from "./mutation";
import { Post } from "./relations/post";
import { Profile } from "./relations/profile";

export const resolvers = {
  Query,
  Mutation,
  Post,
  Profile
};
