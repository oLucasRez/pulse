import { DiceModel } from '@domain/models';

import { vector } from '@domain/types';

export interface ChangeDiceUsecase {
  execute(id: string, payload: ChangeDiceUsecase.Payload): Promise<DiceModel>;
}

export namespace ChangeDiceUsecase {
  export type Payload = {
    value?: number | null;
    position?: vector | null;
    ownerID?: string;
  };
}
