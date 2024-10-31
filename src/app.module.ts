import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { V3Module } from './v3/v3.module';
import { V4Module } from './v4/v4.module';
import { ServicesModule } from '#services/services.module';

@Module({
  imports: [
    ServicesModule,
    V3Module,
    V4Module,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
