/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Put, Param, Delete, HttpStatus, HttpCode } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddCartItemDto } from './dto/AddCartItem.dto';
import { UpdateCartItemDto } from './dto/UpdateCartItem.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  @HttpCode(HttpStatus.CREATED) 
  async addItemToCart(@Body() addItemDto: AddCartItemDto): Promise<{ message: string ; cartItemId?: number}> {
    const cartItem = await this.cartService.addItemToCart(addItemDto.cartId, addItemDto.productId, addItemDto.quantity);
    return { message: 'Item added successfully', cartItemId: cartItem.id };
  }

  @Put('update/:id')
  @HttpCode(HttpStatus.OK)
  async updateCartItemQuantity(@Param('id') cartItemId: number, @Body() updateItemDto: UpdateCartItemDto): Promise<{ message: string }> {
    await this.cartService.updateCartItemQuantity(cartItemId, updateItemDto.quantity);
    return { message: 'Item quantity updated successfully' };
  }

  @Get(':cartId/items')
  async getCartItems(@Param('cartId') cartId: number): Promise<any[]> { 
    return this.cartService.getCartItems(cartId);
  }

  @Delete('remove/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeItemFromCart(@Param('id') cartItemId: number): Promise<void> {
    await this.cartService.removeItemFromCart(cartItemId);
  }

  @Delete(':cartId/clear')
  @HttpCode(HttpStatus.NO_CONTENT) 
  async clearCart(@Param('cartId') cartId: number): Promise<void> {
    await this.cartService.clearCart(cartId);
  }
}
