import {
  Body,
  CacheInterceptor,
  Controller,
  Get,
  Header,
  Param,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { Product } from '../interfaces/product.interface';
import { ProductsService } from '../services/products.service';
import { CreateProductDto } from '../dtos/create-product.dto';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

@Controller('products')
@UseInterceptors(CacheInterceptor)
export class ProductsController {
  constructor(private productsService: ProductsService) {}
  @Get()
  @Header('Access-Control-Allow-Origin', '*')
  find(@Query() query): Observable<AxiosResponse<Product[] | Product>> {
    console.log('inside products controller before calling service');
    if (query.productId) {
      return this.productsService.findOne(query.productId);
    } else {
      return this.productsService.findAll();
    }
  }

  @Get(':id')
  @Header('Access-Control-Allow-Origin', '*')
  findOne(@Param('id') id: string): Observable<AxiosResponse<Product>> {
    return this.productsService.findOne(id);
  }

  @Post()
  @Header('Access-Control-Allow-Origin', '*')
  create(
    @Body() createProductDto: CreateProductDto,
  ): Observable<AxiosResponse<[]>> {
    return this.productsService.insertOne(createProductDto);
  }
}
