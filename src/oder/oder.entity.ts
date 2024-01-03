import { ObjectId } from 'mongodb';
import { User } from 'src/users/users.entity';
import {
  Column,
  Entity,
  Index,
  ManyToOne,
  ObjectIdColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderStatus, Types } from './order.model';
import { Exclude } from 'class-transformer';

@Entity()
export class Order {
  @ObjectIdColumn()
  id: ObjectId;
  @PrimaryGeneratedColumn()
  slug: number;
  @Column()
  // @Index()
  customer_id: string;
  @Column()
  products: {
    product_id: string; // Hoặc ObjectID
    quantity: number;
    size: string;
  };

  @Column({ default: false })
  approved: boolean;

  @Column('float')
  total_price: number;

  @Column()
  discount_code: string;

  @Column('float')
  total_pay: number;

  @Column()
  type: Types;

  @Column()
  QRCode: string;

  @Column()
  payment_status: OrderStatus;

  @ManyToOne((_type) => User, (user) => user, { eager: false })
  @Exclude({
    toPlainOnly: true,
  })
  user: User;
}
