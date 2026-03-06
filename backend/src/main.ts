// SEE: https://github.com/prisma/prisma/issues/29199#issuecomment-3904940922
import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(helmet());
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
