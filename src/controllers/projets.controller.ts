import { Request, Response } from "express";

const projects = (req:Request, res:Response) => {
    console.log(req.body);
}

export { projects };