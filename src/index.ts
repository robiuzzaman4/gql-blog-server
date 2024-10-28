import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { getUserInfoFromToken } from "./utils";

export const prisma = new PrismaClient();

export type Context = {
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;
  userId?: number;
};

const main = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req }): Promise<Context> => {
      const user = await getUserInfoFromToken(
        req.headers.authorization as string
      );

      return {
        prisma,
        userId: user?.userId,
      };
    },
  });

  console.log(`🚀  Server ready at: ${url}`);
};

main();
