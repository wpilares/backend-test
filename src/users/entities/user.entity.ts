import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { Transaction } from '../../transactions/entities/transaction.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column('varchar', { unique: true })
  email: string;

  @Column('text')
  password: string;

  @Column('text')
  is_admin: string;

  // @OneToMany(() => Product, (product) => product.seller_user)
  // products: Product;
  //
  // @OneToMany(() => Transaction, (transaction) => transaction.buyer_user)
  // transactions: Transaction;
}
