import { AnswerModel } from '@domain/models';

export interface ICreateAnswerUsecase {
  execute(payload: ICreateAnswerUsecase.Payload): Promise<AnswerModel>;
}

export namespace ICreateAnswerUsecase {
  export type Payload = {
    description: string;
    questionID: string;
    authorID: string;
  };
}
