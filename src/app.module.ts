import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GoogleScriptService } from './google-script.service';
import { V4Module } from './v4/v4.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    HttpModule.register({
      timeout: 10000,
      maxRedirects: 5,
    }),
    V4Module,
  ],
  controllers: [AppController],
  providers: [AppService, GoogleScriptService],
})
export class AppModule {}
