import prisma from "../prisma/prismaClient.js";

export const getDados = async (req,res) => {
    const dados = await prisma.kit.findMany();

    res.json({
        quantidade: dados.length,
        dados   
    })
}

export const setDados = async (req,res) => {
    const {numero_serie, danos, router, estragos, estado} = req.body;
    console.log(req.body)
    if(!numero_serie || !danos || !router || !estragos || !estado) return res.status(400).json({
        mensagem: "Não foram inseridos todos os dados"
    })

    await prisma.kit.create({
        data: {
            numero_serie,
            danos,
            router: router == "true",
            estrago: estragos,
            estado
        }
    })

    const dados = await prisma.kit.findMany();

    res.json({
        quantidade: dados.length,
        dados
    })
}