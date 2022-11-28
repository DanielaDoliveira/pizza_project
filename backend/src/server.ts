import express, { Request, Response, NextFunction } from "express";
import { router } from "./routes";
import cors from "cors";
import path from "path";

const app = express();

const port = process.env.PORT || 3333;
app.use(express.json());
app.use(cors());
app.use(router);

app.use( '/files', express.static(path.resolve(__dirname,'..','tmp')));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return res.status(400).json({ error: err.message });
  }
  return res
    .status(500)
    .json({ status: "error", message: "Internal Server Error" });
});
app.listen(port, () => console.log("Server Online"));
