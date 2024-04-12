import { QuestionModel } from '@domain/models';

export interface IWatchQuestionsUsecase {
  execute(
    callback: IWatchQuestionsUsecase.Callback,
  ): Promise<IWatchQuestionsUsecase.Response>;
}

export namespace IWatchQuestionsUsecase {
  export type Callback = (questions: QuestionModel[]) => void;
  export type Response = () => void;
}
