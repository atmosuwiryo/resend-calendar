import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { google, calendar_v3 } from 'googleapis';
import * as path from 'path';

export interface CalendarEvent {
  summary: string;
  description?: string;
  location?: string;
  start: {
    dateTime: string;
    timeZone?: string;
  };
  end: {
    dateTime: string;
    timeZone?: string;
  };
  attendees?: { email: string }[];
  reminders?: {
    useDefault?: boolean;
    overrides?: {
      method: string;
      minutes: number;
    }[];
  };
}

@Injectable()
export class GoogleCalendarService {
  private calendar: calendar_v3.Calendar;
  private calendarId = this.configService.get('CALENDAR_ID');
  private credentialsFilename = this.configService.get('CREDENTIALS_FILENAME');

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    await this.initialize();
  }

  private async initialize(): Promise<void> {
    Logger.log('Initializing Google Calendar service...');
    const auth = new google.auth.JWT({
      keyFile: path.join(process.cwd(), this.credentialsFilename),
      scopes: ['https://www.googleapis.com/auth/calendar'],
    });

    this.calendar = google.calendar({ version: 'v3', auth });
  }

  async listEvents(params: {
    maxResults?: number;
    timeMin?: string;
    timeMax?: string;
    q?: string;  // Search query
  } = {}): Promise<calendar_v3.Schema$Event[]> {
    try {
      const response = await this.calendar.events.list({
        calendarId: this.calendarId,
        maxResults: params.maxResults || 10,
        timeMin: params.timeMin || new Date().toISOString(),
        timeMax: params.timeMax,
        q: params.q,
        singleEvents: true,
        orderBy: 'startTime',
      });

      return response.data.items || [];
    } catch (error) {
      Logger.error(`Error listing events: ${error}`);
      throw error;
    }
  }

  async getEvent(eventId: string): Promise<calendar_v3.Schema$Event> {
    try {
      const response = await this.calendar.events.get({
        calendarId: this.calendarId,
        eventId: eventId,
      });

      return response.data;
    } catch (error) {
      Logger.error(`Error getting event: ${error}`);
      throw error;
    }
  }

  async createEvent(event: CalendarEvent): Promise<calendar_v3.Schema$Event> {
    try {
      const response = await this.calendar.events.insert({
        calendarId: this.calendarId,
        requestBody: event,
      });

      return response.data;
    } catch (error) {
      Logger.error(`Error creating event: ${error}`);
      throw error;
    }
  }

  async updateEvent(
    eventId: string,
    event: Partial<CalendarEvent>
  ): Promise<calendar_v3.Schema$Event> {
    try {
      const response = await this.calendar.events.patch({
        calendarId: this.calendarId,
        eventId: eventId,
        requestBody: event,
      });

      return response.data;
    } catch (error) {
      Logger.error(`Error updating event: ${error}`);
      throw error;
    }
  }

  async deleteEvent(eventId: string): Promise<void> {
    try {
      await this.calendar.events.delete({
        calendarId: this.calendarId,
        eventId: eventId,
      });
    } catch (error) {
      Logger.error(`Error deleting event: ${error}`);
      throw error;
    }
  }

  async moveEvent(
    eventId: string,
    destinationCalendarId: string
  ): Promise<calendar_v3.Schema$Event> {
    try {
      const response = await this.calendar.events.move({
        calendarId: this.calendarId,
        eventId: eventId,
        destination: destinationCalendarId,
      });

      return response.data;
    } catch (error) {
      Logger.error(`Error moving event: ${error}`);
      throw error;
    }
  }

  async quickAdd(text: string): Promise<calendar_v3.Schema$Event> {
    try {
      const response = await this.calendar.events.quickAdd({
        calendarId: this.calendarId,
        text: text,
      });

      return response.data;
    } catch (error) {
      Logger.error(`Error quick adding event: ${error}`);
      throw error;
    }
  }

  async getCalendarList(): Promise<calendar_v3.Schema$CalendarList> {
    try {
      const response = await this.calendar.calendarList.list();
      return response.data;
    } catch (error) {
      Logger.error(`Error getting calendar list: ${error}`);
      throw error;
    }
  }
}
