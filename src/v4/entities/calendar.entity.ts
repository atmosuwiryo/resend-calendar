import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

// src/calendar/entities/calendar.entity.ts
export class Calendar {
  @ApiProperty({ example: 'primary', description: 'Calendar identifier' })
  id: string;

  @ApiProperty({ example: 'Work Calendar', description: 'Calendar name' })
  summary: string;

  @ApiPropertyOptional({ example: 'My work schedule', description: 'Calendar description' })
  description?: string;

  @ApiPropertyOptional({ example: 'Mountain View, CA', description: 'Calendar location' })
  location?: string;

  @ApiPropertyOptional({ example: 'America/Los_Angeles', description: 'Calendar time zone' })
  timeZone?: string;

  @ApiPropertyOptional({ example: '1', description: 'Calendar color identifier' })
  colorId?: string;

  @ApiPropertyOptional({ example: '#ff0000', description: 'Calendar background color' })
  backgroundColor?: string;

  @ApiPropertyOptional({ example: '#ffffff', description: 'Calendar foreground color' })
  foregroundColor?: string;

  @ApiPropertyOptional({ example: true, description: 'Whether the calendar is selected in the UI' })
  selected?: boolean;

  @ApiPropertyOptional({ example: 'owner', description: 'User\'s access role for the calendar' })
  accessRole?: string;

  @ApiPropertyOptional({ example: true, description: 'Whether this is the primary calendar' })
  primary?: boolean;
}
