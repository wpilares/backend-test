import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { CategoriesService } from '../categories/categories.service';
import { CategoriesModule } from '../categories/categories.module';
import { Category } from '../categories/entities/category.entity';
import { User } from '../users/entities/user.entity';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, CategoriesService, UsersService],
  imports: [
    TypeOrmModule.forFeature([Product, Category, User]),
    CategoriesModule,
    UsersModule,
  ],
})
export class ProductsModule {}
