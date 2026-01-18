import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { name, email, password } = registerDto;
    const normalizedEmail = email.toLowerCase().trim();

    const userAlreadyExists = await this.prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (userAlreadyExists) {
      throw new BadRequestException('Email ja cadastrado');
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await this.prisma.user.create({
      data: {
        name,
        email: normalizedEmail,
        password_hash: passwordHash,
      },
    });

    return { message: 'Usuário criado com sucesso' };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const normalizedEmail = email.toLowerCase().trim();

    const user = await this.prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user) {
      throw new UnauthorizedException('Credenciais incorretas');
    }

    const doesPasswordMatch = await bcrypt.compare(password, user.password_hash);

    if (!doesPasswordMatch) {
      throw new UnauthorizedException('Senha Incorreta');
    }

    const token = this.jwtService.sign({ sub: user.id });

    return { token };
  }
}
