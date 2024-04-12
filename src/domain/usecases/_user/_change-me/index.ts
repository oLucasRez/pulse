import { UserModel } from '@domain/models';

export interface IChangeMeUsecase {
  execute(payload: IChangeMeUsecase.Payload): Promise<UserModel>;
}

export namespace IChangeMeUsecase {
  export type Payload = {
    name?: string;
  };
}
