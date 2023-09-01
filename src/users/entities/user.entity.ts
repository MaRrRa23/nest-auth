import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ default: new Date() })
    createdAt: Date;

    @Column()
    name: string;

    @Column()
    surname: string;

    @Column()
    patronymic: string;

    @Column({ default: false })
    is_deleted: boolean;
}
