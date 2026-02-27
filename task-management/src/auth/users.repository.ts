import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { Repository, DataSource } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersRepository {
    private repository​​: Repository<User>;

    constructor(private dataSource: DataSource) {
        this.repository​​ = this.dataSource.getRepository(User);
    }

    async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password } = authCredentialsDto;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        console.log('Salt:', salt);
        console.log('Hashed Password:', hashedPassword);

        const user = this.repository.create({username, password: hashedPassword});

        try {
            await this.repository.save(user);
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('Username already exists');
            } else {
                throw new InternalServerErrorException('Error saving user to the database');
            }
        }
    }

    async findByUsername(username: string): Promise<User> {
        return await this.repository.findOne({ where: { username } });
    }
}