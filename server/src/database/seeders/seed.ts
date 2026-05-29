import { NestFactory } from '@nestjs/core';

import { DatabaseSeeder } from './database.seeder';
import { SeederModule } from './seeders.module';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(SeederModule);
  const seeders = app.get(DatabaseSeeder);
  const action = process.argv[2];
  const actionList = ['create', 'reset'];
  switch (action) {
    case 'create':
      await seeders.create();
      break;
    case 'reset':
      await seeders.reset();
      break;
    default:
      if (!actionList.includes(action)) {
        console.log(
          `unknow ${action} please check correct seed action! ${action} not found!`,
        );
        break;
      }
      console.log('please write action affer npm run seed --action?');
      break;
  }

  await app.close();
}

bootstrap()
  .then(() => console.log('Running process finished!'))
  .catch((error) => console.log('Process runtime error: ', error));
