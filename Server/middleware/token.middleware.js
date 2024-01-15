import pkg from 'express';
const { Request, Response, NextFunction } = pkg;
import jwt from "jsonwebtoken";
import prisma from '../prisma/prismaClient.js';

/**
    * @param {Request} req The Request
    * @param {Response} res The Response
    * @param {NextFunction} next The Next
*/

export const TokenMiddleware = (
  req,
  res,
  next
) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    if (!token)
      return res.status(400).json({
        status: 400,
        message: "Token não encontrada",
      });

    jwt.verify(
      token,
      process.env.PALAVRA_PASSE_SUPER_SECRETA,
      async (err, user) => {
        if (err)
          return res.status(403).json({
            status: 403,
            message: "Token Inválida",
          });

        const newuser = await prisma.admin.findFirst({
            where: {
                nome: user.nome
            }
        })

        if (!newuser)
          return res.status(403).json({
            status: 403,
            message: "Token Inválida",
          });

        req.body.user = {
          nome: newuser.nome,
        };
        next();
      }
    );
  } else {
    res.status(401).json({
      status: 401,
      message: "Token não encontrada",
    });
  }
};