import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import {
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { CreateCalendarDto } from './app.dto';
import { AppService } from './app.service';

@ApiTags('Calendar')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({
    summary: 'Create Calendar',
    description: 'Create Calendar',
  })
  @ApiNoContentResponse()
  @HttpCode(204)
  @Post()
  async createCalendar(@Body() createCalendarDto: CreateCalendarDto) {
    return this.appService.createCalendar(createCalendarDto);
  }

  @ApiOperation({
    summary: 'Create Calendar',
    description: 'Create Calendar',
  })
  @ApiOkResponse({ type: String })
  @HttpCode(200)
  @Post('v2')
  async createCalendarV2(@Body() createCalendarDto: CreateCalendarDto) {
    return this.appService.createCalendarV2(createCalendarDto);
  }
}
