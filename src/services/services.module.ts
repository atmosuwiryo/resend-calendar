import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { GoogleCalendarService } from './google-calendar.service';
import { GoogleScriptService } from './google-script.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    HttpModule.register({
      timeout: 10000,
      maxRedirects: 5,
    }),
  ],
  providers: [GoogleScriptService, GoogleCalendarService],
  exports: [GoogleScriptService, GoogleCalendarService],
})
export class ServicesModule {}
