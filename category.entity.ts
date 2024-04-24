/* eslint-disable prettier/prettier */
import { UserEntity } from 'src/auth/entities/auth.entity';
import { Entity, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, Timestamp, PrimaryColumn } from 'typeorm';
import { Product } from './product.entity';


@Entity('categories')
export class CategoryEntity {

  @PrimaryColumn()
  name: string;

  @ManyToOne(() => UserEntity, user => user.categories)
  addedBy: UserEntity;

  @OneToMany(() => Product, product => product.category)
  products: Product[];

  @CreateDateColumn()
  createdAt: Timestamp;

  @UpdateDateColumn()
  updatedAt: Timestamp;
}
