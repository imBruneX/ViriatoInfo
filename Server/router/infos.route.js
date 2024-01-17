import { Router } from "express";
import { getDados, setDados } from "../controllers/dados.controller.js";
import { TokenMiddleware } from "../middleware/token.middleware.js";

const route = Router()

route.get('/infos', [TokenMiddleware], getDados)
route.post('/infos', [TokenMiddleware], setDados)

export default route;