import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { logger } from '../middlewares/logger.middleware';
import { ProductsModule } from './products.module';
import { ProductsController } from '../controllers/products.controller';
import { ConfigModule } from '@nestjs/config';
import { CartController } from 'src/controllers/cart.controller';
import { CartModule } from './cart.module';

@Module({
  imports: [ConfigModule.forRoot(), ProductsModule, CartModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(logger).forRoutes(ProductsController, CartController);
  }
}
