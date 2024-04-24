/* eslint-disable prettier/prettier */
import { UserEntity } from 'src/auth/entities/auth.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { CategoryEntity } from './category.entity';
import { CartItem } from 'src/cart/entities/cart-item.entity';


@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @ManyToOne(() => CategoryEntity, category => category.products)
  @JoinColumn({ name: "category" })
  category: CategoryEntity;

  @Column()
  image: string;

  @ManyToOne(() => UserEntity, user => user.products)
  addedBy: UserEntity;

  @OneToMany(() => CartItem, cartItem => cartItem.product)
  cartItems: CartItem[];
}
