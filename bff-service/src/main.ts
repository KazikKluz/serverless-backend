import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { BadRequestFilter } from './bad-request.filter';

const port = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalFilters(new BadRequestFilter());
  await app.listen(port);
}
bootstrap();
