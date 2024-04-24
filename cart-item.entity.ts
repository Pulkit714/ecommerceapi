/* eslint-disable prettier/prettier */
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CartEntity } from "./cart.entity";
import { Product } from "src/products/entities/product.entity";

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CartEntity, cart => cart.items)
  @JoinColumn({ name: 'cart_id' })
  cart: CartEntity;

  @ManyToOne(() => Product, product => product.cartItems)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column()
  quantity: number;
}
