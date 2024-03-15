import { Express, Request, Response } from "express";
import service from "../services/category-service";
import { Category } from "@prisma/client";

export default (app: Express) => {
  app.post("/category", async (req: Request, res: Response) => {
    try {
      const newOne: { presence: Category } = { ...req.body };
      await service.create({
        ...newOne.presence,
      });
      res.status(200).end();
    } catch (err: any) {
      res
        .status(err.status || 500)
        .json(err)
        .end();
    }
  });

  app.put("/category", async (req: Request, res: Response) => {
    try {
      const newOne: { presence: Category } = { ...req.body };
      await service.update({
        ...newOne.presence,
      });
      res.status(200).end();
    } catch (err: any) {
      res
        .status(err.status || 500)
        .json(err)
        .end();
    }
  });

  app.get("/category", async (req: Request, res: Response) => {
    try {
      const presence = await service.findAll();
      res.json(presence).end();
    } catch (err: any) {
      res
        .status(err.status || 500)
        .json(err)
        .end();
    }
  });
};
