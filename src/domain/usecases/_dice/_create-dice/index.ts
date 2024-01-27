import { DiceModel } from '@domain/models';

export interface CreateDiceUsecase {
  execute(payload: CreateDiceUsecase.Payload): Promise<DiceModel>;
}

export namespace CreateDiceUsecase {
  export type Payload = {
    sides: number;
  };
}
