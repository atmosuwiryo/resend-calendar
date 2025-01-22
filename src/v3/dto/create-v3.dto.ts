import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsString } from 'class-validator';

export class CreateV3Dto {
  @ApiProperty({
    description: 'Calendar Title',
    example: 'Dentist Appointment',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Calendar Description',
    example: 'Appointment with Dr. Smith',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Calendar Guests',
    example: ['suwiryo.atmo@gmail.com'],
  })
  @IsEmail({}, { each: true })
  guests: string[];

  @ApiProperty({
    description: 'String of Calendar Start Date Time',
    example: '2024-11-01T09:00:00.000Z',
  })
  @IsDateString()
  startTime: string;

  @ApiProperty({
    description: 'String of Calendar End Date Time',
    example: '2024-11-01T09:30:00.000Z',
  })
  @IsDateString()
  endTime: string;
}
