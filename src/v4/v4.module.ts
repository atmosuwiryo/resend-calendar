import { Module } from '@nestjs/common';
import { V4Controller } from './v4.controller';
import { GoogleCalendarService } from '#services/google-calendar.service';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [V4Controller],
  providers: [ConfigService, GoogleCalendarService],
})
export class V4Module {}
