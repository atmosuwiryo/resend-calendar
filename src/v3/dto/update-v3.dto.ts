import { ApiPropertyOptional, OmitType, PartialType } from '@nestjs/swagger';
import { CreateV3Dto } from './create-v3.dto';
import { IsEmail, IsOptional } from 'class-validator';

export class UpdateV3Dto extends PartialType( OmitType(CreateV3Dto, ['guests'])) {
  @ApiPropertyOptional({
    description: 'Calendar Add Guests',
    example: ['suwiryo.atmo@gmail.com', 'johndoe.atmo@gmail.com'],
  })
  @IsEmail({}, { each: true })
  @IsOptional()
  addGuests: string[];

  @ApiPropertyOptional({
    description: 'Calendar Remove Guests',
    example: ['suwiryo.atmo@gmail.com', 'johndoe.atmo@gmail.com'],
  })
  @IsEmail({}, { each: true })
  @IsOptional()
  removeGuests: string[];
}
