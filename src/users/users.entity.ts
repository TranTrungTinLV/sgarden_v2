import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ObjectIdColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  AfterInsert,
  AfterUpdate,
  AfterRemove,
} from 'typeorm';
import { ObjectId } from 'mongodb';
@Entity()
export class User {
  @ObjectIdColumn()
  id: ObjectId;

  @PrimaryGeneratedColumn('uuid')
  @Index()
  slug: string;

  @Column()
  username: string;

  @Column()
  // @Exclude()
  password: string;

  @Column()
  email: string;

  @Column()
  sex: string;

  @Column()
  birthday: string;

  @Column()
  phone: string;

  @AfterInsert()
  loginInsert() {
    console.log('Inserted User with Id.', this.slug);
    // console.log(typeof this.id);
  }

  @AfterUpdate()
  loginUpdate() {
    console.log('Updated User with Id', this.slug);
  }

  @AfterRemove()
  logRemove() {
    console.log('Remove user with Id', this.slug);
  }

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
