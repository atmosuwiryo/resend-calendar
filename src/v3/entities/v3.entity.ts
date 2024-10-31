import { ApiProperty } from '@nestjs/swagger';

export class Guest {
  @ApiProperty({
    description: 'User Email',
    example: 'suwiryo.atmo@gmail.com',
  })
  email: string;

  @ApiProperty({
    description: 'User Status',
    example: 'INVITED',
  })
  status: string;
}

export class EventDetail {
  @ApiProperty({
    description: 'Event ID',
    example: '7o4pufklfhq2pegv5ph1qh70og@google.com',
  })
  id: string;

  @ApiProperty({
    description: 'Event Title',
    example: 'Dentist Appointment',
  })
  title: string;

  @ApiProperty({
    description: 'Event Description',
    example: 'Appointment with Dr. Smith',
  })
  description: string;

  @ApiProperty({
    description: 'Event Start Date Time',
    example: '2024-11-01T09:00:00.000Z',
  })
  startTime: string;

  @ApiProperty({
    description: 'Event End Date Time',
    example: '2024-11-01T09:30:00.000Z',
  })
  endTime: string;

  @ApiProperty({
    description: 'Event Location',
    example: '',
  })
  location: string;

  @ApiProperty({
    description: 'Event Creators',
    example: ['allset.invitation@gmail.com'],
  })
  creators: string[];

  @ApiProperty({
    description: 'Event Guests',
    example: [
      {
        email: 'suwiryo.atmo@gmail.com',
        status: 'INVITED',
      },
    ],
    type: [Guest],
  })
  guestList: Guest[];
}

export class ResponseEntityV3 {
  @ApiProperty({
    description: 'Check if the request was successful',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: 'Message of the response',
    example: 'Event successfully created/retrieved/updated/deleted',
  })
  message: string;

  @ApiProperty({
    description: 'Event Details',
    type: EventDetail,
  })
  eventDetail: EventDetail;
}
