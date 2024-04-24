/* eslint-disable prettier/prettier */
import {  Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/auth.entity';
import { SignUpDto } from '../dto/signUp.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async findOne(username: string): Promise<UserEntity | undefined> {
    return this.usersRepository.findOne({ where: { username } });
  }

  async createUser(signUpDto: SignUpDto): Promise<UserEntity> {

    const newUser = this.usersRepository.create(signUpDto);

    await this.usersRepository.save(newUser);

    return newUser;
  }
}
