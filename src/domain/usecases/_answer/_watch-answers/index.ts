import { AnswerModel } from '@domain/models';

export interface IWatchAnswersUsecase {
  execute(
    callback: IWatchAnswersUsecase.Callback,
  ): Promise<IWatchAnswersUsecase.Response>;
}

export namespace IWatchAnswersUsecase {
  export type Callback = (answers: AnswerModel[]) => void;
  export type Response = () => void;
}
