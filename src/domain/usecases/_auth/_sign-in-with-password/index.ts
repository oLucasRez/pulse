import { UserModel } from '@domain/models';

export interface SignInWithPasswordUsecase {
  execute(payload: SignInWithPasswordUsecase.Payload): Promise<UserModel>;
}

export namespace SignInWithPasswordUsecase {
  export type Payload = {
    email: string;
    password: string;
  };
}
