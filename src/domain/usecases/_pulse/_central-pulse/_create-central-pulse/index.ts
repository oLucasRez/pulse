import { CentralPulseModel } from '@domain/models';

export interface ICreateCentralPulseUsecase {
  execute(): Promise<CentralPulseModel>;
}
