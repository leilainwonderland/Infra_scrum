// import type { NextFunction, Request, Response } from 'express';
// import { validationResult } from 'express-validator';

// const validBasic = (req: Request, res: Response, next:NextFunction) => {
//   const errors = validationResult(req.body);
//   console.log(errors);
//   if (req.body.length > 0) {
//     console.log('validBasic');
//     return res.status(422).json(errors);
//   }
//   return next();
// };

// export { validBasic };
