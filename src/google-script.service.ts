import { HttpService } from '@nestjs/axios';
import { Injectable, Logger, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { catchError } from 'rxjs';

@Injectable()
export class GoogleScriptService {
  google_script_url = this.configService.get('GOOGLE_SCRIPT_URL');
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  doPost(payload: any) {
    return this.httpService
      .post(this.google_script_url, payload, {
        headers: { 'Content-Type': 'application/json' },
      })
      .pipe(
        catchError((error: AxiosError) => {
          Logger.error(error);
          throw new ServiceUnavailableException();
        }),
      );
  }

  doGet() {
    return this.httpService
      .get(this.google_script_url, {
        headers: { 'Content-Type': 'application/json' },
      })
      .pipe(
        catchError((error: AxiosError) => {
          Logger.error(error);
          throw new ServiceUnavailableException();
        }),
      );
  }
}
