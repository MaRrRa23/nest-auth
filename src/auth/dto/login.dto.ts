import { IsEmail, IsStrongPassword } from 'class-validator';

export class LoginDto {
    @IsEmail()
    email: string;

    @IsStrongPassword({ minLength: 8, minSymbols: 4 })
    password: string;
}
