import { AnswerModel } from '@domain/models';

export interface IEditAnswerUsecase {
  execute(
    id: string,
    payload: IEditAnswerUsecase.Payload,
  ): Promise<AnswerModel>;
}

export namespace IEditAnswerUsecase {
  export type Payload = {
    description?: string;
  };
}
