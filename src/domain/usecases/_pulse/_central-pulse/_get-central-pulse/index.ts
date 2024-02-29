import { CentralPulseModel } from '@domain/models';

export interface GetCentralPulseUsecase {
  execute(): Promise<CentralPulseModel | null>;
}
