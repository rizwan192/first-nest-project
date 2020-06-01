import { BaseEntity, Column, Entity, ObjectIdColumn } from 'typeorm';
import { TaskStatus } from './task-status.enum';
@Entity()
export class Task extends BaseEntity {
  @ObjectIdColumn()
  _id: string;
//  @PrimaryColumn()
 // id: number;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column()   
  status: TaskStatus;
}
