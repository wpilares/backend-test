import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { User } from '../users/entities/user.entity';
import { ProductsModule } from '../products/products.module';
import { ProductsService } from '../products/products.service';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [TransactionsController],
  providers: [TransactionsService, UsersService],
  imports: [TypeOrmModule.forFeature([Transaction, User]), UsersModule],
})
export class TransactionsModule {}
