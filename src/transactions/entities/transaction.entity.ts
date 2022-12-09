import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Product } from '../../products/entities/product.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  state: string;

  @ManyToOne(() => User, (user) => user.transactions)
  buyer_user: User;

  @ManyToMany(() => Product, (product) => product.transactions)
  products: Product[];
}
