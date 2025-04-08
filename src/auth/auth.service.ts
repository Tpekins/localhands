import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/create-user1.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(user: CreateUserDto) {
    return this.usersService.create(user);
  }

  async validateUser(email: string, password: string): Promise<Omit<User, 'passwordHash'> | null> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.passwordHash))) {
      const { passwordHash, ...result } = user;
      return result;
    }
    return null;
  }

  async login<T extends { email: string; password: string }>(user: T): Promise<{ access_token: string }> {
    const validatedUser = await this.validateUser(user.email, user.password);
    if (!validatedUser) {
      throw new Error('Invalid credentials');
    }
    const payload = { email: validatedUser.email, sub: validatedUser.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
