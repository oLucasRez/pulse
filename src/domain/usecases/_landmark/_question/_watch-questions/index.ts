import { QuestionModel } from '@domain/models';

export interface WatchQuestionsUsecase {
  execute(
    callback: WatchQuestionsUsecase.Callback,
  ): Promise<WatchQuestionsUsecase.Response>;
}

export namespace WatchQuestionsUsecase {
  export type Callback = (questions: QuestionModel[]) => void;
  export type Response = () => void;
}
