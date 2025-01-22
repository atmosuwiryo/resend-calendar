import { Module } from '@nestjs/common';

import { ServicesModule } from '#services/services.module';

import { V3Controller } from './v3.controller';
import { V3Service } from './v3.service';
@Module({
  imports: [ServicesModule],
  controllers: [V3Controller],
  providers: [V3Service],
})
export class V3Module {}
