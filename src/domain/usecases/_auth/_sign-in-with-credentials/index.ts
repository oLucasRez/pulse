import { UserModel } from '@domain/models';

export interface SignInWithCredentialsUsecase {
  execute(payload: SignInWithCredentialsUsecase.Payload): Promise<UserModel>;
}

export namespace SignInWithCredentialsUsecase {
  export type Payload = {
    email: string;
    password: string;
  };
}
