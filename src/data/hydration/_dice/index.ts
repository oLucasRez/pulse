import { DiceModel } from '@domain/models';

export interface IDiceHydrator {
  hydrate(dto: DiceModel.DTO): Promise<DiceModel>;
}
