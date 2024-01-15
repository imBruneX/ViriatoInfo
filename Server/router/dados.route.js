import { Router } from "express";
import { getDados } from "../controllers/dados.controller.js";
import { TokenMiddleware } from "../middleware/token.middleware.js";

const route = Router()

route.get('/dados', [TokenMiddleware], getDados)

export default route;