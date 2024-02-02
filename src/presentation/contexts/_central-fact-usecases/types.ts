import {
  ChangeCentralFactUsecase,
  GetCentralFactUsecase,
  WatchCentralFactUsecase,
} from '@domain/usecases';

import { ContextProviderProps } from '@presentation/types';

export type CentralFactUsecasesContextValue = {
  getCentralFact: GetCentralFactUsecase;
  watchCentralFact: WatchCentralFactUsecase;
  changeCentralFact: ChangeCentralFactUsecase;
};

export interface CentralFactUsecasesContextProviderProps
  extends ContextProviderProps {
  getCentralFact: GetCentralFactUsecase;
  watchCentralFact: WatchCentralFactUsecase;
  changeCentralFact: ChangeCentralFactUsecase;
}
