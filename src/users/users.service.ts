import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) { };

    async find(userId: number) {
        const { password, ...userData } = await this.userRepository.findOne({ where: { id: userId } });
        // TODO: Вынести мутирование пароля в post-process operation
        return { ...userData, password: '****'};
    }
}
