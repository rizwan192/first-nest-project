import { Task } from './task.entity';
import { Repository, EntityRepository, getMongoRepository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { NotFoundException } from '@nestjs/common';
@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    await this.save(task);
    return task;
  }
  async getTasks(filterDto: GetTaskFilterDto): Promise<Task[]> {
    const { status, search } = filterDto; 
    const manager = getMongoRepository('task');
    let task;
    if(status){
    task = await manager.find({status});
     //return task;
    }
    if (search){
     task = await manager.find( {
       where: {
       $or: [
       {
          title: { $regex: `${search}` } 
        } , 
       {
         description: { $regex: `${search}` },
       },
      ]
      },
    });
  }
  if(search&&status){
     task = await manager.find({
       where: {
         $and: [
           {
             $or: [
               {
                 title: { $regex: `${search}` },
               },
               {
                 description: { $regex: `${search}` },
               },
             ],
            },{
             $or:[
               {status}
             ],
           },
         ],
       },
     });
  }
  if(!status&&!search){
   task = manager.find({});
  }
  //console.log(task);
  return task;
}

 async getTaskById(id: string): Promise<Task> {
    const manager = getMongoRepository('task');
    let found;
    try {
      found = await manager.findOne(id);
    } catch (error) {
      throw new NotFoundException('Could not find task.');
    }
    if (!found) {
      throw new NotFoundException(`Task With ID "${id}" not found`);
    }
    return found;
}
async deleteTask(id: string){
     const manager = getMongoRepository('task');
     const found = await manager.findOne(id);
     if (!found) {
       throw new NotFoundException(`Task With ID "${id}" not found`);
     }else{
       await manager.remove(found)
     }
}
}
