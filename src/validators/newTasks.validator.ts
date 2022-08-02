import { check } from 'express-validator';

const isValidTask = [
  check('name').trim().notEmpty().withMessage('Name is missing'),
  check('status').trim(),
  check('description').trim(),
  check('priority').trim().notEmpty().withMessage('Priority is missing'),
  check('startDate').isDate().notEmpty().withMessage('StartDate is missing'),
  check('endDate').isDate().notEmpty().withMessage('StartDate is missing'),
  check('roles').trim().notEmpty().withMessage('Roles is missing'),
];

export { isValidTask };
