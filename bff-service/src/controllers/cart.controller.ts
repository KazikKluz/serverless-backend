import { Body, Controller, Get, Header, Put } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { Cart, CartItem } from 'src/interfaces/cart.interface';
import { CartService } from 'src/services/cart.service';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}
  @Get()
  @Header('Access-Controll-Allow-Origin', '*')
  findOne(): Observable<AxiosResponse<Cart>> {
    return this.cartService.findOne();
  }

  @Put()
  @Header('Access-Control-Allow-Origin', '*')
  put(@Body() cartItems: CartItem[]): Observable<AxiosResponse<Cart>> {
    return this.cartService.put(cartItems);
  }
}
