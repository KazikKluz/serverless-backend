import {
  Body,
  CacheInterceptor,
  Controller,
  Get,
  Header,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { Product } from '../interfaces/product.interface';
import { ProductsService } from '../services/products.service';
import { CreateProductDto } from '../dtos/create-product.dto';
import { AxiosResponse } from 'axios';

@Controller('products')
@UseInterceptors(CacheInterceptor)
export class ProductsController {
  constructor(private productsService: ProductsService) {}
  @Get()
  @Header('Access-Control-Allow-Origin', '*')
  find(@Query() query): Promise<AxiosResponse<Product[] | Product>> {
    if (query.productId) {
      return this.productsService.findOne(query.productId);
    } else {
      return this.productsService.findAll();
    }
  }

  @Post()
  @Header('Access-Control-Allow-Origin', '*')
  create(@Body() product: CreateProductDto): Promise<AxiosResponse<[]>> {
    return this.productsService.insertOne(product);
  }
}
