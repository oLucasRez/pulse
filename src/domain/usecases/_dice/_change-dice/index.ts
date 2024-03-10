import { DiceModel } from '@domain/models';
import { Vector } from '@domain/utils';

export interface ChangeDiceUsecase {
  execute(id: string, payload: ChangeDiceUsecase.Payload): Promise<DiceModel>;
}

export namespace ChangeDiceUsecase {
  export type Payload = {
    value?: number | null;
    position?: Vector | null;
    ownerID?: string | null;
  };
}
