/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartEntity } from './entities/cart.entity';
import { CartItem } from './entities/cart-item.entity';
import { Product } from 'src/products/entities/product.entity';


@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async addItemToCart(cartId: number, productId: number, quantity: number): Promise<CartItem> {
    const product = await this.productRepository.findOne({ where: { id: productId } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    let cart = await this.cartRepository.findOne({ where: { id: cartId } });
    if (!cart) {
      cart = this.cartRepository.create({ id: cartId });
      await this.cartRepository.save(cart);
    }

    const newItem = this.cartItemRepository.create({
      cart,
      product,
      quantity
    });
    await this.cartItemRepository.save(newItem);
    return newItem;
  }

  async updateCartItemQuantity(cartItemId: number, quantity: number): Promise<CartItem> {
    const cartItem = await this.cartItemRepository.findOne({ where: { id: cartItemId } });
    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }
    cartItem.quantity = quantity;
    await this.cartItemRepository.save(cartItem);
    return cartItem;
  }

  async getCartItems(cartId: number): Promise<CartItem[]> {
    return await this.cartItemRepository.find({
      where: { cart: { id: cartId } },
      relations: ['product', 'cart']
    });
  }

  async removeItemFromCart(cartItemId: number): Promise<{ message: string }> {
    const result = await this.cartItemRepository.delete(cartItemId);
    if (result.affected === 0) {
      throw new NotFoundException('Item not found in cart');
    }
    return { message: 'Item removed from cart successfully' };
  }

  async clearCart(cartId: number): Promise<{ message: string }> {
    const result = await this.cartItemRepository.delete({ cart: { id: cartId } });
    return { message: `Cart cleared successfully, items removed: ${result.affected}` };
  }
}