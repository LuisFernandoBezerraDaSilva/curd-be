import { Express, Request, Response } from "express";

export default (app: Express) => {
  app.get("/heart-beat", (_req: Request, res: Response) => res.send(200));
};
