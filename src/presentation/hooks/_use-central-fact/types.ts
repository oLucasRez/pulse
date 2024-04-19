import { CentralFactModel } from '@domain/models';
import {
  IChangeCentralFactUsecase,
  IGetCentralFactUsecase,
  IWatchCentralFactUsecase,
} from '@domain/usecases';

import { ContextProviderProps } from '@presentation/types';

export type CentralFactContextValue = {
  centralFact: CentralFactModel | null;
  changeCentralFact: IChangeCentralFactUsecase['execute'];
};

export interface CentralFactContextProviderProps extends ContextProviderProps {
  getCentralFact: IGetCentralFactUsecase;
  watchCentralFact: IWatchCentralFactUsecase;
  changeCentralFact: IChangeCentralFactUsecase;
}
