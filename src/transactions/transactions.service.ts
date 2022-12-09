import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';

@Injectable()
export class TransactionsService {
  private readonly logger = new Logger('TransactionsService');
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    private usersService: UsersService,
  ) {}

  async create(createTransactionDto: CreateTransactionDto) {
    try {
      const transaction =
        this.transactionRepository.create(createTransactionDto);

      if (createTransactionDto.buyer_userId) {
        const user = await this.usersService.findOne(
          createTransactionDto.buyer_userId,
        );
        transaction.buyer_user = user;
      }

      await this.transactionRepository.save(transaction);
      return transaction;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  findAll() {
    return this.transactionRepository.find({});
  }

  async findOne(id: string) {
    const transaction = await this.transactionRepository.findOneBy({ id });
    if (!transaction)
      throw new NotFoundException(`Transaction with id ${id} not found`);
    return transaction;
  }

  async update(id: string, updateTransactionDto: UpdateTransactionDto) {
    const transaction = await this.transactionRepository.findOneBy({
      id: id,
    });

    if (updateTransactionDto.buyer_userId) {
      const user = await this.usersService.findOne(
        updateTransactionDto.buyer_userId,
      );
      transaction.buyer_user = user;
    }

    this.transactionRepository.merge(transaction, updateTransactionDto);
    return this.transactionRepository.save(transaction);
  }

  async remove(id: string) {
    const transaction = await this.findOne(id);
    await this.transactionRepository.remove(transaction);
  }

  private handleDBExceptions(error: any) {
    this.logger.error(error);
    throw new BadRequestException(error.sqlMessage);
  }
}
