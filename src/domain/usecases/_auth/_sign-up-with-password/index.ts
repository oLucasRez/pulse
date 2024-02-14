import { UserModel } from '@domain/models';

export interface SignUpWithPasswordUsecase {
  execute(payload: SignUpWithPasswordUsecase.Payload): Promise<UserModel>;
}

export namespace SignUpWithPasswordUsecase {
  export type Payload = {
    name: string;
    email: string;
    password: string;
  };
}
