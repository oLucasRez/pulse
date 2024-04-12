import { AnswerModel } from '@domain/models';
import { ICreateAnswerUsecase, IWatchAnswersUsecase } from '@domain/usecases';

import { ContextProviderProps } from '@presentation/types';

export type AnswerUsecasesContextValue = {
  answers: AnswerModel[];
  watchAnswers(
    callback?: IWatchAnswersUsecase.Callback,
  ): Promise<IWatchAnswersUsecase.Response>;
  createAnswer: ICreateAnswerUsecase['execute'];
};

export interface AnswerUsecasesContextProviderProps
  extends ContextProviderProps {
  watchAnswers: IWatchAnswersUsecase;
  createAnswer: ICreateAnswerUsecase;
}
