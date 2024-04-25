import { QuestionModel } from '@domain/models';

export interface IWatchQuestionsUsecase {
  execute(callback: IWatchQuestionsUsecase.Callback): Promise<() => void>;
}

export namespace IWatchQuestionsUsecase {
  export type Callback = (questions: QuestionModel[]) => void;
}
