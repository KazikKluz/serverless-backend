import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { Product } from '../interfaces/product.interface';
import { CreateProductDto } from '../dtos/create-product.dto';

@Injectable()
export class ProductsService {
  async findAll(): Promise<Product[]> {
    const result = await axios
      .get(`${process.env.PRODUCTS}`)
      .then((res) => res.data);

    return result;
  }

  async findOne(id: string): Promise<Product> {
    const result = await axios
      .get(`${process.env.PRODUCTS}/${id}`)
      .then((res) => res.data);
    return result;
  }

  async insertOne(product: CreateProductDto): Promise<[]> {
    const result = await axios
      .post(`${process.env.PRODUCTS}`, product)
      .then((res) => res.data);
    return result;
  }
}
