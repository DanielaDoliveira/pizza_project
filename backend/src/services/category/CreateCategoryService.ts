import prismaClient from '../../prisma'
import { Response }from 'express'

interface CategoryRequest{
  name: string;
}
class CreateCategoryService{
  async execute({ name }: CategoryRequest, res: Response){
    if(name === ""|| name === " "){
      return res.status(400).json({ message: "Invalid name" });
    }
    const category = await prismaClient.category.create({
      data:{
        name:name
      },
      select:{
        id : true,
        name : true,
      }
    })
  }
}
export { CreateCategoryService }