import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

// src/calendar/dto/quick-add.dto.ts
export class QuickAddEventDto {
  @ApiProperty({
    example: 'Lunch with John tomorrow at 12pm',
    description: 'Natural language event description',
  })
  @IsString()
  @IsNotEmpty()
  text: string;
}
