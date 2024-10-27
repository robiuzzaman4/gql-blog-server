import { Query } from "./query";
import { Mutation } from "./mutation";
import { Post } from "./relations/post";
import { Profile } from "./relations/profile";
import { User } from "./relations/user";

export const resolvers = {
  Query,
  Mutation,
  Post,
  Profile,
  User,
};
