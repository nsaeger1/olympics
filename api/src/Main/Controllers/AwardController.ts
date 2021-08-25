import * as express from "express";
import * as ExpCore from "express-serve-static-core";

let awards = [
  { id: 0, country: "USA", medals: 0 },
  { id: 1, country: "Canada", medals: 0 },
  { id: 2, country: "Greece", medals: 0 },
];

export class AwardController {
  public static Create() {
    console.log("Creating Award route");

    let router = express.Router();

    router.get("/", AwardController.Awards);
    router.post("/", AwardController.UpdateAwards);
    return router;
  }

  public static async Awards(_req: ExpCore.Request, res: ExpCore.Response) {
    console.log("Endpoint Accessed: Get awards");
    res.send(awards);
  }

  public static async UpdateAwards(req: ExpCore.Request, res: ExpCore.Response) {
    console.log("Endpoint Accessed: Update awards");
    awards[req.body.id] = req.body;

    res.send(awards[req.body.id]);
  }
}
