import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { GoogleCalendarService } from '#services/google-calendar.service';

import { CreateEventDto } from './dto/create-event.dto';
import { ListEventsDto } from './dto/list-events.dto';
import { QuickAddEventDto } from './dto/quick-add.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { CalendarEvent } from './entities/calendar-event.entity';

@ApiTags('v4')
@Controller('v4')
@UsePipes(new ValidationPipe({ transform: true }))
export class V4Controller {
  constructor(private readonly calendarService: GoogleCalendarService) {}

  @Get()
  @ApiOperation({ summary: 'List calendar events' })
  @ApiResponse({
    status: 200,
    description: 'Returns list of calendar events',
    type: CalendarEvent,
    isArray: true,
  })
  async listEvents(
    @Query() queryParams: ListEventsDto,
  ): Promise<CalendarEvent[]> {
    return this.calendarService.listEvents(queryParams);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific calendar event' })
  @ApiResponse({
    status: 200,
    description: 'Returns a calendar event',
    type: CalendarEvent,
  })
  async getEvent(@Param('id') id: string): Promise<CalendarEvent> {
    return this.calendarService.getEvent(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new calendar event' })
  @ApiResponse({
    status: 201,
    description: 'The calendar event has been created',
    type: CalendarEvent,
  })
  @HttpCode(HttpStatus.CREATED)
  async createEvent(
    @Body() createEventDto: CreateEventDto,
  ): Promise<CalendarEvent> {
    return this.calendarService.createEvent(createEventDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a calendar event' })
  @ApiResponse({
    status: 200,
    description: 'The calendar event has been updated',
    type: CalendarEvent,
  })
  async updateEvent(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
  ): Promise<CalendarEvent> {
    return this.calendarService.updateEvent(id, updateEventDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a calendar event' })
  @ApiResponse({
    status: 204,
    description: 'The calendar event has been deleted',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteEvent(@Param('id') id: string): Promise<void> {
    return this.calendarService.deleteEvent(id);
  }

  @Post('quick')
  @ApiOperation({ summary: 'Quickly add an event using natural language' })
  @ApiResponse({
    status: 201,
    description: 'The calendar event has been created',
    type: CalendarEvent,
  })
  @HttpCode(HttpStatus.CREATED)
  async quickAdd(
    @Body() quickAddDto: QuickAddEventDto,
  ): Promise<CalendarEvent> {
    return this.calendarService.quickAdd(quickAddDto.text);
  }
}
