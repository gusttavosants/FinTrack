import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcryptjs';
import { User } from '../database/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { name, email, password } = registerDto;
    const normalizedEmail = email.toLowerCase().trim();

    const userAlreadyExists = await this.usersRepository.findOne({
      where: { email: normalizedEmail },
    });

    if (userAlreadyExists) {
      throw new BadRequestException('Email ja cadastrado');
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = this.usersRepository.create({
      name,
      email: normalizedEmail,
      passwordHash,
    });

    await this.usersRepository.save(user);

    return { message: 'Usuário criado com sucesso' };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const normalizedEmail = email.toLowerCase().trim();

    const user = await this.usersRepository.findOne({
      where: { email: normalizedEmail },
      select: {
        id: true,
        passwordHash: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Credenciais incorretas');
    }

    const doesPasswordMatch = await bcrypt.compare(password, user.passwordHash);

    if (!doesPasswordMatch) {
      throw new UnauthorizedException('Senha Incorreta');
    }

    const token = this.jwtService.sign({ sub: user.id });

    return { token };
  }
}
