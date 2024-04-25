import { DiceModel } from '@domain/models';

export interface ICreateDiceUsecase {
  execute(payload: ICreateDiceUsecase.Payload): Promise<DiceModel>;
}

export namespace ICreateDiceUsecase {
  export type Payload = {
    sides: number;
    order: number;
  };
}
