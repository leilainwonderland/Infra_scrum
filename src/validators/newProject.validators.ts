import { check } from 'express-validator';

const isProjectValide = [
  check('name').trim().notEmpty().withMessage('Name is missing'),
  check('description').trim(),
  check('startDate').toDate().notEmpty().withMessage('StartDate is missing'),
  check('endDate').toDate().notEmpty().withMessage('EndDate is missing'),
  check('update').toDate().notEmpty().withMessage('Update is missing'),
  check('status').trim().notEmpty().withMessage('Status is missing'),
];

export { isProjectValide };
