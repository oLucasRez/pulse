import { GameModel } from '@domain/models';

export interface CreateGameUsecase {
  execute(payload: CreateGameUsecase.Payload): Promise<GameModel>;
}

export namespace CreateGameUsecase {
  export type Payload = {
    title?: string;
  };
}