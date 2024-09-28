/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';

import { CreateCalendarDto } from './app.dto';

@Injectable()
export class AppService {
  resend = new Resend(this.configService.get('RESEND_API_KEY'));
  constructor(private readonly configService: ConfigService) {}
  async createCalendar(createCalendarDto: CreateCalendarDto) {
    const guests = `cc: ${createCalendarDto.calendarGuests.join(', ')}`;
    const text = `${guests}
${createCalendarDto.calendarDescription}
`;

    try {
      const data = await this.resend.emails.send({
        from: 'Breezbook <no-reply@waiki.dev>',
        to: [this.configService.get('GMAIL_ACCOUNT')],
        subject: `${createCalendarDto.calendarTitle}, ${createCalendarDto.calendarStartDateTimeString}, ${createCalendarDto.calendarEndDateTimeString}`,
        text: text,
      });

      console.log(data);
      return;
    } catch (error) {
      console.error(error);
      throw new ServiceUnavailableException();
    }
  }
}
