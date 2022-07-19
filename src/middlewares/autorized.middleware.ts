// import type { NextFunction, Request, Response } from 'express';
// import pkg from 'jsonwebtoken';
// import type { HttpError } from './error.middleware.js';
// const { verify } = pkg;

// const authotized = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoyLCJpYXQiOjE2NTgyMzkxMTF9.qKOKvZvUtHlqnycjvIubnUaTb5KxR-lP0hBj6oJ07z0';
//     const jwtToken = req.headers.authorization?.split(' ')[1] || 'NO TOKEN';
//     // const jwtToken = token?.split(' ')[1] || 'NO TOKEN';
//     await verify(jwtToken, process.env.JWT_SECRET || 'nojwt');
//     next();
//   } catch {
//     const err = new Error('Bad token !!') as HttpError;
//     err.status = 401;
//     next(err);
//   }
// };

// export { authotized };
