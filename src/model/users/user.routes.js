import express from "express";
import {
  deleteUser,
  findAllUsers,
  findById,
  login,
  register,
  updateUser,
} from "./user.controller.js";
import { chekedId, loginCheck, protect } from "./user.middleware.js";

export const route = express.Router();

route.post("/register", register);
route.post("/login", loginCheck, login);

route.use(protect);

route.get("/", findAllUsers);
route.get("/:id", chekedId,findById);
route.patch("/", updateUser);
route.delete("/", deleteUser);
