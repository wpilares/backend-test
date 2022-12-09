import {
  BeforeUpdate,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { User } from '../../users/entities/user.entity';
import { Transaction } from '../../transactions/entities/transaction.entity';
import { BeforeInsert } from 'typeorm';
import { JoinTable } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { unique: true })
  name: string;

  @Column('text')
  description: string;

  @Column('numeric')
  quantity: number;

  @Column('text')
  status: string;

  @BeforeInsert()
  checkStatusInsert() {
    if (!this.status && this.quantity == 0) {
      this.status = 'inactive';
    }

    if (!this.status && this.quantity >= 0) {
      this.status = 'active';
    }
  }

  @BeforeUpdate()
  checkStatusUpdate() {
    this.checkStatusInsert();
  }

  @ManyToOne(() => User, (user) => user.products)
  seller_user: User;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @ManyToMany(() => Transaction, (transaction) => transaction.products)
  @JoinTable()
  transactions: Transaction[];
}
