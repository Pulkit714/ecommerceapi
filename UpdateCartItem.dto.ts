/* eslint-disable prettier/prettier */
import { IsNumber, Min } from 'class-validator';

export class UpdateCartItemDto {
  @IsNumber()
  cartItemId: number;  // The ID of the cart item to update

  @IsNumber()
  @Min(1)
  quantity: number;  // New quantity
}
