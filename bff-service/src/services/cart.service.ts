import { AxiosResponse } from 'axios';
import { Injectable, HttpException } from '@nestjs/common';
import { Cart, CartItem } from 'src/interfaces/cart.interface';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class CartService {
  constructor(private readonly httpService: HttpService) {}
  async findOne(): Promise<AxiosResponse<Cart>> {
    try {
      const data = await this.httpService.axiosRef
        .get(`${process.env.CART}`)
        .then((response) => response.data);
      return data;
    } catch (error) {
      throw new HttpException(error.response.data, error.response.status);
    }
  }

  put(cartItems: CartItem[]): Promise<AxiosResponse<Cart>> {
    try {
      const data = this.httpService.axiosRef
        .put(`${process.env.CART}`, cartItems)
        .then((response) => response.data);
      return data;
    } catch (error) {
      throw new HttpException(error.response.data, error.response.status);
    }
  }
}
