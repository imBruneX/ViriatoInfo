import { Router } from "express";
import { Login } from "../controllers/login.controller.js";
import { TokenMiddleware } from "../middleware/token.middleware.js";

const route = Router()

route.post('/login', Login)

export default route;