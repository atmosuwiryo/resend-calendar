// src/calendar/entities/calendar-event.entity.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CalendarEvent {
  @ApiProperty({ example: '123abc', description: 'Unique event identifier' })
  id?: string;

  @ApiProperty({ example: 'Team Meeting', description: 'Event title' })
  summary?: string;

  @ApiPropertyOptional({ example: 'Weekly team sync', description: 'Event description' })
  description?: string;

  @ApiPropertyOptional({ example: 'Conference Room A', description: 'Event location' })
  location?: string;

  @ApiPropertyOptional({
    example: { email: 'creator@example.com', displayName: 'Event Creator' },
    description: 'Event creator information'
  })
  creator?: {
    email?: string;
    displayName?: string;
  };

  @ApiPropertyOptional({
    example: { email: 'organizer@example.com', displayName: 'Event Organizer' },
    description: 'Event organizer information'
  })
  organizer?: {
    email?: string;
    displayName?: string;
  };

  @ApiProperty({
    example: { dateTime: '2024-10-24T10:00:00Z', timeZone: 'America/New_York' },
    description: 'Event start time'
  })
  start?: {
    dateTime?: string;
    timeZone?: string;
  };

  @ApiProperty({
    example: { dateTime: '2024-10-24T11:00:00Z', timeZone: 'America/New_York' },
    description: 'Event end time'
  })
  end?: {
    dateTime?: string;
    timeZone?: string;
  };

  @ApiPropertyOptional({
    type: 'array',
    items: {
      type: 'object',
      properties: {
        email: { type: 'string' },
        displayName: { type: 'string' },
        responseStatus: { type: 'string' },
        optional: { type: 'boolean' }
      }
    },
    description: 'Event attendees'
  })
  attendees?: {
    email?: string;
    displayName?: string;
    responseStatus?: string;
    optional?: boolean;
  }[];

  @ApiPropertyOptional({
    example: {
      useDefault: true,
      overrides: [{ method: 'email', minutes: 30 }]
    },
    description: 'Event reminders configuration'
  })
  reminders?: {
    useDefault?: boolean;
    overrides?: {
      method?: string;
      minutes?: number;
    }[];
  };

  @ApiPropertyOptional({ example: 'confirmed', description: 'Event status' })
  status?: string;

  @ApiPropertyOptional({ example: 'https://calendar.google.com/event?id=123abc', description: 'Event URL' })
  htmlLink?: string;

  @ApiPropertyOptional({ example: '1', description: 'Calendar color identifier' })
  colorId?: string;

  @ApiPropertyOptional({ example: 'opaque', description: 'Whether the event blocks time on the calendar' })
  transparency?: string;

  @ApiPropertyOptional({ example: '2024-10-24T10:00:00Z', description: 'Event creation timestamp' })
  created?: string;

  @ApiPropertyOptional({ example: '2024-10-24T10:00:00Z', description: 'Last update timestamp' })
  updated?: string;

}
