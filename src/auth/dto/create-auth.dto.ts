import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class CreateAuthDto {
    @IsEmail()
    email: string;

    @IsStrongPassword({ minLength: 8, minSymbols: 4 })
    password: string;

    @IsString()
    name: string;

    @IsString()
    surname: string;

    @IsString()
    patronymic: string;
}
