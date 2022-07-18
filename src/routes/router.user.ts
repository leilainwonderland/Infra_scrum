import { Request, Response, Router } from "express";
import { login } from "../controllers/user.controller.js";

const router = Router();

router.post("/users", login )

export {router};