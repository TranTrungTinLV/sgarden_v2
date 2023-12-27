import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
export class CategoryEntity {
  @ObjectIdColumn()
  id: string;

  @Column()
  name: string;
}
