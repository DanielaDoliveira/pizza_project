import { Router, Request, Response } from "express";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { CreateUserController } from "./controllers/user/createUserController";

const router = Router();


router.post('/users',new CreateUserController().handle);
router.post('/session', new AuthUserController().handle)
export { router };
