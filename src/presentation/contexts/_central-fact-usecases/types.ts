import { CentralFactModel } from '@domain/models';
import {
  ChangeCentralFactUsecase,
  WatchCentralFactUsecase,
} from '@domain/usecases';

import { ContextProviderProps } from '@presentation/types';

export type CentralFactUsecasesContextValue = {
  centralFact: CentralFactModel | null;
  watchCentralFact(
    callback?: WatchCentralFactUsecase.Callback,
  ): Promise<WatchCentralFactUsecase.Response>;
  changeCentralFact: ChangeCentralFactUsecase['execute'];
};

export interface CentralFactUsecasesContextProviderProps
  extends ContextProviderProps {
  watchCentralFact: WatchCentralFactUsecase;
  changeCentralFact: ChangeCentralFactUsecase;
}
