import prismaClient from '../../prisma'
import { Response } from 'express'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

interface AuthRequest {
  email: string;
  password: string;
}
class AuthUserService{
  async execute({ email, password }: AuthRequest, res: Response){
    //Verify if email exists
    const userAlreadyExists = await prismaClient.user.findFirst({
      where:{
        email
      }
    })
    if(!userAlreadyExists){
      return res.status(201).json({message:"User/password not found! "})
    }
    const user = userAlreadyExists;
    const passwordMatch = await compare(password, user.password);
    if(!passwordMatch){
      return res.status(201).json({message:"User/password incorrect"})
    }
    const token = sign(
      {
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: '30d'
      }

    )
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token: token,
    }
  }
}

export { AuthUserService }