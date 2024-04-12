import { CentralFactModel } from '@domain/models';

export interface IGetCentralFactUsecase {
  execute(): Promise<CentralFactModel | null>;
}
