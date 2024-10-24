import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateCalendarDto {
  @ApiProperty({
    description: 'Calendar Title',
    example: 'Dentist Appointment',
  })
  @IsString()
  calendarTitle: string;

  @ApiProperty({
    description: 'Calendar Description',
    example: 'Appointment with Dr. Smith',
  })
  @IsString()
  calendarDescription: string;

  @ApiProperty({
    description: 'Calendar Guests',
    example: ['suwiryo.atmo@gmail.com'],
  })
  @IsEmail({}, { each: true })
  calendarGuests: string[];

  @ApiProperty({
    description: 'String of Calendar Start Date Time',
    example: '2024-11-01T09:00:00.000Z',
  })
  @IsDateString()
  calendarStartDateTimeString: string;

  @ApiProperty({
    description: 'String of Calendar End Date Time',
    example: '2024-11-01T09:30:00.000Z',
  })
  @IsDateString()
  calendarEndDateTimeString: string;
}

export class DeleteCalendarDto {
  @ApiProperty({
    description: 'String of Calendar Start Date Time',
    example: '2024-11-01T09:00:00.000Z',
  })
  @IsDateString()
  calendarStartDateTimeString: string;

  @ApiProperty({
    description: 'String of Calendar End Date Time',
    example: '2024-11-01T09:30:00.000Z',
  })
  @IsDateString()
  calendarEndDateTimeString: string;

  @ApiProperty({
    description: 'Calendar Guests',
    example: 'suwiryo.atmo@gmail.com',
  })
  @IsEmail()
  userEmail: string;
}

export class RescheduleCalendarDto extends DeleteCalendarDto {
  @ApiProperty({
    description: 'String of Calendar New Start Date Time',
    example: '2024-11-01T09:00:00.000Z',
  })
  @IsDateString()
  calendarNewStartDateTimeString: string;

  @ApiProperty({
    description: 'String of Calendar New End Date Time',
    example: '2024-11-01T09:30:00.000Z',
  })
  @IsDateString()
  calendarNewEndDateTimeString: string;
}

export class UpdateCalendarDto extends DeleteCalendarDto {

  @ApiPropertyOptional({
    description: 'String of Calendar New Start Date Time',
    example: '2024-11-01T09:00:00.000Z',
  })
  @IsDateString()
  @IsOptional()
  calendarNewStartDateTimeString: string;

  @ApiPropertyOptional({
    description: 'String of Calendar New End Date Time',
    example: '2024-11-01T09:30:00.000Z',
  })
  @IsDateString()
  @IsOptional()
  calendarNewEndDateTimeString: string;

  @ApiPropertyOptional({
    description: 'Calendar New Title',
    example: 'New Dentist Appointment',
  })
  @IsString()
  @IsOptional()
  calendarNewTitle: string;

  @ApiPropertyOptional({
    description: 'Calendar New Description',
    example: 'New Appointment with Dr. Smith',
  })
  @IsString()
  @IsOptional()
  calendarNewDescription: string;

  @ApiPropertyOptional({
    description: 'Calendar Add Guests',
    example: ['suwiryo.atmo@gmail.com', 'johndoe.atmo@gmail.com'],
  })
  @IsEmail({}, { each: true })
  @IsOptional()
  calendarAddGuests: string[];

  @ApiPropertyOptional({
    description: 'Calendar Remove Guests',
    example: ['suwiryo.atmo@gmail.com', 'johndoe.atmo@gmail.com'],
  })
  @IsEmail({}, { each: true })
  @IsOptional()
  calendarRemoveGuests: string[];
}
