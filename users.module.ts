/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity } from '../entities/auth.entity';
import { DatabaseModule } from 'src/db/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAuthModule } from '../user-auth.module';

@Module({
  providers: [UsersService],
  exports: [UsersService],
  imports: [TypeOrmModule.forFeature([UserEntity]), DatabaseModule, UserAuthModule], // Import UserAuthModule
})
export class UsersModule {}