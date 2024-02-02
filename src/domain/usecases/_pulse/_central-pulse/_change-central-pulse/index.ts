import { CentralPulseModel } from '@domain/models';

export interface ChangeCentralPulseUsecase {
  execute(
    payload: ChangeCentralPulseUsecase.Payload,
  ): Promise<CentralPulseModel>;
}

export namespace ChangeCentralPulseUsecase {
  export type Payload = {
    amount: number;
  };
}
