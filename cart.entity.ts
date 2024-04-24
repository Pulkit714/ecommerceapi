/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { UserEntity } from 'src/auth/entities/auth.entity';
import { CartItem } from './cart-item.entity';


@Entity()
export class CartEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, user => user.orders)
  user: UserEntity;

  @OneToMany(() => CartItem, cartItem => cartItem.cart)
  items: CartItem[];
}
