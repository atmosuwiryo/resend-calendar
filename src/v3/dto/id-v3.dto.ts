import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class IdV3Dto {
  @ApiProperty({
    description: 'Event ID',
    example: '7o4pufklfhq2pegv5ph1qh70og@google.com',
  })
  @IsString()
  id: string;
}
