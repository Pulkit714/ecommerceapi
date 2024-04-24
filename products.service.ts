/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CategoryEntity } from './entities/category.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async getProducts(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async getProduct(productId: number): Promise<Product> {
    if (!productId) {
      throw new BadRequestException('Invalid product ID provided');
    }
  
    const product = await this.productRepository.findOne({
      where: { id: productId }
    });
  
    if (!product) {
      throw new NotFoundException('Product not found');
    }
  
    return product;
  }
  

  async getCategories(): Promise<CategoryEntity[]> {
    //return await this.categoryRepository.find();
    return await this.categoryRepository.createQueryBuilder("category").select("category.name").distinct(true).getRawMany();
  }

  async getProductsByCategory(categoryName: string): Promise<Product[]> {
    return await this.productRepository.find({
      where: { category: { name: categoryName } },
      relations: ['category']
    });
  }
  

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const { categoryName, ...productData } = createProductDto;
    const category = await this.categoryRepository.findOne({ where: { name: categoryName } });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    const newProduct = this.productRepository.create({ ...productData, category });
    return await this.productRepository.save(newProduct);
  }
  

  async updateProduct(productId: number, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.productRepository.findOne({where: { id: productId }});
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    const { categoryName, ...productData } = updateProductDto;
    if (categoryName) {
      const category = await this.categoryRepository.findOne({ where: { name: categoryName } });
      if (!category) {
        throw new NotFoundException('Category not found');
      }
      product.category = category;
    }
    Object.assign(product, productData);
    return await this.productRepository.save(product);
}

async deleteProduct(productId: number): Promise<void> {
    const product = await this.productRepository.findOne({where: { id: productId }});
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    await this.productRepository.remove(product);
}

}
