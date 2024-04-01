import { QuestionModel } from '@domain/models';
import { CreateQuestionUsecase, WatchQuestionsUsecase } from '@domain/usecases';

import { ContextProviderProps } from '@presentation/types';

export type QuestionUsecasesContextValue = {
  questions: QuestionModel[];
  watchQuestions(
    callback?: WatchQuestionsUsecase.Callback,
  ): Promise<WatchQuestionsUsecase.Response>;
  createQuestion: CreateQuestionUsecase['execute'];
};

export interface QuestionUsecasesContextProviderProps
  extends ContextProviderProps {
  watchQuestions: WatchQuestionsUsecase;
  createQuestion: CreateQuestionUsecase;
}
