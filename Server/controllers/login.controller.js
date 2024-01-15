import prisma from "../prisma/prismaClient.js";
import pkg from 'express';
const { Request, Response } = pkg;
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

/**
    * @param {Request} req The Request
    * @param {Response} res The Response
*/


export const Login = async (req, res) => {

    const { nome, senha } = req.body;

    if(!nome || !senha) {
        return res.status(400).json({
            mensagem: "O utilizador ou a password nao foram inseridos"
        })
    }

    const user = await prisma.admin.findFirst({
        where: {
            nome
        }
    })

    if(!user) return res.status(400).json({
        mensagem: "Essa conta não foi encontrado!"
    })

    const isValid = await bcrypt.compare(senha, user.password);

    if(!isValid) return res.status(401).json({
        mensagem: "Palavra-passe incorreta!"
    })

    const token = jwt.sign({ nome: user.nome }, process.env.PALAVRA_PASSE_SUPER_SECRETA, { expiresIn: "1d" });
    
    res.status(200).json({
        mensagem: "Entrou na conta com sucesso!",
        token
    })
} 