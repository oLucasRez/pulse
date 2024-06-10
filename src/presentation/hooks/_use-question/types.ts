import { QuestionModel } from '@domain/models';
import {
  ICreateQuestionUsecase,
  IEditQuestionUsecase,
  IGetQuestionsUsecase,
  IVoteQuestionFactUsecase,
  IWatchQuestionsUsecase,
} from '@domain/usecases';

import { ContextProviderProps } from '@presentation/types';

export type QuestionContextValue = {
  questions: QuestionModel[];
  unvotedQuestion: QuestionModel | null;
  createQuestion: ICreateQuestionUsecase['execute'];
  editQuestion: IEditQuestionUsecase['execute'];
  voteQuestionFact: IVoteQuestionFactUsecase['execute'];
};

export interface QuestionContextProviderProps extends ContextProviderProps {
  getQuestions: IGetQuestionsUsecase;
  watchQuestions: IWatchQuestionsUsecase;
  createQuestion: ICreateQuestionUsecase;
  editQuestion: IEditQuestionUsecase;
  voteQuestionFact: IVoteQuestionFactUsecase;
}
