import { check } from "express-validator";

const isProjectValide = [
  check('name').trim().notEmpty().withMessage('Name is missing'),
  check('description').trim(),
  check('startDate').exists()
  .not()
  .isEmpty()
  .withMessage('start cannot be empty')
  .isISO8601()
  .withMessage('start must be in correct format yyyy:mm:dd hh:mm:ss'),
  check('endDate'),
  check('update'),
  check('status').trim().notEmpty().withMessage('status is missing')
];

export { isProjectValide };

{
//   "name": "Kidstock",
//   "description": "",
//   "startDate": "",
//   "endDate": "",
//   "update": "",
//   "priority": "",
//   "status": "", 
//   "logo":""
// }

// @Column('varchar', { length: 35 })
// public name!: string;

//   @Column('varchar', { length: 250 })
//   public description?: string;

// @Column()
//   public startDate!: string;

// @Column()
// public endDate!: string;

//   @Column()
// public update!: string;

//   @Column()
//   public status!: string;
