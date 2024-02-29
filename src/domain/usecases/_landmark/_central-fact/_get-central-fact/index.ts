import { CentralFactModel } from '@domain/models';

export interface GetCentralFactUsecase {
  execute(): Promise<CentralFactModel | null>;
}
