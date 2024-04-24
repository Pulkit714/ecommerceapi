/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { DatabaseModule } from 'src/db/database.module';
import { CategoryEntity } from './entities/category.entity';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [TypeOrmModule.forFeature([Product,CategoryEntity]), DatabaseModule],
  exports: [TypeOrmModule.forFeature([Product])]
})
export class ProductsModule {}
