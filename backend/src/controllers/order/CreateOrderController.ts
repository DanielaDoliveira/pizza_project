import { Request, Response } from 'express';
import prismaClient from '../../prisma';
import { CreateOrderService } from '../../services/order/CreateOrderService';


class CreateOrderController{
  async handle(req: Request, res: Response){
      const { table, name } = req.body;
      const createOrderService = new CreateOrderService();
      const order = await createOrderService.execute({
        table,
        name
      });
      return res.status(201).json(order);
  }
}

export { CreateOrderController }