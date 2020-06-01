import { TypeOrmModuleOptions } from '@nestjs/typeOrm';
//import { Task } from 'src/tasks/task.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mongodb',
  url :'mongodb://localhost:27017/test',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize:true,
  useUnifiedTopology:true,
};
