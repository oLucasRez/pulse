import { CentralPulseModel } from '@domain/models';

export interface ICentralPulseHydrator {
  hydrate(dto: CentralPulseModel.DTO): Promise<CentralPulseModel>;
}
