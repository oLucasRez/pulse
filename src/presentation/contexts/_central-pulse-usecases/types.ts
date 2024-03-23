import { CentralPulseModel } from '@domain/models';
import {
  ChangeCentralPulseUsecase,
  WatchCentralPulseUsecase,
} from '@domain/usecases';

import { ContextProviderProps } from '@presentation/types';

export type CentralPulseUsecasesContextValue = {
  centralPulse: CentralPulseModel | null;
  watchCentralPulse(
    callback?: WatchCentralPulseUsecase.Callback,
  ): Promise<WatchCentralPulseUsecase.Response>;
  changeCentralPulse: ChangeCentralPulseUsecase['execute'];
};

export interface CentralPulseUsecasesContextProviderProps
  extends ContextProviderProps {
  watchCentralPulse: WatchCentralPulseUsecase;
  changeCentralPulse: ChangeCentralPulseUsecase;
}
