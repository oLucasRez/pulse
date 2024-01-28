import { MockGetCurrentGameUsecase } from '@data/usecases';
import { GetCurrentGameUsecase } from '@domain/usecases';

export function makeMockGetCurrentGameUsecase(): GetCurrentGameUsecase {
  return new MockGetCurrentGameUsecase();
}
