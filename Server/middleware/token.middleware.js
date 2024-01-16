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
  const authHeader = req.cookies.Codigo;
  if (authHeader) {

    jwt.verify(
      authHeader,
      process.env.PALAVRA_PASSE_SUPER_SECRETA,
      async (err, user) => {
        if (err)
          return res.redirect('/login')

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
    res.redirect('/login')
  }
};