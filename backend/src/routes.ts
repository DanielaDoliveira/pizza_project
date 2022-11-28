
import multer from 'multer';
import { Router } from "express";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";
import { CreateProductController } from "./controllers/product/CreateProductController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { IsAuthenticated } from './middlewares/IsAuthenticated';
import uploadConfig from './config/multer';
import { ListByCategoryController } from './controllers/product/ListByCategoryController';
import { CreateOrderController } from './controllers/order/CreateOrderController';
import { RemoveOrderController } from './controllers/order/RemoveOrderController';

const upload = multer(uploadConfig.upload("./tmp"));
const router = Router();

//#region User Routes
  router.post('/users',new CreateUserController().handle);
  router.post('/session', new AuthUserController().handle);
  router.get('/me', IsAuthenticated, new DetailUserController().handle);
 
//#endregion
 

//#region  CATEGORY ROUTES
  router.post('/category',IsAuthenticated, new CreateCategoryController().handle);
  router.get('/category',IsAuthenticated, new ListCategoryController().handle );
//#endregion


//#region  PRODUCT ROUTES 
  router.post('/product',IsAuthenticated, upload.single('file'), new CreateProductController().handle);
  router.get('/category/product',IsAuthenticated, new ListByCategoryController().handle);
//#endregion

//#region ORDER ROUTES 
  router.post('/order',IsAuthenticated,new CreateOrderController().handle);
  router.delete('/order',IsAuthenticated, new RemoveOrderController().handle);
//#endregion


export { router };