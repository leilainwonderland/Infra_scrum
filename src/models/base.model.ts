/* eslint-disable no-trailing-spaces */
import { CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, DeleteDateColumn } from 'typeorm';

export class BaseModel {
    @PrimaryGeneratedColumn('increment')
  public id!: string;
  
    @CreateDateColumn()
    public createdAt!: Date;

    // eslint-disable-next-line no-undef
    @UpdateDateColumn()
    public updatedAt!: Date;
  
    // eslint-disable-next-line no-undef
    @DeleteDateColumn()
    public deletedAt?: Date;
}
