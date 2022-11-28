
import { Request, Response } from 'express'
import { ListCategoryService } from '../../services/category/ListCategoryService';

class ListCategoryController {
  async handle(req: Request, res: Response){
      const listCategoryService = new ListCategoryService();
      const category = await listCategoryService.execute();
      return res.status(200).json(category);
  }
}
export { ListCategoryController }