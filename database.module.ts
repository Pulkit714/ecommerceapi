/* eslint-disable prettier/prettier */
// database.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../auth/entities/auth.entity'; // Import UserEntity from auth module
import { Product } from 'src/products/entities/product.entity';
import { CartEntity } from 'src/cart/entities/cart.entity';
import { CategoryEntity } from 'src/products/entities/category.entity';
import { CartItem } from 'src/cart/entities/cart-item.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: parseInt(configService.get('DB_PORT'), 10),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [UserEntity,Product,CartEntity,CategoryEntity,CartItem],
        synchronize: true,
        migrationsRun: false,
        logging: true,
        cli: {
          migrationsDir: 'src/db/migrations',
        },
      }),
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
