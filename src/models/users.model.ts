/* eslint-disable no-multiple-empty-lines */
/* eslint-disable padded-blocks */
/* eslint-disable spaced-comment */
/* eslint-disable indent */
/* eslint-disable no-trailing-spaces */
import { compare, hash } from 'bcrypt';
import { BeforeInsert, Column, Entity, OneToMany } from 'typeorm';
import { BaseModel } from './base.model.js';
import type { Project } from './projects.model.js';

@Entity()

export class User extends BaseModel {

    @Column('varchar', { length: 254, unique: true })
    public email!: string;
    
    @Column('varchar')
    public password!: string;

    @Column('varchar', { length: 35 })
    public city!: string;

    @Column('boolean')
    public status: boolean = false;

    @Column('varchar', { length: 35 })
    public name!: string;

    @Column('varchar', { length: 35 })
    public lastName!: string;

    @Column('varchar', { length: 35 })
    public role?: string;

    @Column('varchar', { length: 15 })
    public tel!: string;
    
    @Column('varchar', { length: 250 })
    public img: string = 'https://64.media.tumblr.com/57f55afee7406c89ae445a428de5af12/tumblr_nn6od9rYpQ1r4xjo2o1_250.gifv';

    
    @BeforeInsert()
    async hashPassword () {
      const hashed = await hash(this.password, 10);
      this.password = hashed;
    }

    public verifyPassword (password: string): Promise<boolean> {
      return compare(password, this.password);
    }

    @OneToMany('Project', 'project')
    public projects?:Project[];
};
