import { CentralFactModel } from '@domain/models';

export interface ChangeCentralFactUsecase {
  execute(payload: ChangeCentralFactUsecase.Payload): Promise<CentralFactModel>;
}

export namespace ChangeCentralFactUsecase {
  export type Payload = {
    description: string;
  };
}
