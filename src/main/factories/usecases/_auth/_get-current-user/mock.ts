import { MockGetCurrentUserUsecase } from '@data/usecases';
import { GetCurrentUserUsecase } from '@domain/usecases';

export function makeMockGetCurrentUserUsecase(): GetCurrentUserUsecase {
  return new MockGetCurrentUserUsecase();
}
