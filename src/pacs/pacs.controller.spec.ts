import { Test, TestingModule } from '@nestjs/testing';
import { PacsController } from './pacs.controller';

describe('PacsController', () => {
  let controller: PacsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PacsController],
    }).compile();

    controller = module.get<PacsController>(PacsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
