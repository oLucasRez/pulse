import { QuestionModel } from '@domain/models';
import {
  ICreateQuestionUsecase,
  IWatchQuestionsUsecase,
} from '@domain/usecases';

import { ContextProviderProps } from '@presentation/types';

export type QuestionUsecasesContextValue = {
  questions: QuestionModel[];
  watchQuestions(
    callback?: IWatchQuestionsUsecase.Callback,
  ): Promise<IWatchQuestionsUsecase.Response>;
  createQuestion: ICreateQuestionUsecase['execute'];
};

export interface QuestionUsecasesContextProviderProps
  extends ContextProviderProps {
  watchQuestions: IWatchQuestionsUsecase;
  createQuestion: ICreateQuestionUsecase;
}
