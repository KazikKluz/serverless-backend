import { AxiosResponse } from 'axios';
import { Injectable, HttpException } from '@nestjs/common';
import { Product } from '../interfaces/product.interface';
import { HttpService } from '@nestjs/axios';
import { CreateProductDto } from 'src/dtos/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly httpService: HttpService) {}
  async findAll(): Promise<AxiosResponse<Product[]>> {
    try {
      const data = await this.httpService.axiosRef
        .get(`${process.env.PRODUCTS}`)
        .then((response) => response.data);
      return data;
    } catch (error) {
      throw new HttpException(error.response.data, error.response.status);
    }
  }

  async findOne(id: string): Promise<AxiosResponse<Product>> {
    try {
      const data = await this.httpService.axiosRef
        .get(`${process.env.PRODUCTS}/${id}`)
        .then((response) => response.data);
      return data;
    } catch (error) {
      throw new HttpException(error.response.data, error.response.status);
    }
  }

  async insertOne(product: CreateProductDto): Promise<AxiosResponse<[]>> {
    try {
      const data = await this.httpService.axiosRef
        .post(`${process.env.PRODUCTS}`, product)
        .then((response) => response.data);
      return data;
    } catch (error) {
      throw new HttpException(error.response.data, error.response.status);
    }
  }
}
