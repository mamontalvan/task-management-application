import { User } from './../auth/user.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { TasksRepository } from './tasks.repository';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {

    constructor(
        private tasksRepository: TasksRepository,
    ) {}

    createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        return this.tasksRepository.createTask(createTaskDto, user);
    
    }

    getTaskById(id: string, user: User): Promise<Task> {
        return this.tasksRepository.findById(id, user);
    }

    deleteTask(id: string, user: User): Promise<void> {
        return this.tasksRepository.delete(id, user);
    }

    updateTaskStatus(id: string, status: TaskStatus, user: User): Promise<Task> {
        return this.tasksRepository.updateTaskStatus(id, status, user);
    }
     
    getTasks(filterDto: GetTaskFilterDto, user: User): Promise<Task[]> {
        return this.tasksRepository.getTasks(filterDto, user);
    }
/*    


    getAllTasks(): Task[] {
        return this.tasks;
    }
*/    
/*    
    getTasksWithFilters(filterDto: GetTaskFilterDto): Task[] {
        const { status, search } = filterDto;
        let tasks = this.getAllTasks();

        if (status) {
            tasks = tasks.filter(task => task.status === status);
        }

        if (search) {
            tasks = tasks.filter(task => 
                task.title.includes(search) || 
                task.description.includes(search)
            );
        }

        return tasks;
    } */
}
