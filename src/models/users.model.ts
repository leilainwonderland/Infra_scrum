/* eslint-disable no-multiple-empty-lines */
/* eslint-disable padded-blocks */
/* eslint-disable spaced-comment */
/* eslint-disable indent */
/* eslint-disable no-trailing-spaces */
import { compare, hash } from 'bcrypt';
import { BeforeInsert, Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import { BaseModel } from './base.model.js';
import { Project } from './projects.model.js';
import { Tasks } from './tasks.model.js';

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
    public img: string = `https://picsum.photos/id/${Math.floor(Math.random() * 200)}/200/300`;

    @BeforeInsert()
    async hashPassword () {
      const hashed = await hash(this.password, 10);
      this.password = hashed;
    }

    public verifyPassword (password: string): Promise<boolean> {
      return compare(password, this.password);
    }

    @OneToMany(() => Project, project => project.userCreator)
    public projectBy?: Project[];

    @ManyToMany(() => Project, project => project.users)
    public projects?: Project[];

    @ManyToMany(() => Tasks, tasks => tasks.users)
    public tasks?:Tasks[];

};
