import { authMutations } from "./auth";
import { postMutations } from "./post";

export const Mutation = {
  // === AUTH MUTATIONS ===
  ...authMutations,

  // === POST MUTATIONS ===
  ...postMutations,
};
