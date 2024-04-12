import { CentralPulseModel } from '@domain/models';

export interface IChangeCentralPulseUsecase {
  execute(
    payload: IChangeCentralPulseUsecase.Payload,
  ): Promise<CentralPulseModel>;
}

export namespace IChangeCentralPulseUsecase {
  export type Payload = {
    amount: number;
  };
}
