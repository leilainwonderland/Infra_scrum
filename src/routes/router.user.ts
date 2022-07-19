import { Request, Response, Router } from "express";
import { projects } from "../controllers/projets.controller.js";
import { login } from "../controllers/user.controller.js";

const router = Router();

router.post("/users", login )
router.post("/projects", projects )

export {router};