/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpService } from '@nestjs/axios';
import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { Resend } from 'resend';
import { catchError, lastValueFrom } from 'rxjs';

import { CreateCalendarDto } from './app.dto';

@Injectable()
export class AppService {
  resend = new Resend(this.configService.get('RESEND_API_KEY'));

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

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

  async createCalendarV2(createCalendarDto: CreateCalendarDto) {
    const googleScriptUrl = this.configService.get('GOOGLE_SCRIPT_URL');

    const result = await lastValueFrom(
      this.httpService
        .post(
          googleScriptUrl,
          {
            title: createCalendarDto.calendarTitle,
            description: createCalendarDto.calendarDescription,
            guests: createCalendarDto.calendarGuests,
            startTime: createCalendarDto.calendarStartDateTimeString,
            endTime: createCalendarDto.calendarEndDateTimeString,
          },
          { headers: { 'Content-Type': 'application/json' } },
        )
        .pipe(
          catchError((error: AxiosError) => {
            console.log(error.response.data);
            throw new ServiceUnavailableException();
          }),
        ),
    );

    if (result.data) {
      return result.data;
    }

    console.log(result)
    return '';
  }
}
