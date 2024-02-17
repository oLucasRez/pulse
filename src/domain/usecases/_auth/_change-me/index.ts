import { UserModel } from '@domain/models';

export interface ChangeMeUsecase {
  execute(payload: ChangeMeUsecase.Payload): Promise<UserModel>;
}

export namespace ChangeMeUsecase {
  export type Payload = {
    name?: string;
    currentGameID?: string | null;
  };
}
