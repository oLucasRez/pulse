import { LightSpotModel } from '@domain/models';
import {
  ICreateLightSpotUsecase,
  IGetLightSpotsUsecase,
  IWatchLightSpotsUsecase,
} from '@domain/usecases';

import { ContextProviderProps } from '@presentation/types';

export type LightSpotContextValue = {
  lightSpots: LightSpotModel[];
  createLightSpot: ICreateLightSpotUsecase['execute'];
};

export interface LightSpotContextProviderProps extends ContextProviderProps {
  getLightSpots: IGetLightSpotsUsecase;
  watchLightSpots: IWatchLightSpotsUsecase;
  createLightSpot: ICreateLightSpotUsecase;
}
