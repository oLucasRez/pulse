import { RoundModel } from '@domain/models';

export interface IRoundHydrator {
  hydrate(dto: RoundModel.DTO): Promise<RoundModel>;
}
