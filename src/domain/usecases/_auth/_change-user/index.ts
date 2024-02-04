import { UserModel } from '@domain/models';

export interface ChangeUserUsecase {
  execute(payload: ChangeUserUsecase.Payload): Promise<UserModel>;
}

export namespace ChangeUserUsecase {
  export type Payload = {
    name?: string;
    currentGameID?: string | null;
  };
}
