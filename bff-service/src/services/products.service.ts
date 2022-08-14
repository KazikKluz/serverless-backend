import { AxiosResponse } from 'axios';
import { Injectable } from '@nestjs/common';
import { Product } from '../interfaces/product.interface';
import { CreateProductDto } from '../dtos/create-product.dto';
import { HttpService } from '@nestjs/axios';
import { Observable, map } from 'rxjs';

@Injectable()
export class ProductsService {
  constructor(private readonly httpService: HttpService) {}
  findAll(): Observable<AxiosResponse<Product[]>> {
    return this.httpService
      .get(`${process.env.PRODUCTS}`)
      .pipe(map((response) => response.data));
  }

  findOne(id: string): Observable<AxiosResponse<Product>> {
    return this.httpService
      .get(`${process.env.PRODUCTS}/${id}`)
      .pipe(map((response) => response.data));
  }

  insertOne(product: CreateProductDto): Observable<AxiosResponse<[]>> {
    return this.httpService
      .post(`${process.env.PRODUCTS}`, product)
      .pipe(map((response) => response.data));
  }
}
