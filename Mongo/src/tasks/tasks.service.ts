import { Injectable } from '@nestjs/common';
//import { CreateTaskDto } from './dto/create-task.dto';
//import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
//import { getMongoRepository } from 'typeorm';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { getMongoRepository } from 'typeorm';
@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}
 async getTasks(filterDto: GetTaskFilterDto):Promise<Task[]>{
   return this.taskRepository.getTasks(filterDto);
  }
  async getTaskById(id: string): Promise<Task> {
    return this.taskRepository.getTaskById(id);
  }
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  } 
  async deleteTaskById(id: string){
  return this.taskRepository.deleteTask(id);
  }
  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const manager = getMongoRepository('task');
    const found = await this.getTaskById(id);
    found.status = status;
    await manager.save(found);
    return found;
  }

}
