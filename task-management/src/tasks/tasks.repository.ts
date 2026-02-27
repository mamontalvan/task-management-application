import { Injectable, NotFoundException, Logger, InternalServerErrorException } from '@nestjs/common';
import { DataSource, Repository, DeleteResult, In } from 'typeorm';
import { User } from './../auth/user.entity';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksRepository {
    private repository: Repository<Task>;
    private logger = new Logger('TasksRepository', { timestamp: true });
    constructor(private dataSource: DataSource) {
        this.repository = this.dataSource.getRepository(Task);
    }

    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        const { title, description } = createTaskDto;
        // Create a new task instance using the repository's create method
        const task = this.repository.create({
            title,
            description,
            status: TaskStatus.OPEN,
            user, // Asociamos el usuario al crear la tarea
        });
        try {
            this.logger.verbose(`Creating task for user "${user.username}" with data: ${JSON.stringify(task)}`);
            return await this.repository.save(task);
        } catch (error) {
            this.logger.error(`Error creating task for user "${user.username}": ${error.message}`);
            throw new InternalServerErrorException('Failed to create task');
        }
    }

    async findById(id: string, user: User): Promise<Task> {
        console.log('ID en repo:', id); // log opcional para debug
        const found = await this.repository.findOneBy({ id, user }); // findOneBy es más simple en TypeORM 0.3+

        if (!found) {
            throw new NotFoundException();
        }

        return found;
    }
    
    async delete(id: string, user: User): Promise<void> {
        const deleted = await this.repository.delete({ id, user });

        if (deleted.affected === 0) {
            throw new NotFoundException();
        }
    }

    async updateTaskStatus(id: string, status: TaskStatus, user: User): Promise<Task> {
        const task = await this.findById(id, user);
        task.status = status;
        try {
            this.logger.verbose(`Updating task status for task ID "${id}" to "${status}"`);
            return await this.repository.save(task);
        } catch (error) {
            this.logger.error(`Error updating task status for task ID "${id}": ${error.message}`);
            throw new InternalServerErrorException('Failed to update task status');
        }
    }

    async getTasks(filterDto: GetTaskFilterDto, user: User): Promise<Task[]> {
        const { status, search } = filterDto;
        let query = this.repository.createQueryBuilder('task');
        query.where('task.userId = :userId', { userId: user.id });

        if (status) {
            query = query.andWhere('task.status = :status', { status });
        }

        if (search) {
            query = query.andWhere(
                '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
                { search: `%${search.toLowerCase()}%` }
            );
        }

        try {
            this.logger.verbose(`Retrieving tasks for user "${user.username}" with filters: ${JSON.stringify(filterDto)}`);
            return await query.getMany();
        } catch (error) {
            this.logger.error(`Error retrieving tasks for user "${user.username}": ${error.message}`);
            throw new InternalServerErrorException('Failed to retrieve tasks');
        }
    }
}