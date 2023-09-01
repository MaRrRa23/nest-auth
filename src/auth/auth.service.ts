import {
    BadRequestException,
    Inject,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private configService: ConfigService,
        private jwtService: JwtService
    ) { }

    async login(userId: number) {
        const { id, name, surname } = await this.userRepository.findOne({ where: { id: userId } });
        return {
            access_token:
                await this.jwtService.signAsync(
                    { id, name, surname },
                    {
                        secret: this.configService.get<'string'>('JWT_SECRET')
                    }
                ),
            expires_in: 60
        }
    }

    async validateCredentials({ email, password }: LoginDto) {
        const user = await this.userRepository.findOne({
            where: { email: email },
        });

        if (!(await bcrypt.compare(password, user.password)))
            throw new UnauthorizedException('Wrong password');

        return user;
    }

    async signup(createAuthDto: CreateAuthDto) {
        const doesUserExist = await this.userRepository.findOne({
            where: { email: createAuthDto.email },
        });

        if (doesUserExist)
            throw new BadRequestException(
                'User with such email already exists',
            );

        const hashRounds = parseInt(
            this.configService.get<'string'>('HASH_ROUNDS'),
        );

        const user = await this.userRepository.save({
            email: createAuthDto.email,
            password: await bcrypt.hash(createAuthDto.password, hashRounds),
            name: createAuthDto.name,
            surname: createAuthDto.surname,
            patronymic: createAuthDto.patronymic,
        });

        return user;
    }
}
