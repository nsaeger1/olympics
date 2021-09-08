import * as express from "express";
import * as ExpCore from "express-serve-static-core";

let awards = [
  { id: 0, country: "USA", gold: 0, silver: 0, bronze: 0 },
  { id: 1, country: "Canada", gold: 0, silver: 0, bronze: 0 },
  { id: 2, country: "Greece", gold: 0, silver: 0, bronze: 0 },
];

function getNewId() {
  return awards.length;
}

export class AwardController {
  public static Create() {
    console.log("Creating Award route");

    let router = express.Router();

    router.get("/", AwardController.Awards);
    router.post("/", AwardController.UpdateAwards);
    router.put("/", AwardController.AddAwards);
    return router;
  }

  public static async Awards(_req: ExpCore.Request, res: ExpCore.Response) {
    console.log("Endpoint Accessed: Get awards");
    res.send(awards);
  }

  public static async UpdateAwards(req: ExpCore.Request, res: ExpCore.Response) {
    console.log("Endpoint Accessed: Update awards");
    if (req.body.gold >= 0 && req.body.silver >= 0 && req.body.bronze >= 0) {
      awards[req.body.id] = req.body;
    }
    res.send(awards[req.body.id]);
  }

  public static async AddAwards(req: ExpCore.Request, res: ExpCore.Response) {
    console.log("Endpoint Accessed: Add awards");
    if (req.body.country.length > 0) {
      const country = { id: getNewId(), country: req.body.country, gold: 0, silver: 0, bronze: 0 };

      awards.push(country);
    }
    res.send(awards[awards.length - 2]);
  }
}
