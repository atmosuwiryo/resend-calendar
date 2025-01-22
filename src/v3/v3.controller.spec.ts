import { Test, TestingModule } from '@nestjs/testing';

import { V3Controller } from './v3.controller';
import { V3Service } from './v3.service';

describe('V3Controller', () => {
  let controller: V3Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [V3Controller],
      providers: [V3Service],
    }).compile();

    controller = module.get<V3Controller>(V3Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
