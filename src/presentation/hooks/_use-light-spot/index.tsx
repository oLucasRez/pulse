import { useQuery, useQueryClient } from '@tanstack/react-query';
import { createContext, FC, useContext } from 'react';

import { LightSpotModel } from '@domain/models';

import { LightSpotContextProviderProps, LightSpotContextValue } from './types';

import { useGame } from '../_use-game';
import { useUsecase } from '../_use-usecase';
import { useWatch } from '../_use-watch';

const Context = createContext({} as LightSpotContextValue);

export const useLightSpot = (): LightSpotContextValue => useContext(Context);

export const LightSpotContextProvider: FC<LightSpotContextProviderProps> = ({
  getLightSpots,
  watchLightSpots,
  children,
  ...props
}) => {
  const { currentGame } = useGame();

  const queryClient = useQueryClient();

  const queryKey = [currentGame?.id, 'lightSpots'];

  const { data: lightSpots = [] } = useQuery({
    queryKey,
    queryFn: () => getLightSpots.execute(),
  });

  const createLightSpot = useUsecase(props.createLightSpot);

  useWatch(async () => {
    if (currentGame)
      return watchLightSpots.execute((lightSpots) =>
        queryClient.setQueryData<LightSpotModel[]>(queryKey, () => lightSpots),
      );
  }, [currentGame]);

  return (
    <Context.Provider
      value={{
        lightSpots,
        createLightSpot,
      }}
    >
      {children}
    </Context.Provider>
  );
};
