import { GameModel } from '@domain/models';

import { GetCurrentGameUsecase } from '@domain/usecases';

export class MockGetCurrentGameUsecase implements GetCurrentGameUsecase {
  public async execute(): Promise<GameModel | null> {
    return {
      id: 'i7SHJUBKX7BkhXxJ8SjY',
      hostID: 'FxDD47p6OArvPmTXunvv',
    };
  }
}
