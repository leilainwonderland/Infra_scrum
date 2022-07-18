/* eslint-disable no-multiple-empty-lines */
/* eslint-disable padded-blocks */
/* eslint-disable spaced-comment */
/* eslint-disable indent */
/* eslint-disable no-trailing-spaces */
import { Column, Entity } from 'typeorm';
import { BaseModel } from './base.model.js';

@Entity()

export class Users extends BaseModel {
    @Column('varchar', { length: 35 })
    public username!: string;
    
    @Column('varchar', { length: 254 })
    public email!: string;

    @Column('varchar', { length: 35 })
    public password!: string;

    @Column()
    public status!: string;

    @Column()
    public name!: string;

    @Column()
    public lastName!: string;

    @Column()
    public birthDate?: Date;

    @Column()
    public role!: string;

    @Column()
    public description?: string;

    @Column('varchar', { length: 35 })
    public ville?: string;

    @Column('varchar', { length: 35 })
    public pays!: string;

    @Column('varchar', { length: 15 })
    public phone!: string;
    
    @Column()
    public img?: string;

};
