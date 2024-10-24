import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDateString, IsNumber, IsOptional, IsString } from "class-validator";

// src/calendar/dto/list-events.dto.ts
export class ListEventsDto {
  @ApiPropertyOptional({ example: 10, description: 'Maximum number of events to return' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  maxResults?: number;

  @ApiPropertyOptional({ example: '2024-01-01T00:00:00Z', description: 'Start time range for events' })
  @IsOptional()
  @IsDateString()
  timeMin?: string;

  @ApiPropertyOptional({ example: '2024-12-31T23:59:59Z', description: 'End time range for events' })
  @IsOptional()
  @IsDateString()
  timeMax?: string;

  @ApiPropertyOptional({ example: 'meeting', description: 'Search term for filtering events' })
  @IsOptional()
  @IsString()
  q?: string;
}
