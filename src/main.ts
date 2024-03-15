import "./conf";
import express from "express";
import controllers from "./controllers";
import cors from "cors";
import fs from "fs";
import jobs from "./jobs";
// import { hash } from './helpers/crypto';

const argExecJobs = "--just-execute-the-jobs";

let server: any;

const executeJobs = [...process.argv].find((arg) => arg === argExecJobs);
if (executeJobs) {
  if (!(global as any).IS_TESTING) {
    jobs();
  }
} else {
  server = express();

  // Basic cors middlewares
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
  server.use(
    cors({
      origin: process.env.URL_FRONT,
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    }),
  );

  // Application middlewares
  controllers.forEach((c) => c(server));

  // Start
  const SERVER_PORT = process.env.SERVER_PORT || 3003;
  server.listen(SERVER_PORT, () => {
    console.log(`[SERVER] Running at http://localhost:${SERVER_PORT}`);
  });

  if (!fs.existsSync("./resources")) {
    fs.mkdirSync("resources");
  }

  if (!fs.existsSync("./public")) {
    fs.mkdirSync("public");
  }
  server.use(express.static("public"));
}

// console.log('>>>>>', hash('Xplan1234')); Hash generation sample

export default server;
