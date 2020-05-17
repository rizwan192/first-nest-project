import { Injectable, NotFoundException } from '@nestjs/common';
//import { CreateTaskDto } from './dto/create-task.dto';
//import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
//import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}
 async getTasks(filterDto: GetTaskFilterDto):Promise<Task[]>{
   return this.taskRepository.getTasks(filterDto);
  }


  async getTaskById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Task With ID "${id}" not found`);
    }
    return found;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }
  async deleteTaskById(id: number): Promise<void> {
    const found = await this.taskRepository.delete(id);
    if (!found.affected) {
      throw new NotFoundException(`Task With ID "${id}" not found`);
    }
  }
  async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    const found = await this.getTaskById(id);
    found.status = status;
    await found.save();
    return found;
  }

}
