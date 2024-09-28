import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsString } from 'class-validator';

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
    example: ['widyoatmoko@yahoo.com', 'atmo@waiki.dev'],
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
