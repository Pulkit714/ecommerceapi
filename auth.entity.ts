/* eslint-disable prettier/prettier */
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BaseEntity,
  Timestamp
} from 'typeorm';

import { Roles } from '../users/users-role.enum';
import { Product } from 'src/products/entities/product.entity';
import { CartEntity } from 'src/cart/entities/cart.entity';
import { CategoryEntity } from 'src/products/entities/category.entity';
@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: Roles, array: true, default: [Roles.USER] })
  roles: Roles[];

  @CreateDateColumn()
  createdat: Timestamp;

  @UpdateDateColumn()
  updatedat: Timestamp;

  @OneToMany(() => CategoryEntity, cat => cat.addedBy)
  categories: CategoryEntity[];

  @OneToMany(() => Product, (prod) => prod.addedBy)
  products: Product[];

  @OneToMany(() => CartEntity, (order) => order.user)
  orders: CartEntity[];
}
