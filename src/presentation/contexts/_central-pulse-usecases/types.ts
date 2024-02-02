import {
  ChangeCentralPulseUsecase,
  GetCentralPulseUsecase,
  WatchCentralPulseUsecase,
} from '@domain/usecases';

import { ContextProviderProps } from '@presentation/types';

export type CentralPulseUsecasesContextValue = {
  getCentralPulse: GetCentralPulseUsecase;
  watchCentralPulse: WatchCentralPulseUsecase;
  changeCentralPulse: ChangeCentralPulseUsecase;
};

export interface CentralPulseUsecasesContextProviderProps
  extends ContextProviderProps {
  getCentralPulse: GetCentralPulseUsecase;
  watchCentralPulse: WatchCentralPulseUsecase;
  changeCentralPulse: ChangeCentralPulseUsecase;
}
