import express from 'express';
import 'dotenv/config';
import route from './router/login.route.js';
import dadosroute from './router/infos.route.js'
import cors from 'cors'
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { TokenMiddleware } from './middleware/token.middleware.js';
import cookieParser from 'cookie-parser'

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(cookieParser())

app.use('/arquivos', express.static(__dirname + "/pages/login"));

app.get("/login", (req,res) => {
    res.sendFile(__dirname + "/pages/login/index.html")
})

app.use('/arquivos_dados', express.static(__dirname + "/pages/table-09"));

app.get('/dados', [TokenMiddleware], (req,res) => {
    res.sendFile(__dirname + "/pages/table-09/index.html")
})

app.get('/dados_secretos', [TokenMiddleware], (req,res) => {
    res.json({
        status: 200,
        mensagem: "Acessaste aos dados super secretos!"
    })
})

app.use(route);
app.use(dadosroute)

app.use("/*", (req,res) => {
    res.status(404).json({
        status: 400,
        mensagem: "Essa rota não foi encontrada!"
    })
})


app.listen(process.env.PORT, () => {
    console.log("Server iniciado na porta " + process.env.PORT)
});