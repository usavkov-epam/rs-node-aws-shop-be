import 'dotenv/config';

import { HttpService } from '@nestjs/axios';
import { BadGatewayException, Injectable } from '@nestjs/common';
import { Response } from 'express';

interface Params {
  [param: string]: string;
}

interface HandlerParams {
  method: string;
  params: Params;
  service: string;
  data?: any;
  headers: Params;
}

const SERVICE_MAP = {
  cart: 'CART_SERVICE',
  products: 'PRODUCTS_SERVICE',
};

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  async toService(
    { method = 'GET', service, params, data }: HandlerParams,
    res: Response,
  ) {
    const baseUrl = process.env[SERVICE_MAP[service]];

    if (!baseUrl) throw new BadGatewayException();

    const url = params.id ? `${baseUrl}/${params.id}` : baseUrl;

    const response = await this.httpService.axiosRef({
      data,
      params,
      method,
      url,
    });

    return res.status(response.status).json(response.data);
  }
}
