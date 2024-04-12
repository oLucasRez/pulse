import { UserModel } from '@domain/models';

export interface ISignInWithCredentialsUsecase {
  execute(payload: ISignInWithCredentialsUsecase.Payload): Promise<UserModel>;
}

export namespace ISignInWithCredentialsUsecase {
  export type Payload = {
    email: string;
    password: string;
  };
}
