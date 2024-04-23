import { DiceModel } from '@domain/models';
import { Vector } from '@domain/utils';

export interface IChangeDiceUsecase {
  execute(id: string, payload: IChangeDiceUsecase.Payload): Promise<DiceModel>;
}

export namespace IChangeDiceUsecase {
  export type Payload = {
    value?: number | null;
    position?: Vector | null;
    ownerID?: string | null;
  };
}
