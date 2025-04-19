import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
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

  async validateUser(identifier: string, password: string): Promise<Omit<User, 'passwordHash'> | null> {
    let user;
    // Try to find user by email or phone number
    try {
      if (identifier.includes('@')) {
        user = await this.usersService.findByEmail(identifier);
      } else {
        user = await this.usersService.findByPhoneNumber(identifier);
      }
    } catch (error) {
      return null;
    }

    if (user && (await bcrypt.compare(password, user.passwordHash))) {
      const { passwordHash, ...result } = user;
      return result;
    }
    return null;
  }

  async login(credentials: {
    email?: string;
    phoneNumber?: string;
    password: string;
  }): Promise<{ access_token: string }> {
    const identifier = credentials.email || credentials.phoneNumber;
    if (!identifier) {
      throw new Error('Either email or phone number must be provided');
    }

    const validatedUser = await this.validateUser(identifier, credentials.password);
    if (!validatedUser) {
      throw new Error('Invalid credentials');
    }

    const payload = {
      email: validatedUser.email,
      phoneNumber: validatedUser.phoneNumber,
      sub: validatedUser.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
