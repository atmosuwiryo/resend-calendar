import { Injectable, Logger } from '@nestjs/common';
import { CreateV3Dto } from './dto/create-v3.dto';
import { UpdateV3Dto } from './dto/update-v3.dto';
import { lastValueFrom } from 'rxjs';
import { validateResponse } from 'src/utils/validate-response';
import { GoogleScriptService } from 'src/services/google-script.service';

const logger = new Logger('V3Service');

@Injectable()
export class V3Service {
  logger = new Logger(V3Service.name);

  constructor(
    private readonly googleScriptService: GoogleScriptService
  ) {}
  async create(createV3Dto: CreateV3Dto) {
    const payload = {
      action: 'post',
      ...createV3Dto,
    };
    const { data } = await lastValueFrom(
      this.googleScriptService.doPost(payload),
    );

    validateResponse(data);
    return data;
  }

  // findAll() {
  //   return `This action returns all v3`;
  // }

  async findOne(id: string) {
    const { data } = await lastValueFrom(
      this.googleScriptService.doGet(id),
    );

    validateResponse(data);
    return data;
  }

  async update(id: string, updateV3Dto: UpdateV3Dto) {
    const payload = {
      action: 'patch',
      id,
      ...updateV3Dto,
    };
    const { data } = await lastValueFrom(
      this.googleScriptService.doPost(payload),
    );

    validateResponse(data);
    return data;
  }

  async remove(id: string) {
    const payload = {
      action: 'delete',
      id,
    };
    const { data } = await lastValueFrom(
      this.googleScriptService.doPost(payload),
    );

    validateResponse(data);
    return data;
  }
}
