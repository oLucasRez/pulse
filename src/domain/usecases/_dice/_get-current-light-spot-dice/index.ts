import { DiceModel } from '@domain/models';

export interface IGetCurrentLightSpotDiceUsecase {
  execute(): Promise<DiceModel | null>;
}
