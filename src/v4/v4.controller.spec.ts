import { Test, TestingModule } from '@nestjs/testing';

import { V4Controller } from './v4.controller';
import { V4Service } from './v4.service';

describe('V4Controller', () => {
  let controller: V4Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [V4Controller],
      providers: [V4Service],
    }).compile();

    controller = module.get<V4Controller>(V4Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
