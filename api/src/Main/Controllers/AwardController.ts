import * as express from "express";
import * as ExpCore from "express-serve-static-core";
let id = 3;

let awards = [
  { id: 0, country: "USA", gold: 0, silver: 0, bronze: 0 },
  { id: 1, country: "Canada", gold: 0, silver: 0, bronze: 0 },
  { id: 2, country: "Greece", gold: 0, silver: 0, bronze: 0 },
];

function getNewId() {
  return id++;
}

export class AwardController {
  public static Create() {
    console.log("Creating Award route");

    let router = express.Router();

    router.get("/", AwardController.Awards);
    router.post("/", AwardController.UpdateAward);
    router.put("/", AwardController.AddAward);
    router.delete("/", AwardController.DeleteAward);
    return router;
  }

  public static async Awards(_req: ExpCore.Request, res: ExpCore.Response) {
    console.log("Endpoint Accessed: Get awards");
    res.send(awards);
  }

  public static async UpdateAward(req: ExpCore.Request, res: ExpCore.Response) {
    console.log("Endpoint Accessed: Update award");
    if (req.body.gold >= 0 && req.body.silver >= 0 && req.body.bronze >= 0) {
      awards[req.body.id] = req.body;
    }
    res.send(awards[req.body.id]);
  }

  public static async AddAward(req: ExpCore.Request, res: ExpCore.Response) {
    console.log("Endpoint Accessed: Add award");
    if (req.body.country.length > 0) {
      const country = { id: getNewId(), country: req.body.country, gold: 0, silver: 0, bronze: 0 };

      awards.push(country);
      res.send(awards[awards.length - 1]);
    }
  }

  public static async DeleteAward(req: ExpCore.Request, res: ExpCore.Response) {
    console.log("Endpoint Accessed: Delete award");
    const deleted = awards.splice(
      awards.findIndex((country) => country.id === req.body.id),
      1
    );

    res.send(deleted);
  }
}
