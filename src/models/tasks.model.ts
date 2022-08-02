import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { BaseModel } from './base.model.js';
import type { Project } from './projects.model.js';
import { User } from './users.model.js';

@Entity()

export class Tasks extends BaseModel {
@Column('varchar', { length: 35 })
  public name!: string;

  @Column('varchar', { length: 35 })
public status?: string;

    @Column('varchar', { length: 250 })
  public description?: string;

    @Column()
    public priority!: string;

    @Column()
    public startDate!: Date;

    @Column()
    public endDate!: Date;

    @Column()
    public roles!: string;

   @ManyToOne('Project', 'tasks')

    public project!: Project;

    @ManyToMany(() => User, user => user.tasks, {
      cascade: true,
    })
    @JoinTable(
      { name: 'users_tasks' },
    )
   public users?: User[];
}
