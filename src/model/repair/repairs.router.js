import express from "express";
import {
  allPending,
  createRepairs,
  repairsById,
  repairsCompleted,
  repairsDelete,
} from "./repairs.controller.js";
import { checkCreateRepair, checkId } from "./repairs.middleware.js";

export const route = express.Router();

route.get("/", allPending);
route.post("/", checkCreateRepair, createRepairs);

route.get("/:id",checkId, repairsById);
route.patch("/:id",checkId, repairsCompleted);
route.delete("/:id",checkId, repairsDelete);
