import { check } from 'express-validator';

const isValidLog = [
  check('email').isEmail().notEmpty().withMessage('Email is missing'),
  check('password').trim().notEmpty().withMessage('Password is missing'),
];

export { isValidLog };
