/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';
import { lastValueFrom } from 'rxjs';

import {
  CreateCalendarDto,
  DeleteCalendarDto,
  RescheduleCalendarDto,
  UpdateCalendarDto,
} from './app.dto';
import { GoogleScriptService } from './services/google-script.service';
import { parseHtmlAndCheckException } from './utils/html-parser';

@Injectable()
export class AppService {
  resend = new Resend(this.configService.get('RESEND_API_KEY'));

  constructor(
    private readonly configService: ConfigService,
    private readonly googleScriptService: GoogleScriptService,
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
    const payload = {
      action: 'create',
      title: createCalendarDto.calendarTitle,
      description: createCalendarDto.calendarDescription,
      guests: createCalendarDto.calendarGuests,
      startTime: createCalendarDto.calendarStartDateTimeString,
      endTime: createCalendarDto.calendarEndDateTimeString,
    };
    const { data } = await lastValueFrom(
      this.googleScriptService.doPost(payload),
    );

    /** Check if the message contains the word "Exception" */
    // If data.success is undefined then google script returns html data
    // We need to parse the html and check if the message contains the word "Exception"
    // example of this condition is when quota is exceeded
    if (data.success === undefined) {
      const exceptionMessage = parseHtmlAndCheckException(
        data as unknown as string,
      );

      if (exceptionMessage) {
        throw new ServiceUnavailableException(exceptionMessage);
      }
    }

    return data;
  }

  async deleteCalendarV2(deleteCalendarDto: DeleteCalendarDto) {
    const payload = {
      action: 'cancel',
      userEmail: deleteCalendarDto.userEmail,
      startTime: deleteCalendarDto.calendarStartDateTimeString,
      endTime: deleteCalendarDto.calendarEndDateTimeString,
    };
    const { data } = await lastValueFrom(
      this.googleScriptService.doPost(payload),
    );

    /** Check if the message contains the word "Exception" */
    // If data.success is undefined then google script returns html data
    // We need to parse the html and check if the message contains the word "Exception"
    // example of this condition is when quota is exceeded
    if (data.success === undefined) {
      const exceptionMessage = parseHtmlAndCheckException(
        data as unknown as string,
      );

      if (exceptionMessage) {
        throw new ServiceUnavailableException(exceptionMessage);
      }
    }

    if (data.success === false) {
      throw new NotFoundException(data);
    }

    return data;
  }

  async rescheduleCalendarV2(rescheduleCalendarDto: RescheduleCalendarDto) {
    const payload = {
      action: 'reschedule',
      userEmail: rescheduleCalendarDto.userEmail,
      startTime: rescheduleCalendarDto.calendarStartDateTimeString,
      endTime: rescheduleCalendarDto.calendarEndDateTimeString,
      newStartTime: rescheduleCalendarDto.calendarNewStartDateTimeString,
      newEndTime: rescheduleCalendarDto.calendarNewEndDateTimeString,
    };
    const { data } = await lastValueFrom(
      this.googleScriptService.doPost(payload),
    );

    /** Check if the message contains the word "Exception" */
    // If data.success is undefined then google script returns html data
    // We need to parse the html and check if the message contains the word "Exception"
    // example of this condition is when quota is exceeded
    if (data.success === undefined) {
      const exceptionMessage = parseHtmlAndCheckException(
        data as unknown as string,
      );

      if (exceptionMessage) {
        throw new ServiceUnavailableException(exceptionMessage);
      }
    }

    if (data.success === false) {
      throw new NotFoundException(data);
    }

    return data;
  }

  async updateCalendarV2(updateCalendarDto: UpdateCalendarDto) {
    const payload = {
      action: 'update',
      userEmail: updateCalendarDto.userEmail,
      startTime: updateCalendarDto.calendarStartDateTimeString,
      endTime: updateCalendarDto.calendarEndDateTimeString,
      newStartTime: updateCalendarDto.calendarNewStartDateTimeString,
      newEndTime: updateCalendarDto.calendarNewEndDateTimeString,
      addGuests: updateCalendarDto.calendarAddGuests,
      removeGuests: updateCalendarDto.calendarRemoveGuests,
      newTitle: updateCalendarDto.calendarNewTitle,
      newDescription: updateCalendarDto.calendarNewDescription,
    };
    console.log(payload);
    const { data } = await lastValueFrom(
      this.googleScriptService.doPost(payload),
    );

    /** Check if the message contains the word "Exception" */
    // If data.success is undefined then google script returns html data
    // We need to parse the html and check if the message contains the word "Exception"
    // example of this condition is when quota is exceeded
    if (data.success === undefined) {
      const exceptionMessage = parseHtmlAndCheckException(
        data as unknown as string,
      );

      if (exceptionMessage) {
        throw new ServiceUnavailableException(exceptionMessage);
      }
    }

    if (data.success === false) {
      throw new NotFoundException(data);
    }

    return data;
  }
}
