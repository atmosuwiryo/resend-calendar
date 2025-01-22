// src/calendar/dto/create-event.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEmail,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class TimeDto {
  @ApiProperty({
    example: '2024-10-24T10:00:00Z',
    description: 'Event date and time in ISO format',
  })
  @IsDateString()
  dateTime: string;

  @ApiPropertyOptional({
    example: 'America/New_York',
    description: 'Time zone name',
  })
  @IsString()
  @IsOptional()
  timeZone?: string;
}

class ReminderOverrideDto {
  @ApiProperty({
    example: 'email',
    description: 'Reminder method (email, popup)',
  })
  @IsString()
  method: string;

  @ApiProperty({
    example: 30,
    description: 'Minutes before event to send reminder',
  })
  @IsNumber()
  minutes: number;
}

class RemindersDto {
  @ApiPropertyOptional({
    example: true,
    description: 'Whether to use default reminders',
  })
  @IsOptional()
  @IsBoolean()
  useDefault?: boolean;

  @ApiPropertyOptional({
    type: [ReminderOverrideDto],
    description: 'Custom reminder settings',
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ReminderOverrideDto)
  overrides?: ReminderOverrideDto[];
}

class AttendeeDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Attendee email address',
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiPropertyOptional({
    example: 'John Doe',
    description: 'Attendee display name',
  })
  @IsString()
  @IsOptional()
  displayName?: string;

  @ApiPropertyOptional({
    example: false,
    description: 'Whether attendance is optional',
  })
  @IsBoolean()
  @IsOptional()
  optional?: boolean;
}

export class CreateEventDto {
  @ApiProperty({ example: 'Team Meeting', description: 'Event title' })
  @IsString()
  summary: string;

  @ApiPropertyOptional({
    example: 'Weekly team sync',
    description: 'Event description',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    example: 'Conference Room A',
    description: 'Event location',
  })
  @IsString()
  @IsOptional()
  location?: string;

  @ApiProperty({ type: TimeDto, description: 'Event start time' })
  @IsObject()
  @ValidateNested()
  @Type(() => TimeDto)
  start: TimeDto;

  @ApiProperty({ type: TimeDto, description: 'Event end time' })
  @IsObject()
  @ValidateNested()
  @Type(() => TimeDto)
  end: TimeDto;

  @ApiPropertyOptional({ type: [AttendeeDto], description: 'Event attendees' })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AttendeeDto)
  attendees?: AttendeeDto[];

  @ApiPropertyOptional({
    type: RemindersDto,
    description: 'Event reminders configuration',
  })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => RemindersDto)
  reminders?: RemindersDto;

  @ApiPropertyOptional({
    example: '1',
    description: 'Calendar color identifier',
  })
  @IsString()
  @IsOptional()
  colorId?: string;

  @ApiPropertyOptional({
    example: false,
    description:
      'Whether user shows as available (false) or out of office (true)',
  })
  @IsBoolean()
  @IsOptional()
  transparency?: boolean;
}
