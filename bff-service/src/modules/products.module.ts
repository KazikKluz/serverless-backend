import { HttpModule } from '@nestjs/axios';
import { Module, CacheModule } from '@nestjs/common';
import { ProductsController } from '../controllers/products.controller';
import { ProductsService } from '../services/products.service';

@Module({
  imports: [
    CacheModule.register({
      ttl: 120,
    }),
    HttpModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
