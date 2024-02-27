import { RoundModel } from '@domain/models';

export interface CreateRoundUsecase {
  execute(payload: CreateRoundUsecase.Payload): Promise<RoundModel>;
}

export namespace CreateRoundUsecase {
  export type Payload = {
    playerIDs: string[];
  };
}
