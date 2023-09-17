import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
    name: "user",
    orderBy: {
        email: "ASC",
        id: "DESC",
    },
})
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;
}
