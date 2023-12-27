import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from './product.models';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  //Relationship with Category
  @Column()
  categoryId: string;

  // @ManyToOne((_type) => CategoryEntity)
  // @JoinColumn({ name: 'categoryId' })
  // category: CategoryEntity;

  @Column()
  category: Category;
  @Column()
  images?: object[];

  @Column()
  priceOriginal: number;

  @Column()
  priceNew: number;

  @Column()
  reviews: {
    star: number;
    customerId: number;
    content: string;
  }[];
}
