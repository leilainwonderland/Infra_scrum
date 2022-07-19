import { Column, Entity } from 'typeorm';
import { BaseModel } from './base.model.js';

@Entity()

export class Projects extends BaseModel {
    @Column('varchar', { length: 35 })
  public name!: string;

  @Column()
    public options!: string;

    @Column('varchar', { length: 250 })
  public description?: string;

  @Column()
    public priority!: string;

    @Column()
  public status!: string;

    @Column('varchar', { unique: true })
    public userId!: number;
}
