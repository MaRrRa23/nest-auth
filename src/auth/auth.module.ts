import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocalStrategy } from './strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module
    ({
        imports: [
            TypeOrmModule.forFeature([User]),
            PassportModule,
            JwtModule.registerAsync({
                imports: [ConfigModule],
                useFactory: (configService: ConfigService) => ({
                    global: true,
                    secret: configService.get('JWT_SECRET'),
                    signOptions: { expiresIn: '120s' }
                }),
                inject: [ConfigService]
            })
        ],
        controllers: [AuthController],
        providers: [AuthService, LocalStrategy, JwtStrategy],
    })
export class AuthModule { }
