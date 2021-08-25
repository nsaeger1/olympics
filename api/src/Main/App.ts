import express from "express";
import { Router } from "express";
import PromiseRouter from "express-promise-router";
import { AwardController } from "./Controllers/AwardController";

let App: express.Express;

function createRouter(): Router {
  let router = (PromiseRouter as any)() as Router;

  router.use(express.json({ limit: 2 * 1024 * 1024 }));
  router.use(express.urlencoded({ extended: true }));

  console.log("Registering routes");
  router.use("/awards", AwardController.Create());
  console.log("Routes registed");

  return router;
}

function init() {
  App = express();

  App.all("*", async (req, res, next) => {
    const origin = req.headers.origin || "";
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Origin", origin);

    next();
  });

  App.options("*", async (_req, res, _next) => {
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.end();
  });

  App.use("/api", createRouter());

  return App;
}

export function GetApp() {
  if (App === undefined) {
    init();
  }

  return App;
}
