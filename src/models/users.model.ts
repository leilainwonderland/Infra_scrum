/* eslint-disable no-multiple-empty-lines */
/* eslint-disable padded-blocks */
/* eslint-disable spaced-comment */
/* eslint-disable indent */
/* eslint-disable no-trailing-spaces */
import { Column, Entity } from 'typeorm';
import { BaseModel } from './base.model.js';

@Entity()

export class User extends BaseModel {
    @Column('varchar', { length: 125, unique: true })
    public username!: string;
    
    @Column('varchar', { length: 254, unique: true })
    public email!: string;

    @Column('varchar')
    public password!: string;

    @Column()
    public status: boolean = false;

    @Column('varchar', { length: 35 })
    public name!: string;

    @Column('varchar', { length: 35 })
    public lastName!: string;

    @Column('varchar', { length: 35 })
    public birthDate?: Date;

    @Column('varchar', { length: 35 })
    public role?: string;

    @Column('varchar', { length: 35 })
    public ville?: string;

    @Column('varchar', { length: 15 })
    public tel!: string;
    
    @Column('varchar', { length: 250 })
    public img: string = 'https://64.media.tumblr.com/57f55afee7406c89ae445a428de5af12/tumblr_nn6od9rYpQ1r4xjo2o1_250.gifv';

};
