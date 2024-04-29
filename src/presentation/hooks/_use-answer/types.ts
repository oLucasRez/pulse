import { AnswerModel } from '@domain/models';
import {
  ICreateAnswerUsecase,
  IGetAnswersUsecase,
  IWatchAnswersUsecase,
} from '@domain/usecases';

import { ContextProviderProps } from '@presentation/types';

export type AnswerContextValue = {
  answers: AnswerModel[];
  createAnswer: ICreateAnswerUsecase['execute'];
};

export interface AnswerContextProviderProps extends ContextProviderProps {
  getAnswers: IGetAnswersUsecase;
  watchAnswers: IWatchAnswersUsecase;
  createAnswer: ICreateAnswerUsecase;
}
