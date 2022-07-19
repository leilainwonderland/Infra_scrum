import { Column, Entity } from 'typeorm';
import { BaseModel } from './base.model';

@Entity()

export class Tasks extends BaseModel {
@Column('varchar', { length: 35 })
  public name!: string;

  @Column('varchar', { length: 35 })
public status!: string;

    @Column('varchar', { unique: true })
  public projectId!: number;

    @Column('varchar', { unique: true })
    public userId!: number;

    @Column('varchar', { length: 250 })
    public taskDescription?: string;

    @Column()
    public options!: string;

    @Column()
    public roles!: string;

    @Column()
    public assign!: string;
};
