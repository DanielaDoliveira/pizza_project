import { Router, Request, Response } from "express";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { IsAuthenticated } from './middlewares/IsAuthenticated'
const router = Router();


router.post('/users',new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);

router.get('/me', IsAuthenticated, new DetailUserController().handle);
export { router };
