import express from 'express';
import 'dotenv/config';
import route from './router/login.route.js';
import dadosroute from './router/dados.route.js'
import cors from 'cors'

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
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