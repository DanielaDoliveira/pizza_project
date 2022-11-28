import prismaClient from '../../prisma'
import { hash } from 'bcryptjs'
import { Response } from 'express'
interface UserRequest{
  name: string;
  email: string;
  password: string;
}

class CreateUserService{
  async execute({ name, email, password }: UserRequest, res: Response){
  let message : string;
    // verificar se ele enviou um email
    if(!email){
     message = "Email incorrect"
      return res.status(400).json(message)
     
    }

    //Verificar se esse email já está cadastrado na plataforma
    const userAlreadyExists = await prismaClient.user.findFirst({
      where:{
        email: email
      }
    })

    if(userAlreadyExists){
       message = "User already exists"
     
      return res.status(400).json(message)
  
    }
    const password_hash = await hash(password,8)
    
    const user = await prismaClient.user.create({
      data:{
        name: name,
        email: email,
        password: password_hash
      },
      select:{
        id: true,
        name: true,       
        email: true,
      }
    })

   
    return user;
  }
}

export { CreateUserService }