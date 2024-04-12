import { CentralPulseModel } from '@domain/models';
import { IWatchCentralPulseUsecase } from '@domain/usecases';

import { ContextProviderProps } from '@presentation/types';

export type CentralPulseUsecasesContextValue = {
  centralPulse: CentralPulseModel | null;
  watchCentralPulse(
    callback?: IWatchCentralPulseUsecase.Callback,
  ): Promise<IWatchCentralPulseUsecase.Response>;
};

export interface CentralPulseUsecasesContextProviderProps
  extends ContextProviderProps {
  watchCentralPulse: IWatchCentralPulseUsecase;
}
