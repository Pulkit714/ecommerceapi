/* eslint-disable prettier/prettier */
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signUp.dto';
import { SignInDto } from './dto/signIn.dto';
import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserEntity } from './entities/auth.entity';
import { UsersService } from './users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  private async findUserByUsername(username: string): Promise<UserEntity | undefined> {
    return this.usersService.findOne(username);
  }

  async signUp(signUpDto: SignUpDto): Promise<{ user: UserEntity; message: string }> {
    const existingUser = await this.findUserByUsername(signUpDto.username);

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(signUpDto.password, 10);
    const newUser = await this.usersService.createUser({
      username: signUpDto.username,
      password: hashedPassword,
    });

    return { user: newUser, message: 'User registered successfully' };
  }

  async signIn(signInDto: SignInDto): Promise<{ access_token: string }> {
    const user = await this.findUserByUsername(signInDto.username);

    if (!user || !(await bcrypt.compare(signInDto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, username: user.username };
    const accessToken = this.jwtService.sign(payload);

    return { access_token: accessToken };
  }
}
