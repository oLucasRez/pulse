import { CentralFactModel } from '@domain/models';

export interface ICreateCentralFactUsecase {
  execute(): Promise<CentralFactModel>;
}
