import express, { Application, Response } from "express";
import cors from "cors";
import { connectDatabase } from "./database";
import * as dotenv from "dotenv";
dotenv.config();

const App: Application = express();

// Routes imports
import v1Route from "./routes/v1";

// Middlewares
App.use(cors());
App.use(express.urlencoded({ extended: true }));
App.use(express.json());

// Routes
App.use("/v1", v1Route);

App.get("/", (_, res: Response) => {
   res.status(200).send({
      "api-version": "v1",
      message: "API utilizada para o Back-end do CRS Controller",
   });
});

connectDatabase();
App.listen(process.env.PORT || 9995, () => {
   console.log(`Servidor rodando na porta: ${process.env.PORT || 9995}`);
});
