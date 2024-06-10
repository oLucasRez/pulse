import { AnswerModel } from '@domain/models';
import {
  ICreateAnswerUsecase,
  IEditAnswerUsecase,
  IGetAnswersUsecase,
  IWatchAnswersUsecase,
} from '@domain/usecases';

import { ContextProviderProps } from '@presentation/types';

export type AnswerContextValue = {
  answers: AnswerModel[];
  createAnswer: ICreateAnswerUsecase['execute'];
  editAnswer: IEditAnswerUsecase['execute'];
};

export interface AnswerContextProviderProps extends ContextProviderProps {
  getAnswers: IGetAnswersUsecase;
  watchAnswers: IWatchAnswersUsecase;
  createAnswer: ICreateAnswerUsecase;
  editAnswer: IEditAnswerUsecase;
}
