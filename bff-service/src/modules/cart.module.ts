import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CartController } from 'src/controllers/cart.controller';
import { CartService } from 'src/services/cart.service';

@Module({
  imports: [HttpModule],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
