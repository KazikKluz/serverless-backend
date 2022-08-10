import {
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
  Catch,
} from '@nestjs/common';

import { Response, Request } from 'express';

@Catch(HttpException)
export class BadRequestFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.json({
      statusCode: 502,
      message: 'Cannot process request',
    });
  }
}
