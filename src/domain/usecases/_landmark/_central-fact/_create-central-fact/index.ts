import { CentralFactModel } from '@domain/models';

export interface CreateCentralFactUsecase {
  execute(): Promise<CentralFactModel>;
}
