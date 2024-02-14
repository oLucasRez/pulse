import { UserModel } from '@domain/models';

export interface SignUpWithCredentialsUsecase {
  execute(payload: SignUpWithCredentialsUsecase.Payload): Promise<UserModel>;
}

export namespace SignUpWithCredentialsUsecase {
  export type Payload = {
    name: string;
    email: string;
    password: string;
  };
}
