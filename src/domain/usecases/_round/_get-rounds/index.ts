import { RoundModel } from '@domain/models';

export interface IGetRoundsUsecase {
  execute(): Promise<RoundModel[]>;
}
