import { CentralPulseModel } from '@domain/models';

export interface CreateCentralPulseUsecase {
  execute(): Promise<CentralPulseModel>;
}
