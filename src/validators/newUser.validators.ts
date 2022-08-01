
import { check } from 'express-validator';
import { userRepository } from '../application.database.js';

const isValideUser = [
  check('email').isEmail().custom(async (value, { req }) => {
    const user = await userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email: value })
      .getOne();
    if (user) {
      throw new Error('This email already exists');
    }
  })
    .notEmpty().withMessage('Email is missing'),
  check('verifPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password confirmation does not match password');
    }
    return true;
  }),
  check('city').trim().notEmpty().withMessage('City is missing'),
  check('name').trim().notEmpty().withMessage('Name is missing'),
  check('lastName').trim().notEmpty().withMessage('LastName is missing'),
  check('tel').trim().trim().notEmpty(),
  check('role').trim(),
];

export { isValideUser };
