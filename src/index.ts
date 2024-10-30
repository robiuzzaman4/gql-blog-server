import { ApolloServer } from "@apollo/server";
// import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { getUserInfoFromToken } from "./utils";
import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import { json } from "body-parser";
import cors from "cors";

export const prisma = new PrismaClient();

export type Context = {
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;
  userId?: number;
};

// const main = async () => {

//   const { url } = await startStandaloneServer(server, {
//     listen: { port: 4000 },
//     context: async ({ req }): Promise<Context> => {
//       const user = await getUserInfoFromToken(
//         req.headers.authorization as string
//       );

//       return {
//         prisma,
//         userId: user?.userId,
//       };
//     },
//   });

//   console.log(`🚀  Server ready at: ${url}`);
// };

//  main();

// Set up the Express app
const app = express();

// Enable CORS for all origins
app.use(cors());

async function main() {
  // Initialize the Apollo Server
  const server = new ApolloServer<Context>({
    typeDefs,
    resolvers,
  });

  // Await server startup
  await server.start();

  // Apply middleware to handle requests
  app.use(
    "/api/graphql",
    json(),
    expressMiddleware(server, {
      context: async ({ req }): Promise<Context> => {
        const user = await getUserInfoFromToken(
          req.headers.authorization || ""
        );
        return { prisma, userId: user?.userId };
      },
    })
  );

  if (process.env.NODE_ENV !== "production") {
    const PORT = 4000;
    app.listen(PORT, () => {
      console.log(
        `🚀 Server is running on http://localhost:${PORT}/api/graphql`
      );
    });
  }
}

main();

export default app;
