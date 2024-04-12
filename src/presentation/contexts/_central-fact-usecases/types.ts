import { CentralFactModel } from '@domain/models';
import {
  IChangeCentralFactUsecase,
  IWatchCentralFactUsecase,
} from '@domain/usecases';

import { ContextProviderProps } from '@presentation/types';

export type CentralFactUsecasesContextValue = {
  centralFact: CentralFactModel | null;
  watchCentralFact(
    callback?: IWatchCentralFactUsecase.Callback,
  ): Promise<IWatchCentralFactUsecase.Response>;
  changeCentralFact: IChangeCentralFactUsecase['execute'];
};

export interface CentralFactUsecasesContextProviderProps
  extends ContextProviderProps {
  watchCentralFact: IWatchCentralFactUsecase;
  changeCentralFact: IChangeCentralFactUsecase;
}
