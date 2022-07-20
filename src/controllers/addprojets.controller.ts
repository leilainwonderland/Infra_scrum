import { Request, Response } from "express";

const addprojects = (req:Request, res:Response) => {
    console.log(req.body);
    res.status(200).json({
        message: "ok"
    });
}

export { addprojects };