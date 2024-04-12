import { CentralPulseModel } from '@domain/models';
import { WatchCentralPulseUsecase } from '@domain/usecases';

import { ContextProviderProps } from '@presentation/types';

export type CentralPulseUsecasesContextValue = {
  centralPulse: CentralPulseModel | null;
  watchCentralPulse(
    callback?: WatchCentralPulseUsecase.Callback,
  ): Promise<WatchCentralPulseUsecase.Response>;
};

export interface CentralPulseUsecasesContextProviderProps
  extends ContextProviderProps {
  watchCentralPulse: WatchCentralPulseUsecase;
}
