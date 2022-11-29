import prismaClient from "../../prisma";
import { RemoveItemService } from "../../services/order/RemoveItemService";
import { Request, Response } from 'express'
class RemoveItemController{
 async handle(req: Request, res: Response){
  const  item_id  = req.query.item_id as string; 
  const removeItemService = new RemoveItemService();
  const order = await removeItemService.execute({
    item_id: item_id
  });
  return res.status(200).json(order);
 }


}

export { RemoveItemController }