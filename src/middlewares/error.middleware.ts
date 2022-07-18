// import type { NextFunction, Request, Response } from 'express';

// interface HttpError extends Error{
//   status:number,
// };

// const catchErrors = (fn:any) => {
//   return function (req:Request, res:Response, next : NextFunction) {
//     return fn(req, res, next).catch(next);
//   };
// };

// const notFound = (req:Request, res:Response, next:NextFunction) => {
//   const err: HttpError = new Error() as HttpError;
//   err.message = 'Not Found';
//   err.status = 404;
//   next(err);
// };

// // const errorExemple = (err:any, req:Request, res:Response, next: NextFunction) => {
// //   res.status(err.status || nbr);
// //   res.json({
// //     error: {
// //       message: err.message,
// //     },
// //   });
// // };

// export { catchErrors, notFound };
