import { Controller, Get, Post, Body, Patch, Param, Delete, Logger } from '@nestjs/common';
import { V3Service } from './v3.service';
import { CreateV3Dto } from './dto/create-v3.dto';
import { UpdateV3Dto } from './dto/update-v3.dto';
import { IdV3Dto } from './dto/id-v3.dto';
import { ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseEntityV3 } from './entities/v3.entity';

@ApiTags('v3')
@Controller('v3')
export class V3Controller {
  logger = new Logger(V3Controller.name);

  constructor(private readonly v3Service: V3Service) {}

  @ApiOperation({
    summary: 'Create an event',
    description: 'Create a new calendar event',
  })
  @ApiCreatedResponse({ type: ResponseEntityV3 })
  @Post()
  create(@Body() createV3Dto: CreateV3Dto) {
    this.logger.log(`POST: ${JSON.stringify(createV3Dto)}`);
    return this.v3Service.create(createV3Dto);
  }

  // @ApiOperation({
  //   summary: 'Get all events',
  //   description: 'Get all calendar events',
  // })
  // @ApiResponse({
  //   type: ResponseEntityV3,
  //   isArray: true,
  // })
  // @Get()
  // findAll() {
  //   return this.v3Service.findAll();
  // }

  @ApiOperation({
    summary: 'Get event by ID',
    description: 'Get a calendar event by ID',
  })
  @ApiResponse({
    type: ResponseEntityV3,
  })
  @Get(':id')
  findOne(@Param() param: IdV3Dto) {
    this.logger.log(`GET: ${param.id}`);
    return this.v3Service.findOne(param.id);
  }

  @ApiOperation({
    summary: 'Update event',
    description: 'Update a calendar event',
  })
  @ApiResponse({
    type: ResponseEntityV3,
  })
  @Patch(':id')
  update(@Param() param: IdV3Dto, @Body() updateV3Dto: UpdateV3Dto) {
    this.logger.log(`PATCH: ${JSON.stringify(updateV3Dto)}`);
    return this.v3Service.update(param.id, updateV3Dto);
  }

  @ApiOperation({
    summary: 'Delete event',
    description: 'Delete a calendar event',
  })
  @ApiResponse({
    type: ResponseEntityV3,
  })
  @Delete(':id')
  remove(@Param() param: IdV3Dto) {
    this.logger.log(`DELETE: ${param.id}`);
    return this.v3Service.remove(param.id);
  }
}
