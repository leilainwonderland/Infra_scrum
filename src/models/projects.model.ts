import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { BaseModel } from './base.model.js';
import { User } from './users.model.js';

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

  @ManyToMany(() => User, user => user.projects, {
    cascade: true,
  })
  @JoinTable(
    { name: 'users_projects' },
  )
  public users?: User[];
}
