/* eslint-disable prettier/prettier */
import { IsNumber, Min, IsNotEmpty } from 'class-validator';

export class AddCartItemDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  cartId: number;  // The ID of the cart to which the item is being added

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  productId: number;  // The ID of the product to add to the cart

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  quantity: number;  // Quantity of the product to add
}
