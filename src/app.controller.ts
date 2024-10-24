import { Body, Controller, Delete, HttpCode, Post } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import {
  CreateCalendarDto,
  DeleteCalendarDto,
  RescheduleCalendarDto,
  UpdateCalendarDto,
} from './app.dto';
import { ResponseEntity } from './app.entity';
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
    summary: 'Update Calendar',
    description: 'Update Calendar',
  })
  @ApiOkResponse({ type: ResponseEntity })
  @Post('v2/update')
  async updateCalendarV2(
    @Body() updateCalendarDto: UpdateCalendarDto,
  ) {
    return this.appService.updateCalendarV2(updateCalendarDto);
  }

  @ApiOperation({
    summary: 'Reschedule Calendar',
    description: 'Reschedule Calendar',
  })
  @ApiOkResponse({ type: ResponseEntity })
  @Post('v2/reschedule')
  async rescheduleCalendarV2(
    @Body() rescheduleCalendar: RescheduleCalendarDto,
  ) {
    return this.appService.rescheduleCalendarV2(rescheduleCalendar);
  }

  @ApiOperation({
    summary: 'Create Calendar',
    description: 'Create Calendar',
  })
  @ApiCreatedResponse({ type: ResponseEntity })
  @Post('v2')
  async createCalendarV2(@Body() createCalendarDto: CreateCalendarDto) {
    return this.appService.createCalendarV2(createCalendarDto);
  }

  @ApiOperation({
    summary: 'Delete Calendar',
    description: 'Delete Calendar',
  })
  @ApiOkResponse({ type: ResponseEntity })
  @Delete('v2')
  async deleteCalendarV2(@Body() deleteCalendarDto: DeleteCalendarDto) {
    return this.appService.deleteCalendarV2(deleteCalendarDto);
  }
}
