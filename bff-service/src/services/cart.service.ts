import { AxiosResponse } from 'axios';
import { Injectable } from '@nestjs/common';
import { Cart, CartItem } from 'src/interfaces/cart.interface';
import { HttpService } from '@nestjs/axios';
import { Observable, map } from 'rxjs';

@Injectable()
export class CartService {
  constructor(private readonly httpService: HttpService) {}
  findOne(): Observable<AxiosResponse<Cart>> {
    return this.httpService
      .get(`${process.env.CART}`)
      .pipe(map((response) => response.data));
  }

  put(cartItems: CartItem[]): Observable<AxiosResponse<Cart>> {
    return this.httpService
      .put(`${process.env.CART}`, cartItems)
      .pipe(map((response) => response.data));
  }
}
