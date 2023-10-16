import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { ApolloServer } from "apollo-server-express";

import "dotenv/config";

import typeDefs from "./models/typeDefs";
import resolvers from "./resolvers/resolvers";
import AuthRouter from "./routes/auth.route";

const port = process.env.PORT || "4000";
const server = new ApolloServer({ typeDefs, resolvers });

const startServer = async () => {
  await server.start();

  const app = express();

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  server.applyMiddleware({ app, path: "/graphql" });

  app.use("/auth", AuthRouter);

  app.get("/", (req: Request, res: Response) => {
    res.send("Server is running");
  });

  app.listen(port, () => {
    console.log(`[server]: Server is running on ${port}`);
  });
};

startServer().catch((error) =>
  console.log("Error starting the server: ", error)
);
