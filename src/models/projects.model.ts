import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { BaseModel } from './base.model.js';
import { Tasks } from './tasks.model.js';
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
  public update!: Date;

    @Column()
    public status!: string;

  @Column()
    public logo: string = `https://picsum.photos/id/${Math.floor(Math.random() * 200)}/200/300`;

  @ManyToOne(() => User, user => user.projectBy)
  public userCreator!: User;

  @ManyToMany(() => User, user => user.projects, {
    cascade: true,
  })
  @JoinTable(
    { name: 'users_projects' },
  )
  public users?: User[];

  @OneToMany(() => Tasks, tasks => tasks.project)
  public tasks?: Tasks[];
}
