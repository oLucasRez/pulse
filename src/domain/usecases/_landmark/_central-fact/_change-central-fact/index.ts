import { CentralFactModel } from '@domain/models';

export interface IChangeCentralFactUsecase {
  execute(
    payload: IChangeCentralFactUsecase.Payload,
  ): Promise<CentralFactModel>;
}

export namespace IChangeCentralFactUsecase {
  export type Payload = {
    description: string;
  };
}
