import {
    Controller,
    Post,
    Body,
    UsePipes,
    ValidationPipe,
    UseGuards,
    Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @UsePipes(new ValidationPipe())
    @UseGuards(LocalAuthGuard)
    login(@Request() req) {
        return this.authService.login(req.userId);
    }

    @Post('signup')
    @UsePipes(new ValidationPipe())
    signup(@Body() createAuthDto: CreateAuthDto) {
        return this.authService.signup(createAuthDto);
    }
}
