import { Request, Response } from "express";

const login = (req:Request, res:Response) => {
    console.log(req.body);
}

export { login };