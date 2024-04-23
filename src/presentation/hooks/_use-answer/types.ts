import { AnswerModel } from '@domain/models';
import {
  ICreateAnswerUsecase,
  IGetAnswersUsecase,
  IVoteAnswerUsecase,
  IWatchAnswersUsecase,
} from '@domain/usecases';

import { ContextProviderProps } from '@presentation/types';

export type AnswerContextValue = {
  answers: AnswerModel[];
  votingAnswer: AnswerModel | null;
  pendingMyVote: boolean;
  createAnswer: ICreateAnswerUsecase['execute'];
  voteAnswer: IVoteAnswerUsecase['execute'];
};

export interface AnswerContextProviderProps extends ContextProviderProps {
  getAnswers: IGetAnswersUsecase;
  watchAnswers: IWatchAnswersUsecase;
  createAnswer: ICreateAnswerUsecase;
  voteAnswer: IVoteAnswerUsecase;
}
