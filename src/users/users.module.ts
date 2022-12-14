import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { Transaction } from '../transactions/entities/transaction.entity';

@Module({
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy],
  imports: [
    Transaction,
    ConfigModule,
    TypeOrmModule.forFeature([User, Transaction]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_AUTH_SECRET'),
          signOptions: {
            expiresIn: '7d',
          },
        };
      },
    }),
  ],
  exports: [TypeOrmModule, JwtStrategy, PassportModule, JwtModule],
})
export class UsersModule {}
