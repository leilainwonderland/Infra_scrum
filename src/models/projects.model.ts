import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseModel } from './base.model.js';
import type { User } from './users.model.js';

@Entity()

export class Project extends BaseModel {
    @Column('varchar', { length: 35 })
  public name!: string;

    @Column('varchar', { length: 250 })
    public description?: string;

  @Column()
    public startDate!: Date;

  @Column()
  public endDate!: Date;

  @Column()
  public priority!: string;

    @Column()
  public status!: string;

  @Column()
    public userCreator!: number;

   @ManyToOne('User', 'projects')
  public user!:User;
}
