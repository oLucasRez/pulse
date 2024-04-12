import { UserModel } from '@domain/models';

export interface ISignUpWithCredentialsUsecase {
  execute(payload: ISignUpWithCredentialsUsecase.Payload): Promise<UserModel>;
}

export namespace ISignUpWithCredentialsUsecase {
  export type Payload = {
    name: string;
    email: string;
    password: string;
  };
}
