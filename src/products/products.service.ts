import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { Category } from '../categories/entities/category.entity';
import { CategoriesService } from '../categories/categories.service';
import { UsersService } from '../users/users.service';
import { Transaction } from '../transactions/entities/transaction.entity';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger('ProductsService');
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,

    private categoriesService: CategoriesService,
    private usersService: UsersService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const product = this.productRepository.create(createProductDto);

      if (createProductDto.categoryId) {
        const category = await this.categoriesService.findOne(
          createProductDto.categoryId,
        );
        product.category = category;
      }

      if (createProductDto.seller_userId) {
        const user = await this.usersService.findOne(
          createProductDto.seller_userId,
        );
        product.seller_user = user;
      }

      if (createProductDto.transactionsId) {
        const transactions = await this.transactionRepository.findBy({
          id: In(createProductDto.transactionsId),
        });
        product.transactions = transactions;
      }

      await this.productRepository.save(product);
      return product;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  findAll() {
    return this.productRepository.find({
      relations: ['category', 'seller_user'],
    });
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOneBy({ id });

    if (!product)
      throw new NotFoundException(`Product with id ${id} not found`);
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.findOneBy({ id });

    if (updateProductDto.categoryId) {
      const category = await this.categoriesService.findOne(
        updateProductDto.categoryId,
      );
      product.category = category;
    }

    if (updateProductDto.seller_userId) {
      const user = await this.usersService.findOne(
        updateProductDto.seller_userId,
      );
      product.seller_user = user;
    }

    this.productRepository.merge(product, updateProductDto);
    return this.productRepository.save(product);
  }

  async remove(id: string) {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
  }

  private handleDBExceptions(error: any) {
    this.logger.error(error);
    throw new BadRequestException(error.sqlMessage);
  }
}
