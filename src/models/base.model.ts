/* eslint-disable no-trailing-spaces */
import { CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, DeleteDateColumn } from 'typeorm';

export class BaseModel {
    @PrimaryGeneratedColumn('increment')
  public id!: number;
  
    @CreateDateColumn()
    public createdAt!: Date;

    @UpdateDateColumn()
    public updatedAt!: Date;
  
    @DeleteDateColumn()
    public deletedAt?: Date;
}
