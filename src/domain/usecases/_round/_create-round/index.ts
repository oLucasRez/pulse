import { RoundModel } from '@domain/models';

export interface ICreateRoundUsecase {
  execute(payload: ICreateRoundUsecase.Payload): Promise<RoundModel>;
}

export namespace ICreateRoundUsecase {
  export type Payload = {
    playerIDs: string[];
  };
}
