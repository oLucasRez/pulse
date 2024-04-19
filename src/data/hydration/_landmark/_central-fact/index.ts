import { CentralFactModel } from '@domain/models';

export interface ICentralFactHydrator {
  hydrate(dto: CentralFactModel.DTO): Promise<CentralFactModel>;
}
