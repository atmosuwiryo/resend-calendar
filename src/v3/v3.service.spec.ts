import { Test, TestingModule } from '@nestjs/testing';

import { V3Service } from './v3.service';

describe('V3Service', () => {
  let service: V3Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [V3Service],
    }).compile();

    service = module.get<V3Service>(V3Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
