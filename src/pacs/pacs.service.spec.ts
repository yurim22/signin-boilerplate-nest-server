import { Test, TestingModule } from '@nestjs/testing';
import { PacsService } from './pacs.service';

describe('PacsService', () => {
  let service: PacsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PacsService],
    }).compile();

    service = module.get<PacsService>(PacsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
