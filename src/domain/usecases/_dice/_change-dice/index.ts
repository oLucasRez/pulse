import { DiceModel } from '@domain/models';

export interface IChangeDiceUsecase {
  execute(id: string, payload: IChangeDiceUsecase.Payload): Promise<DiceModel>;
}

export namespace IChangeDiceUsecase {
  export type Payload = {
    value?: number | null;
    ownerID?: string | null;
  };
}
