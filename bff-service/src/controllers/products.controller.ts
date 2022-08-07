import {
  Body,
  CacheInterceptor,
  Controller,
  Get,
  Header,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { Product } from '../interfaces/product.interface';
import { ProductsService } from '../services/products.service';
import { CreateProductDto } from '../dtos/create-product.dto';

@Controller('products')
@UseInterceptors(CacheInterceptor)
export class ProductsController {
  constructor(private productsService: ProductsService) {}
  @Get()
  @Header('Access-Control-Allow-Origin', '*')
  async findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  @Header('Access-Control-Allow-Origin', '*')
  async findOne(@Param('id') id: string): Promise<Product> {
    return this.productsService.findOne(id);
  }

  @Post()
  @Header('Access-Control-Allow-Origin', '*')
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.insertOne(createProductDto);
  }
}
