import { HttpModule } from '@nestjs/axios';
import { CacheModule, Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [CacheModule.register({ ttl: 2 * 60 }), HttpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
