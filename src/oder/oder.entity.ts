import { ObjectId } from 'mongodb';
import { User } from 'src/users/users.entity';
import { Column, Entity, ManyToOne, ObjectIdColumn } from 'typeorm';

@Entity()
export class Oder {
  @ObjectIdColumn()
  id: ObjectId;
  @Column()
  customer_id: string;
  @Column()
  products: {
    product_id: string; // Hoặc ObjectID
    quantity: number;
    size: string;
  };

  @Column('float')
  total_price: number;

  @Column()
  discount_code: string;

  @Column('float')
  total_pay: number;

  @Column()
  type: 'delivery' | 'inPlace';

  @Column()
  QRCode: string;

  @Column()
  payment_status: 'pending' | 'confirm';

  @ManyToOne(() => User, (user) => user.orders)
  user: User;
}
