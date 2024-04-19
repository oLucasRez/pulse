import { CentralPulseModel } from '@domain/models';
import {
  IGetCentralPulseUsecase,
  IWatchCentralPulseUsecase,
} from '@domain/usecases';

import { ContextProviderProps } from '@presentation/types';

export type CentralPulseContextValue = {
  centralPulse: CentralPulseModel | null;
};

export interface CentralPulseContextProviderProps extends ContextProviderProps {
  getCentralPulse: IGetCentralPulseUsecase;
  watchCentralPulse: IWatchCentralPulseUsecase;
}
