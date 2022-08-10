import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { BadRequestFilter } from './bad-request.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalFilters(new BadRequestFilter());
  await app.listen(3000);
}
bootstrap();
