import { HttpService } from '@nestjs/axios';
import { Injectable, Logger, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { catchError } from 'rxjs';
import { ResponseEntityV3 } from 'src/v3/entities/v3.entity';

@Injectable()
export class GoogleScriptService {
  logger = new Logger(GoogleScriptService.name);

  google_script_url = this.configService.get('GOOGLE_SCRIPT_URL');
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  doPost(payload: any) {
    this.logger.log(`POST: ${JSON.stringify(payload)}`);
    return this.httpService
      .post<ResponseEntityV3>(this.google_script_url, payload, {
        headers: { 'Content-Type': 'application/json' },
      })
      .pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error);
          throw new ServiceUnavailableException();
        }),
      );
  }

  doGet(id: string) {
    this.logger.log(`GET: ${id}`);
    return this.httpService
      .get<ResponseEntityV3>(`${this.google_script_url}?id=${id}`, {
        headers: { 'Content-Type': 'application/json' },
      })
      .pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error);
          throw new ServiceUnavailableException();
        }),
      );
  }
}
