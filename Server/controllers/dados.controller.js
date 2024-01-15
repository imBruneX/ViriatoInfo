import prisma from "../prisma/prismaClient.js";

export const getDados = async (req,res) => {
    const dados = await prisma.kit.findMany();

    res.json({
        quantidade: dados.length,
        dados   
    })
}