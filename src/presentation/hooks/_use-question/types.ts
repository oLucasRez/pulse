import { QuestionModel } from '@domain/models';
import {
  ICreateQuestionUsecase,
  IGetQuestionsUsecase,
  IVoteQuestionFactUsecase,
  IWatchQuestionsUsecase,
} from '@domain/usecases';

import { ContextProviderProps } from '@presentation/types';

export type QuestionContextValue = {
  questions: QuestionModel[];
  createQuestion: ICreateQuestionUsecase['execute'];
  voteQuestionFact: IVoteQuestionFactUsecase['execute'];
};

export interface QuestionContextProviderProps extends ContextProviderProps {
  getQuestions: IGetQuestionsUsecase;
  watchQuestions: IWatchQuestionsUsecase;
  createQuestion: ICreateQuestionUsecase;
  voteQuestionFact: IVoteQuestionFactUsecase;
}
