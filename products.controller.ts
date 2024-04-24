/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CategoryEntity } from './entities/category.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getProducts(): Promise<Product[]> {
    return this.productsService.getProducts();
  }

  @Get(':id(\\d+)')
async getProduct(@Param('id') productId: number): Promise<Product> {
  return this.productsService.getProduct(productId);
}


  @Get('categories')
  async getCategories(): Promise<CategoryEntity[]> {
    return this.productsService.getCategories();
  }

  @Get('category/:categoryName')
  async getProductsByCategory(@Param('categoryName') categoryName: string): Promise<Product[]> {
    return this.productsService.getProductsByCategory(categoryName);
  }

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productsService.createProduct(createProductDto);
  }

  @Put(':id')
  async updateProduct(@Param('id') productId: number, @Body() updateProductDto: UpdateProductDto): Promise<Product> {
    return this.productsService.updateProduct(productId, updateProductDto);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') productId: number): Promise<void> {
    return this.productsService.deleteProduct(productId);
  }
}
