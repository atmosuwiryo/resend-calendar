import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ServicesModule } from '#services/services.module';

import { V4Controller } from './v4.controller';

@Module({
  imports: [ServicesModule],
  controllers: [V4Controller],
  providers: [ConfigService],
})
export class V4Module {}
