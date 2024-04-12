import { CentralPulseModel } from '@domain/models';

export interface IGetCentralPulseUsecase {
  execute(): Promise<CentralPulseModel | null>;
}
