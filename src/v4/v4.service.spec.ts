import { Test, TestingModule } from '@nestjs/testing';

import { V4Service } from './v4.service';

describe('V4Service', () => {
  let service: V4Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [V4Service],
    }).compile();

    service = module.get<V4Service>(V4Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
