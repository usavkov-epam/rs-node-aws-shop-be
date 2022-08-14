import {
  All,
  BadGatewayException,
  CacheInterceptor,
  Controller,
  Param,
  Query,
  Req,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { AppService } from './app.service';

const services = ['products', 'cart'];

@Controller()
@UseInterceptors(CacheInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @All('/:service')
  async toService(
    @Param('service') service: string,
    @Query() params,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    if (!services.includes(service))
      throw new BadGatewayException('Cannot process request');

    return this.appService.toService(
      {
        data: req.body,
        method: req.method,
        service,
        params,
        headers: {
          Authorization: req.get('authorization'),
        },
      },
      res,
    );
  }
}
